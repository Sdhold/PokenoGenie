import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { browserLocalPersistence, connectAuthEmulator, getAuth,
  onAuthStateChanged, setPersistence, signInAnonymously } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import { connectDatabaseEmulator, get, getDatabase, onValue, ref, runTransaction, serverTimestamp, set } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";
import { libraryContext } from "./firebase-bridge.js?v=8";
import { loadLocalDrafts, storeLocalDraft, removeLocalDraft } from "./board-photo.js?v=1";

let callback, editorAuth, editorDb, editorUser, canEdit = false;
let stopSets, stopDrafts, stopAuth, stopRound, stopCheck;
const id = () => crypto.randomUUID().replaceAll("-", "");
const key = value => typeof value === "string" && /^[a-zA-Z0-9_-]{1,64}$/.test(value);
const card = value => typeof value === "string" && /^(A|[2-9]|10|J|Q|K)[SHDC]$/.test(value);
const notify = (name, value) => callback?.invokeMethodAsync(name, value).catch(() => {});
function online() {
  const context = libraryContext();
  if (!context.connected) throw new Error("Reconnect before saving or checking a shared board.");
  return context;
}
function editor() {
  online();
  if (!canEdit || !editorUser) throw new Error("The board library is still connecting. Try again shortly.");
}
function validCards(cards) {
  if (!Array.isArray(cards) || cards.length !== 25 || !cards.every(card) || new Set(cards).size !== 25)
    throw new Error("Enter 25 different cards before publishing.");
}
function label(value) {
  value = String(value || "").trim();
  if (!value || value.length > 60) throw new Error("Use a board label of 1–60 characters.");
  return value;
}
function map(value) { return value && typeof value === "object" ? value : {}; }
function normalizeSet(setId, value) {
  return { id: setId, name: value.name, ownerUid: value.ownerUid || "", version: value.version, boards: map(value.boards) };
}

export async function initializeLibrary(reference) {
  callback = reference;
  const context = libraryContext();
  if (!context.config) throw new Error("The game service is still loading. Try again shortly.");
  stopSets?.();
  stopSets = onValue(ref(context.database, "boardSets"), snapshot => {
    const sets = Object.entries(snapshot.val() || {}).map(([setId, value]) => normalizeSet(setId, value));
    notify("OnLibrarySets", sets.sort((a, b) => a.name.localeCompare(b.name)));
  }, error => notify("OnLibraryError", "The board library could not be loaded. Check the connection and publish the updated database rules. " + error.code));
}

export async function initializeEditor() {
  const context = libraryContext();
  if (!editorAuth) {
    const app = initializeApp(context.config, "pokeno-library-editor");
    editorAuth = getAuth(app);
    editorDb = getDatabase(app);
    if (context.config.useEmulators && ["localhost", "127.0.0.1"].includes(location.hostname)) {
      connectAuthEmulator(editorAuth, "http://127.0.0.1:9099", { disableWarnings: true });
      connectDatabaseEmulator(editorDb, "127.0.0.1", 9000);
    }
    await setPersistence(editorAuth, browserLocalPersistence);
    await editorAuth.authStateReady();
    if (!editorAuth.currentUser) await signInAnonymously(editorAuth);
  }
  stopAuth?.();
  stopAuth = onAuthStateChanged(editorAuth, user => {
    editorUser = user;
    canEdit = !!user;
    stopDrafts?.();
    notify("OnLibraryDrafts", []);
    notify("OnLibraryEditor", {
      uid: user?.uid || "", canEdit
    });
    if (!user) return;
    stopDrafts = onValue(ref(editorDb, `boardDrafts/${user.uid}`), drafts => {
      notify("OnLibraryDrafts", Object.values(drafts.val() || {}).sort((a, b) => b.updatedAt - a.updatedAt));
    }, error => notify("OnLibraryError", "Your drafts could not be loaded. " + error.code));
  });
}

