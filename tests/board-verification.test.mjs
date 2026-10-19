import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import vm from "node:vm";
const context={window:{}};
const source=await readFile(new URL("../src/PokenoGenie/wwwroot/js/board-verification.js",import.meta.url),"utf8");
vm.runInNewContext(source,context);
const {verify,masks,matches}=context.window.pokenoBoards;
const board=["S","H"].flatMap(suit=>["A","2","3","4","5","6","7","8","9","10","J","Q","K"].map(rank=>rank+suit)).slice(0,25);
const patterns=["standard","horizontal","vertical","diagonal","h","c","i","s","t","l","u","z","x","plus","corners","diamond","inner-square","checkerboard","perimeter","blackout"];

test("the lightweight TV checker covers every allowed mask and rejects incomplete shapes",()=>{
  for(const pattern of patterns) for(const mask of masks(pattern)) {
    const called=mask.map(cell=>board[cell]);
    assert.equal(verify(board,called,pattern).isWinner,true,pattern);
    assert.equal(verify(board,called.slice(1),pattern).isWinner,false,pattern);
  }
  assert.equal(masks("standard").length,12);
  assert.equal(masks("horizontal").length,5);
  assert.equal(masks("vertical").length,5);
  assert.equal(masks("diagonal").length,2);
});
test("letter masks match the independently specified pattern fixtures",async()=>{
  const fixtures=JSON.parse(await readFile(new URL("fixtures/new-patterns.json",import.meta.url),"utf8"));
  for(const fixture of fixtures) {
    const mask=masks(fixture.id)[0];
    assert.equal(Array.from({length:25},(_,i)=>mask.includes(i)?"#":".").join(""),fixture.rows.join(""));
  }
});
test("duplicates, missing cells, unknown patterns, stale round/count/phase and guide states are rejected",()=>{
  assert.equal(verify([...board.slice(0,24),board[0]],board,"standard"),null);
  assert.equal(verify(board.slice(0,24),board,"standard"),null);
  assert.equal(verify(board,board,"unknown"),null);
  const state={round:2,drawnCount:5,drawn:board.slice(0,5),phase:"paused",patternId:"standard"};
  const check={...state,cards:board};
  assert.equal(matches(check,state),true);
  for(const change of [{round:3},{drawnCount:6},{phase:"calling"},{patternId:"h"},{guideOpen:true}]) assert.equal(matches(check,{...state,...change}),false);
  assert.equal(matches({...check,isWinner:true},{...state,phase:"calling"}),false);
  assert.equal(matches(check,{...state,drawn:board}),false);
});
test("TV code remains parseable by the TV's older browser and does not trust an asserted winner",()=>{
  assert.doesNotMatch(source,/\b(?:const|let|class)\s|=>|\?\./);
  const result=verify(board,[],"standard");
  assert.equal(result.isWinner,false);
  assert.equal(result.missingCards.length,5);
});
