const VERSION="v2-rebuild-20260918";
const API="/api/router";
const BOOTSTRAP_METHODS=new Set(["apiLogin","apiLogout","apiSessionCheck","apiSessionResume"]);
const READ_TTL={
  apiGetDashboardBundle:120000,apiSearchCasesLite:90000,apiGetTracking:120000,
  apiGetMeetingLookupOptions:300000,apiGetMeetingHistory:90000,apiGetLetters:90000,
  apiGetCanonicalCaseBundle:90000,apiGetCommitteeMeetingSystem:90000,
  apiGetPeoplePageBundle:120000,apiGetPetitioners:120000,apiBudgetGetSummary:120000,
  apiAdminListUsers:60000,apiAdminListSubcommittees:60000
};
const WRITE_METHODS=new Set(["apiSaveCase","apiDeleteCase","apiSaveMeetingLog","apiDeleteMeetingLog","apiSaveLetter","apiDeleteLetter","apiSavePetitioner","apiDeletePetitioner","apiSaveCommitteeMeetingSystem","apiDeleteCommitteeMeetingSystem","apiAdminSaveUser","apiAdminDeleteUser","apiAdminSaveSubcommittee","apiAdminDeleteSubcommittee","apiBudgetSaveImport","apiBudgetDeleteImport"]);

const state={
  auth:{token:"",csrfToken:"",user:null,role:"viewer"},
  route:"dashboard",routeEpoch:0,routeAbort:null,cache:new Map(),inflight:new Map(),selectedCase:null,
  caseRows:[],meetingBundle:null,perf:{requests:0,cacheHits:0,dedupHits:0,aborts:0,routeStarts:0}
};
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const text=v=>String(v??"").trim();
const num=v=>Number(v)||0;
const now=()=>Date.now();

function toast(message,type=""){
  const box=document.createElement("div");box.className="toast "+type;box.textContent=String(message||"");
  $("#toast-region").appendChild(box);setTimeout(()=>box.remove(),4200);
}
function errorMessage(e){return text(e?.message||e?.error?.message||e?.msg||e?.error||"เกิดข้อผิดพลาด");}
function clientContext(){return{userAgent:navigator.userAgent,viewportWidth:innerWidth,viewportHeight:innerHeight,timezone:Intl.DateTimeFormat().resolvedOptions().timeZone||"",runtime:VERSION};}
function authPayload(payload={}){
  return Object.assign({},payload,{token:state.auth.token,sessionToken:state.auth.token,csrfToken:state.auth.csrfToken,csrf:state.auth.csrfToken,clientContext:payload.clientContext||clientContext()});
}
function isWrite(method){return WRITE_METHODS.has(method)||/^api(?:Admin)?(?:Save|Delete|Update|Queue|Process|Create|Migrate|Repair|Cleanup)/.test(method)}
function cacheKey(method,payload){try{return method+"|"+JSON.stringify(payload)}catch{return""}}
function clearReadCache(){state.cache.clear()}
function isAbortError(e){return !!e&&(e.name==="AbortError"||e.code==="ABORT_ERR"||/aborted|abort/i.test(String(e.message||"")))}
function beginRoute(route){if(state.routeAbort){try{state.routeAbort.abort()}catch{}}state.routeAbort=new AbortController();state.route=route;state.routeEpoch++;state.perf.routeStarts++;return{epoch:state.routeEpoch,signal:state.routeAbort.signal}}
function currentRouteContext(){return{epoch:state.routeEpoch,signal:state.routeAbort&&state.routeAbort.signal||null}}
function normalizeGateway(j){
  if(!j||j.ok!==true){const e=new Error(j?.error?.message||"API request failed");e.code=j?.error?.code||"API_ERROR";throw e}
  return j.result;
}
async function rawCall(method,payload={},opts={}){
  const effective=method;
  const direct=BOOTSTRAP_METHODS.has(method)||opts.direct===true;
  const wireMethod=direct?method:"apiRouter";
  const wirePayload=direct?payload:{method,payload:authPayload(payload)};
  const ttl=opts.noCache?0:(READ_TTL[effective]||0);
  const key=!isWrite(effective)&&ttl?cacheKey(effective,payload):"";
  if(key&&!opts.forceFresh){
    const hit=state.cache.get(key);
    if(hit&&hit.exp>now())return hit.value;
  }
  if(key&&state.inflight.has(key))return state.inflight.get(key);
  const controller=new AbortController();
  const timeout=Math.max(10000,Number(opts.timeout|| (isWrite(effective)?120000:45000)));
  const timer=setTimeout(()=>controller.abort(),timeout);
  const work=fetch(API,{method:"POST",headers:{"Content-Type":"application/json"},credentials:"same-origin",cache:"no-store",body:JSON.stringify({method:wireMethod,payload:wirePayload,timeoutMs:timeout}),signal:opts.signal||controller.signal})
    .then(async r=>{const body=await r.json().catch(()=>null);if(!r.ok)throw new Error(body?.error?.message||("HTTP "+r.status));return normalizeGateway(body)})
    .then(value=>{if(key&&ttl)state.cache.set(key,{value,exp:now()+ttl});if(isWrite(effective))clearReadCache();return value})
    .finally(()=>{clearTimeout(timer);if(key)state.inflight.delete(key)});
  if(key)state.inflight.set(key,work);
  return work;
}
function call(method,payload={},opts={}){return rawCall(method,payload,opts)}

