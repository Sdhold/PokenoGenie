# Board library and quick verification plan

Status: the first release is implemented in the application source. It includes a shared Firebase library, editor access, resumable entry/correction, rectangular photo alignment, generated drafts, import/export, themed printing, paused/finished board checks, and themed TV winner graphics. Deployment and browser checks are recorded separately in DEPLOYMENT.md and the task. This document also retains future design ideas.

Future work: automatic rank/suit recognition, perspective correction using four movable corners, QR labels, print-set history, and import replacement/merging. The first release keeps both imported and existing boards, skips identical layouts, and requires review before publication.

Date: October 19, 2026.

Storage requirement: reviewed board layouts are saved centrally and are available across all rooms, games, and devices using this Pokeno Genie deployment. This supersedes the initial proposal to keep the library only in a phone's browser.

## Objective

Enter each physical Pokeno board once, review it, and publish its layout to a shared Firebase library for quick win checks in any room. The tool should be comfortable on a phone, faster on a tablet or computer, and usable without a paid recognition service. Generated custom boards use the same shared library and revision format.

The first release should provide a dependable photo-guided editor. Local image recognition can later fill in the same editor after it has been tested with the user's actual boards. A good manual path remains available for every photograph and board style.

## Assumptions to confirm with sample boards

- A board has 25 cells, arranged in five rows and five columns.
- Every cell contains one card from the standard 52-card deck; the center is an ordinary card.
- The 25 card identities on an individual board are distinct.
- A printed number, title, or chosen label identifies the top of the board.
- Players continue using physical boards and counters.
- Board layouts belong to a reusable collection, not to a particular player. Player assignments change between rounds.

A clear uncovered board photograph and an example with counters should be reviewed before finalizing crop and recognition behavior. Do not infer the layouts from the themed calling-deck artwork: the physical printed board is the source of truth.

## Entry point and library

Add **Board library** to the caller interface, available before creating a table and between rounds. Every room can select the same published collections. During a live round, library edits create future revisions and cannot change the layouts being verified for that round.

The library groups boards into named sets, for example **Our Pokeno set**. Each board has:

- A short label matching its physical number, such as **Board 07**.
- An optional nickname and reference thumbnail.
- A 5×5 preview with ordinary rank and suit labels.
- A clear **Draft** or **Ready** status in the editor; ordinary callers see published Ready boards.
- Edit and archive actions for the creating browser, plus **Copy set to edit** for other browsers; archive can be undone.

Editor actions: **Add existing board**, **Generate custom boards**, **Import set**, and **Export backup**. Search by board label or nickname becomes useful as the collection grows.

## Shared storage, access, and lifetime

Firebase Realtime Database is the authoritative home for published board collections and immutable layout revisions. Store them independently of `rooms` and shuffled `decks`. Ending a table, creating a room, clearing a phone's browser data, or using another phone must not remove the shared library.

All callers can read and select published boards using the app's existing anonymous authentication. Reading the shared library must not require possession of the original room code or the original editor's phone. Board labels are unique within their set, so the selection identifies both the set and board number.

Implemented edit policy: anyone can create a set without an account or password. A remembered anonymous Firebase identity owns that set and can create, correct, publish, and archive its layouts in the same browser. Other devices can use the published set or copy it with new IDs to edit their own version. Database rules enforce ownership; neither callers nor visitors can take over another creator's set or board IDs. No additional authentication provider or administrator approval is required.

Private drafts are separate from published data. Save draft card values, labels, and progress in Firebase under the creating browser's identity. A reference photograph stays local. Reopening the same browser restores its drafts; another device can copy published boards but cannot access private drafts. Clearing browser data loses editing access and draft recovery, while the published library remains available. Keep exported board-set backups.

Publishing creates a new reviewed revision and atomically updates the collection's current-board reference. Existing revisions remain available to active rounds and saved print sets. Concurrent edits must compare the revision they started from and offer a conflict review instead of silently overwriting another editor's correction. Archiving hides a board from new selections while retaining its revisions and active-round references.

A phone may cache published boards and draft edits in IndexedDB for responsiveness and interruption recovery. Show distinct **Saved to library**, **Saved on this device — waiting to sync**, and save-error states. Only a server-confirmed publish makes a board Ready for other rooms. Reconnect by fetching the latest server revision before resolving queued edits. Starting a shared round requires confirmation that its selected board revisions are available on the server.

