import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { test } from "node:test";

const directory = new URL("../src/PokenoGenie/wwwroot/cards/", import.meta.url);
const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const suits = ["S", "H", "D", "C"];
const traditionalDirectories = [directory, ...["midnight", "sunburst", "mopar", "dart1969"].map(id => new URL(`${id}/`, directory))];
const storyIds = ["harrypotter", "starwars", "lordoftherings"];
const themeDirectories = [...traditionalDirectories, ...[...storyIds,"cats"].map(id => new URL(`${id}/`, directory))];

test("every theme has 52 self-contained SVG faces", async () => {
  const expected = suits.flatMap(suit => ranks.map(rank => `${rank}${suit}.svg`)).sort();
  for (const themeDirectory of themeDirectories) {
    const files = (await readdir(themeDirectory)).filter(name => name.endsWith(".svg") && name !== "back.svg").sort();
    assert.deepEqual(files, expected, themeDirectory.pathname);
    for (const name of files) {
      const art = await readFile(new URL(name, themeDirectory), "utf8");
      assert.match(art, /viewBox="0 0 250 350"/);
      assert.match(art, /<g id="main-art">/);
      assert.doesNotMatch(art, /(?:href|src)="https?:/);
    }
  }
});

test("ace and number cards show the correct number of suit pips", async () => {
  for (const themeDirectory of traditionalDirectories) {
    for (const suit of suits) {
      for (const rank of ranks.slice(0, 10)) {
        const art = await readFile(new URL(`${rank}${suit}.svg`, themeDirectory), "utf8");
        const main = /<g id="main-art">([\s\S]*)<\/g>\s*<\/svg>/.exec(art)?.[1];
        assert.ok(main, `${rank}${suit} main art is missing`);
        assert.equal((main.match(/<use xlink:href="#pip" /g) || []).length, rank === "A" ? 1 : Number(rank), `${rank}${suit}`);
      }
    }
  }
});

test("court cards contain mirrored portrait artwork", async () => {
  for (const themeDirectory of traditionalDirectories.filter(url => !url.pathname.endsWith("/mopar/"))) {
    for (const suit of suits) {
      for (const rank of ["J", "Q", "K"]) {
        const art = await readFile(new URL(`${rank}${suit}.svg`, themeDirectory), "utf8");
        assert.equal((art.match(/<ellipse cx="125" cy="106"/g) || []).length, 2, `${rank}${suit} needs two faces`);
        assert.match(art, /<g transform="rotate\(180 125 175\)">/, `${rank}${suit} needs the second portrait`);
        assert.match(art, /<path d="M98 82|<path d="M99 82|<path d="M95 85/, `${rank}${suit} needs rank-specific headwear`);
      }
    }
  }
});

test("story decks have named, mirrored character courts and themed object aces", async () => {
  const expected = {
    harrypotter: { K: "dumbledore", Q: "mcgonagall", J: "harry", A: "snitch" },
    starwars: { K: "vader", Q: "leia", J: "luke", A: "deathstar" },
    lordoftherings: { K: "aragorn", Q: "arwen", J: "frodo", A: "onering" }
  };
  for (const [themeId, characters] of Object.entries(expected)) {
    const numberCharacters = new Set();
    const illustrations = new Set();
    for (const suit of suits) {
      for (const rank of ranks) {
        const art = await readFile(new URL(`${themeId}/${rank}${suit}.svg`, directory), "utf8");
        const main = /<g id="main-art">([\s\S]*)<\/g>\s*<\/svg>/.exec(art)?.[1];
        assert.ok(main);
        assert.doesNotMatch(main, /xlink:href="#pip"/, "These decks use integrated scenes, not pip fields");
        assert.match(art, /<g transform="rotate\(180 125 175\)">/, "Keep rank and suit readable from both ends");
        if (characters[rank]) assert.match(art, new RegExp(`data-character="${characters[rank]}"`));
        if (["J","Q","K"].includes(rank)) {
          assert.equal((main.match(/<use xlink:href="#character"/g) || []).length, 2);
          assert.match(main, /data-portrait="inverted" transform="rotate\(180 125 175\)"/);
        } else if (rank === "A") {
          assert.match(art, new RegExp(`data-artifact="${characters.A}"`));
        } else {
          numberCharacters.add(/data-character="([^"]+)"/.exec(art)?.[1]);
          assert.match(main, /<use xlink:href="#character"/);
        }
        if (rank !== "A") illustrations.add(/<symbol id="character"[^>]*>([\s\S]*?)<\/symbol>/.exec(art)?.[1]);
        const ids = new Set([...art.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]));
        for (const reference of art.matchAll(/(?:xlink:href="#|url\(#)([^"\)]+)/g)) {
          assert.ok(ids.has(reference[1]), `${themeId}/${rank}${suit} has a broken SVG reference: ${reference[1]}`);
        }
      }
    }
    assert.equal(numberCharacters.size, 9, `${themeId} needs a varied supporting cast`);
    assert.equal(illustrations.size, 12, `${themeId} needs distinct illustrations for its 12 characters`);
    const back = await readFile(new URL(`${themeId}/back.svg`, directory), "utf8");
    assert.match(back, new RegExp(`data-artifact="${characters.A}"`));
    assert.match(back, /<use xlink:href="#artifact"/);
  }
});

test("Star Wars force users have character-colored lightsaber borders", async () => {
  for (const [card,color] of [["KS","#fa6964"],["JS","#7ce6ab"],["2S","#74c9ff"],["5S","#e5f5ff"]]) {
    const art = await readFile(new URL(`starwars/${card}.svg`, directory), "utf8");
    assert.equal((art.match(/data-motif="lightsaber"/g) || []).length, 2);
    assert.ok(art.includes(`stroke="${color}"`));
  }
  const han = await readFile(new URL("starwars/6S.svg", directory), "utf8");
  assert.match(han, /data-character="han"/);
  assert.match(han, /data-motif="starship-panels"/);
});

