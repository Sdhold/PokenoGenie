import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { test } from "node:test";

const directory = new URL("../src/PokenoGenie/wwwroot/cards/", import.meta.url);
const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const suits = ["S", "H", "D", "C"];

test("every card has a self-contained SVG face", async () => {
  const files = (await readdir(directory)).filter(name => name.endsWith(".svg")).sort();
  const expected = suits.flatMap(suit => ranks.map(rank => `${rank}${suit}.svg`)).sort();
  assert.deepEqual(files, expected);
  for (const name of files) {
    const art = await readFile(new URL(name, directory), "utf8");
    assert.match(art, /viewBox="0 0 250 350"/);
    assert.match(art, /<g id="main-art">/);
    assert.doesNotMatch(art, /(?:href|src)="https?:/);
  }
});

test("ace and number cards show the correct number of suit pips", async () => {
  for (const suit of suits) {
    for (const rank of ranks.slice(0, 10)) {
      const art = await readFile(new URL(`${rank}${suit}.svg`, directory), "utf8");
      const main = /<g id="main-art">([\s\S]*?)<\/g>/.exec(art)?.[1];
      assert.ok(main, `${rank}${suit} main art is missing`);
      assert.equal((main.match(/<use /g) || []).length, rank === "A" ? 1 : Number(rank), `${rank}${suit}`);
    }
  }
});

test("court cards contain mirrored portrait artwork", async () => {
  for (const suit of suits) {
    for (const rank of ["J", "Q", "K"]) {
      const art = await readFile(new URL(`${rank}${suit}.svg`, directory), "utf8");
      assert.equal((art.match(/<ellipse cx="125" cy="106"/g) || []).length, 2, `${rank}${suit} needs two faces`);
      assert.match(art, /<g transform="rotate\(180 125 175\)">/, `${rank}${suit} needs the second portrait`);
      assert.match(art, /<path d="M98 82|<path d="M99 82|<path d="M95 85/, `${rank}${suit} needs rank-specific headwear`);
    }
  }
});
