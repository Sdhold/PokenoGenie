# The Pawffice — artwork and local review

The user approved this artwork and the name **The Pawffice** for the bundled deck. Its 52 faces, card back, office background, and winner graphic are shared by the phone and TV. The local review remains available for future artwork changes.

| Rank | Dog | Details drawn from the photo |
| --- | --- | --- |
| Queen | Ellie | Tall bat ears, grey/taupe coat, fawn eyebrows and cheeks, brown nose, short muzzle, red ID tag, and a soft pillow in the office scene. |
| King | Parker | Dark coat, irregular broad white blaze and cheeks, white chest and feet, upright ears, and the little underbite. |
| Ace | Sadie | Small fawn Chihuahua, softly folded dark ear tips, large dark eyes, grey muzzle, and pale chest. |
| Jack | Pugsy | Fawn pug, folded black ears, wrinkled forehead, broad dark mask, greying muzzle, and curled tail. |

All four assignments hold in every suit. Names have plain rank captions. Courts are mirrored, with standard corner ranks/suits. Paw prints, pink hearts, paperclip rails, cream faces, and navy details match the app's established outlined art style.

The nine number-card scenes feature the same dogs at reception, with the boss's mug, at tea break, among paper boxes, with the stapler prank, on a conference call, with a Dundie, at pretzel break, and resting on a pillow. The back and winner illustration include all four.

## Background

An original stylized *The Office* (US) inspired Scranton workspace: beige walls, reception, a blue Dunder Mifflin sign, venetian blinds, desks, a water cooler, paper boxes, the boss's mug, and a Dundie. Ellie sits on a pillow near reception, Parker sits at the boss's desk, Sadie rests by the paper boxes, and Pugsy sits by the water cooler. They are integrated into the room at different natural sizes, without court crowns in the background.

Reference for the show's company wordmark and recognizable props: [NBCUniversal's official Office collection](https://www.nbcstore.com/pages/the-office). All artwork here is original SVG illustration. The four supplied photographs remain local and are never embedded or copied to the public app. No paid artwork service is used.

## Review locally

```powershell
node tools/generate-pawffice-preview.mjs
node --test tests/pawffice-art.test.mjs
python -m http.server 5277 --bind 127.0.0.1 --directory artifacts/pawffice-preview
```

Open `http://127.0.0.1:5277/`. The review includes the court cards, all nine number scenes and the back, the full background, a static TV composition, and winner artwork. Its sample count is illustrative and it never connects to Firebase or changes a game.

The approved module is integrated into the shared art generators, the C# catalog, JS/rules theme lists, and background styles. `tests/pawffice-art.test.mjs` also runs in the deployment workflow. Future artwork changes can be reviewed here before deployment.