Export/import remains an optional backup and migration tool. A second phone normally opens the same server library directly; it does not need a transferred file. A separately deployed copy of Pokeno Genie needs the same Firebase project/access setup or an explicit library import.

Keep Firebase on Spark and store compact card IDs and metadata. Existing theme artwork remains in the static app, and photographs stay local. The plan requires neither paid cloud AI nor Cloud Functions or Cloud Storage. Spark's current Realtime Database allowance is 1 GB stored, 10 GB downloaded per month, and 100 simultaneous connections across the project. Rooms, TV displays, and library editors share those limits; monitor usage and fetch only collection summaries and selected board revisions.

## Add a board

### 1. Name and photograph

Suggest the next unused board number. Allow the caller to change it and choose the collection.

Offer **Take photo**, **Choose photo**, and **Enter without photo**. Explain the capture requirements in one short instruction: *Clear the counters, lay the board flat, and include all 25 spaces.*

Show a square alignment guide. Allow 90-degree rotation, cropping, and correction of the four board corners. Confirm the board's top before proceeding; do not silently rotate the saved layout. If an image cannot be opened, offer a new photo or manual entry.

Keep the reference image local to the caller's device. The entry tool does not need to send photographs to Firebase or an AI provider.

### 2. Enter cards with two taps

On a phone, show the current row's five cells, with large tabs for rows 1–5 and completion ticks. This keeps the photo crop and picker in thumb reach. Highlight the current cell and show its position, such as **Row 2 · Column 3**. The full 5×5 map appears during final review; a tablet/computer can also keep it visible during entry.

Enlarge the current cell's rank/suit corner from the reference photo. The original photograph remains available for cases where that corner is unclear. Capture/name setup happens before this entry screen; the board label can also be changed during review.

The interaction is:

1. Tap a rank: A, 2–10, J, Q, or K.
2. Tap a suit: spades, hearts, diamonds, or clubs.
3. Commit the card and advance to the next cell, left to right, top to bottom.

A board requires 50 card-selection taps, plus naming and review. This is an interaction count, not a promised completion time. Do not carry a suit or rank into a new cell without an explicit choice.

The controls should be large enough for thumb use, with suit names and symbols together. Use one compact picker area: rank buttons first, then suit buttons. Provide **Change rank**, **Undo**, and the ability to tap any cell to correct it. Undo restores the previous value and active position.

If a chosen card already exists elsewhere, keep the current cell unchanged, highlight the other location, and explain it: **Q♥ is already in Row 1, Column 4. Check the photo.** Do not silently move or replace the other card.

Save drafts after every committed edit, first to the local recovery cache and then to the browser's private Firebase draft. **23 of 25 entered** is progress; a save message names whether the edit is confirmed in Firebase or is still waiting on this device. Leaving and reopening in the same browser restores the board, reference photo, current position, and draft values. Other devices use published layouts or make their own editable copies.

### 3. Review and save

Show all 25 cards alongside the full reference photo. A tap enlarges a cell and its source crop. **Rotate board** changes all cell positions consistently; a rotation invalidates any previous review confirmation.

Require:

- Exactly 25 valid cards, with no missing cells.
- No duplicate identities, under the standard-board assumption.
- A unique board label within its collection.
- A final user confirmation that the layout matches the physical board.

Allow incomplete work to remain a private draft. Only a reviewed, server-confirmed **Ready** revision can be used for shared win checks. A later card edit creates a new draft revision while the previously published revision remains available.

Offer **Save board** and **Save & add next**. The latter keeps the collection, suggests the next label, and returns directly to capture or entry. This is the main workflow for entering a complete set in one sitting.

## Additional entry methods

### Bulk text for a computer or tablet

Accept five rows of rank/suit codes, for example:

```text
AS 4H 7C JD 10S
2D QH 8S 9C KH
3H 6D JC 10H 4S
AH 8D 2C 9S 7D
QC KC 5H 10D 3C
```

Accept lowercase and suit symbols as equivalents. Show a board preview and errors at their exact row/column before committing. A pasted layout receives the same validation and review as a photographed board.

### Import and export a collection

Use a versioned board-pack file containing labels and 25-card arrays in row-major order. Export all boards or one collection. The default backup excludes full photographs, keeping it small and easy to transfer to another phone.

Import into a temporary review list first. Validate the schema, supported board dimensions, card identities, and duplicates. Summarize label collisions; **Keep both** assigns a new label, while **Replace** is explicit and preserves a recoverable prior revision. An exact layout match should be identified, rather than copied silently.

