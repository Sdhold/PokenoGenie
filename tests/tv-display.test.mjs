import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import vm from "node:vm";

const root = new URL("../src/PokenoGenie/wwwroot/", import.meta.url);
const html = await readFile(new URL("tv.html", root), "utf8");
const script = await readFile(new URL("js/tv.js", root), "utf8");
const layoutSource = await readFile(new URL("js/verification-layout.js", root), "utf8");
const newPatterns = JSON.parse(await readFile(new URL("fixtures/new-patterns.json", import.meta.url), "utf8"));
const cards = ["S","H","D","C"].flatMap(suit => ["A","2","3","4","5","6","7","8","9","10","J","Q","K"].map(rank => rank+suit));

function harness(initialState = {}) {
  function node() {
    return {
      children: [], hidden: false, style: {}, attributes: {}, textContent: "", className: "",
      get firstChild() { return this.children[0]; },
      appendChild(child) { this.children.push(child); },
      removeChild(child) { this.children.splice(this.children.indexOf(child),1); },
      setAttribute(key,value) { this.attributes[key]=value; }
    };
  }
  const elements = Object.fromEntries([...html.matchAll(/\bid="([^"]+)"/g)].map(match=>[match[1],node()]));
  let state = { round:1, phase:"calling", patternId:"h", drawnCount:0, drawn:[], ...initialState };
  let theme = "starwars", fitCalls = 0, timerId = 0;
  const pending = new Map();
  class Request {
    open(method,url) { this.url=url; }
    setRequestHeader() {}
    send() {
      let result;
      if (this.url === "firebase-config.json") result={apiKey:"fixture",databaseURL:"https://fixture.invalid"};
      else if (this.url.includes("identitytoolkit")) result={idToken:"fixture",refreshToken:"fixture",expiresIn:3600};
      else if (this.url.includes("/state.json")) result=state;
      else if (this.url.includes("/theme.json")) result=theme;
      else throw new Error(`Unexpected request: ${this.url}`);
      this.status=200; this.readyState=4; this.responseText=JSON.stringify(result); this.onreadystatechange();
    }
  }
  const context={
    document:{getElementById:id=>elements[id],createElement:node},
    window:{pokenoVerificationLayout:{fit:()=>fitCalls++}},
    location:{search:"?room=ABCDEFGH"},history:{replaceState(){}},sessionStorage:{getItem(){return null;},setItem(){}},
    XMLHttpRequest:Request,setTimeout:callback=>{pending.set(++timerId,callback);return timerId;},clearTimeout:id=>pending.delete(id)
  };
  vm.runInNewContext(script,context);
  return {
    elements,
    get fitCalls() { return fitCalls; },
    update(phase,count,nextTheme=theme,guideOpen=state.guideOpen === true) {
      state={...state,phase,drawnCount:count,drawn:cards.slice(0,count),guideOpen}; theme=nextTheme;
      const [id,callback]=pending.entries().next().value;
      pending.delete(id); callback();
    }
  };
}

test("pause replaces the split display with every called card, in draw order",()=>{
  const tv=harness(); tv.update("paused",22);
  assert.equal(tv.elements["calling-display"].hidden,true);
  assert.equal(tv.elements["verification-panel"].hidden,false);
  const tiles=tv.elements["verification-cards"].children;
  assert.equal(tiles.length,22);
  assert.equal(tiles[0].attributes["aria-label"],"Draw 1: Ace of Spades");
  assert.equal(tiles[21].attributes["aria-label"],"Draw 22: Nine of Hearts, latest card");
  assert.equal(tiles.filter(tile=>tile.className.includes("latest")).length,1);
  assert.equal(tiles[21].children[0].children[0].src,"cards/starwars/9H.svg");
  assert.ok(tv.fitCalls>0);
});

test("resume restores the current card and previous four without changing history",()=>{
  const tv=harness(); tv.update("paused",22); tv.update("calling",22);
  assert.equal(tv.elements["verification-panel"].hidden,true);
  assert.equal(tv.elements["calling-display"].hidden,false);
  assert.equal(tv.elements["verification-cards"].children.length,0);
  assert.equal(tv.elements["current-card"].children[0].attributes["aria-label"],"Nine of Hearts");
  assert.deepEqual(tv.elements["previous-cards"].children.map(card=>card.attributes["aria-label"]),["Eight of Hearts","Seven of Hearts","Six of Hearts","Five of Hearts"]);
});

test("empty and maximum histories, theme changes and paused reloads render safely",()=>{
  const tv=harness(); tv.update("paused",0);
  assert.equal(tv.elements["verification-empty"].hidden,false);
  assert.equal(tv.elements["verification-grid-wrap"].hidden,true);
  tv.update("paused",52,"lordoftherings");
  assert.equal(tv.elements["verification-cards"].children.length,52);
  assert.equal(tv.elements["verification-empty"].hidden,true);
  assert.equal(tv.elements["display-screen"].attributes["data-deck-theme"],"lordoftherings");
  assert.equal(tv.elements["verification-cards"].children[51].children[0].children[0].src,"cards/lordoftherings/KC.svg");
  const reloaded=harness(); reloaded.update("paused",51,"harrypotter");
  assert.equal(reloaded.elements["verification-cards"].children.length,51);
  reloaded.update("finished",52);
  assert.equal(reloaded.elements["verification-panel"].hidden,true);
  assert.equal(reloaded.elements["phase-label"].textContent,"ROUND COMPLETE");
});

test("verification layout fits up to 52 cards on landscape TVs",()=>{
  const context={window:{addEventListener(){}}}; vm.runInNewContext(layoutSource,context);
  const calculate=context.window.pokenoVerificationLayout.calculate;
  for (const [width,height] of [[1216,460],[1840,818]]) {
    for (const count of [1,5,22,35,51,52]) {
      const layout=calculate(width,height,count);
      assert.ok(layout.columns*layout.rows>=count);
      assert.ok(layout.tileHeight*layout.rows+layout.gap*(layout.rows-1)<=height,`${count} cards overflow ${width}x${height}`);
      assert.ok(layout.faceHeight<layout.tileHeight);
      assert.ok(layout.labelSize>=18);
    }
  }
});

test("Royal Cats synchronizes artwork in calling and verification views",()=>{
  const tv=harness(); tv.update("calling",22,"cats");
  assert.equal(tv.elements["display-screen"].attributes["data-deck-theme"],"cats");
  assert.equal(tv.elements["current-card"].children[0].children[0].src,"cards/cats/9H.svg?v=2");
  tv.update("paused",22,"cats");
  assert.equal(tv.elements["verification-cards"].children.length,22);
  assert.equal(tv.elements["verification-cards"].children[0].children[0].children[0].src,"cards/cats/AS.svg?v=2");
});

for (const pattern of newPatterns) {
  test(`TV shows the ${pattern.name} name and exact 5x5 shape`,()=>{
    const tv=harness({patternId:pattern.id}); tv.update("calling",0);
    const mask=tv.elements["pattern-grid"].children.map(cell=>cell.className === "filled" ? "#" : ".").join("");
    assert.equal(tv.elements["pattern-name"].textContent,pattern.name);
    assert.equal(mask,pattern.rows.join(""));
  });
}

test("the caller's guide replaces both TV views and returns to the same round",()=>{
  const tv=harness(); tv.update("calling",22,"cats",true);
  assert.equal(tv.elements["howto-panel"].hidden,false);
  assert.equal(tv.elements["calling-display"].hidden,true);
  assert.equal(tv.elements["verification-panel"].hidden,true);
  assert.equal(tv.elements["draw-count"].textContent,"22 / 52");
  assert.equal(tv.elements["display-screen"].attributes["data-deck-theme"],"cats");
  tv.update("calling",22,"cats",false);
  assert.equal(tv.elements["howto-panel"].hidden,true);
  assert.equal(tv.elements["calling-display"].hidden,false);
  assert.equal(tv.elements["current-card"].children[0].attributes["aria-label"],"Nine of Hearts");
  assert.deepEqual(tv.elements["previous-cards"].children.map(card=>card.attributes["aria-label"]),["Eight of Hearts","Seven of Hearts","Six of Hearts","Five of Hearts"]);

  tv.update("paused",22,"cats",true);
  assert.equal(tv.elements["howto-panel"].hidden,false);
  assert.equal(tv.elements["verification-panel"].hidden,true);
  tv.update("paused",22,"cats",false);
  assert.equal(tv.elements["verification-panel"].hidden,false);
  assert.equal(tv.elements["verification-cards"].children.length,22);
});

test("a TV reload restores an open guide, including setup and finished tables",()=>{
  for (const phase of ["lobby","calling","paused","finished"]) {
    const tv=harness({guideOpen:true,phase});
    tv.update(phase,phase === "lobby" ? 0 : 5);
    assert.equal(tv.elements["howto-panel"].hidden,false);
    tv.update(phase,phase === "lobby" ? 0 : 5,"starwars",false);
    assert.equal(tv.elements["howto-panel"].hidden,true);
    assert.equal(tv.elements["verification-panel"].hidden,phase !== "paused");
  }
});

test("every alternate deck bundles a self-contained matching background",async()=>{
  for (const id of ["midnight","sunburst","mopar","dart1969","harrypotter","starwars","lordoftherings","cats"]) {
    const scene=await readFile(new URL(`backgrounds/${id}.svg`,root),"utf8");
    assert.match(scene,/viewBox="0 0 1600 900"/);
    assert.ok(scene.includes(`data-deck="${id}"`));
    assert.doesNotMatch(scene,/(?:href|src)="https?:/);
  }
});
