import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { pawfficeCardSvg, pawfficeBackSvg, pawfficeBackgroundSvg, pawfficeWinnerSvg } from "../tools/pawffice-card-art.mjs";

const ranks=["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
const suits={};
for(const suit of ["S","H","D","C"]){
  const canonical=await readFile(new URL(`../src/PokenoGenie/wwwroot/cards/A${suit}.svg`,import.meta.url),"utf8");
  suits[suit]={shape:/<symbol id="pip"[^>]*><g fill="[^"]+">([\s\S]*?)<\/g><\/symbol>/.exec(canonical)[1]};
}
function referencesResolve(svg){
  const ids=[...svg.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]);
  assert.equal(ids.length,new Set(ids).size,"SVG IDs must be unique");
  for(const match of svg.matchAll(/(?:xlink:href="#|url\(#)([^"\)]+)/g))assert.ok(ids.includes(match[1]),`Missing SVG reference: ${match[1]}`);
  assert.doesNotMatch(svg,/(?:href|src)="https?:|<image[^>]*href="(?!data:)/,"Artwork must be self-contained");
}
test("Pawffice keeps all four requested dogs and ranks in every suit",()=>{
  const assigned={Q:["ellie","ELLIE","upright-bat-ears","fawn-points-grey-cap"],K:["parker","PARKER","little-underbite","white-blaze-and-cheeks"],A:["sadie","SADIE","soft-folded-chihuahua-ears","dark-chihuahua-muzzle"],J:["pugsy","PUGSY","pug-forehead-wrinkles","grizzled-pug-muzzle"]};
  const portraits=new Set(),scenes=new Set();
  for(const [suit,shape] of Object.entries(suits))for(const rank of ranks){
    const svg=pawfficeCardSvg(rank,suit,shape);
    referencesResolve(svg);
    assert.match(svg,/viewBox="0 0 250 350"/);
    assert.match(svg,/data-motif="paw-prints"/);
    assert.match(svg,/data-motif="heart"/);
    assert.match(svg,/<g id="main-art">/);
    if(assigned[rank]){
      const [id,name,...features]=assigned[rank];
      assert.match(svg,new RegExp(`data-character="${id}"`));
      assert.match(svg,new RegExp(`data-dog="${id}"`));
      assert.ok(svg.includes(`>${name}</text>`));
      for(const feature of features)assert.ok(svg.includes(feature),`${name}: ${feature}`);
      const labels=[...svg.matchAll(/<text\b[^>]*>([^<]*)<\/text>/g)].map(match=>match[1]);
      assert.deepEqual(labels.filter(label=>![rank,'THE PAWFFICE','PAWS &amp; PAPER'].includes(label)),[name,{Q:'QUEEN',K:'KING',A:'ACE',J:'JACK'}[rank]]);
      if(rank!=='A')assert.match(svg,/data-portrait="inverted" transform="rotate\(180 125 175\)"/);
      portraits.add(/<symbol id="office-dog"[^>]*>([\s\S]*?)<\/symbol>/.exec(svg)[1]);
    }else scenes.add(/data-scene="([^"]+)"/.exec(svg)[1]);
  }
  assert.equal(portraits.size,4,"Draw four distinct dogs, not recolored copies");
  assert.equal(scenes.size,9,"Give number cards varied office scenes");
});
test("Pawffice back, office background and celebration include all four dogs",()=>{
  for(const svg of [pawfficeBackSvg(),pawfficeBackgroundSvg()]){
    referencesResolve(svg);
    for(const id of ['ellie','parker','sadie','pugsy'])assert.match(svg,new RegExp(`data-dog="${id}"`));
  }
  const background=pawfficeBackgroundSvg();
  assert.match(background,/viewBox="0 0 1600 900"/);
  for(const prop of ['dunder-mifflin-sign','venetian-blinds','best-boss-mug','dundie-award','paper-box','dog-pillow'])assert.ok(background.includes(`data-prop="${prop}"`));
  for(const id of ['ellie','parker','sadie','pugsy'])assert.match(background,new RegExp(`xlink:href="#sitting-${id}"`));
  const winner=pawfficeWinnerSvg(['JS','QH','KS','AH'].map(id=>pawfficeCardSvg(id.slice(0,-1),id.slice(-1),suits[id.slice(-1)])));
  referencesResolve(winner);
  assert.equal((winner.match(/data:image\/svg\+xml;base64/g)||[]).length,4);
  assert.match(winner,/POKENO!/);
});
