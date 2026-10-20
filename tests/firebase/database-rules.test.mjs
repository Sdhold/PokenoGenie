import { readFileSync } from "node:fs";
import { after, before, beforeEach, test } from "node:test";
import { strict as assert } from "node:assert";
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment
} from "@firebase/rules-unit-testing";
import { get, ref, runTransaction, serverTimestamp, set, update } from "firebase/database";

const room = "ABCDEFGH";
const statePath = `rooms/${room}/state`;
const themePath = `rooms/${room}/theme`;
const deckPath = `decks/${room}`;
const newPatterns = JSON.parse(readFileSync("tests/fixtures/new-patterns.json", "utf8"));
const cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
  .flatMap(rank => ["S", "H", "D", "C"].map(suit => rank + suit));

let environment;
let owner;
let viewer;
let editor;

const initialState = () => ({
  ownerUid: "caller",
  round: 0,
  patternId: "",
  phase: "lobby",
  drawnCount: 0,
  lastDrawAt: 0,
  createdAt: Date.now()
});

before(async () => {
  environment = await initializeTestEnvironment({
    projectId: "demo-pokeno-genie",
    database: {
      host: "127.0.0.1",
      port: 9000,
      rules: readFileSync("database.rules.json", "utf8")
    }
  });
  owner = environment.authenticatedContext("caller").database();
  viewer = environment.authenticatedContext("viewer").database();
  editor = environment.authenticatedContext("editor").database();
});

beforeEach(async () => {
  await environment.clearDatabase();
});

after(async () => {
  await environment?.cleanup();
});

async function seedCallingRound(lastDrawAt = 0, patternId = "h") {
  await assertSucceeds(set(ref(owner, statePath), initialState()));
  await assertSucceeds(set(ref(owner, deckPath), {
    ownerUid: "caller", round: 1, cards
  }));
  const created = (await get(ref(owner, statePath))).val();
  await assertSucceeds(set(ref(owner, statePath), {
    ...created,
    round: 1,
    patternId,
    phase: "calling",
    lastDrawAt: 0
  }));
  if (lastDrawAt) {
    await environment.withSecurityRulesDisabled(async context => {
      await set(ref(context.database(), `${statePath}/lastDrawAt`), lastDrawAt);
    });
  }
}

test("only the creator can write; a viewer can read the display but not the deck", async () => {
  const reservation = await assertSucceeds(runTransaction(ref(owner, statePath), current =>
    current === null ? { ...initialState(), createdAt: serverTimestamp() } : undefined,
    { applyLocally: false }));
  assert.equal(reservation.committed, true);
  await assertSucceeds(get(ref(viewer, statePath)));
  await assertFails(set(ref(viewer, statePath), initialState()));
  await assertFails(get(ref(viewer, deckPath)));
  await assertFails(get(ref(environment.unauthenticatedContext().database(), statePath)));

  await assertSucceeds(set(ref(owner, deckPath), { ownerUid: "caller", round: 1, cards }));
  assert.equal((await get(ref(owner, deckPath))).val().cards.length, 52);
});

test("every new winning pattern starts a round and remains locked during play", async () => {
  for (const pattern of newPatterns) {
    await environment.clearDatabase();
    await seedCallingRound(0, pattern.id);
    const state = (await assertSucceeds(get(ref(viewer, statePath)))).val();
    assert.equal(state.patternId, pattern.id);
    assert.equal(state.phase, "calling");
  }
  const state = (await get(ref(owner, statePath))).val();
  await assertFails(set(ref(owner, statePath), { ...state, patternId: "standard", phase: "paused" }));
});

test("a valid draw advances one card and the three-second rule rejects a rapid draw", async () => {
  await seedCallingRound(Date.now() - 4000);
  const state = (await get(ref(owner, statePath))).val();

  await assertFails(set(ref(owner, statePath), {
    ...state,
    drawn: [cards[1]],
    drawnCount: 1,
    lastDrawAt: serverTimestamp()
  }));
  await assertSucceeds(set(ref(owner, statePath), {
    ...state,
    drawn: [cards[0]],
    drawnCount: 1,
    lastDrawAt: serverTimestamp()
  }));

  const drawnState = (await get(ref(owner, statePath))).val();
  await assertFails(set(ref(owner, statePath), {
    ...state,
    drawn: [cards[1]],
    drawnCount: 1,
    lastDrawAt: serverTimestamp()
  }));
  await assertFails(set(ref(owner, statePath), {
    ...drawnState,
    drawn: [cards[0], cards[1]],
    drawnCount: 2,
    lastDrawAt: serverTimestamp()
  }));
  await assertFails(set(ref(owner, statePath), {
    ...drawnState,
    drawn: [cards[0], cards[1], cards[2]],
    drawnCount: 3,
    lastDrawAt: serverTimestamp()
  }));
});

