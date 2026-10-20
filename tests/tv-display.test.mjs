import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import vm from "node:vm";

const root = new URL("../src/PokenoGenie/wwwroot/", import.meta.url);
const html = await readFile(new URL("tv.html", root), "utf8");
const script = await readFile(new URL("js/tv.js", root), "utf8");
const layoutSource = await readFile(new URL("js/verification-layout.js", root), "utf8");
const boardSource = await readFile(new URL("js/board-verification.js", root), "utf8");
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
  let theme = "starwars", fitCalls = 0, timerId = 0, check = null;
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
      else if (this.url.includes("/verification.json")) result=check;
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
  vm.runInNewContext(boardSource,context);
  vm.runInNewContext(script,context);
  return {
    elements,
    get fitCalls() { return fitCalls; },
    setCheck(value) { check=value; },
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
  assert.equal(reloaded.elements["verification-panel"].hidden,false);
  assert.equal(reloaded.elements["calling-display"].hidden,true);
  assert.equal(reloaded.elements["verification-cards"].children.length,52);
  assert.equal(reloaded.elements["verification-title"].textContent,"The round is complete.");
  assert.equal(reloaded.elements["verification-eyebrow"].textContent,"ROUND COMPLETE · ALL CALLED CARDS");
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

test("the 52nd draw opens the full deck, survives reload and the guide, then clears for a new round",()=>{
  const tv=harness(); tv.update("calling",51);
  assert.equal(tv.elements["calling-display"].hidden,false);
  tv.update("finished",52,"pokemon");
  function assertFullDeck(screen) {
    assert.equal(screen.elements["calling-display"].hidden,true);
    assert.equal(screen.elements["verification-panel"].hidden,false);
    const tiles=screen.elements["verification-cards"].children;
    assert.equal(tiles.length,52);
    assert.equal(new Set(tiles.map(tile=>tile.children[0].attributes["aria-label"])).size,52);
    assert.equal(tiles[51].attributes["aria-label"],"Draw 52: King of Clubs, latest card");
    assert.equal(tiles[51].children[0].children[0].src,"cards/pokemon/KC.svg");
    assert.equal(screen.elements["draw-count"].textContent,"52 / 52");
    assert.ok(screen.fitCalls>0);
  }
  assertFullDeck(tv);
  const reloaded=harness({phase:"finished",drawnCount:52,drawn:cards}); reloaded.update("finished",52,"pokemon");
  assertFullDeck(reloaded);
  tv.update("finished",52,"pokemon",true);
  assert.equal(tv.elements["howto-panel"].hidden,false);
  tv.update("finished",52,"pokemon",false); assertFullDeck(tv);
  tv.update("calling",0);
  assert.equal(tv.elements["verification-panel"].hidden,true);
  assert.equal(tv.elements["verification-cards"].children.length,0);
  assert.equal(tv.elements["current-name"].textContent,"Waiting for the first draw");
});

for (const theme of ["route66","dinosaurs","pokemon","halloween","christmas","friendsgiving","mcpherson"]) {
  test(`${theme} keeps live cards, full history and winner art synchronized`,()=>{
    const tv=harness({patternId:"horizontal"}); tv.update("calling",5,theme);
    assert.equal(tv.elements["display-screen"].attributes["data-deck-theme"],theme);
    assert.equal(tv.elements["current-card"].children[0].children[0].src,`cards/${theme}/5S.svg`);
    assert.equal(tv.elements["previous-cards"].children.length,4);
    tv.update("paused",5);
    assert.equal(tv.elements["verification-cards"].children.length,5);
    assert.equal(tv.elements["verification-cards"].children[0].children[0].children[0].src,`cards/${theme}/AS.svg`);
    tv.setCheck({id:"win",round:1,drawnCount:5,patternId:"horizontal",cards:cards.slice(0,25),label:"Board 01",setName:"Test"});
    tv.update("paused",5);
    assert.equal(tv.elements["winner-graphic"].hidden,false);
    assert.equal(tv.elements["winner-graphic"].src,`winners/${theme}.svg?v=1`);
    tv.setCheck(null); tv.update("finished",52);
    assert.equal(tv.elements["verification-cards"].children.length,52);
    assert.equal(tv.elements["board-result-panel"].hidden,true);
  });
}

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
    assert.equal(tv.elements["verification-panel"].hidden,phase !== "paused" && phase !== "finished");
  }
});

