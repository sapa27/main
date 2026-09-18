#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const app=fs.readFileSync("frontend-v2/app.js","utf8");
const html=fs.readFileSync("frontend-v2/index.html","utf8");
const css=fs.readFileSync("frontend-v2/styles.css","utf8");
let passed=0;
function ok(name,fn){fn();passed++;console.log("ok "+passed+" - "+name)}

ok("V2 JavaScript compiles",()=>new vm.Script(app,{filename:"frontend-v2/app.js"}));
ok("V2 static routes are complete",()=>{
  const routeTokens={
    dashboard:'dashboard:{title:',
    search:'search:{title:',
    meeting:'meeting:{title:',
    report:'report:{title:',
    track:'track:{title:',
    "committee-meeting":'"committee-meeting":{title:',
    petitioner:'petitioner:{title:',
    people:'people:{title:',
    budget:'budget:{title:',
    admin:'admin:{title:'
  };
  for(const [route,token] of Object.entries(routeTokens)){
    assert.ok(app.includes(token),"missing route "+route);
  }
  assert.ok(app.includes('meeting:{title:"จัดการเรื่องพิจารณา",render:routeMeeting}'));
  assert.ok(app.includes("function assertRouteRegistry()"));
  assert.ok(app.includes("V2_MEETING_ROUTE_NOT_STATIC"));
});
ok("legacy dynamic page-loader is absent",()=>{
  for(const token of ["getDeferredInclude","loadPageScripts","pageController","meetingPageScriptLoadTimeout","DEFERRED_FRAGMENT_NOT_FOUND"]){
    assert.ok(!app.includes(token),"legacy token "+token);
  }
});
ok("route lifecycle cancels stale data work",()=>{
  for(const token of ["routeAbort","beginRoute(route)","REQUEST_CANCELLED","epoch!==state.routeEpoch","currentRouteContext()"]){
    assert.ok(app.includes(token),"missing "+token);
  }
});
ok("runtime path is Cloud Run same-origin only",()=>{
  assert.ok(app.includes('const API="/api/router"'));
  assert.ok(app.includes('credentials:"same-origin"'));
  for(const token of ["script.google.com","github.io","github-pages","github-gas-transport"]){
    assert.ok(!app.includes(token),"runtime dependency "+token);
  }
});
ok("read cache and request dedupe are bounded",()=>{
  for(const token of ["READ_TTL","state.cache","state.inflight","cacheHits","dedupHits"]){
    assert.ok(app.includes(token),"missing "+token);
  }
});
ok("Meeting critical path is bounded and secondary tabs are lazy",()=>{
  assert.ok(app.includes("limit:selectable?30:50"));
  assert.ok(app.includes('function loadMeetingTab(kind)'));
  assert.ok(app.includes('call("apiGetCanonicalCaseBundle",identity)'));
  assert.ok(app.includes('panel.dataset.loaded="loading"'));
  const openStart=app.indexOf("async function openCase(row)");
  const openEnd=app.indexOf("function newCase()",openStart);
  const openBlock=app.slice(openStart,openEnd);
  assert.ok(openStart>=0&&openEnd>openStart);
  assert.ok(!openBlock.includes("apiGetMeetingHistory"));
  assert.ok(!openBlock.includes("apiGetLetters"));
  assert.ok(app.includes('await call("apiGetMeetingHistory",identity)'));
  assert.ok(app.includes('await call("apiGetLetters",Object.assign({page:1,limit:100},identity))'));
});
ok("Meeting selector and stale-response guards are safe",()=>{
  assert.ok(app.includes('$("[data-case-index]").forEach'));
  assert.ok(!app.includes('state.selectedCase=row;$("[data-case-index]").forEach'));
  assert.ok(app.includes("if(epoch!==state.routeEpoch||!target.isConnected)return"));
  assert.ok(app.includes("if(isAbortError(e)||epoch!==state.routeEpoch||!target.isConnected)return"));
});

ok("mobile-safe layout exists",()=>{
  assert.ok(html.includes('name="viewport"'));
  assert.ok(css.includes("@media"));
  assert.ok(css.includes(".table-wrap{overflow:auto"));
  assert.ok(css.includes(".tabs{display:flex"));
});
ok("release is cache-busted",()=>{
  assert.ok(html.includes("v2-rebuild-20260918-r3"));
  assert.ok(app.includes('const VERSION="v2-rebuild-20260918-r3"'));
});
console.log("# "+passed+" V2 rebuild regression groups passed");