test("the final card finishes the round and a fresh deck can start under the same code", async () => {
  await seedCallingRound();
  await environment.withSecurityRulesDisabled(async context => {
    await set(ref(context.database(), statePath), {
      ...initialState(),
      round: 1,
      patternId: "h",
      phase: "calling",
      drawn: cards.slice(0, 51),
      drawnCount: 51,
      lastDrawAt: Date.now() - 4000
    });
  });

  const state = (await get(ref(owner, statePath))).val();
  await assertSucceeds(set(ref(owner, statePath), {
    ...state,
    drawn: cards,
    drawnCount: 52,
    lastDrawAt: serverTimestamp(),
    phase: "finished"
  }));

  const nextDeck = [...cards].reverse();
  await assertSucceeds(set(ref(owner, deckPath), { ownerUid: "caller", round: 2, cards: nextDeck }));
  const finished = (await get(ref(owner, statePath))).val();
  await assertSucceeds(set(ref(owner, statePath), {
    ownerUid: "caller",
    round: 2,
    patternId: "c",
    phase: "calling",
    drawnCount: 0,
    lastDrawAt: 0,
    createdAt: finished.createdAt
  }));
  const restarted = (await get(ref(viewer, statePath))).val();
  assert.equal(restarted.round, 2);
  assert.equal(restarted.drawn, undefined);
});

test("pause, resume, and finish are allowed without changing the draw history", async () => {
  await seedCallingRound();
  let state = (await get(ref(owner, statePath))).val();
  await assertSucceeds(set(ref(owner, statePath), { ...state, phase: "paused" }));
  state = (await get(ref(owner, statePath))).val();
  await assertSucceeds(set(ref(owner, statePath), { ...state, phase: "calling" }));
  state = (await get(ref(owner, statePath))).val();
  await assertSucceeds(set(ref(owner, statePath), { ...state, phase: "paused" }));
  state = (await get(ref(owner, statePath))).val();
  await assertSucceeds(set(ref(owner, statePath), { ...state, phase: "finished" }));
});

test("the caller can switch a deck theme without changing a live round", async () => {
  await seedCallingRound(Date.now() - 4000);
  assert.equal((await assertSucceeds(get(ref(viewer, themePath)))).val(), null);

  await assertSucceeds(set(ref(owner, themePath), "midnight"));
  assert.equal((await assertSucceeds(get(ref(viewer, themePath)))).val(), "midnight");
  await assertFails(set(ref(viewer, themePath), "sunburst"));
  await assertFails(set(ref(owner, themePath), "unknown"));
  await assertFails(get(ref(environment.unauthenticatedContext().database(), themePath)));

  const state = (await get(ref(owner, statePath))).val();
  assert.equal(state.round, 1);
  assert.equal(state.drawnCount, 0);
  await assertSucceeds(set(ref(owner, statePath), {
    ...state,
    drawn: [cards[0]],
    drawnCount: 1,
    lastDrawAt: serverTimestamp()
  }));
  await assertSucceeds(set(ref(owner, themePath), "sunburst"));
  await assertSucceeds(set(ref(owner, themePath), "mopar"));
  await assertSucceeds(set(ref(owner, themePath), "dart1969"));
  assert.equal((await get(ref(viewer, themePath))).val(), "dart1969");
  for (const themeId of ["harrypotter", "starwars", "lordoftherings", "cats", "route66", "dinosaurs", "pokemon"]) {
    await assertSucceeds(set(ref(owner, themePath), themeId));
    assert.equal((await assertSucceeds(get(ref(viewer, themePath)))).val(), themeId);
    await assertFails(set(ref(viewer, themePath), themeId));
  }
  assert.equal((await get(ref(owner, statePath))).val().drawnCount, 1);
});

