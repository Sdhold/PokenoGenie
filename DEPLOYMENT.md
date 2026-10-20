# Deploy Pokeno Genie for free

Pokeno Genie uses a public GitHub Pages site and a Firebase **Spark** (no-cost) project. The only account setup is GitHub and Firebase. The app has no server to rent and does not use Firebase Functions or a paid Firebase plan. GitHub Pages needs a public repository on GitHub Free. Firebase Spark needs no payment method and limits usage instead of billing overages.

## Firebase setup for this project

The Firebase side was configured on October 18, 2026. The **PokenoGenie** Web app is registered in project `pokenogenie` on the Spark plan. Anonymous sign-in is enabled, Realtime Database is at `https://pokenogenie-default-rtdb.firebaseio.com` in `us-central1`, and the checked-in `database.rules.json` rules are published. The local web configuration is in `src/PokenoGenie/wwwroot/firebase-config.json`; it is ignored by Git. The rules include an owner-controlled, viewer-readable deck theme stored separately from round state.

For this Firebase project, skip section 2. Section 4 covers the remaining GitHub Pages setup. Section 2 remains as a guide if you need to set up a new Firebase project later.

## 1. Install development tools

- Install the [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0). For an IDE, [Visual Studio Community](https://visualstudio.microsoft.com/vs/community/) is free for individual development; install its **ASP.NET and web development** workload and open `PokenoGenie.slnx`.
- To run the Firebase rule tests or deploy rules, install [Node.js 24](https://nodejs.org/) and [pnpm](https://pnpm.io/installation). Rule tests also need [Java 21](https://learn.microsoft.com/java/openjdk/download).
- Clone this repository. Run `dotnet test PokenoGenie.slnx` to check the C# project.

## 2. Create the free Firebase project

1. In the [Firebase console](https://console.firebase.google.com/), create a project on the **Spark** plan. Leave billing disabled. Analytics is optional and not needed.
2. Register a **Web app**. In its Firebase configuration, copy `apiKey`, `authDomain`, `databaseURL`, `projectId`, and `appId`. If `databaseURL` is missing, create the Realtime Database first and then copy the updated configuration.
3. Under **Authentication → Sign-in method**, enable **Anonymous**. The authorized-domains list is for sign-in methods that use redirects; this app uses anonymous sign-in.
4. Under **Realtime Database**, create one database in **locked mode**. Keep its exact URL; it may end in `firebaseio.com` or `firebasedatabase.app`.
5. From the repository root, install the local Firebase CLI and deploy the checked-in rules:

   ```powershell
   pnpm install
   pnpm exec firebase login
   pnpm exec firebase deploy --only database --project YOUR_FIREBASE_PROJECT_ID
   ```

   The rules allow any anonymous viewer with a valid room code to read called cards. Only the anonymous identity that created the room can write it or read the private shuffled deck. Never switch the database to public test rules.

When deploying a new bundled deck theme, publish the updated `database.rules.json` before deploying the site. In Firebase console, open **Realtime Database → Rules**, replace the editor contents with that file, and select **Publish**. The theme rule only allows the caller to change the table's artwork choice; viewers can read it so the TV matches.

## 3. Configure and run locally

The local `src/PokenoGenie/wwwroot/firebase-config.json` is already configured for project `pokenogenie`. For a different Firebase project, copy `src/PokenoGenie/wwwroot/firebase-config.example.json` to `firebase-config.json` and replace the example values. `firebase-config.json` is ignored by Git.

```powershell
dotnet run --project src/PokenoGenie/PokenoGenie.csproj
```

Open the local URL printed by `dotnet run`. For a two-screen check, open one browser tab as the caller and a second tab at `tv.html`. The second tab signs in anonymously and reads only the public called-card state. Use a different browser or an incognito window if you want to verify read-only access with a separate identity.

The Firebase configuration identifies your project, but it is **not a private service credential**. Access is controlled by `database.rules.json`. Do not add service-account keys to this app or to GitHub Pages.

To test without a live Firebase project, start the local emulators with `pnpm exec firebase emulators:start --only auth,database --project demo-pokeno-genie`. For that test, use a local `firebase-config.json` with `projectId` set to `demo-pokeno-genie`, any nonempty placeholder values for the other required fields, `databaseURL` set to `https://demo-pokeno-genie-default-rtdb.firebaseio.com`, and `"useEmulators": true`. The app connects to emulator ports 9099 and 9000 only when served from `localhost` or `127.0.0.1`. Restore your real Firebase configuration when finished.

## 4. Publish with GitHub Pages

1. Create a **public** GitHub repository and push this solution to its `main` branch.
2. In the repository, open **Settings → Secrets and variables → Actions → New repository secret**. Name it `FIREBASE_CONFIG_JSON` and paste the JSON from your local `src/PokenoGenie/wwwroot/firebase-config.json`. Use the exact key spelling shown in `firebase-config.example.json`.
3. Open **Settings → Pages** and select **GitHub Actions** as the build and deployment source.
4. Run **Actions → Verify and deploy Pokeno Genie → Run workflow**, or push to `main`. The workflow tests the C# logic and Firebase rules, publishes Blazor, sets the correct GitHub Pages base path, and uploads the site.
5. Wait for the workflow's deployment URL, normally `https://<your-github-name>.github.io/<repository-name>/`.

When updating an existing deployment, publish the current `database.rules.json` in Firebase before deploying app changes that use new shared settings, including the how-to guide. The GitHub workflow deploys the website; it does not publish database rules.

The workflow fails clearly if `FIREBASE_CONFIG_JSON` is missing or invalid. The published app contains the Firebase web configuration because browsers need it; the database rules protect game state. The shuffled deck is stored under a separate owner-only database path.

## 5. Check the phone and TV

1. On the phone, open the published URL and select **Create a table**. Note the eight-character code.
2. On the TV or its connected computer, open `https://sdhold.github.io/PokenoGenie/tv.html` and enter the code. The site's main URL redirects LG webOS browsers to this TV page. You can also open the caller's **Copy TV link** URL on the display.
3. Choose **H**, start a round, and draw five cards. Check that the TV's large card, previous four, and count match the phone. Try rapid taps; the next draw should remain locked for three seconds.
4. Pause and confirm the TV replaces its split view with every called card, numbered in draw order; the latest card has a gold outline. Reload the TV while paused and confirm the history returns. Resume and confirm the current card and previous four return without advancing the count. End the round. Reload both screens; the active room and private deck should return on the original caller phone.
5. On the caller phone, choose **End table & start new**, confirm, and check that a different room code appears at table setup. Enter that code on the TV to begin again at the first round.
6. While a round is active, choose **Star Wars** under **Card deck** and confirm both screens show matching cards and the illustrated space background. Switch to other decks, including **Royal Cats** (Binx J, Autumn Q, Chip K, Anya A) and **Illustrated**, which keeps the original green table. Confirm the caller's deck panel also shows the selected scenery. The card names, draw count, and cooldown stay the same. Also switch themes while paused and confirm all called cards remain visible. Reload the screens and confirm the chosen theme remains.

7. Tap **How to use** at the top of the caller screen. Confirm the guide appears on both screens, with no Draw card button. Reload the TV and caller while it is open; the guide should remain. Tap **Return to table** on the phone and confirm the same round, pattern, count, and cards return. Repeat while paused; returning should restore the called-card history and leave the round paused.

The caller identity is stored in that browser's local data. Clearing its site data or using a different phone loses caller control of the old room; create a new table in that case. If the network disconnects, drawing pauses and the TV shows its last known state until it reconnects. The TV page uses simple JavaScript and Firebase's authenticated REST API, polling for new cards about every 1.5 seconds. It does not load Blazor, so it can run on browsers where the Blazor startup remains on the splash screen.

## Shared board library setup

Publish the updated `database.rules.json` before deploying this feature. The shared records use creator-owned `boardSets`, permanent `boardOwners`, immutable `boardRevisions`, and private `boardDrafts`, independently of game rooms.

### Open the library without a login

You can open the library directly at `https://sdhold.github.io/PokenoGenie/?view=boards` to manage boards without opening or pausing a caller room. The caller's **Board library** button also opens it, pausing that caller's active round first.

1. Keep **Anonymous** authentication enabled. No other sign-in provider, password, or administrator approval is required.
2. Open the library and create a named set. A separate anonymous Firebase identity is remembered in that browser, preserving the caller room's identity. You can enter, generate, publish, correct, and archive your own boards immediately.
3. Every room and device can use the published sets. On another device, choose **Copy set to edit** to create an editable version with new board IDs. This preserves the original set and any rounds using it.
4. Use **Export backup** regularly. Clearing browser data or using a different browser loses the original editing identity and access to its private drafts; published boards remain in Firebase. Copy the published set or import an exported backup into a new set to continue editing.

The rules enforce creator ownership and keep drafts private. An open visitor can create their own set but cannot change another creator's boards, archive them, take ownership, or write revisions under their board IDs. Anyone with the URL can view published board labels/layouts, so use labels intended to be shared.

### Delete or restore a set

In the browser that created the set, select it under **Board library → Board set**, choose **Delete set**, and confirm. **Keep set** cancels. Deleted sets and their drafts disappear from normal library lists and cannot be selected for new rounds. Existing rounds retain their locked board versions and can still verify wins.

**Undo delete set** restores the latest deletion while the library stays open. To restore later, enable **Show deleted sets**, select the deleted set, then **Restore set**. The deletion flag is stored in Firebase, so it survives reloads and affects every room. Published versions, private drafts, and local reference photos are retained for restoration; deleting a set does not permanently purge its data. Only its creating browser can delete or restore it, and an internet connection is required.

### Enter, reuse, and verify a board

1. Create a named set. Choose **Add existing board**, give it the physical board's number, and enter cards from top left to bottom right with rank then suit. The picker advances automatically. Row tabs and a full review grid let you correct a middle cell without moving other entries. **Fix a skipped space** previews the shift before applying it; Undo restores it.
2. Optionally attach an uncovered board photo. **Choose photo or image file** opens the device's existing photos/files without forcing the camera. **Take a new photo** requests the rear camera on supported phones; desktop browsers may offer a file picker instead. Rotate the image and move the four crop edges to match the card grid. This first version assumes a flat, aligned photograph; perspective correction and OCR remain future work. The photo stays in that device's IndexedDB. Reopening the same browser restores drafts and local photos; another device can copy published boards but cannot access unfinished private drafts.
3. Check all 25 cards and the top orientation in **Review all 25 cards**, confirm the checkbox, and choose **Save to shared library**. Drafts are private to their editor and cannot be used for wins. An offline local save is labelled waiting to sync and is not a published board.

   To remove an unwanted draft, return to **Board library → Continue a draft**, tap **Delete draft** beside it, then confirm **Delete draft**. **Keep draft** cancels. **Undo delete** restores the most recently deleted draft while the library remains open. Deleting an editing draft preserves the published board. Deletion requires an internet connection so both Firebase and this browser's recovery copy are removed.
4. Optionally choose **Generate custom boards**, review/publish each draft, and select a theme before **Print / Save PDF**. The preview prints exact saved revisions and identifies the board/version. Export a board pack for a portable backup. Import into a selected set creates reviewable drafts and never replaces existing layouts automatically.
5. Choose the set under **Board set for this round** before shuffling. If you did not choose one, **Pause / verify Pokeno** offers **Use this set for this round**. This locks its current published board versions for that round.
6. Select the physical board number and **Check board for a win**. Test an incomplete shape, then a complete one. Both screens should agree on called cells, missing cards, and the selected pattern. A winning board shows a themed graphic; changing the deck theme updates the celebration. Try **Return TV to called cards**, resume, end, new round, and TV reload. A stale check from another round/count/pattern must not appear.
7. In a second room on another device, confirm the same published set appears. Edit a board in the library and verify the first room keeps its frozen revision. Opening a new table or clearing one browser's data must leave the shared library intact.

Board-check records contain a validated reference and a copy of its saved layout, never a trusted `isWinner` flag. C# on the phone and the lightweight ES5 TV checker independently calculate the result using the room's called cards. Database rules bind checks to the caller, frozen revision, phase, round, pattern, and count. Creating a board set does not grant access to other callers' private decks.

When changing the generated library rules or allowed theme IDs, edit `tools/generate-board-rules.mjs`, run `node tools/generate-board-rules.mjs`, and run the emulator tests before publishing the resulting `database.rules.json`. Run `node tools/generate-winner-art.mjs` after generating cards and backgrounds to refresh the sixteen bundled winner graphics.

### Additional deck and completed-round checks

- On a narrow phone, **Card deck** initially shows the original nine decks as a 3×3 grid. Scroll down inside that grid for **Route 66**, **Dinosaurs**, **Pokémon**, **Halloween**, **Christmas**, **FriendsGiving**, and **McPherson Magical Forest**. Its height stays at three rows (457 CSS pixels including gaps/padding); all sixteen themes must be reachable without horizontal page overflow. Keyboard users can focus the grid and use Page Down/arrow keys, or Tab through its buttons.
- Select **McPherson Magical Forest** and confirm both phone and TV update their cards and woodland backgrounds without changing the draw count. Its courts are Diamond (King), Clementine (Queen), and Quinn (Jack); Pitter is the Ace in every suit. Check that the full name fits its picker tile on a narrow phone and that a saved-board win uses the matching woodland celebration.
- Switch to each new deck during calling and while paused. Both screens must show its own card faces and scenery without changing the count or draw order. Check a winning board and confirm the celebration matches the theme. Printable saved boards should use the selected theme too. Halloween uses friendly spooky characters; Christmas uses Santa, Mrs. Claus and an elf; FriendsGiving combines the six Friends characters with Thanksgiving food and familiar show props.
- After the 52nd draw, the TV should automatically show all 52 cards with **Round complete**, the last card outlined in gold, and no split current/previous-four view. Reload the TV and open/close the guide; the full deck should remain. Starting another round should restore the normal calling view with an empty history. Manually ending an earlier round shows its called cards in the same way.

## Tests and free-tier limits

Run `dotnet test PokenoGenie.slnx` for the C# tests and `node --test tests/cards-art.test.mjs` to check the 52 card faces. With Node.js, pnpm, and Java 21 installed, run `pnpm install` and `pnpm test:rules` to test the Firebase rules in the local emulator. The GitHub workflow runs all three suites before deployment.

Firebase's Spark plan currently includes 100 simultaneous Realtime Database connections, 1 GB stored, and 10 GB downloaded per month. It does not bill beyond the included quota; the service can stop accepting new connections or become unavailable until quota resets. The app requires internet access for Firebase and its hosted JavaScript SDK.

Sources: [GitHub Pages](https://docs.github.com/pages/getting-started-with-github-pages/creating-a-github-pages-site), [Blazor on GitHub Pages](https://learn.microsoft.com/aspnet/core/blazor/host-and-deploy/webassembly/github-pages?view=aspnetcore-10.0), [Firebase pricing](https://firebase.google.com/pricing), [Firebase security rules](https://firebase.google.com/docs/database/security).