export async function refreshLibrary() {
  const context = online();
  const snapshot = await get(ref(context.database, "boardSets"));
  notify("OnLibrarySets", Object.entries(snapshot.val() || {}).map(([setId, value]) => normalizeSet(setId, value)));
}
export async function createSet(name) {
  editor();
  name = label(name);
  const setId = id();
  await set(ref(editorDb, `boardSets/${setId}`), { name, ownerUid: editorUser.uid, version: 1 });
  return setId;
}

export async function saveLocalDraft(draft) {
  if (!key(draft.id)) throw new Error("Invalid draft identifier.");
  await storeLocalDraft(editorAuth.currentUser.uid, { ...draft, pendingSync: true });
}
export async function localDrafts() { return await loadLocalDrafts(editorAuth?.currentUser?.uid || ""); }
export async function saveDraft(draft) {
  editor();
  await saveLocalDraft(draft);
  if (!key(draft.id) || !key(draft.boardId) || !key(draft.setId) || draft.cards?.length !== 25)
    throw new Error("This board draft could not be saved. Check its set and cells.");
  const { pendingSync, ...payload } = draft;
  await set(ref(editorDb, `boardDrafts/${editorUser.uid}/${draft.id}`), { ...payload, updatedAt: serverTimestamp() });
  await storeLocalDraft(editorUser.uid, { ...draft, pendingSync: false });
}
export async function discardDraft(draftId) {
  editor();
  if (!key(draftId)) throw new Error("Invalid draft identifier.");
  await set(ref(editorDb, `boardDrafts/${editorUser.uid}/${draftId}`), null);
  await removeLocalDraft(editorUser.uid, draftId);
}
export async function getRevision(boardId, revisionId) {
  const context = online();
  if (!key(boardId) || !key(revisionId)) throw new Error("Invalid board reference.");
  const result = (await get(ref(context.database, `boardRevisions/${boardId}/${revisionId}`))).val();
  if (!result) throw new Error("This saved board version is unavailable. Refresh the library.");
  validCards(result.cards);
  return result;
}

async function editManifest(setId, change) {
  const reference = ref(editorDb, `boardSets/${setId}`);
  // Keep a listener alive for this Auth instance. A one-off get does not retain
  // a transaction cache when only the separate caller instance watches the set.
  let stop;
  try {
    await new Promise((resolve, reject) => { stop = onValue(reference, resolve, reject); });
    const result = await runTransaction(reference, current => {
      if (current && current.ownerUid !== editorUser.uid) throw new Error("This set belongs to another browser. Copy it to make changes.");
      return current ? change(current) : undefined;
    }, { applyLocally: false });
    if (!result.committed) throw new Error("The board changed on another device. Keep this draft and reopen the published board to review the changes.");
  } finally { stop?.(); }
}
export async function publishBoard(draft, layoutHash) {
  editor(); validCards(draft.cards);
  const boardLabel = label(draft.label);
  if (!key(draft.boardId) || !key(draft.setId) || !/^[a-f0-9]{64}$/.test(layoutHash))
    throw new Error("Invalid board data.");
  const revisionId = id();
  const revision = {
    boardId: draft.boardId, revisionId, setId: draft.setId, label: boardLabel,
    cards: draft.cards, layoutHash, createdBy: editorUser.uid, createdAt: serverTimestamp()
  };
  revision.positions = Object.fromEntries(draft.cards.map((value, index) => [value, String(index)]));
  const manifest = (await get(ref(editorDb, `boardSets/${draft.setId}`))).val();
  if (!manifest) throw new Error("Choose an existing board set.");
  if (manifest.ownerUid !== editorUser.uid) throw new Error("This set belongs to another browser. Copy it to make changes.");
  const check = current => {
    const boards = map(current.boards);
    if ((boards[draft.boardId]?.revisionId || "") !== draft.baseRevisionId) return false;
    if (Object.entries(boards).some(([otherId, board]) => otherId !== draft.boardId &&
      (board.label.toLowerCase() === boardLabel.toLowerCase() || (!board.archived && board.layoutHash === layoutHash)))) return false;
    return true;
  };
  if (!check(manifest)) throw new Error("That label/layout already exists, or this board was edited elsewhere. Review the library before publishing.");
  const ownershipRef = ref(editorDb, `boardOwners/${draft.boardId}`);
  const ownership = (await get(ownershipRef)).val();
  if (ownership && (ownership.setId !== draft.setId || ownership.ownerUid !== editorUser.uid))
    throw new Error("This board belongs to another set. Create a new board or copy the set.");
  if (!ownership) await set(ownershipRef, { setId: draft.setId, ownerUid: editorUser.uid });
  await set(ref(editorDb, `boardRevisions/${draft.boardId}/${revisionId}`), revision);
  await editManifest(draft.setId, current => check(current) ? {
    ...current, version: current.version + 1,
    boards: { ...map(current.boards), [draft.boardId]: { label: boardLabel, revisionId, layoutHash, archived: false } }
  } : undefined);
  await discardDraft(draft.id);
}
export async function archiveBoard(setId, boardId, revisionId, archived) {
  editor();
  await editManifest(setId, current => {
    const board = current.boards?.[boardId];
    return board?.revisionId === revisionId ? {
      ...current, version: current.version + 1,
      boards: { ...current.boards, [boardId]: { ...board, archived: !!archived } }
    } : undefined;
  });
}

