import { readFileSync } from "node:fs";
import { after, before, beforeEach, test } from "node:test";
import { strict as assert } from "node:assert";
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment
} from "@firebase/rules-unit-testing";
import { get, ref, runTransaction, serverTimestamp, set } from "firebase/database";

const room = "ABCDEFGH";
const statePath = `rooms/${room}/state`;
const themePath = `rooms/${room}/theme`;
const deckPath = `decks/${room}`;
const cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
  .flatMap(rank => ["S", "H", "D", "C"].map(suit => rank + suit));

let environment;
let owner;
let viewer;

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
});

beforeEach(async () => {
  await environment.clearDatabase();
});

after(async () => {
  await environment?.cleanup();
});

async function seedCallingRound(lastDrawAt = 0) {
  await assertSucceeds(set(ref(owner, statePath), initialState()));
  await assertSucceeds(set(ref(owner, deckPath), {
    ownerUid: "caller", round: 1, cards
  }));
  const created = (await get(ref(owner, statePath))).val();
  await assertSucceeds(set(ref(owner, statePath), {
    ...created,
    round: 1,
    patternId: "h",
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
  assert.equal((await get(ref(owner, statePath))).val().drawnCount, 1);
});