test("Royal Cats keeps the four named pets on their assigned ranks in every suit", async () => {
  const assigned = { J:["binx","BINX","small-white-locket"], Q:["autumn","AUTUMN","orange-cheek-black-face"], K:["chip","CHIP","white-blaze-grey-cap"], A:["anya","ANYA","black-tipped-nose"] };
  const portraits = new Set(), scenes = new Set();
  for (const suit of suits) {
    for (const [rank,[id,name,marking]] of Object.entries(assigned)) {
      const art = await readFile(new URL(`cats/${rank}${suit}.svg`,directory),"utf8");
      assert.match(art,new RegExp(`data-character="${id}"`));
      assert.match(art,new RegExp(`data-cat="${id}"`));
      assert.ok(art.includes(name));
      assert.ok(art.includes(marking),`${name} needs the photo's distinguishing markings`);
      const labels = [...art.matchAll(/<text\b[^>]*>([^<]*)<\/text>/g)].map(match=>match[1]);
      assert.ok(labels.includes({J:"JACK",Q:"QUEEN",K:"KING",A:"ACE"}[rank]),`${name} needs a plain rank label`);
      if (rank === "A") assert.deepEqual(labels.filter(label=>label.startsWith("ACE")),["ACE"]);
      if (id === "chip") { assert.match(art,/data-feature="gentle-wink"/); assert.match(art,/data-feature="folded-ear"/); }
      portraits.add(/<symbol id="cat-art"[^>]*>([\s\S]*?)<\/symbol>/.exec(art)?.[1]);
      if (rank !== "A") assert.match(art,/data-portrait="inverted" transform="rotate\(180 125 175\)"/);
    }
    for (const rank of ranks) {
      const art = await readFile(new URL(`cats/${rank}${suit}.svg`,directory),"utf8");
      const ids = new Set([...art.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]));
      for (const reference of art.matchAll(/(?:xlink:href="#|url\(#)([^"\)]+)/g)) assert.ok(ids.has(reference[1]),`${rank}${suit}: ${reference[1]}`);
      if (!assigned[rank]) scenes.add(/data-character="([^"]+)"/.exec(art)?.[1]);
    }
  }
  assert.equal(portraits.size,4,"The four pets need distinct portrait artwork");
  assert.equal(scenes.size,9,"The number cards need varied cat scenes");
  const back = await readFile(new URL("cats/back.svg",directory),"utf8");
  for (const [id] of Object.values(assigned)) assert.match(back,new RegExp(`xlink:href="#pet-${id}"`));
});

test("alternate decks have distinct art and a matching back", async () => {
  const original = await readFile(new URL("JH.svg", directory), "utf8");
  for (const themeDirectory of themeDirectories.slice(1)) {
    assert.notEqual(await readFile(new URL("JH.svg", themeDirectory), "utf8"), original);
    const back = await readFile(new URL("back.svg", themeDirectory), "utf8");
    assert.match(back, /viewBox="0 0 250 350"/);
    assert.doesNotMatch(back, /(?:href|src)="https?:/);
  }
});

test("automotive decks bundle original vehicle illustrations on faces and backs", async () => {
  for (const themeId of ["mopar", "dart1969"]) {
    for (const card of ["AH", "10C", "JH", "back"]) {
      const art = await readFile(new URL(`${themeId}/${card}.svg`, directory), "utf8");
      assert.match(art, /<symbol id="vehicle(?:-[a-z]+)?"/);
      assert.match(art, /<use xlink:href="#vehicle(?:-[a-z]+)?"/);
      assert.doesNotMatch(art, /<image\b/);
    }
  }
});

test("MOPAR collection distributes four distinct car bodies across all 52 cards", async () => {
  const expectedModels = ["charger", "challenger", "cuda", "superbird"];
  const bodies = new Map();
  const counts = Object.fromEntries(expectedModels.map(id => [id, 0]));
  for (const suit of suits) {
    const suitModels = new Set();
    for (const rank of ranks) {
      const art = await readFile(new URL(`mopar/${rank}${suit}.svg`, directory), "utf8");
      const model = /<symbol id="vehicle" data-model="([^"]+)"/.exec(art)?.[1];
      assert.ok(expectedModels.includes(model), `${rank}${suit} has an unexpected model`);
      const body = new RegExp(`<path data-body="${model}" d="([^"]+)"`).exec(art)?.[1];
      assert.ok(body, `${rank}${suit} is missing its model's body`);
      if (bodies.has(model)) assert.equal(body, bodies.get(model));
      bodies.set(model, body);
      counts[model]++;
      suitModels.add(model);
      assert.match(art, /<use xlink:href="#mopar-logo"/);
      assert.doesNotMatch(art, /DART|<ellipse cx="125" cy="106"/);
      if (["J", "Q", "K"].includes(rank)) assert.match(art, />JACK<|>QUEEN<|>KING</);
    }
    assert.equal(suitModels.size, 4, `${suit} should contain all four models`);
  }
  assert.equal(new Set(bodies.values()).size, 4, "Models must differ in body geometry, not just paint");
  assert.deepEqual(Object.values(counts), [13, 13, 13, 13]);
  const back = await readFile(new URL("mopar/back.svg", directory), "utf8");
  for (const model of expectedModels) {
    assert.match(back, new RegExp(`<use xlink:href="#vehicle-${model}"`));
    const backBody = new RegExp(`<path data-body="${model}" d="([^"]+)"`).exec(back)?.[1];
    assert.equal(backBody, bodies.get(model), `${model} back illustration should match its faces`);
  }
});