function dataOf(v){
  let x=v;
  for(let i=0;i<4;i++){
    if(x&&typeof x==="object"&&!Array.isArray(x)&&x.data&&typeof x.data==="object"){x=x.data;continue}
    break;
  }
  return x||{};
}
function rowsOf(v){
  const root=dataOf(v);
  const candidates=[root?.rows,root?.items,root?.cases,root?.records,root?.results,root?.data?.rows,v?.rows,v?.data?.rows,v?.data?.data?.rows];
  return candidates.find(Array.isArray)||[];
}
function firstObject(v){
  const x=dataOf(v);return x&&typeof x==="object"&&!Array.isArray(x)?x:{};
}
function authEnvelope(v){
  const candidates=[v,v?.result,v?.data,v?.data?.data,v?.result?.data].filter(x=>x&&typeof x==="object"&&!Array.isArray(x));
  let best=candidates[0]||{};
  for(const x of candidates){
    if(x.token||x.nextToken||x.sessionToken||x.user){best=x;break}
  }
  return best;
}
function firstVal(obj,keys){for(const k of keys){const v=obj?.[k];if(v!==undefined&&v!==null&&v!=="")return v}return""}
function caseKey(row){return text(firstVal(row,["caseNum","caseNo","runningNo","ลำดับเรื่อง"]))}
function recNo(row){return text(firstVal(row,["recNo","receiveNo","เลขรับเรื่อง"]))}
function caseTitle(row){return text(firstVal(row,["title","caseTitle","considerationTitle","ชื่อเรื่อง"]))}
function role(){return text(state.auth.role||state.auth.user?.role||"viewer").toLowerCase()}
function canEdit(){return role()!=="viewer"}

const NAV=[
  ["dashboard","▦","Dashboard"],["search","⌕","ค้นหาเรื่องพิจารณา"],["meeting","✎","จัดการเรื่องพิจารณา"],
  ["report","▤","จัดพิมพ์รายงาน"],["track","✉","ระบบติดตามหนังสือ"],["committee-meeting","◫","การประชุมคณะกรรมาธิการ"],
  ["petitioner","♙","ผู้ร้อง/ผู้เสนอญัตติ"],["people","♟","บุคคล"],["budget","฿","งบประมาณ"],["admin","⚙","การจัดการระบบ"]
];
function renderNav(){
  const r=role();$("#nav").innerHTML=NAV.filter(([id])=>!(r==="viewer"&&(id==="track"||id==="budget"))).map(([id,ic,label])=>`<button class="nav-item ${state.route===id?"active":""}" data-route="${id}"><span class="nav-icon">${ic}</span><span>${label}</span></button>`).join("");
}
function openSidebar(open){$("#sidebar").classList.toggle("open",open);$("#sidebar-overlay").classList.toggle("show",open)}
function setShell(on){
  $("#login-view").classList.toggle("hidden",on);$("#app-shell").classList.toggle("hidden",!on);
  if(on){$("#user-label").textContent=text(state.auth.user?.name||state.auth.user?.username||"");renderNav()}
}
function saveSession(){sessionStorage.setItem("sapa.v2.auth",JSON.stringify(state.auth))}
function clearSession(){sessionStorage.removeItem("sapa.v2.auth");state.auth={token:"",csrfToken:"",user:null,role:"viewer"};clearReadCache()}
function restoreLocalSession(){try{const v=JSON.parse(sessionStorage.getItem("sapa.v2.auth")||"null");if(v?.token)state.auth=v}catch{}}