export function watchBoards(code) {
  stopRound?.(); stopCheck?.();
  const context = libraryContext();
  stopRound = onValue(ref(context.database, `rooms/${code}/boards`), snapshot => notify("OnRoundBoards", snapshot.val()));
  stopCheck = onValue(ref(context.database, `rooms/${code}/verification`), snapshot => notify("OnBoardCheck", snapshot.val()));
}
export async function selectRoundSet(code, setId, nextRound = false) {
  const context = online();
  const state = (await get(ref(context.database, `rooms/${code}/state`))).val();
  if (state?.ownerUid !== context.auth.currentUser.uid || state.guideOpen === true || !(nextRound ? ["lobby", "finished"] : ["paused", "finished"]).includes(state.phase))
    throw new Error("Pause the round before selecting its boards.");
  if (nextRound && !setId) { await set(ref(context.database, `rooms/${code}/boards`), null); return; }
  const collection = (await get(ref(context.database, `boardSets/${setId}`))).val();
  if (!collection) throw new Error("Choose a board set from the library.");
  const entries = Object.entries(map(collection.boards)).filter(([, board]) => !board.archived);
  if (!entries.length) throw new Error("Publish at least one board in this set first.");
  const snapshot = { round: state.round + (nextRound ? 1 : 0), setId, setName: collection.name,
    revisions: Object.fromEntries(entries.map(([boardId, board]) => [boardId, board.revisionId])),
    labels: Object.fromEntries(entries.map(([boardId, board]) => [boardId, board.label])) };
  const reference = ref(context.database, `rooms/${code}/boards`);
  await get(reference);
  const result = await runTransaction(reference, current => {
    if (!nextRound && current?.round === state.round) return undefined;
    return snapshot;
  }, { applyLocally: false });
  if (!result.committed) throw new Error("A board set was already selected for this round. Use its saved board versions.");
}
export async function checkBoard(code, boardId) {
  const context = online();
  const state = (await get(ref(context.database, `rooms/${code}/state`))).val();
  const boards = (await get(ref(context.database, `rooms/${code}/boards`))).val();
  if (state?.ownerUid !== context.auth.currentUser.uid || state.guideOpen === true || !["paused", "finished"].includes(state.phase))
    throw new Error("Pause the round before checking a board.");
  if (boards?.round !== state.round || !boards.revisions?.[boardId]) throw new Error("Select this round's board set first.");
  const board = await getRevision(boardId, boards.revisions[boardId]);
  await set(ref(context.database, `rooms/${code}/verification`), {
    id: id(), round: state.round, patternId: state.patternId, drawnCount: state.drawnCount,
    setId: boards.setId, setName: boards.setName, boardId, revisionId: board.revisionId,
    label: board.label, cards: board.cards, checkedAt: serverTimestamp()
  });
}
export async function clearCheck(code) {
  const context = online();
  await set(ref(context.database, `rooms/${code}/verification`), null);
}