test("only the caller controls the guide; opening it holds draws and preserves the cooldown", async () => {
  await seedCallingRound(Date.now() - 4000);
  const original = (await get(ref(owner, statePath))).val();
  const guide = ref(owner, `${statePath}/guideOpen`);
  await assertFails(set(ref(viewer, `${statePath}/guideOpen`), true));
  await assertFails(set(guide, "true"));
  await assertSucceeds(set(guide, true));
  assert.equal((await assertSucceeds(get(ref(viewer, statePath)))).val().guideOpen, true);
  const open = (await get(ref(owner, statePath))).val();
  const draw = { ...open, drawn: [cards[0]], drawnCount: 1, lastDrawAt: serverTimestamp() };
  await assertFails(set(ref(owner, statePath), draw));
  await assertFails(set(ref(owner, statePath), { ...draw, guideOpen: false }));
  await assertFails(set(ref(owner, statePath), { ...open, phase: "paused", guideOpen: false }));
  await assertSucceeds(set(guide, false));
  assert.deepEqual((await get(ref(owner, statePath))).val(), { ...original, guideOpen: false });
  await assertSucceeds(set(ref(owner, statePath), { ...draw, guideOpen: false }));
  const called = (await get(ref(owner, statePath))).val();
  await assertFails(set(ref(owner, statePath), { ...called, guideOpen: true, drawn: [] }));
  await assertFails(update(ref(owner, statePath), { guideOpen: true, drawn: null }));
  await assertSucceeds(set(guide, true));
  await assertSucceeds(set(guide, false));
  assert.deepEqual((await get(ref(owner, statePath))).val(), called);
  await assertFails(set(ref(owner, statePath), {
    ...called, drawn: cards.slice(0,2), drawnCount: 2, lastDrawAt: serverTimestamp()
  }));
});

test("the guide opens and closes during setup, pause and finish without starting or resuming a round", async () => {
  await assertSucceeds(set(ref(owner, statePath), initialState()));
  const setup = (await get(ref(owner, statePath))).val();
  await assertSucceeds(set(ref(owner, `${statePath}/guideOpen`), true));
  await assertFails(set(ref(owner, deckPath), { ownerUid: "caller", round: 1, cards }));
  await assertSucceeds(set(ref(owner, `${statePath}/guideOpen`), false));
  assert.deepEqual((await get(ref(owner, statePath))).val(), { ...setup, guideOpen: false });
  await assertSucceeds(set(ref(owner, deckPath), { ownerUid: "caller", round: 1, cards }));
  await assertSucceeds(set(ref(owner, statePath), { ...setup, guideOpen: false, round:1, patternId:"h", phase:"calling" }));
  for (const phase of ["paused", "finished"]) {
    const before = (await get(ref(owner, statePath))).val();
    await assertSucceeds(set(ref(owner, statePath), { ...before, phase }));
    const expected = (await get(ref(owner, statePath))).val();
    await assertSucceeds(set(ref(owner, `${statePath}/guideOpen`), true));
    await assertSucceeds(set(ref(owner, `${statePath}/guideOpen`), false));
    assert.deepEqual((await get(ref(owner, statePath))).val(), expected);
  }
});

const boardCells = cards.slice(0, 25);
function revision(overrides = {}) {
  return { boardId: "board-1", revisionId: "revision-1", setId: "set-1", label: "Board 07", cards: boardCells,
    positions: Object.fromEntries(boardCells.map((card, index) => [card, String(index)])),
    layoutHash: "a".repeat(64), createdBy: "editor", createdAt: serverTimestamp(), ...overrides };
}
async function seedLibrary() {
  await assertSucceeds(set(ref(editor, "boardSets/set-1"), { name: "Our Pokeno set", ownerUid: "editor", version: 1 }));
  await assertSucceeds(set(ref(editor, "boardOwners/board-1"), { setId: "set-1", ownerUid: "editor" }));
  await assertSucceeds(set(ref(editor, "boardRevisions/board-1/revision-1"), revision()));
  await assertSucceeds(set(ref(editor, "boardSets/set-1"), { name: "Our Pokeno set", ownerUid: "editor", version: 2,
    boards: { "board-1": { label: "Board 07", revisionId: "revision-1", layoutHash: "a".repeat(64), archived: false } } }));
}
function roundSet(round = 1) {
  return { round, setId: "set-1", setName: "Our Pokeno set", revisions: { "board-1": "revision-1" }, labels: { "board-1": "Board 07" } };
}
function boardCheck(overrides = {}) {
  return { id: "check-1", round: 1, drawnCount: 0, patternId: "h", boardId: "board-1", revisionId: "revision-1", setId: "set-1", setName: "Our Pokeno set", label: "Board 07", cards: boardCells, checkedAt: serverTimestamp(), ...overrides };
}