The same cloud collection can be reused after **End table & start new** and selected directly from another phone. Export/import is for backups, migration, and moving data between separate deployments. **Copy set to edit** creates an owned copy on another phone without changing the original or its existing round references.

### Generate custom themed boards

Generate 25-card layouts from the standard deck, with no repeated card within a board and no identical layout within the generated set. Assign stable board IDs and labels, then use the same review and server publication flow as entered boards. Store layout data separately from the chosen print theme. A saved print set records the exact board revisions and theme so reprinting preserves the original positions and identifiers. Reuse existing themed artwork in printable output; generating another layout does not require generating new artwork.

## Optional local recognition

After a photo is aligned, divide it into 25 cells. Use local text recognition for ranks and an evaluated image-classification or template-matching approach for suits. Tesseract alone should not be assumed to recognize suit symbols reliably.

Populate candidate cells and flag uncertain or missing results with a **?** marker and readable review status. Never present a guessed card as a confirmed match or interpret a recognition score as a calibrated probability.

Provide **Accept card**, **Change card**, and **Next to review**. A correction uses the same rank/suit picker. All boards still receive the final full-board comparison, including cells the recognition system did not flag.

Load recognition code only when requested and run expensive processing away from the UI thread. Test startup, processing time, and memory on representative iPhones and Android phones. Support image selection if live-camera access is unavailable or denied. No paid cloud AI is required by this plan.

## Using saved boards on game night

Keep the physical board label separate from the current player. Before a round, select the Ready boards being used and optionally assign player names or seats. A player can use more than one board.

At the start of the round, capture an immutable layout revision for each selected board. Edits to the library affect later rounds. The round assignment and snapshots must be recoverable after a reload of the caller's phone.

An optional printable label or QR code can identify a board later. The code contains its deployment, stable board identifier, and printed revision. An online phone resolves that published revision from the shared Firebase library. A phone without a cached revision and network access must wait to fetch it before verification. A QR label identifies the layout; it does not grant editing permission.

## Quick verification flow

1. Caller chooses **Pause / verify Pokeno**.
2. Select the player/seat or physical board label.
3. Compare the saved round layout with the authoritative called-card list and the active pattern's allowed masks.
4. Highlight a complete eligible shape, or the closest allowed shape and its missing cards.
5. Show the same board and result on the TV while the caller checks it against the physical board.
6. Caller chooses **Resume drawing** or **End round** using the existing controls.

Use every `WinningMask` in `PatternCatalog`: Standard Pokeno has 12 allowed masks, while fixed letter/shape patterns use their defined orientation. Do not verify only the first preview mask, and do not add rotations that the selected pattern does not allow.

For a complete shape, notify the caller with **POKENO! Board 07 wins!** and display a celebration matching the active deck theme on the TV. The app checks card eligibility against the saved layout; the caller still confirms the correct physical board and markings. A result does not award a score or end the round. An incomplete shape identifies its missing cards. Returning the TV to called cards, resuming, or ending clears the result.

Publish only the claimed board layout and result to the TV, with the room round, pattern ID, board revision, and draw count. Ignore a result if those no longer match the current paused state. Owner-only writes and phase/round checks prevent viewers or stale callbacks from changing verification results.

## Storage and application design

- Continue using the existing Blazor WebAssembly app and GitHub Pages hosting.
- Put board models, validation, normalization, duplicate detection, rotations, layout hashes, and pattern matching in `PokenoGenie.Core`.
- Use a small JavaScript bridge for camera/image access, browser caching, and the existing Firebase SDK integration.
- Store authoritative published collections/revisions and private drafts in Firebase Realtime Database, independently of rooms and shuffled decks. Keep creator-owned collection summaries, permanent board-ID ownership, immutable layout revisions, and private drafts on separately secured paths; a broad read rule must not expose drafts or allow ownership changes.
- Cache selected collections/revisions, local reference images, and pending draft edits in IndexedDB, with explicit storage-error handling. Local browser data is a recovery cache, and the server remains the authoritative library.
- Request persistent browser storage where supported for local photos and pending edits, while retaining cloud persistence and optional export backups. Handle server save failures, offline queues, and edit conflicts explicitly.
- Keep the reusable library separate from room and round data. Store owner-controlled round board references/snapshots and verification displays in the active room. Fetch only selected revisions, and keep photographs out of Firebase and shared room state.
- Extend both the Blazor display and the existing lightweight ES5 TV display. Recognition runs on the phone; the TV receives small card arrays and a result.

