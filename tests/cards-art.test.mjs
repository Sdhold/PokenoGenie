import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { test } from "node:test";

const directory = new URL("../src/PokenoGenie/wwwroot/cards/", import.meta.url);
const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const suits = ["S", "H", "D", "C"];
const themeDirectories = [directory, ...["midnight", "sunburst", "mopar", "dart1969"].map(id => new URL(`${id}/`, directory))];

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
  for (const themeDirectory of themeDirectories) {
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
  for (const themeDirectory of themeDirectories.filter(url => !url.pathname.endsWith("/mopar/"))) {
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