test("any anonymous visitor can create a set, while existing sets stay creator-owned across rooms", async () => {
  await seedLibrary();
  assert.equal((await assertSucceeds(get(ref(viewer, "boardSets/set-1")))).val().name, "Our Pokeno set");
  assert.equal((await assertSucceeds(get(ref(owner, "boardRevisions/board-1/revision-1")))).val().cards.length, 25);
  await assertSucceeds(set(ref(viewer, "boardSets/set-2"), { name: "My set", ownerUid: "viewer", version: 1 }));
  await assertFails(set(ref(viewer, "boardSets/set-3"), { name: "Forged", ownerUid: "editor", version: 1 }));
  await assertFails(set(ref(viewer, "boardSets/set-4"), { name: "Missing owner", version: 1 }));
  await assertFails(set(ref(viewer, "boardSets/set-1"), { name: "Overwrite", ownerUid: "viewer", version: 3 }));
  await assertFails(update(ref(viewer, "boardSets/set-1"), { name: "Overwrite", version: 3 }));
  await assertFails(update(ref(editor, "boardSets/set-1"), { ownerUid: "viewer", version: 3 }));
  await assertFails(set(ref(editor, "boardSets/set-1"), null));
  await assertFails(set(ref(viewer, "boardEditors/viewer"), true));
  await assertFails(get(ref(viewer, "boardEditors/editor")));
  await assertFails(get(ref(viewer, "boardEditors/viewer")));
  await assertFails(get(ref(environment.unauthenticatedContext().database(), "boardSets")));
  await assertSucceeds(set(ref(owner, statePath), initialState()));
  await assertSucceeds(set(ref(owner, "rooms/JKLMNPQR/state"), initialState()));
  assert.equal((await get(ref(viewer, "boardSets/set-1"))).val().boards["board-1"].revisionId, "revision-1");
});

test("published layouts are immutable, contain exactly 25 distinct cards, and cannot point at a foreign set", async () => {
  await seedLibrary();
  await assertFails(set(ref(editor, "boardRevisions/board-1/revision-1"), revision({ label: "Changed" })));
  await assertFails(set(ref(editor, "boardRevisions/board-1/revision-1"), null));
  const repeated = [...boardCells]; repeated[24] = repeated[0];
  await assertSucceeds(set(ref(editor, "boardOwners/board-2"), { setId: "set-1", ownerUid: "editor" }));
  await assertFails(set(ref(editor, "boardRevisions/board-2/revision-2"), revision({ boardId: "board-2", revisionId: "revision-2", cards: repeated })));
  await assertFails(set(ref(editor, "boardRevisions/board-2/revision-2"), revision({ boardId: "board-2", revisionId: "revision-2", cards: boardCells.slice(0, 24) })));
  await assertFails(set(ref(editor, "boardSets/set-2"), { name: "Other", ownerUid: "editor", version: 1, boards: { "board-1": { label: "Board 07", revisionId: "revision-1", layoutHash: "a".repeat(64), archived: false } } }));
  await assertFails(update(ref(editor, "boardSets/set-1"), { name: "Silent concurrent overwrite" }));
});

test("drafts are private, can contain empty cells, and are separate from published boards", async () => {
  await seedLibrary();
  const draft = { id: "draft-1", setId: "set-1", boardId: "board-2", label: "Board 08", baseRevisionId: "", cards: Array(25).fill(""), currentCell: 12, pendingRank: "Q", updatedAt: serverTimestamp() };
  await assertSucceeds(set(ref(editor, "boardDrafts/editor/draft-1"), draft));
  await assertSucceeds(get(ref(editor, "boardDrafts/editor")));
  await assertFails(get(ref(viewer, "boardDrafts/editor")));
  await assertFails(set(ref(owner, "boardDrafts/editor/draft-1"), draft));
  await assertFails(set(ref(viewer, "boardDrafts/viewer/draft-1"), draft));
  await assertFails(set(ref(editor, "boardDrafts/editor/draft-1"), { ...draft, cards: [...Array(24).fill(""), "Joker"] }));
  assert.equal((await get(ref(viewer, "boardSets/set-1"))).val().boards["board-2"], undefined);
  await assertFails(set(ref(viewer, "boardDrafts/editor/draft-1"), null));
  await assertSucceeds(set(ref(editor, "boardDrafts/editor/draft-1"), null));
  assert.equal((await get(ref(editor, "boardDrafts/editor/draft-1"))).exists(), false);
  assert.equal((await get(ref(viewer, "boardSets/set-1"))).val().boards["board-1"].revisionId, "revision-1");
  await assertSucceeds(set(ref(editor, "boardDrafts/editor/draft-1"), draft));
  assert.deepEqual((await get(ref(editor, "boardDrafts/editor/draft-1/cards"))).val(), draft.cards);
});