Suggested logical records:

| Record | Main fields |
| --- | --- |
| Board collection | Stable ID, name, schema version, published board index, archive state |
| Published board revision | Stable board ID, immutable revision, collection ID, label, optional nickname, 25 card IDs, orientation, layout hash, reviewer identity and review timestamp |
| Local photo | Photo ID, cropped image/thumbnail, board revision, local-only storage |
| Private cloud draft | Editor ID, board ID, base revision, current cell, pending rank, current edits, update timestamp |
| Local pending edit | Draft ID, base revision, unconfirmed edits and synchronization state |
| Board ownership | Permanent board ID, collection ID, creating browser's anonymous user ID |
| Saved print set | Collection ID, exact board IDs/revisions, print theme and format |
| Round board | Room, round, board ID/revision, immutable 25-cell snapshot, optional player/seat |
| Verification result | Room, round, pattern ID, draw count, board ID/revision, matched cells, missing cards, eligibility status |

Do not store deck-theme image paths in board layouts. Ranks and suits remain correct when the calling deck theme changes.

## Delivery sequence

1. **Entry and shared library:** remembered anonymous ownership and database rules, published collections available to every room, copy-to-edit on another browser, two-tap picker, photo reference/alignment, correction/undo, local recovery plus private cloud drafts, review/publication and revision conflicts, save-next workflow, collection import/export, and bulk-text entry. Include generated themed layouts and saved printable sets when that option is approved. Test with actual board photos and users.
2. **Quick verification:** round assignments and immutable snapshots, all-pattern checks in C#, caller result screen, synchronized TV display, reload recovery, and stale-result rejection.
3. **Recognition trial:** run on-device rank/suit recognition on the actual board set, measure correction effort, and ship it only if it reduces entry effort without hiding errors.
4. **Optional conveniences:** printable identifiers/QR labels and recognition of already-entered board layouts. These follow a reliable library and backup workflow.

## Acceptance checks

- Complete a board with 50 selection taps; auto-advance visits exactly 25 cells in row-major order.
- A changed rank/suit, undo, cell jump, and rotation all update the correct cells.
- Missing/invalid cards and duplicates prevent a Ready save and identify the exact cells.
- A duplicate attempt never overwrites a different cell.
- Closing/reloading midway in the same browser restores the draft and current position. Another device can copy published layouts for editing but cannot read private drafts. A failed local or server save does not report cloud success.
- Capture denial or an unreadable image still allows manual entry.
- A published set is directly selectable in separate rooms and simultaneous games on different phones. Ending any room, changing caller, or clearing one browser's data leaves the server library intact.
- Anonymous visitors can create their own sets and copy published layouts. Only the creating browser can publish or archive that set's boards; other visitors cannot read its private drafts, overwrite it, take ownership, or inject revisions under its board IDs. Verify these boundaries with the Firebase rules emulator.
- Concurrent edits preserve both editors' work for explicit conflict resolution; a later revision does not replace a round's frozen layout or change a saved print set.
- Offline edits are labelled pending and cannot become a shared Ready board until the server accepts them. Reconnection resolves the current revision before publishing.
- Exporting and importing into another deployment reconstructs labels, revisions, and layouts without requiring photographs.
- Import collisions and identical layouts are reviewed before replacement; a malformed import cannot damage existing boards.
- All 20 current patterns are checked against their complete mask sets, including every row, column, and diagonal allowed by Standard Pokeno.
- A library correction cannot change a round's already selected layout revision.
- A verification result never advances the deck, resumes drawing, ends a round, or remains visible for a later round or draw count.
- Both TV implementations show the same verified cells, missing cards, and return state.
- Before enabling recognition by default, measure total entry-and-correction effort on clear, rotated, shadowed, and reflective examples. Do not promise an accuracy percentage or scan time before those trials.

## Technical references

- [Browser camera access and permission requirements](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)
- [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB)
- [Browser storage persistence and eviction](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria)
- [Tesseract.js browser recognition](https://github.com/naptha/tesseract.js)
- [Firebase Realtime Database structure and separate access paths](https://firebase.google.com/docs/database/web/structure-data)
- [Firebase anonymous authentication and account linking](https://firebase.google.com/docs/auth/web/anonymous-auth)
- [Firebase Spark plan and current quotas](https://firebase.google.com/pricing)

These document available browser capabilities. Recognition quality and usability for the physical Pokeno boards still require direct testing.
