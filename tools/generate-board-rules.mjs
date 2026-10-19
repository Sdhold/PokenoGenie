import { readFileSync, writeFileSync } from "node:fs";

const document = JSON.parse(readFileSync("database.rules.json", "utf8"));
const rules = document.rules;
const validId = value => `${value}.isString() && ${value}.val().matches(/^[a-zA-Z0-9_-]{1,64}$/)`;
const ownsSet = setId => `auth != null && root.child('boardSets').child(${setId}).child('ownerUid').val() == auth.uid`;
const card = "newData.isString() && newData.val().matches(/^(A|[2-9]|10|J|Q|K)[SHDC]$/)";
const index = "$index.matches(/^([0-9]|1[0-9]|2[0-4])$/)";
const fields = values => Object.fromEntries(Object.entries(values).map(([name, value]) => [name, { ".validate": value }]));
const cards = { ".validate": `newData.hasChildren([${Array.from({ length: 25 }, (_, index) => `'${index}'`).join(",")}])` };
delete rules.boardEditors;
rules.boardSets = {
  ".read": "auth != null",
  "$setId": {
    ".write": "auth != null && $setId.matches(/^[a-zA-Z0-9_-]{1,64}$/) && newData.exists() && ((!data.exists() && newData.child('ownerUid').val() == auth.uid) || (data.child('ownerUid').val() == auth.uid && newData.child('ownerUid').val() == auth.uid))",
    ".validate": "newData.hasChildren(['name','ownerUid','version']) && ((!data.exists() && newData.child('version').val() == 1) || (data.exists() && newData.child('version').val() == data.child('version').val() + 1))",
    ...fields({ name: "newData.isString() && newData.val().length > 0 && newData.val().length <= 60", ownerUid: "newData.isString() && newData.val() == auth.uid", version: "newData.isNumber()" }),
    boards: { "$boardId": {
      ".validate": "newData.hasChildren(['label','revisionId','layoutHash','archived']) && root.child('boardRevisions').child($boardId).child(newData.child('revisionId').val()).child('setId').val() == $setId && newData.child('label').val() == root.child('boardRevisions').child($boardId).child(newData.child('revisionId').val()).child('label').val() && newData.child('layoutHash').val() == root.child('boardRevisions').child($boardId).child(newData.child('revisionId').val()).child('layoutHash').val()",
      ...fields({ label: "newData.isString()", revisionId: validId("newData"), layoutHash: "newData.isString()", archived: "newData.isBoolean()" }),
      "$other": { ".validate": false }
    } },
    "$other": { ".validate": false }
  }
};
// Board IDs are permanent namespaces. A different set cannot inject a revision
// under an existing board ID, even if its creator owns another shared set.
rules.boardOwners = {
  ".read": "auth != null",
  "$boardId": {
    ".write": `!data.exists() && newData.exists() && $boardId.matches(/^[a-zA-Z0-9_-]{1,64}$/) && ${ownsSet("newData.child('setId').val()")}`,
    ".validate": "newData.hasChildren(['setId','ownerUid'])",
    ...fields({ setId: validId("newData"), ownerUid: "newData.isString() && newData.val() == auth.uid" }),
    "$other": { ".validate": false }
  }
};
rules.boardRevisions = {
  ".read": "auth != null",
  "$boardId": { "$revisionId": {
    ".write": `${ownsSet("newData.child('setId').val()")} && root.child('boardOwners').child($boardId).child('ownerUid').val() == auth.uid && root.child('boardOwners').child($boardId).child('setId').val() == newData.child('setId').val() && !data.exists() && newData.exists() && $boardId.matches(/^[a-zA-Z0-9_-]{1,64}$/) && $revisionId.matches(/^[a-zA-Z0-9_-]{1,64}$/)`,
    ".validate": "newData.hasChildren(['setId','boardId','revisionId','label','cards','positions','layoutHash','createdBy','createdAt']) && newData.child('boardId').val() == $boardId && newData.child('revisionId').val() == $revisionId && root.child('boardSets').child(newData.child('setId').val()).exists()",
    ...fields({ setId: validId("newData"), boardId: validId("newData"), revisionId: validId("newData"), label: "newData.isString() && newData.val().length > 0 && newData.val().length <= 60", layoutHash: "newData.isString() && newData.val().matches(/^[a-f0-9]{64}$/)", createdBy: "newData.val() == auth.uid", createdAt: "newData.isNumber() && newData.val() <= now && newData.val() >= now - 10000" }),
    cards: { ...cards, "$index": { ".validate": `${index} && ${card} && newData.parent().parent().child('positions').child(newData.val()).val() == $index` } },
    positions: { ".validate": "newData.hasChildren()", "$card": { ".validate": "$card.matches(/^(A|[2-9]|10|J|Q|K)[SHDC]$/) && newData.isString() && newData.val().matches(/^([0-9]|1[0-9]|2[0-4])$/) && newData.parent().parent().child('cards').child(newData.val()).val() == $card" } },
    "$other": { ".validate": false }
  } }
};
rules.boardDrafts = { "$uid": {
  ".read": "auth != null && auth.uid == $uid",
  "$draftId": {
    ".write": `auth != null && auth.uid == $uid && (!newData.exists() || (${ownsSet("newData.child('setId').val()")}))`,
    ".validate": "newData.hasChildren(['id','setId','boardId','label','baseRevisionId','cards','currentCell','pendingRank','updatedAt']) && newData.child('id').val() == $draftId && root.child('boardSets').child(newData.child('setId').val()).exists()",
    ...fields({ id: validId("newData"), setId: validId("newData"), boardId: validId("newData"), label: "newData.isString() && newData.val().length <= 60", baseRevisionId: "newData.isString() && (newData.val() == '' || newData.val().matches(/^[a-zA-Z0-9_-]{1,64}$/))", currentCell: "newData.isNumber() && newData.val() >= 0 && newData.val() <= 24 && newData.val() % 1 == 0", pendingRank: "newData.isString() && newData.val().matches(/^(A|[2-9]|10|J|Q|K)?$/)", updatedAt: "newData.isNumber() && newData.val() <= now + 1000" }),
    cards: { ...cards, "$index": { ".validate": `${index} && newData.isString() && (newData.val() == '' || newData.val().matches(/^(A|[2-9]|10|J|Q|K)[SHDC]$/))` } },
    "$other": { ".validate": false }
  }
} };