test("another creator can copy layouts with new IDs but cannot take ownership or inject revisions", async () => {
  await seedLibrary();
  await assertSucceeds(set(ref(viewer, "boardSets/copy"), { name: "Our Pokeno set (copy)", ownerUid: "viewer", version: 1 }));
  await assertFails(set(ref(viewer, "boardOwners/board-1"), { setId: "copy", ownerUid: "viewer" }));
  await assertFails(set(ref(editor, "boardOwners/board-1"), null));
  await assertFails(set(ref(viewer, "boardOwners/other-board"), { setId: "set-1", ownerUid: "viewer" }));
  await assertFails(set(ref(viewer, "boardRevisions/board-1/injected"), revision({ revisionId: "injected", setId: "copy", createdBy: "viewer" })));
  await assertFails(set(ref(viewer, "boardRevisions/board-1/injected"), revision({ revisionId: "injected", createdBy: "viewer" })));
  await assertFails(update(ref(viewer, "boardSets/set-1"), { version: 3, "boards/board-1/archived": true }));
  await assertSucceeds(set(ref(viewer, "boardOwners/copied-board"), { setId: "copy", ownerUid: "viewer" }));
  await assertSucceeds(set(ref(viewer, "boardRevisions/copied-board/copied-revision"), revision({ boardId: "copied-board", revisionId: "copied-revision", setId: "copy", createdBy: "viewer" })));
  await assertSucceeds(update(ref(viewer, "boardSets/copy"), { version: 2, "boards/copied-board": { label: "Board 07", revisionId: "copied-revision", layoutHash: "a".repeat(64), archived: false } }));
  assert.deepEqual((await get(ref(owner, "boardRevisions/copied-board/copied-revision/cards"))).val(), boardCells);
  assert.equal((await get(ref(viewer, "boardSets/set-1"))).val().boards["board-1"].archived, false);
});

test("only the creator can delete or restore a set, preserving boards and private drafts", async () => {
  await seedLibrary();
  const draft = { id: "draft-1", setId: "set-1", boardId: "board-2", label: "Board 08", baseRevisionId: "", cards: Array(25).fill(""), currentCell: 12, pendingRank: "Q", updatedAt: serverTimestamp() };
  await assertSucceeds(set(ref(editor, "boardDrafts/editor/draft-1"), draft));
  await assertFails(update(ref(viewer, "boardSets/set-1"), { deleted: true, version: 3 }));
  await assertFails(update(ref(editor, "boardSets/set-1"), { deleted: "yes", version: 3 }));
  await assertFails(update(ref(editor, "boardSets/set-1"), { deleted: true }));
  await assertSucceeds(update(ref(editor, "boardSets/set-1"), { deleted: true, version: 3 }));
  assert.equal((await get(ref(viewer, "boardSets/set-1"))).val().deleted, true);
  assert.deepEqual((await get(ref(viewer, "boardRevisions/board-1/revision-1/cards"))).val(), boardCells);
  assert.equal((await get(ref(editor, "boardDrafts/editor/draft-1"))).val().currentCell, 12);
  await assertFails(set(ref(editor, "boardDrafts/editor/draft-1"), { ...draft, currentCell: 13 }));
  await assertFails(set(ref(editor, "boardOwners/board-3"), { setId: "set-1", ownerUid: "editor" }));
  await assertFails(set(ref(editor, "boardRevisions/board-1/revision-2"), revision({ revisionId: "revision-2" })));
  await assertFails(update(ref(viewer, "boardSets/set-1"), { deleted: false, version: 4 }));
  await assertSucceeds(update(ref(editor, "boardSets/set-1"), { deleted: false, version: 4 }));
  await assertSucceeds(set(ref(editor, "boardDrafts/editor/draft-1"), draft));
  await assertSucceeds(set(ref(editor, "boardRevisions/board-1/revision-2"), revision({ revisionId: "revision-2" })));
  assert.equal((await get(ref(owner, "boardSets/set-1"))).val().boards["board-1"].revisionId, "revision-1");
});