export async function exportSet(setId) {
  const collection = (await get(ref(online().database, `boardSets/${setId}`))).val();
  if (!collection) throw new Error("Choose a board set.");
  const boards = await Promise.all(Object.entries(map(collection.boards)).filter(([, board]) => !board.archived)
    .map(([boardId, board]) => getRevision(boardId, board.revisionId)));
  const pack = { schemaVersion: 1, name: collection.name, exportedAt: new Date().toISOString(), boards };
  const url = URL.createObjectURL(new Blob([JSON.stringify(pack, null, 2)], { type: "application/json" }));
  const link = document.createElement("a"); link.href = url; link.download = "pokeno-board-set.json"; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}

const escape = value => String(value).replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character]));
export async function printSet(setId, themeId) {
  online();
  if (!["illustrated", "midnight", "sunburst", "mopar", "dart1969", "harrypotter", "starwars", "lordoftherings", "cats"].includes(themeId))
    throw new Error("Choose a valid print theme.");
  const popup = window.open("", "_blank");
  if (!popup) throw new Error("Allow the print preview popup, then try again.");
  popup.opener = null;
  popup.document.write("<p>Preparing your saved boards…</p>");
  try {
    const collection = (await get(ref(online().database, `boardSets/${setId}`))).val();
    if (!collection) throw new Error("Choose a board set.");
    const boards = await Promise.all(Object.entries(map(collection.boards)).filter(([, board]) => !board.archived)
      .sort((a, b) => a[1].label.localeCompare(b[1].label, undefined, { numeric: true }))
      .map(([boardId, board]) => getRevision(boardId, board.revisionId)));
    const base = new URL("../", import.meta.url);
    const pages = boards.map(board => `<section><header><b>POKENO GENIE · ${escape(collection.name)}</b><h1>${escape(board.label)}</h1></header><div class="grid">${board.cards.map(value => {
      const url = new URL(`cards/${themeId === "illustrated" ? "" : themeId + "/"}${value}.svg`, base);
      if (themeId === "cats" || themeId === "mopar") url.search = "v=2";
      return `<div><img src="${escape(url.href)}" alt="${escape(value)}"></div>`;
    }).join("")}</div><footer>TOP ↑ · Board ${escape(board.boardId)} · Version ${escape(board.revisionId)} · ${escape(themeId)}</footer></section>`).join("");
    popup.document.open();
    popup.document.write(`<!doctype html><html lang="en"><meta charset="utf-8"><title>Pokeno board set</title><style>@page{size:letter;margin:.35in}*{box-sizing:border-box}body{font:14px Segoe UI,sans-serif;margin:0;background:#eee}nav{padding:16px;text-align:center}button{font:inherit;padding:12px 24px}section{background:white;width:7.8in;margin:20px auto;padding:.1in;break-after:page;page-break-after:always}section:last-child{break-after:auto;page-break-after:auto}header{text-align:center;height:.55in}h1{font-size:20px;margin:3px}.grid{display:grid;grid-template-columns:repeat(5,1fr);gap:3px;height:9.1in;max-width:6.25in;margin:auto}.grid div{min-height:0;border:1px solid #555;border-radius:5px;overflow:hidden}.grid img{width:100%;height:100%;object-fit:contain;display:block}footer{text-align:center;font-size:8px;padding:6px;overflow-wrap:anywhere}@media print{nav{display:none}body{background:white}section{margin:0;padding:0;width:100%}}</style><nav><button onclick="window.print()">Print / Save as PDF</button><p>One board per page. Use actual size; keep the TOP label facing the same way during play.</p></nav>${pages}</html>`);
    popup.document.close();
  } catch (error) { popup.close(); throw error; }
}

export function disposeLibrary() {
  [stopSets, stopDrafts, stopAuth, stopRound, stopCheck].forEach(stop => stop?.());
  callback = undefined;
}
