# Deploy Pokeno Genie for free

Pokeno Genie uses a public GitHub Pages site and a Firebase **Spark** (no-cost) project. The only account setup is GitHub and Firebase. The app has no server to rent and does not use Firebase Functions or a paid Firebase plan. GitHub Pages needs a public repository on GitHub Free. Firebase Spark needs no payment method and limits usage instead of billing overages.

## Firebase setup for this project

The Firebase side was configured on October 18, 2026. The **PokenoGenie** Web app is registered in project `pokenogenie` on the Spark plan. Anonymous sign-in is enabled, Realtime Database is at `https://pokenogenie-default-rtdb.firebaseio.com` in `us-central1`, and the checked-in `database.rules.json` rules are published. The local web configuration is in `src/PokenoGenie/wwwroot/firebase-config.json`; it is ignored by Git. A live local check created a room, drew two cards, and displayed them on a second browser tab.

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

The workflow fails clearly if `FIREBASE_CONFIG_JSON` is missing or invalid. The published app contains the Firebase web configuration because browsers need it; the database rules protect game state. The shuffled deck is stored under a separate owner-only database path.

## 5. Check the phone and TV

1. On the phone, open the published URL and select **Create a table**. Note the eight-character code.
2. On the TV or its connected computer, open `https://sdhold.github.io/PokenoGenie/tv.html` and enter the code. The site's main URL redirects LG webOS browsers to this TV page. You can also open the caller's **Copy TV link** URL on the display.
3. Choose **H**, start a round, and draw five cards. Check that the TV's large card, previous four, and count match the phone. Try rapid taps; the next draw should remain locked for three seconds.
4. Pause, review the history, resume, and end the round. Reload both screens; the active room and private deck should return on the original caller phone.
5. On the caller phone, choose **End table & start new**, confirm, and check that a different room code appears at table setup. Enter that code on the TV to begin again at the first round.

The caller identity is stored in that browser's local data. Clearing its site data or using a different phone loses caller control of the old room; create a new table in that case. If the network disconnects, drawing pauses and the TV shows its last known state until it reconnects. The TV page uses simple JavaScript and Firebase's authenticated REST API, polling for new cards about every 1.5 seconds. It does not load Blazor, so it can run on browsers where the Blazor startup remains on the splash screen.

## Tests and free-tier limits

Run `dotnet test PokenoGenie.slnx` for the C# tests and `node --test tests/cards-art.test.mjs` to check the 52 card faces. With Node.js, pnpm, and Java 21 installed, run `pnpm install` and `pnpm test:rules` to test the Firebase rules in the local emulator. The GitHub workflow runs all three suites before deployment.

Firebase's Spark plan currently includes 100 simultaneous Realtime Database connections, 1 GB stored, and 10 GB downloaded per month. It does not bill beyond the included quota; the service can stop accepting new connections or become unavailable until quota resets. The app requires internet access for Firebase and its hosted JavaScript SDK.

Sources: [GitHub Pages](https://docs.github.com/pages/getting-started-with-github-pages/creating-a-github-pages-site), [Blazor on GitHub Pages](https://learn.microsoft.com/aspnet/core/blazor/host-and-deploy/webassembly/github-pages?view=aspnetcore-10.0), [Firebase pricing](https://firebase.google.com/pricing), [Firebase security rules](https://firebase.google.com/docs/database/security).
