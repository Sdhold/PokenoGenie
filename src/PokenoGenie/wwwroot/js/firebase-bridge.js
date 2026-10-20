import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import {
  browserLocalPersistence,
  connectAuthEmulator,
  getAuth,
  onAuthStateChanged,
  setPersistence,
  signInAnonymously
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import {
  get,
  connectDatabaseEmulator,
  getDatabase,
  onValue,
  ref,
  runTransaction,
  serverTimestamp,
  set
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";

let auth;
let database;
let dotNet;
let stopRoomWatch;
let stopThemeWatch;
let stopConnectionWatch;
let stopOffsetWatch;
let connected = false;
let serverOffset = 0;
let cachedDeck;
let firebaseConfig;

const statePath = code => `rooms/${code}/state`;
const themePath = code => `rooms/${code}/theme`;
const deckPath = code => `decks/${code}`;
const themeIds = new Set(["illustrated", "midnight", "sunburst", "mopar", "dart1969", "harrypotter", "starwars", "lordoftherings", "cats", "route66", "dinosaurs", "pokemon"]);

function notify(method, value) {
  dotNet?.invokeMethodAsync(method, value).catch(() => {});
}

function normalizeDrawn(value) {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  return Object.keys(value).sort((a, b) => Number(a) - Number(b)).map(key => value[key]);
}

function normalizeState(value) {
  if (!value) return null;
  return { ...value, drawn: normalizeDrawn(value.drawn) };
}

function requireOwner(state) {
  if (!state || state.ownerUid !== auth.currentUser?.uid) {
    throw new Error("Only the caller who created this table can change it.");
  }
}

export async function initialize(config, dotNetReference) {
  if (auth) return auth.currentUser.uid;
  dotNet = dotNetReference;
  firebaseConfig = config;
  const app = initializeApp(config);
  auth = getAuth(app);
  const useLocalEmulators = config.useEmulators &&
    ["localhost", "127.0.0.1"].includes(location.hostname);
  if (useLocalEmulators) connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
  await setPersistence(auth, browserLocalPersistence);
  const existing = await new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
  if (!existing) await signInAnonymously(auth);

  database = getDatabase(app);
  if (useLocalEmulators) connectDatabaseEmulator(database, "127.0.0.1", 9000);
  stopConnectionWatch = onValue(ref(database, ".info/connected"), snapshot => {
    connected = snapshot.val() === true;
    notify("OnConnectionChanged", connected);
  });
  stopOffsetWatch = onValue(ref(database, ".info/serverTimeOffset"), snapshot => {
    serverOffset = Number(snapshot.val()) || 0;
    notify("OnClockOffset", Math.round(serverOffset));
  });
  return auth.currentUser.uid;
}

// Library editing uses a separate Firebase Auth instance, preserving caller ownership.
export function libraryContext() { return { database, auth, config: firebaseConfig, connected }; }

export function savedRoom() {
  return localStorage.getItem("pokeno.roomCode");
}

export function saveRoom(code) {
  if (code) localStorage.setItem("pokeno.roomCode", code);
  else localStorage.removeItem("pokeno.roomCode");
}

export function watchRoom(code) {
  stopRoomWatch?.();
  stopThemeWatch?.();
  cachedDeck = null;
  stopRoomWatch = onValue(ref(database, statePath(code)), snapshot => {
    notify("OnRoomChanged", normalizeState(snapshot.val()));
  }, error => notify("OnBridgeError", error.message));
  stopThemeWatch = onValue(ref(database, themePath(code)), snapshot => {
    const value = snapshot.val();
    notify("OnThemeChanged", themeIds.has(value) ? value : "illustrated");
  }, error => notify("OnBridgeError", error.message));
}

export async function createRoom(code) {
  if (!connected) throw new Error("Connect to the internet before creating a table.");
  const result = await runTransaction(ref(database, statePath(code)), current => {
    if (current !== null) return undefined;
    return {
      ownerUid: auth.currentUser.uid,
      round: 0,
      patternId: "",
      phase: "lobby",
      guideOpen: false,
      drawnCount: 0,
      lastDrawAt: 0,
      createdAt: serverTimestamp()
    };
  }, { applyLocally: false });
  return result.committed;
}

export async function startRound(code, patternId, cards) {
  if (!connected) throw new Error("The table is offline. Reconnect before starting.");
  if (cards.length !== 52 || new Set(cards).size !== 52) {
    throw new Error("The shuffled deck must contain 52 different cards.");
  }

  const stateReference = ref(database, statePath(code));
  const before = normalizeState((await get(stateReference)).val());
  requireOwner(before);
  if (before.guideOpen === true) throw new Error("Close the how-to guide before starting a round.");
  if (before.phase !== "lobby" && before.phase !== "finished") {
    throw new Error("Finish the current round before starting another.");
  }

  const nextRound = before.round + 1;
  const privateDeck = { ownerUid: auth.currentUser.uid, round: nextRound, cards };
  await set(ref(database, deckPath(code)), privateDeck);

  const result = await runTransaction(stateReference, current => {
    if (!current || current.ownerUid !== auth.currentUser.uid ||
        current.round !== before.round || current.guideOpen === true ||
        (current.phase !== "lobby" && current.phase !== "finished")) return undefined;
    return {
      ownerUid: current.ownerUid,
      round: nextRound,
      patternId,
      phase: "calling",
      guideOpen: false,
      drawnCount: 0,
      lastDrawAt: 0,
      createdAt: current.createdAt
    };
  }, { applyLocally: false });

  if (!result.committed) throw new Error("The round changed in another tab. Refresh and try again.");
  cachedDeck = privateDeck;
}

export async function drawCard(code) {
  if (!connected) throw new Error("The table is offline. Wait for it to reconnect.");
  const stateReference = ref(database, statePath(code));
  const before = normalizeState((await get(stateReference)).val());
  requireOwner(before);
  if (before.guideOpen === true) throw new Error("Close the how-to guide before drawing.");
  if (before.phase !== "calling") throw new Error("This round is not ready for another draw.");

  if (!cachedDeck || cachedDeck.round !== before.round) {
    cachedDeck = (await get(ref(database, deckPath(code)))).val();
  }
  if (!cachedDeck || cachedDeck.round !== before.round || cachedDeck.cards?.length !== 52) {
    throw new Error("This round's deck could not be restored. Pause the round and check the connection.");
  }

  let abortReason = "The room changed while drawing. Check the current card and try again.";
  let missingLocalState = false;
  const update = current => {
    if (!current) {
      missingLocalState = true;
      abortReason = "The room is still loading. Try again in a moment.";
      return undefined;
    }
    if (current.ownerUid !== auth.currentUser.uid || current.phase !== "calling" || current.guideOpen === true ||
        current.round !== cachedDeck.round || current.drawnCount >= 52) return undefined;

    const currentDrawn = normalizeDrawn(current.drawn);
    if (currentDrawn.length !== current.drawnCount) {
      abortReason = "The called-card list is out of sync. Reload the page before drawing.";
      return undefined;
    }
    if (Date.now() + serverOffset < current.lastDrawAt + 3000) {
      abortReason = "Please wait three seconds between cards.";
      return undefined;
    }

    const nextDrawn = [...currentDrawn, cachedDeck.cards[current.drawnCount]];
    return {
      ...current,
      drawn: nextDrawn,
      drawnCount: nextDrawn.length,
      lastDrawAt: serverTimestamp(),
      phase: nextDrawn.length === 52 ? "finished" : "calling"
    };
  };
  let result = await runTransaction(stateReference, update, { applyLocally: false });
  if (!result.committed && missingLocalState) {
    await get(stateReference);
    missingLocalState = false;
    result = await runTransaction(stateReference, update, { applyLocally: false });
  }
  if (!result.committed) {
    notify("OnRoomChanged", normalizeState((await get(stateReference)).val()));
    throw new Error(abortReason);
  }
  return true;
}

export async function changePhase(code, targetPhase) {
  if (!connected) throw new Error("The table is offline. Wait for it to reconnect.");
  const stateReference = ref(database, statePath(code));
  const before = normalizeState((await get(stateReference)).val());
  requireOwner(before);
  // Clear a celebration before resuming or ending; it must not reappear on a later pause.
  if (targetPhase === "calling" || targetPhase === "finished")
    await set(ref(database, `rooms/${code}/verification`), null);
  let missingLocalState = false;
  const update = current => {
    if (!current) {
      missingLocalState = true;
      return undefined;
    }
    if (current.ownerUid !== auth.currentUser.uid || current.guideOpen === true) return undefined;
    const allowed =
      (current.phase === "calling" && targetPhase === "paused") ||
      (current.phase === "paused" && (targetPhase === "calling" || targetPhase === "finished"));
    return allowed ? { ...current, phase: targetPhase } : undefined;
  };
  let result = await runTransaction(stateReference, update, { applyLocally: false });
  if (!result.committed && missingLocalState) {
    await get(stateReference);
    missingLocalState = false;
    result = await runTransaction(stateReference, update, { applyLocally: false });
  }
  if (!result.committed) {
    notify("OnRoomChanged", normalizeState((await get(stateReference)).val()));
    throw new Error("The round changed in another tab. Check its status and try again.");
  }
  return true;
}

export async function changeTheme(code, themeId) {
  if (!connected) throw new Error("The table is offline. Wait for it to reconnect.");
  if (!themeIds.has(themeId)) throw new Error("That deck theme is unavailable.");
  const state = normalizeState((await get(ref(database, statePath(code)))).val());
  requireOwner(state);
  await set(ref(database, themePath(code)), themeId);
}

export async function changeGuide(code, open) {
  if (!connected) throw new Error("Reconnect before changing the guide on both screens.");
  if (typeof open !== "boolean") throw new Error("The guide setting is invalid.");
  const stateReference = ref(database, statePath(code));
  const before = normalizeState((await get(stateReference)).val());
  requireOwner(before);
  if ((before.guideOpen === true) !== open) {
    // Only this child path can change the guide, so it cannot replace any round data.
    try { await set(ref(database, `${statePath(code)}/guideOpen`), open); }
    catch (error) {
      const latest = (await get(stateReference)).val();
      if (!latest || (latest.guideOpen === true) !== open) throw error;
    }
  }
  const state = normalizeState((await get(stateReference)).val());
  requireOwner(state);
  notify("OnRoomChanged", state);
  return (state.guideOpen === true) === open;
}

export async function copyText(value) {
  await navigator.clipboard.writeText(value);
}

export async function enterFullscreen() {
  await document.documentElement.requestFullscreen();
}

export function dispose() {
  stopRoomWatch?.();
  stopThemeWatch?.();
  stopConnectionWatch?.();
  stopOffsetWatch?.();
  stopRoomWatch = stopThemeWatch = stopConnectionWatch = stopOffsetWatch = undefined;
  dotNet = undefined;
}