test("a deleted set cannot join a new round, while an already pinned round can still verify its boards", async () => {
  await seedLibrary(); await seedCallingRound();
  const state = (await get(ref(owner, statePath))).val();
  await assertSucceeds(set(ref(owner, statePath), { ...state, phase: "paused" }));
  await assertSucceeds(set(ref(owner, `rooms/${room}/boards`), roundSet()));
  await assertSucceeds(update(ref(editor, "boardSets/set-1"), { deleted: true, version: 3 }));
  await assertSucceeds(set(ref(owner, `rooms/${room}/verification`), boardCheck()));
  assert.deepEqual((await get(ref(viewer, `rooms/${room}/verification/cards`))).val(), boardCells);
  await assertSucceeds(set(ref(owner, "rooms/JKLMNPQR/state"), initialState()));
  await assertFails(set(ref(owner, "rooms/JKLMNPQR/boards"), roundSet()));
  await assertSucceeds(update(ref(editor, "boardSets/set-1"), { deleted: false, version: 4 }));
  await assertSucceeds(set(ref(owner, "rooms/JKLMNPQR/boards"), roundSet()));
});

test("the caller pins published board versions once per round; viewers and active draws cannot replace them", async () => {
  await seedLibrary(); await seedCallingRound();
  await assertFails(set(ref(owner, `rooms/${room}/boards`), roundSet()));
  const state = (await get(ref(owner, statePath))).val();
  await assertSucceeds(set(ref(owner, statePath), { ...state, phase: "paused" }));
  await assertFails(set(ref(viewer, `rooms/${room}/boards`), roundSet()));
  await assertSucceeds(set(ref(owner, `rooms/${room}/boards`), roundSet()));
  await assertSucceeds(get(ref(viewer, `rooms/${room}/boards`)));
  await assertFails(set(ref(owner, `rooms/${room}/boards`), roundSet()));
  await assertFails(set(ref(owner, `rooms/${room}/boards/labels/board-1`), "Fake board"));
  await assertFails(set(ref(owner, `rooms/${room}/boards`), null));
});

test("a check must reference the pinned board and current paused state, never a claimed winner flag", async () => {
  await seedLibrary(); await seedCallingRound();
  const state = (await get(ref(owner, statePath))).val();
  await assertFails(set(ref(owner, `rooms/${room}/verification`), boardCheck()));
  await assertSucceeds(set(ref(owner, statePath), { ...state, phase: "paused" }));
  await assertSucceeds(set(ref(owner, `rooms/${room}/boards`), roundSet()));
  await assertSucceeds(set(ref(owner, `rooms/${room}/verification`), boardCheck()));
  await assertSucceeds(get(ref(viewer, `rooms/${room}/verification`)));
  await assertFails(set(ref(viewer, `rooms/${room}/verification`), boardCheck()));
  for (const change of [{ round: 2 }, { drawnCount: 5 }, { patternId: "c" }, { label: "Fake winner" }, { isWinner: true }, { cards: [...boardCells].reverse() }])
    await assertFails(set(ref(owner, `rooms/${room}/verification`), boardCheck(change)));
  await assertSucceeds(set(ref(owner, `rooms/${room}/verification`), null));
});

test("new library revisions do not change a pinned round, and future cards cannot be inserted while paused", async () => {
  await seedLibrary(); await seedCallingRound();
  const state = (await get(ref(owner, statePath))).val();
  await assertSucceeds(set(ref(owner, statePath), { ...state, phase: "paused" }));
  await assertSucceeds(set(ref(owner, `rooms/${room}/boards`), roundSet()));
  await assertSucceeds(set(ref(editor, "boardRevisions/board-1/revision-2"), revision({ revisionId: "revision-2" })));
  const collection = (await get(ref(editor, "boardSets/set-1"))).val();
  collection.version++; collection.boards["board-1"].revisionId = "revision-2";
  await assertSucceeds(set(ref(editor, "boardSets/set-1"), collection));
  await assertSucceeds(set(ref(owner, `rooms/${room}/verification`), boardCheck()));
  await assertFails(set(ref(owner, `rooms/${room}/verification`), boardCheck({ revisionId: "revision-2" })));
  await assertFails(set(ref(owner, statePath), { ...state, phase: "paused", drawn: cards }));
  await assertFails(set(ref(owner, statePath), { ...state, phase: "finished", drawn: cards }));
});