test("every alternate deck bundles a self-contained matching background",async()=>{
  for (const id of ["midnight","sunburst","mopar","dart1969","harrypotter","starwars","lordoftherings","cats","route66","dinosaurs","pokemon","halloween","christmas","friendsgiving","mcpherson"]) {
    const scene=await readFile(new URL(`backgrounds/${id}.svg`,root),"utf8");
    assert.match(scene,/viewBox="0 0 1600 900"/);
    assert.ok(scene.includes(`data-deck="${id}"`));
    assert.doesNotMatch(scene,/(?:href|src)="https?:/);
  }
});

test("a real winning board shows a themed celebration; an incomplete board and stale checks never celebrate",()=>{
  const tv=harness({patternId:"horizontal"});
  const check={id:"check-1",round:1,drawnCount:5,patternId:"horizontal",cards:cards.slice(0,25),label:"Board 07",setName:"Our set"};
  tv.setCheck(check); tv.update("paused",5,"cats");
  assert.equal(tv.elements["board-result-panel"].hidden,false);
  assert.equal(tv.elements["verification-panel"].hidden,true);
  assert.equal(tv.elements["winner-graphic"].hidden,false);
  assert.equal(tv.elements["winner-graphic"].src,"winners/cats.svg?v=1");
  assert.equal(tv.elements["board-result-title"].textContent,"Board 07 wins!");
  assert.equal(tv.elements["board-result-cards"].children.length,25);
  assert.equal(tv.elements["board-result-cards"].children.filter(cell=>cell.className.includes("pattern-cell")).length,5);
  tv.update("paused",5,"starwars");
  assert.equal(tv.elements["winner-graphic"].src,"winners/starwars.svg?v=1");
  tv.setCheck({...check,id:"check-2",drawnCount:4}); tv.update("paused",4);
  assert.equal(tv.elements["winner-graphic"].hidden,true);
  assert.equal(tv.elements["board-result-missing"].children.length,1);
  tv.setCheck(check); tv.update("paused",6);
  assert.equal(tv.elements["board-result-panel"].hidden,true);
  assert.equal(tv.elements["verification-panel"].hidden,false);
  tv.update("calling",6);
  assert.equal(tv.elements["board-result-panel"].hidden,true);
});

test("clearing a board check restores history, guide holds the result, and reload restores the current valid check",()=>{
  const tv=harness({patternId:"standard"});
  const check={id:"check",round:1,drawnCount:5,patternId:"standard",cards:cards.slice(0,25),label:"Board 01",setName:"Family"};
  tv.setCheck(check); tv.update("paused",5);
  assert.equal(tv.elements["board-result-panel"].hidden,false);
  tv.update("paused",5,"cats",true);
  assert.equal(tv.elements["board-result-panel"].hidden,true);
  assert.equal(tv.elements["howto-panel"].hidden,false);
  tv.update("paused",5,"cats",false);
  assert.equal(tv.elements["board-result-panel"].hidden,false);
  tv.setCheck(null); tv.update("paused",5);
  assert.equal(tv.elements["board-result-panel"].hidden,true);
  assert.equal(tv.elements["verification-cards"].children.length,5);
  const reloaded=harness({patternId:"standard"}); reloaded.setCheck(check); reloaded.update("paused",5,"mopar");
  assert.equal(reloaded.elements["winner-graphic"].src,"winners/mopar.svg?v=1");
});

test("every theme has a matching self-contained winner graphic",async()=>{
  for(const theme of ["illustrated","midnight","sunburst","mopar","dart1969","harrypotter","starwars","lordoftherings","cats","route66","dinosaurs","pokemon","halloween","christmas","friendsgiving","mcpherson"]) {
    const art=await readFile(new URL(`winners/${theme}.svg`,root),"utf8");
    assert.ok(art.includes(`data-deck="${theme}"`));
    assert.match(art,/POKENO!/);
    assert.doesNotMatch(art,/(?:href|src)="https?:/);
    assert.equal((art.match(/data:image\/svg\+xml;base64/g)||[]).length,4);
  }
});