const room = "root.child('rooms').child($code).child('state')";
// A verification must never see future cards inserted into a paused history.
const stateRules = rules.rooms.$code.state;
let stateValidation = stateRules[".validate"];
const historyMarker = ") && ((newData.child('drawnCount').val() == 0";
if (stateValidation.startsWith("(") && stateValidation.lastIndexOf(historyMarker) > 0)
  stateValidation = stateValidation.slice(1, stateValidation.lastIndexOf(historyMarker));
stateRules[".validate"] = `(${stateValidation}) && ((newData.child('drawnCount').val() == 0 && !newData.child('drawn').exists()) || (newData.child('drawnCount').val() > 0 && newData.child('drawn').hasChild('' + (newData.child('drawnCount').val() - 1))))`;
const prefixRule = Array.from({ length: 52 }, (_, index) => `(newData.parent().child('drawnCount').val() == ${index + 1} && newData.hasChildren([${Array.from({ length: index + 1 }, (_, cell) => `'${cell}'`).join(",")}]))`).join(" || ");
stateRules.drawn = { ".validate": prefixRule, ...Object.fromEntries(Array.from({ length: 52 }, (_, index) => [String(index), {
  ".validate": `newData.isString() && newData.parent().parent().child('drawnCount').val() > ${index} && newData.val() == root.child('decks').child($code).child('cards').child('${index}').val()`
}])), "$other": { ".validate": false } };
const owner = `auth != null && ${room}.child('ownerUid').val() == auth.uid`;
const roundBoards = "root.child('rooms').child($code).child('boards')";
const revision = "root.child('boardRevisions').child(newData.child('boardId').val()).child(newData.child('revisionId').val())";
rules.rooms.$code.boards = {
  ".read": `auth != null && ${room}.exists()`,
  ".write": `${owner} && ${room}.child('guideOpen').val() != true && (((!newData.exists() || newData.child('round').val() == ${room}.child('round').val() + 1) && (${room}.child('phase').val() == 'lobby' || ${room}.child('phase').val() == 'finished')) || (newData.child('round').val() == ${room}.child('round').val() && (!data.exists() || data.child('round').val() != ${room}.child('round').val()) && (${room}.child('phase').val() == 'paused' || ${room}.child('phase').val() == 'finished')))`,
  ".validate": "newData.hasChildren(['round','setId','setName','revisions','labels']) && newData.child('setName').val() == root.child('boardSets').child(newData.child('setId').val()).child('name').val() && newData.child('revisions').hasChildren()",
  ...fields({ round: "newData.isNumber() && newData.val() > 0 && newData.val() % 1 == 0", setId: validId("newData"), setName: "newData.isString()" }),
  revisions: { "$boardId": { ".validate": "newData.isString() && newData.val() == root.child('boardSets').child(newData.parent().parent().child('setId').val()).child('boards').child($boardId).child('revisionId').val() && root.child('boardSets').child(newData.parent().parent().child('setId').val()).child('boards').child($boardId).child('archived').val() != true && newData.parent().parent().child('labels').child($boardId).val() == root.child('boardRevisions').child($boardId).child(newData.val()).child('label').val()" } },
  labels: { "$boardId": { ".validate": "newData.isString() && newData.parent().parent().child('revisions').child($boardId).exists()" } },
  "$other": { ".validate": false }
};
rules.rooms.$code.verification = {
  ".read": `auth != null && ${room}.exists()`,
  ".write": `${owner} && (!newData.exists() || (${room}.child('guideOpen').val() != true && (${room}.child('phase').val() == 'paused' || ${room}.child('phase').val() == 'finished')))`,
  ".validate": `newData.hasChildren(['id','round','patternId','drawnCount','setId','setName','boardId','revisionId','label','cards','checkedAt']) && newData.child('round').val() == ${room}.child('round').val() && newData.child('drawnCount').val() == ${room}.child('drawnCount').val() && newData.child('patternId').val() == ${room}.child('patternId').val() && ${roundBoards}.child('round').val() == ${room}.child('round').val() && newData.child('setId').val() == ${roundBoards}.child('setId').val() && newData.child('setName').val() == ${roundBoards}.child('setName').val() && newData.child('revisionId').val() == ${roundBoards}.child('revisions').child(newData.child('boardId').val()).val() && newData.child('label').val() == ${revision}.child('label').val()`,
  ...fields({ id: validId("newData"), round: "newData.isNumber()", patternId: "newData.isString()", drawnCount: "newData.isNumber()", setId: validId("newData"), setName: "newData.isString()", boardId: validId("newData"), revisionId: validId("newData"), label: "newData.isString()", checkedAt: "newData.isNumber() && newData.val() <= now && newData.val() >= now - 10000" }),
  cards: { ...cards, "$index": { ".validate": `${index} && newData.isString() && newData.val() == root.child('boardRevisions').child(newData.parent().parent().child('boardId').val()).child(newData.parent().parent().child('revisionId').val()).child('cards').child($index).val()` } },
  "$other": { ".validate": false }
};

writeFileSync("database.rules.json", JSON.stringify(document, null, 2) + "\n");