function pageFrame(title,subtitle="",actions=""){
  return `<section class="page"><div class="page-head"><div><h2>${esc(title)}</h2><div class="muted">${esc(subtitle)}</div></div><div class="page-actions">${actions}</div></div><div id="page-body"></div></section>`;
}
function statusCard(id,label){
  return `<div class="card"><div class="card-head"><strong>${esc(label)}</strong><div class="status-line"><span id="${id}-dot" class="dot loading"></span><span id="${id}-status">กำลังโหลด</span></div></div><div id="${id}-body" class="card-body loading-card">กำลังโหลดข้อมูล</div></div>`;
}
function setCard(id,html,status="พร้อม",ok=true){
  const b=$("#"+id+"-body"),s=$("#"+id+"-status"),d=$("#"+id+"-dot");if(b){b.classList.remove("loading-card");b.innerHTML=html}if(s)s.textContent=status;if(d)d.className="dot "+(ok?"ok":"bad");
}
function table(rows,columns){
  if(!rows.length)return'<div class="empty">ไม่พบข้อมูล</div>';
  const cols=columns||Object.keys(rows[0]||{}).filter(k=>!/^_|token|csrf/i.test(k)).slice(0,8).map(k=>[k,k]);
  return `<div class="table-wrap"><table><thead><tr>${cols.map(c=>`<th>${esc(c[0])}</th>`).join("")}</tr></thead><tbody>${rows.map(row=>`<tr>${cols.map(c=>`<td>${esc(firstVal(row,Array.isArray(c[1])?c[1]:[c[1]]))}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
}
function genericError(id,e){setCard(id,`<div class="error-box">${esc(errorMessage(e))}</div>`,"ผิดพลาด",false)}

async function loadDashboard(epoch){
  try{
    const res=await call("apiGetDashboardBundle",{});
    if(epoch!==state.routeEpoch)return;
    const d=firstObject(res),stats=firstObject(d.stats||d.summary||d);
    const cards=[
      ["เรื่องทั้งหมด",firstVal(stats,["total","totalCases","caseTotal","allCases"])],
      ["เรื่องเข้าใหม่",firstVal(stats,["new","newCases","newCount"])],
      ["กำลังพิจารณา",firstVal(stats,["pending","inProgress","pendingCount"])],
      ["เสร็จสิ้น/ยุติ",firstVal(stats,["closed","completed","closedCount"])]
    ];
    $("#dashboard-stats").innerHTML=cards.map(([k,v])=>`<div class="card stat"><div class="muted">${esc(k)}</div><div class="value">${esc(v||0)}</div></div>`).join("");
    setCard("dashboard-data",`<div class="codebox">${esc(JSON.stringify({stats:d.stats||{},summary:d.summary||{}},null,2))}</div>`,"อัปเดตแล้ว");
  }catch(e){genericError("dashboard-data",e)}
}
function routeDashboard(){
  $("#page-host").innerHTML=pageFrame("Dashboard","ภาพรวมข้อมูลจาก GAS โดยตรง",'<button class="btn" id="dash-refresh">รีเฟรช</button>')+`<div class="page"><div id="dashboard-stats" class="grid cols-4">${[1,2,3,4].map(()=>'<div class="card stat"><div class="muted">กำลังโหลด</div><div class="value">—</div></div>').join("")}</div><div style="height:14px"></div>${statusCard("dashboard-data","ข้อมูลสรุป")}</div>`;
  $("#dash-refresh").onclick=()=>{clearReadCache();loadDashboard(state.routeEpoch)};
  loadDashboard(state.routeEpoch);
}

function searchControls(prefix){
 return `<div class="toolbar"><label>คำค้น<input id="${prefix}-q" placeholder="ลำดับเรื่อง / เลขรับ / ชื่อเรื่อง"></label><button class="btn primary" id="${prefix}-go">ค้นหา</button></div>`;
}
async function searchCases(prefix,selectable=false){
  const q=text($("#"+prefix+"-q")?.value||"");
  const target=$("#"+prefix+"-result");target.innerHTML='<div class="loading-card">กำลังค้นหา</div>';
  try{
    const res=await call("apiSearchCasesLite",{q,query:q,search:q,page:1,limit:50});
    const rows=rowsOf(res);state.caseRows=rows;
    if(!selectable){
      target.innerHTML=table(rows,[["ลำดับเรื่อง",["caseNum","caseNo","runningNo","ลำดับเรื่อง"]],["เลขรับ",["recNo","receiveNo"]],["ชื่อเรื่อง",["title","caseTitle"]],["สถานะ",["status","caseStatus"]],["วันที่รับ",["recDateText","recDate"]]]);
    }else{
      target.innerHTML=rows.length?rows.map((r,i)=>`<div class="list-item" data-case-index="${i}"><strong>${esc(caseKey(r)||recNo(r)||"ไม่ระบุ")}</strong><small>${esc(caseTitle(r)||"-")}</small><span class="badge">${esc(firstVal(r,["status","caseStatus"])||"-")}</span></div>`).join(""):'<div class="empty">ไม่พบข้อมูล</div>';
      $$("[data-case-index]",target).forEach(el=>el.onclick=()=>openCase(rows[Number(el.dataset.caseIndex)]));
    }
  }catch(e){target.innerHTML=`<div class="error-box">${esc(errorMessage(e))}</div>`}
}
function routeSearch(){
  $("#page-host").innerHTML=pageFrame("ค้นหาเรื่องพิจารณา","ค้นหาจาก MainData โดยไม่โหลด page script")+`<div class="page"><div class="card"><div class="card-body">${searchControls("search")}<div style="height:12px"></div><div id="search-result"></div></div></div></div>`;
  $("#search-go").onclick=()=>searchCases("search");$("#search-q").addEventListener("keydown",e=>{if(e.key==="Enter")searchCases("search")});searchCases("search");
}
function routeReport(){
  $("#page-host").innerHTML=pageFrame("จัดพิมพ์รายงาน","ค้นหาและจัดพิมพ์จากข้อมูลปัจจุบัน",'<button id="print-page" class="btn primary">พิมพ์</button>')+`<div class="page"><div class="card"><div class="card-body">${searchControls("report")}<div style="height:12px"></div><div id="report-result"></div></div></div></div>`;
  $("#report-go").onclick=()=>searchCases("report");$("#print-page").onclick=()=>window.print();searchCases("report");
}

const CASE_FIELDS=[
 ["caseId","รหัสเรื่อง","hidden"],["caseNum","ลำดับเรื่อง","text"],["recNo","เลขรับเรื่อง","text"],["offerDate","วันที่เสนอ","date"],["recDate","วันที่รับเรื่อง","date"],
 ["cat","ประเภทเรื่อง","text"],["subCat","ประเด็น","text"],["title","ชื่อเรื่อง","textarea"],["caseTitle","ชื่อเรื่องพิจารณา","textarea"],
 ["petitioners","ผู้เสนอญัตติ/ผู้ร้อง","textarea"],["petitionerPhone","เบอร์โทรศัพท์","text"],["respondent","ผู้ถูกร้อง","text"],
 ["assignees","คณะกรรมาธิการ","text"],["coAssignees","คณะอนุกรรมาธิการ","text"],["staffs","เจ้าหน้าที่","text"],["status","สถานะ","select"],
 ["keySummary","สรุปสาระสำคัญ","textarea"],["pendingRemark","เหตุผลรอการพิจารณา","textarea"],["rejectionReason","เหตุผลไม่รับเรื่อง","textarea"],
 ["closedReason","เหตุผลยุติเรื่อง","textarea"],["agencyName","หน่วยงาน","text"],["remark","หมายเหตุ","textarea"]
];
const STATUSES=["เรื่องเข้าใหม่","ไม่รับเรื่อง","อนุฯ พิจารณา","รอพิจารณา","กมธ. พิจารณา","ยุติเรื่อง","ส่งหน่วยงาน","จัดทำรายงาน"];
function renderCaseForm(row={}){
  return `<form id="case-form" class="form-grid">${CASE_FIELDS.map(([k,l,t])=>{
    const v=firstVal(row,[k,k==="caseNum"?"caseNo":"",k==="recNo"?"receiveNo":""]);
    if(t==="hidden")return`<input type="hidden" name="${k}" value="${esc(v)}">`;
    if(t==="textarea")return`<label class="${["title","caseTitle","keySummary","remark"].includes(k)?"span-2":""}">${esc(l)}<textarea name="${k}">${esc(v)}</textarea></label>`;
    if(t==="select")return`<label>${esc(l)}<select name="${k}">${STATUSES.map(s=>`<option ${text(v)===s?"selected":""}>${s}</option>`).join("")}</select></label>`;
    return`<label>${esc(l)}<input type="${t}" name="${k}" value="${esc(v)}"></label>`;
  }).join("")}<div class="span-2 page-actions"><button type="submit" class="btn primary" ${canEdit()?"":"disabled"}>บันทึกข้อมูลเรื่อง</button><button type="button" class="btn" id="case-reset">ล้างฟอร์ม</button></div></form>`;
}
function formObject(form){return Object.fromEntries(new FormData(form).entries())}
async function saveCase(ev){
  ev.preventDefault();if(!canEdit())return;
  const b=ev.submitter;b.disabled=true;
  try{
    const p=formObject(ev.currentTarget),n=text(p.caseNum);p.caseNo=n;p.runningNo=n;p["ลำดับเรื่อง"]=n;p.receiveNo=p.recNo;p["เลขรับเรื่อง"]=p.recNo;p.petitioner=p.petitioners;
    const res=await call("apiSaveCase",p,{noCache:true});toast(firstVal(firstObject(res),["message","msg"])||"บันทึกข้อมูลเรื่องสำเร็จ","ok");
    state.selectedCase=Object.assign({},p,firstObject(dataOf(res)));await searchCases("meeting",true);
  }catch(e){toast(errorMessage(e),"error")}finally{b.disabled=false}
}
function meetingTabs(){
 return `<div class="tabs" id="meeting-tabs"><button class="tab active" data-tab="case">ข้อมูลเรื่อง</button><button class="tab" data-tab="history">ประวัติการประชุม</button><button class="tab" data-tab="letters">หนังสือติดตามมติ</button></div>
 <div id="tab-case" class="tab-panel active"></div><div id="tab-history" class="tab-panel"></div><div id="tab-letters" class="tab-panel"></div>`;
}
function bindTabs(){
  $$(".tab","#meeting-tabs").forEach(btn=>btn.onclick=()=>{$$(".tab","#meeting-tabs").forEach(x=>x.classList.toggle("active",x===btn));$$(".tab-panel").forEach(p=>p.classList.toggle("active",p.id==="tab-"+btn.dataset.tab))});
}
async function openCase(row){
  state.selectedCase=row;$$("[data-case-index]").forEach(el=>el.classList.toggle("active",state.caseRows[Number(el.dataset.caseIndex)]===row));
  $("#tab-case").innerHTML=renderCaseForm(row);$("#case-form").onsubmit=saveCase;$("#case-reset").onclick=()=>newCase();
  $("#tab-history").innerHTML='<div class="loading-card">กำลังโหลดประวัติการประชุม</div>';
  $("#tab-letters").innerHTML='<div class="loading-card">กำลังโหลดหนังสือติดตามมติ</div>';
  const identity={caseId:firstVal(row,["caseId","id"]),caseNum:caseKey(row),caseNo:caseKey(row),runningNo:caseKey(row),recNo:recNo(row),title:caseTitle(row)};
  const settled=await Promise.allSettled([
    call("apiGetCanonicalCaseBundle",identity),
    call("apiGetMeetingHistory",identity),
    call("apiGetLetters",Object.assign({page:1,limit:100},identity))
  ]);
  if(state.selectedCase!==row)return;
  if(settled[0].status==="fulfilled"){
    const bundle=firstObject(dataOf(settled[0].value));state.meetingBundle=bundle;
    const enriched=bundle.case||bundle.caseRow||bundle.main||bundle.data||row;
    $("#tab-case").innerHTML=renderCaseForm(Object.assign({},row,enriched));$("#case-form").onsubmit=saveCase;$("#case-reset").onclick=()=>newCase();
  }
  if(settled[1].status==="fulfilled")$("#tab-history").innerHTML=renderHistory(rowsOf(settled[1].value),identity);else $("#tab-history").innerHTML=`<div class="error-box">${esc(errorMessage(settled[1].reason))}</div>`;
  if(settled[2].status==="fulfilled")$("#tab-letters").innerHTML=renderLetters(rowsOf(settled[2].value),identity);else $("#tab-letters").innerHTML=`<div class="error-box">${esc(errorMessage(settled[2].reason))}</div>`;
}
function newCase(){
  state.selectedCase=null;$("#tab-case").innerHTML=renderCaseForm({status:"เรื่องเข้าใหม่"});$("#case-form").onsubmit=saveCase;$("#case-reset").onclick=()=>newCase();$("#tab-history").innerHTML='<div class="empty">บันทึกข้อมูลเรื่องก่อนเพิ่มประวัติการประชุม</div>';$("#tab-letters").innerHTML='<div class="empty">บันทึกข้อมูลเรื่องก่อนเพิ่มหนังสือติดตาม</div>';
}
function renderHistory(rows,identity){
  const form=canEdit()?`<form id="history-form" class="form-grid"><label>ครั้งที่<input name="round" required></label><label>วันที่ประชุม<input name="date" type="date" required></label><label class="span-2">ผลการพิจารณา/สรุป<textarea name="result"></textarea></label><button class="btn primary" type="submit">เพิ่มประวัติการประชุม</button></form><hr>`:"";
  queueMicrotask(()=>{const f=$("#history-form");if(f)f.onsubmit=e=>saveHistory(e,identity)});
  return form+table(rows,[["ครั้งที่",["round","meetingRound"]],["วันที่",["date","meetingDate","meetingDateText"]],["คณะ",["committee","subcommittee"]],["ผลการพิจารณา",["result","note","summary"]]]);
}
async function saveHistory(e,identity){
 e.preventDefault();const b=e.submitter;b.disabled=true;try{const p=Object.assign({},identity,formObject(e.currentTarget));p.note=p.result;const res=await call("apiSaveMeetingLog",p,{noCache:true});toast("บันทึกประวัติการประชุมสำเร็จ","ok");const rows=rowsOf(await call("apiGetMeetingHistory",identity,{forceFresh:true}));$("#tab-history").innerHTML=renderHistory(rows,identity)}catch(x){toast(errorMessage(x),"error")}finally{b.disabled=false}
}
function renderLetters(rows,identity){
  const form=canEdit()?`<form id="letter-form" class="form-grid"><label>เลขหนังสือ<input name="letterNo"></label><label>วันที่หนังสือ<input name="letterDate" type="date"></label><label>หน่วยงาน<input name="agency"></label><label>กำหนดตอบ<input name="dueDate" type="date"></label><label class="span-2">เรื่อง/รายละเอียด<textarea name="subject"></textarea></label><button class="btn primary" type="submit">เพิ่มหนังสือติดตาม</button></form><hr>`:"";
  queueMicrotask(()=>{const f=$("#letter-form");if(f)f.onsubmit=e=>saveLetter(e,identity)});
  return form+table(rows,[["เลขหนังสือ",["letterNo","bookNo"]],["วันที่",["letterDate"]],["หน่วยงาน",["agency"]],["เรื่อง",["subject"]],["กำหนดตอบ",["dueDate","lastExtendDate"]]]);
}
async function saveLetter(e,identity){
 e.preventDefault();const b=e.submitter;b.disabled=true;try{const p=Object.assign({},identity,formObject(e.currentTarget));p.bookNo=p.letterNo;const res=await call("apiSaveLetter",p,{noCache:true});toast("บันทึกหนังสือติดตามสำเร็จ","ok");const rows=rowsOf(await call("apiGetLetters",Object.assign({page:1,limit:100},identity),{forceFresh:true}));$("#tab-letters").innerHTML=renderLetters(rows,identity)}catch(x){toast(errorMessage(x),"error")}finally{b.disabled=false}
}
function routeMeeting(){
  $("#page-host").innerHTML=pageFrame("จัดการเรื่องพิจารณา","V2: route/controller ถูกประกาศตายตัว ไม่มี deferred page script",'<button id="meeting-new" class="btn primary">เพิ่มเรื่องใหม่</button><button id="meeting-refresh" class="btn">รีเฟรช</button>')+`<div class="page"><div class="split"><div class="card"><div class="card-head"><strong>รายการเรื่อง</strong></div><div class="card-body">${searchControls("meeting")}</div><div id="meeting-result" class="listbox"></div></div><div class="card"><div class="card-body">${meetingTabs()}</div></div></div></div>`;
  bindTabs();$("#meeting-go").onclick=()=>searchCases("meeting",true);$("#meeting-new").onclick=newCase;$("#meeting-refresh").onclick=()=>{clearReadCache();searchCases("meeting",true)};newCase();searchCases("meeting",true);
}
async function genericPageLoad(cardId,method,payload={},columns=null){
 try{const res=await call(method,payload);setCard(cardId,table(rowsOf(res),columns),"อัปเดตแล้ว")}catch(e){genericError(cardId,e)}
}
function routeTrack(){
 $("#page-host").innerHTML=pageFrame("ระบบติดตามหนังสือ","ข้อมูลหนังสือติดตามแบบ server-paged")+`<div class="page">${statusCard("track-data","รายการติดตาม")}</div>`;
 genericPageLoad("track-data","apiGetTracking",{page:1,limit:100});
}
function routeCommitteeMeeting(){
 $("#page-host").innerHTML=pageFrame("การประชุมคณะกรรมาธิการ","หน้าแยกจากจัดการเรื่องพิจารณาอย่างชัดเจน")+`<div class="page">${statusCard("committee-data","รายการการประชุม")}</div>`;
 genericPageLoad("committee-data","apiGetCommitteeMeetingSystem",{page:1,limit:100});
}
function routePeople(){
 $("#page-host").innerHTML=pageFrame("บุคคล","ข้อมูลบุคคลจาก backend canonical owner")+`<div class="page">${statusCard("people-data","รายการบุคคล")}</div>`;
 genericPageLoad("people-data","apiGetPeoplePageBundle",{page:1,limit:100});
}
function routePetitioner(){
 $("#page-host").innerHTML=pageFrame("ผู้ร้อง / ผู้เสนอญัตติ","ข้อมูลผู้ร้องและผู้เสนอญัตติ")+`<div class="page">${statusCard("petitioner-data","รายการผู้ร้อง")}</div>`;
 genericPageLoad("petitioner-data","apiGetPetitioners",{page:1,limit:100});
}
function routeBudget(){
 $("#page-host").innerHTML=pageFrame("งบประมาณ","สรุปงบประมาณจาก backend")+`<div class="page">${statusCard("budget-data","สรุปงบประมาณ")}</div>`;
 call("apiBudgetGetSummary",{}).then(r=>setCard("budget-data",`<div class="codebox">${esc(JSON.stringify(dataOf(r),null,2))}</div>`,"อัปเดตแล้ว")).catch(e=>genericError("budget-data",e));
}
function routeAdmin(){
 $("#page-host").innerHTML=pageFrame("การจัดการระบบ","ข้อมูลผู้ใช้และคณะอนุกรรมาธิการ")+`<div class="page grid cols-2">${statusCard("admin-users","ผู้ใช้งาน")}${statusCard("admin-sub","คณะอนุกรรมาธิการ")}</div>`;
 Promise.allSettled([call("apiAdminListUsers",{page:1,limit:100}),call("apiAdminListSubcommittees",{page:1,limit:100})]).then(([a,b])=>{a.status==="fulfilled"?setCard("admin-users",table(rowsOf(a.value)),"อัปเดตแล้ว"):genericError("admin-users",a.reason);b.status==="fulfilled"?setCard("admin-sub",table(rowsOf(b.value)),"อัปเดตแล้ว"):genericError("admin-sub",b.reason)});
}

const ROUTES={
 dashboard:{title:"Dashboard",render:routeDashboard},search:{title:"ค้นหาเรื่องพิจารณา",render:routeSearch},
 meeting:{title:"จัดการเรื่องพิจารณา",render:routeMeeting},report:{title:"จัดพิมพ์รายงาน",render:routeReport},
 track:{title:"ระบบติดตามหนังสือ",render:routeTrack},"committee-meeting":{title:"การประชุมคณะกรรมาธิการ",render:routeCommitteeMeeting},
 people:{title:"บุคคล",render:routePeople},petitioner:{title:"ผู้ร้อง/ผู้เสนอญัตติ",render:routePetitioner},
 budget:{title:"งบประมาณ",render:routeBudget},admin:{title:"การจัดการระบบ",render:routeAdmin}
};
function go(route,replace=false){
 route=text(route||"dashboard").replace(/^#\/?/,"");if(!ROUTES[route])route="dashboard";
 if(role()==="viewer"&&(route==="track"||route==="budget"))route="dashboard";
 state.route=route;state.routeEpoch++;$("#route-title").textContent=ROUTES[route].title;renderNav();openSidebar(false);
 if((location.hash||"").replace(/^#\/?/,"")!==route){history[replace?"replaceState":"pushState"](null,"","#/"+route)}
 $("#page-host").innerHTML="";try{ROUTES[route].render()}catch(e){$("#page-host").innerHTML=pageFrame("เปิดหน้าไม่สำเร็จ","V2 route registry error")+`<div class="error-box">${esc(errorMessage(e))}</div>`;console.error(e)}
 $("#main").focus({preventScroll:true});
}
async function login(e){
 e.preventDefault();const btn=$("#login-submit"),err=$("#login-error");btn.disabled=true;err.classList.add("hidden");
 try{
  const username=text($("#login-username").value),password=$("#login-password").value;
  const res=await call("apiLogin",{username,email:username,password,clientContext:clientContext()},{direct:true,noCache:true,timeout:45000});
  const d=authEnvelope(res),token=text(d.token||d.nextToken||d.sessionToken),user=d.user||d.account||{};
  if(!token)throw new Error(firstVal(d,["msg","message","error"])||"ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
  state.auth={token,csrfToken:text(d.csrfToken||d.csrf),user,role:text(user.role||"viewer").toLowerCase()};saveSession();setShell(true);go("dashboard",true);
 }catch(x){err.textContent=errorMessage(x);err.classList.remove("hidden")}finally{btn.disabled=false}
}
async function logout(){
 const p={token:state.auth.token,csrfToken:state.auth.csrfToken};try{await call("apiLogout",p,{direct:true,noCache:true,timeout:30000})}catch{}clearSession();setShell(false);history.replaceState(null,"","#/login");
}
async function boot(){
 $("#runtime-badge").textContent=VERSION;$("#login-form").onsubmit=login;$("#logout-btn").onclick=logout;$("#menu-toggle").onclick=()=>openSidebar(true);$("#sidebar-overlay").onclick=()=>openSidebar(false);
 $("#nav").addEventListener("click",e=>{const b=e.target.closest("[data-route]");if(b)go(b.dataset.route)});
 addEventListener("popstate",()=>{if(state.auth.token)go(location.hash||"dashboard",true)});
 restoreLocalSession();
 if(state.auth.token){
   try{const r=await call("apiSessionCheck",{token:state.auth.token,sessionToken:state.auth.token},{direct:true,noCache:true,timeout:30000});const d=authEnvelope(r);if(d?.user)state.auth.user=d.user;if(d?.role)state.auth.role=d.role;if(d?.user?.role)state.auth.role=d.user.role;saveSession();setShell(true);go(location.hash||"dashboard",true);return}catch{clearSession()}
 }
 setShell(false);
}
boot();
