var __APP_GLOBAL__=(typeof __APP_GLOBAL__!=='undefined'&&__APP_GLOBAL__)||(typeof globalThis!=='undefined'&&globalThis)||this||{};
var AppDomain=__APP_GLOBAL__.AppDomain=__APP_GLOBAL__.AppDomain||{};
var PeopleDomain=__APP_GLOBAL__.PeopleDomain=__APP_GLOBAL__.PeopleDomain||{};
var PetitionerDomain=__APP_GLOBAL__.PetitionerDomain=__APP_GLOBAL__.PetitionerDomain||{};
var AdminDomain=__APP_GLOBAL__.AdminDomain=__APP_GLOBAL__.AdminDomain||{};
var PEOPLE_DOMAIN_DTO_REFACTOR_STAMP='people-domain-dto-no-envelope-refactor-2026-06-15';
PeopleDomain.dto=function(data,meta){
return Object.assign({
domain:'people',contractOwner:'Code_33_Domain_People',stamp:PEOPLE_DOMAIN_DTO_REFACTOR_STAMP
},data||{
},{
meta:Object.assign({
dtoOnly:true
},meta||{
})
});
};
var PHASE5_PEOPLE_DOMAIN_OWNER_STAMP="phase5-domain-owner-cleanup-current";
function _peopleDomainOwnerContractPhase5_(){
return{
ok:!0,
owner:"PeopleDomain/PetitionerDomain/AdminDomain",
codeOwner:"Code_33_Domain_People",
stamp:PHASE5_PEOPLE_DOMAIN_OWNER_STAMP,
apiFacadeMode:"thin-api-to-domain-owner",
apiNamesPreserved:!0,
uiDomChanged:!1,
businessLogicChanged:!1,
noNewFiles:!0
};
}
var PEOPLE_DOMAIN_OWNER_LOCK_C5="c5-people-admin-domain-owner-lock-current";
PeopleDomain.OWNER_CONTRACT={
ok:true,
owner:"Code_33_Domain_People",
stamp:PEOPLE_DOMAIN_OWNER_LOCK_C5,
domains:["PeopleDomain","PetitionerDomain","AdminDomain"],
sourceOfTruth:["People","Petitioners","Users","Subcommittees"],
routerFacadeOnly:true,
appServicesDependency:false,
uiDomChanged:false,
businessLogicChanged:false
};
var PEOPLE_READ_MODEL_LOCK="people-read-model-current";
function _peopleAuthErrorResult_(e,route){
var msg=String(e&&e.message?e.message:e||"ไม่พบ token การใช้งาน");
return(msg.indexOf("token")>-1||msg.indexOf("session")>-1||msg.indexOf("สิทธิ")>-1)&&(msg="session หมดอายุหรือไม่พบ token การใช้งาน กรุณาเข้าสู่ระบบใหม่"),err_(msg,{
rows:[],data:[],items:[],records:[],list:[],values:[],totalRecords:0,total:0,authRequired:!0,route:String(route||""),source:"people-auth-guard"
})
}
function _peopleSafeReq_(payload,role,route){
return safeDomainRequest_(payload,role||"viewer",route,_peopleAuthErrorResult_)
}
function _peopleMarkDirtyDomains_(domains,reason){
try{
var fn=__APP_GLOBAL__&&__APP_GLOBAL__._performanceMarkDirtyDomains_;
"function"==typeof fn&&fn(domains,reason)
}
catch(_dirtyDomainsErr){
_appIsFnName_("_recordWarning_")?_recordWarning_("ec",_dirtyDomainsErr):_appIsFnName_("_logWarn_")?_logWarn_("ec",{
error:String(_dirtyDomainsErr&&_dirtyDomainsErr.message||_dirtyDomainsErr)
}):void _dirtyDomainsErr
}
}
function _peopleNormalizeKey_(key){
return _appIsFnName_("_normFieldKey_")?_normFieldKey_(key):String(null==key?"":key).replace(/[\u200B-\u200D\uFEFF]/g,"").replace(/[\s\n\r\t\-–—_()（）\[\]{}:：\/\\.]+/g,"").toLowerCase()
}
function _peopleBuildNormalizedRowIndex_(row){
var index={
};
return Object.keys(row||{
}).forEach(function(key){
var nk=_peopleNormalizeKey_(key);
nk&&(Object.prototype.hasOwnProperty.call(index,nk)&&""!==String(null==index[nk]?"":index[nk]).trim()||(index[nk]=row[key]))
}),index
}
function _peopleNormalizedSearchKey_(parts){
return(parts=Array.isArray(parts)?parts:[parts]).map(function(v){
return String(null==v?"":v).replace(/[\u200B-\u200D\uFEFF]/g,"").replace(/\s+/g," ").trim().toLowerCase()
}).filter(Boolean).join(" ")
}
function _peopleCanonicalPersonnelDto_(row){
row=Object.assign({
},row||{
});
var name=String(row.name||row.fullName||row["ชื่อ-สกุล"]||"").trim(),position=String(row.position||row.role||row["ตำแหน่ง"]||"").trim(),status=String(row.status||row["สถานะ"]||"ดำรงตำแหน่ง").trim()||"ดำรงตำแหน่ง",fyKey=String(row.fy||row.fiscalYear||row["ปีงบประมาณ"]||"").replace(/[^0-9]/g,""),salary=row.salaryAmount;
return null!=salary&&""!==salary||(salary=row.monthlySalary),null!=salary&&""!==salary||(salary=row.salary),row.name=name,row.fullName=row.fullName||name,row.position=position,row.role=row.role||position,row.status=status,row.fy=row.fy||fyKey,row.fiscalYear=row.fiscalYear||fyKey,row.salaryAmount=null==salary?"":salary,row.salary=row.salary||row.salaryAmount,row.monthlySalary=row.monthlySalary||row.salaryAmount,row.nameKey=_peopleNormalizeKey_(name),row.roleKey=_peopleNormalizeKey_(position),row.statusKey=_peopleNormalizeKey_(status),row.fyKey=fyKey,row.searchKey=_peopleNormalizedSearchKey_([row.name,row.position,row.personnelType,row.phone,row.proposedBy,row.status,row.fyKey]),row.isActive=_peopleIsActiveStatus_(status),row.schemaStamp=row.schemaStamp||"domain-schema-people-current",row.contractStamp=row.contractStamp||"people-personnel-dto-current",row
}
function _peopleFirstValue_(row,keys){
row=row||{
},keys=Array.isArray(keys)?keys:[];
for(var normalized=null,i=0;
i<keys.length;
i++){
var key=keys[i];
if(void 0!==row[key]&&null!==row[key]&&""!==String(row[key]).trim())return row[key];
normalized||(normalized=_peopleBuildNormalizedRowIndex_(row));
var normalizedKey=_peopleNormalizeKey_(key);
if(normalizedKey&&void 0!==normalized[normalizedKey]&&null!==normalized[normalizedKey]&&""!==String(normalized[normalizedKey]).trim())return normalized[normalizedKey]
}
return""
}
function _peopleBoolDeleted_(value){
if(!0===value)return!0;
var s=String(null==value?"":value).trim().toLowerCase();
return"true"===s||"1"===s||"y"===s||"yes"===s||"deleted"===s||"ลบ"===s
}
function _peopleApiOk_(fn,emptyValue,msg){
try{
return ok_("function"==typeof fn?fn():emptyValue,msg||"โหลดข้อมูลสำเร็จ")
}
catch(e){
try{
audit_&&audit_("people.api.recovered","",String(e&&e.message?e.message:e))
}
catch(_auditErr){
_appIsFnName_("_recordWarning_")&&_recordWarning_("ec",_auditErr)
}
return ok_(emptyValue,"ไม่สามารถอ่านข้อมูลบางส่วนได้ ระบบส่งข้อมูลว่างเพื่อไม่ให้หน้าเว็บล้ม")
}
}
function _peopleInferFiscalYearFromDates_(startDate,endDate){
function parse(v){
var normalized=_normalizePeopleDateValue_(v);
if(!normalized)return null;
if("[object Date]"===Object.prototype.toString.call(normalized)&&!isNaN(normalized.getTime()))return normalized;
var raw=String(normalized||"").trim(),m=raw.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
if(m){
var iy=Number(m[1]);
return iy>2400&&(iy-=543),new Date(iy,Number(m[2])-1,Number(m[3]))
}
var d=new Date(raw);
return isNaN(d.getTime())?null:d
}
var d=parse(startDate)||parse(endDate);
return d?String(d.getMonth()>=9?d.getFullYear()+544:d.getFullYear()+543):""
}
function _peopleIsActiveStatus_(status){
var s=String(null==status?"":status).trim().toLowerCase();
return!s||"ดำรงตำแหน่ง"===s||"ใช้งาน"===s||"active"===s||-1!==s.indexOf("ดำรง")
}
function _peopleEndDateForStatus_(status,endDate){
return _peopleIsActiveStatus_(status)?"":_normalizePeopleDateValue_(endDate||"")
}
function _peopleNormalizePersonnelSavePatch_(patch){
(patch=Object.assign({
},patch||{
})).status=String(patch.status||"ดำรงตำแหน่ง").trim(),patch.startDate=_normalizePeopleDateValue_(patch.startDate||""),patch.endDate=_peopleEndDateForStatus_(patch.status,patch.endDate||"");
var fy=_peopleInferFiscalYearFromDates_(patch.startDate,patch.endDate)||"";
return fy&&(patch.fy=patch.fy||fy,patch.fiscalYear=patch.fiscalYear||fy),patch.contractStamp="people-save-backend-owned-current",patch
}
function _peopleFindActiveDuplicate_(sheetName,patch,currentId,mapper){
var name=_peopleNormalizeKey_((patch=patch||{
}).name||""),pos=_peopleNormalizeKey_(patch.position||"");
if(!name||!pos||!_peopleIsActiveStatus_(patch.status))return null;
var rows=[];
try{
rows=_readPeopleSheetRowsDirect_(sheetName)||[]
}
catch(_e){
rows=[]
}
for(var i=0;
i<rows.length;
i++){
var r=mapper?mapper(rows[i]):rows[i];
if(r){
var rid=String(r.id||"").trim();
if((!currentId||!rid||String(currentId)!==rid)&&_peopleIsActiveStatus_(r.status)&&_peopleNormalizeKey_(r.name||"")===name&&_peopleNormalizeKey_(r.position||"")===pos)return r
}
}
return null
}
function _peopleActiveDuplicateResult_(dup){
var out=err_("พบข้อมูลซ้ำ: บุคคลนี้มีตำแหน่งเดียวกันและยังดำรงตำแหน่งอยู่ ไม่สามารถบันทึกซ้ำได้");
return out.errorCode="PEOPLE_ACTIVE_DUPLICATE",out.duplicate=dup||{
},out
}
function normalizePersonnelStaffRow_(r){
var startDate=_peopleFirstValue_(r=r||{
},["startDate","วันที่เริ่ม","วันเริ่ม","เริ่มต้น","วันเริ่มต้น","วันที่เริ่มดำรงตำแหน่ง","วันเริ่มดำรงตำแหน่ง","วันที่แต่งตั้ง","วันแต่งตั้ง","วันเริ่ม-สิ้นสุด","วันเริ่ม - สิ้นสุด"])||"",endDate=_peopleFirstValue_(r,["endDate","วันที่สิ้นสุด","วันสิ้นสุด","สิ้นสุด","วันสิ้นสุดตำแหน่ง","วันที่พ้นตำแหน่ง","วันพ้นตำแหน่ง","วันที่สิ้นสุดดำรงตำแหน่ง"])||"";
if(startDate&&!endDate&&/\s(?:-|–|—|ถึง)\s/.test(String(startDate))){
var rangeParts=String(startDate).split(/\s(?:-|–|—|ถึง)\s/);
startDate=rangeParts[0]||startDate,endDate=rangeParts.slice(1).join(" ").trim()
}
startDate=_normalizePeopleDateValue_(startDate||""),endDate=_normalizePeopleDateValue_(endDate||"");
var fy=String(_peopleFirstValue_(r,["fy","fiscalYear","FiscalYear","ปีงบประมาณ","ปีงบ","ปีงบฯ","ปีงบประมาณ (ที่ปรึกษา/บุคลากร)","ปีงบประมาณที่ปรึกษาบุคลากร","ปี"])||"").replace(/[^0-9]/g,""),status=String(_peopleFirstValue_(r,["status","สถานะ","สถานะการดำรงตำแหน่ง","Status"])||"ดำรงตำแหน่ง").trim();
return endDate=_peopleEndDateForStatus_(status,endDate),fy||(fy=_peopleInferFiscalYearFromDates_(startDate,endDate)),_peopleCanonicalPersonnelDto_({
id:String(_peopleFirstValue_(r,["id","รหัส","ลำดับ","เลขที่","รหัสบุคลากร"])||""),fy:fy,name:String(_peopleFirstValue_(r,["name","ชื่อ-สกุล","ชื่อสกุล","ชื่อ - สกุล","ชื่อ-นามสกุล","ชื่อ - นามสกุล","ชื่อ","ชื่อบุคลากร","ชื่อและสกุล","ชื่อ นามสกุล","fullName","Name"])||""),position:String(_peopleFirstValue_(r,["position","ตำแหน่ง","ตำแหน่งในคณะ","role","ตำแหน่งงาน","Position"])||""),personnelType:String(_peopleFirstValue_(r,["personnelType","ประเภทบุคลากร","ประเภท","สถานภาพ"])||""),phone:_appPhoneForDisplay_(_peopleFirstValue_(r,["phone","เบอร์โทร","เบอร์โทรศัพท์","โทรศัพท์","หมายเลขโทรศัพท์"])||""),proposedBy:String(_peopleFirstValue_(r,["proposedBy","กรรมาธิการผู้เสนอ","ผู้เสนอ","ผู้เสนอชื่อ"])||""),startDate:startDate,endDate:endDate,status:status,orderRef:String(_peopleFirstValue_(r,["orderRef","เลขที่คำสั่ง","คำสั่ง","คำสั่งแต่งตั้ง"])||""),remark:String(_peopleFirstValue_(r,["remark","หมายเหตุ","รายละเอียด"])||""),createdAt:_peopleFirstValue_(r,["createdAt","วันที่สร้าง"])||"",updatedAt:_peopleFirstValue_(r,["updatedAt","วันที่แก้ไข"])||"",isGov:String(_peopleFirstValue_(r,["isGov","ข้าราชการ","เป็นข้าราชการ","สถานะข้าราชการ"])||""),commandRef:String(_peopleFirstValue_(r,["commandRef","commandFileUrl","ไฟล์คำสั่ง","คำสั่ง(แนบ)"])||""),commandFileUrl:String(_peopleFirstValue_(r,["commandFileUrl","commandRef","ไฟล์คำสั่ง","คำสั่ง(แนบ)"])||""),salaryAmount:_peopleFirstValue_(r,["salaryAmount","monthlySalary","salary","salaryBaht","เงินเดือน (บาท)","เงินเดือน","เงินเดือนบาท","amount"])||"",salary:_peopleFirstValue_(r,["salary","salaryAmount","monthlySalary","salaryBaht","เงินเดือน (บาท)","เงินเดือน","เงินเดือนบาท","amount"])||"",isDeleted:_peopleBoolDeleted_(_peopleFirstValue_(r,["isDeleted","ลบ","สถานะลบ"])||r.isDeleted),deletedAt:_peopleFirstValue_(r,["deletedAt","วันที่ลบ"])||""
})
}
function _peopleRepo_(sheetName,keyField){
var aliasMap,canonicalName={
Personnel_Comm:"people.personnelComm",Personnel_Op:"people.personnelOp",Personnel_Staff:"people.personnelStaff",Personnel_Subcommittees:"people.personnelSubcommittees",Subcommittees:"people.subcommittees",Petitioners:"people.petitioners"
}
[String(sheetName||"").trim()]||"";
return canonicalName?getCanonicalRepository_(canonicalName):makeSheetRepository_(sheetName,keyField||"id",{
createdAtField:"createdAt",updatedAtField:"updatedAt",requireCanonical:!0
})
}
function _peopleDataServiceRows_(sheetName,fields,opts){
return opts=opts||{
},fields=Array.isArray(fields)?fields:[],_appIsFnName_("_appDataServiceRead_")?_appDataServiceRead_(String(sheetName||""),fields,Object.assign({
owner:"people.domain",ttl:120,includeDeleted:!1,requireCanonical:!1
},opts))||[]:fields.length&&"function"==typeof readSheetProjectedObjectsCached_?readSheetProjectedObjectsCached_(String(sheetName||""),fields,{
includeDeleted:!0===opts.includeDeleted,requireCanonical:!0===opts.requireCanonical,ttl:opts.ttl||120
})||[]:"function"==typeof readSheetObjectsCached_?readSheetObjectsCached_(String(sheetName||""),{
includeDeleted:!0===opts.includeDeleted,requireCanonical:!0===opts.requireCanonical
})||[]:readSheetObjects_(String(sheetName||""),{
includeDeleted:!0===opts.includeDeleted,requireCanonical:!0===opts.requireCanonical
})||[]
}
function _readPeopleSheetRowsDirect_(sheetName){
if(!(sheetName=String(sheetName||"").trim()))return[];
var peopleSourceFields=["id","รหัส","ลำดับ","เลขที่","รหัสบุคลากร","petId","petitionerId","idCard","name","fullName","Name","ชื่อ-สกุล","ชื่อสกุล","ชื่อ - สกุล","ชื่อ-นามสกุล","ชื่อ - นามสกุล","ชื่อ","ชื่อบุคลากร","ชื่อและสกุล","ชื่อ นามสกุล","position","Position","ตำแหน่ง","ตำแหน่งในคณะ","role","ตำแหน่งงาน","personnelType","ประเภทบุคลากร","ประเภท","สถานภาพ","phone","เบอร์โทร","เบอร์โทรศัพท์","โทรศัพท์","หมายเลขโทรศัพท์","salary","salaryAmount","monthlySalary","salaryBaht","เงินเดือน (บาท)","เงินเดือน","เงินเดือนบาท","amount","fy","fiscalYear","FiscalYear","ปีงบประมาณ","ปีงบ","ปีงบฯ","ปี","province","จังหวัด","addressLine","subDistrict","district","postalCode","caseId","address","proposedBy","กรรมาธิการผู้เสนอ","ผู้เสนอ","ผู้เสนอชื่อ","startDate","endDate","วันที่เริ่ม","วันเริ่ม","วันที่เริ่มดำรงตำแหน่ง","วันที่แต่งตั้ง","วันที่สิ้นสุด","วันสิ้นสุด","วันที่พ้นตำแหน่ง","status","Status","สถานะ","สถานะการดำรงตำแหน่ง","orderRef","เลขที่คำสั่ง","คำสั่ง","remark","note","หมายเหตุ","createdAt","updatedAt","isGov","ข้าราชการ","เป็นข้าราชการ","commandRef","commandFileUrl","ไฟล์คำสั่ง","sortOrder","orderNo","order","displayOrder","ลำดับที่","personId","subcommitteeId","subcommitteeName","subcommittee","คณะอนุกรรมาธิการ","ชื่อคณะอนุกรรมาธิการ","รหัสคณะอนุกรรมาธิการ","appointmentDate","วันที่แต่งตั้ง","วันแต่งตั้ง","note","isDeleted","deleted","ลบแล้ว","deletedAt"];
function visible(r){
if(!r||isSoftDeletedRow_(r))return!1;
var first=String(_peopleFirstValue_(r,["id","petId","name","ชื่อ-สกุล","ชื่อสกุล","ชื่อ - สกุล","ชื่อ-นามสกุล","ชื่อ - นามสกุล","ชื่อ","ชื่อบุคลากร","ชื่อและสกุล","ชื่อ นามสกุล","fullName","Name","รหัส","ลำดับ","เลขที่"])||"").trim(),second=String(_peopleFirstValue_(r,["position","ตำแหน่ง","ตำแหน่งในคณะ","role","ตำแหน่งงาน","Position","phone","เบอร์โทร","เบอร์โทรศัพท์","โทรศัพท์"])||"").trim(),third=String(_peopleFirstValue_(r,["fy","fiscalYear","FiscalYear","ปีงบประมาณ","ปีงบ","ปีงบฯ","ปี","status","สถานะ","สถานะการดำรงตำแหน่ง","Status"])||"").trim();
return!!(first||second||third)||Object.keys(r||{
}).some(function(k){
return""!==String(null==r[k]?"":r[k]).trim()
})
}
function filterRows(rows){
return(Array.isArray(rows)?rows:[]).filter(visible)
}
function rowsFromMatrix_(matrix){
if((matrix=Array.isArray(matrix)?matrix:[]).length<2)return[];
var headers=(matrix[0]||[]).map(function(h){
return String(null==h?"":h).trim()
});
return matrix.slice(1).map(function(line,idx){
var obj={
__rowNumber:idx+2
};
return headers.forEach(function(h,c){
h&&(obj[h]=line[c])
}),obj
})
}
var attempts=[];
try{
var projected=filterRows(_peopleDataServiceRows_(sheetName,peopleSourceFields,{
includeDeleted:!1,requireCanonical:!1,ttl:60,owner:"people.direct"
})||[]);
if(projected.length)return projected;
attempts.push("sharedDataService:empty")
}
catch(projectedErr){
attempts.push("projected:"+String(projectedErr&&projectedErr.message||projectedErr)),_appIsFnName_("_recordWarning_")&&_recordWarning_("people.read.projected.failed",projectedErr,{
sheetName:sheetName
})
}
attempts.push("cachedSheetObjects:removed_shared_data_service_owner");
try{
var allowMatrixRead=!!_appIsFnName_("_productionHotPathFullSheetReadAllowed_")&&_productionHotPathFullSheetReadAllowed_("people.read."+sheetName);
if(allowMatrixRead){
var sh="function"==typeof getSheet_?getSheet_(sheetName):null;
if(sh){
var matrix,direct=filterRows(rowsFromMatrix_("function"==typeof getSheetMatrixCached_?getSheetMatrixCached_(sh,0,{
allowFullMatrix:allowMatrixRead
}):"function"==typeof getSheetMatrix_?getSheetMatrix_(sh,0,{
allowFullMatrix:allowMatrixRead
}):[]));
if(direct.length)return direct;
attempts.push("matrix:empty")
}
else attempts.push("sheet:not_found")
}
else attempts.push("matrix:blocked_by_policy")
}
catch(matrixErr){
attempts.push("matrix:"+String(matrixErr&&matrixErr.message||matrixErr)),_appIsFnName_("_recordWarning_")&&_recordWarning_("people.read.matrix.failed",matrixErr,{
sheetName:sheetName
})
}
try{
"function"==typeof audit_&&audit_("people.read.empty",sheetName,attempts.join(" | "))
}
catch(_auditErr){
_appIsFnName_("_recordWarning_")?_recordWarning_("ec",_auditErr):_appIsFnName_("_logWarn_")?_logWarn_("ec",{
error:String(_auditErr&&_auditErr.message||_auditErr)
}):void _auditErr
}
return[]
}
function _normalizePeopleDateValue_(value){
if(!value&&0!==value)return"";
if("[object Date]"===Object.prototype.toString.call(value)&&!isNaN(value.getTime()))return Utilities.formatDate(value,Session.getScriptTimeZone()||"Asia/Bangkok","yyyy-MM-dd");
var raw=String(value||"").trim();
if(!raw)return"";
if(/^\d{5,6}(?:\.\d+)?$/.test(raw)){
var serial=Number(raw);
if(serial>3e4&&serial<7e4){
var d0=new Date(Math.round(86400*(serial-25569)*1e3));
if(!isNaN(d0.getTime()))return Utilities.formatDate(d0,Session.getScriptTimeZone()||"Asia/Bangkok","yyyy-MM-dd")
}
if(serial>2e5&&serial<3e5){
var d1=new Date(Math.round(86400*(serial-25569)*1e3));
if(!isNaN(d1.getTime()))return d1=new Date(d1.getFullYear()-543,d1.getMonth(),d1.getDate()),Utilities.formatDate(d1,Session.getScriptTimeZone()||"Asia/Bangkok","yyyy-MM-dd")
}
}
var iso=raw.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
if(iso){
var iy=Number(iso[1]);
return iy>2400&&(iy-=543),String(iy).padStart(4,"0")+"-"+String(Number(iso[2])).padStart(2,"0")+"-"+String(Number(iso[3])).padStart(2,"0")
}
var dmy=raw.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
if(dmy){
var y=Number(dmy[3]);
return y>2400&&(y-=543),String(y).padStart(4,"0")+"-"+String(Number(dmy[2])).padStart(2,"0")+"-"+String(Number(dmy[1])).padStart(2,"0")
}
var thaiMonths={
"มกราคม":1,"ม.ค.":1,"มค":1,"กุมภาพันธ์":2,"ก.พ.":2,"กพ":2,"มีนาคม":3,"มี.ค.":3,"มีค":3,"เมษายน":4,"เม.ย.":4,"เมย":4,"พฤษภาคม":5,"พ.ค.":5,"พค":5,"มิถุนายน":6,"มิ.ย.":6,"มิย":6,"กรกฎาคม":7,"ก.ค.":7,"กค":7,"สิงหาคม":8,"ส.ค.":8,"สค":8,"กันยายน":9,"ก.ย.":9,"กย":9,"ตุลาคม":10,"ต.ค.":10,"ตค":10,"พฤศจิกายน":11,"พ.ย.":11,"พย":11,"ธันวาคม":12,"ธ.ค.":12,"ธค":12
},th=raw.replace(/\s+/g," ").match(/^(\d{1,2})\s+([^\s]+)\s+(\d{4})$/);
if(th&&thaiMonths[th[2]]){
var ty=Number(th[3]);
return ty>2400&&(ty-=543),String(ty).padStart(4,"0")+"-"+String(thaiMonths[th[2]]).padStart(2,"0")+"-"+String(Number(th[1])).padStart(2,"0")
}
return raw
}
function _mapPersonnelBaseRow_(r){
var startDate=_normalizePeopleDateValue_(_peopleFirstValue_(r=r||{
},["startDate","วันที่เริ่ม","วันเริ่ม","เริ่มต้น","วันเริ่มต้น","วันเริ่ม-สิ้นสุด"])||""),endDate=_normalizePeopleDateValue_(_peopleFirstValue_(r,["endDate","วันที่สิ้นสุด","วันสิ้นสุด","สิ้นสุด","วันสิ้นสุดตำแหน่ง"])||""),status=String(_peopleFirstValue_(r,["status","สถานะ","สถานะการดำรงตำแหน่ง","Status"])||"ดำรงตำแหน่ง").trim();
endDate=_peopleEndDateForStatus_(status,endDate);
var fy=String(_peopleFirstValue_(r,["fy","fiscalYear","FiscalYear","ปีงบประมาณ","ปีงบ","ปีงบฯ","ปีงบประมาณ (ที่ปรึกษา/บุคลากร)","ปี"])||"").replace(/[^0-9]/g,"");
return fy||(fy=_peopleInferFiscalYearFromDates_(startDate,endDate)),_peopleCanonicalPersonnelDto_({
id:String(_peopleFirstValue_(r,["id","รหัส","เลขที่","รหัสบุคลากร"])||""),sortOrder:String(_peopleFirstValue_(r,["sortOrder","orderNo","order","displayOrder","ลำดับ","ลำดับที่"])||"").trim(),fy:fy,name:String(_peopleFirstValue_(r,["name","ชื่อ-สกุล","ชื่อสกุล","ชื่อ - สกุล","ชื่อ-นามสกุล","ชื่อ - นามสกุล","ชื่อ","ชื่อบุคลากร","ชื่อและสกุล","ชื่อ นามสกุล","fullName","Name"])||""),position:String(_peopleFirstValue_(r,["position","ตำแหน่ง","ตำแหน่งในคณะ","role","ตำแหน่งงาน","Position"])||""),phone:_appPhoneForDisplay_(_peopleFirstValue_(r,["phone","เบอร์โทร","เบอร์โทรศัพท์","โทรศัพท์","หมายเลขโทรศัพท์"])||""),startDate:startDate,endDate:endDate,status:status
})
}
function _peopleDirectoryCacheStamp_(){
var keys;
return["personnel_comm","personnel_staff","personnel_op","personnel_subcommittees"].map(function(k){
try{
return k+":"+(_appIsFnName_("_entityCacheStamp_")?_entityCacheStamp_(k):"1")
}
catch(_e){
return k+":1"
}
}).join("|")
}
function _peopleDirectoryIndex_(bundle){
bundle=bundle||{
};
var buckets={
comms:Array.isArray(bundle.comms)?bundle.comms:[],staffs:Array.isArray(bundle.staffs)?bundle.staffs:[],ops:Array.isArray(bundle.ops)?bundle.ops:[],subcommitteeMembers:Array.isArray(bundle.subcommitteeMembers)?bundle.subcommitteeMembers:[]
},byFy={
},byRole={
},byStatus={
},total=0,active=0;
return Object.keys(buckets).forEach(function(name){
(buckets[name]||[]).forEach(function(row){
row=row||{
},total++;
var fy=String(row.fy||row.fiscalYear||row.fyKey||"").replace(/[^0-9]/g,"")||"ไม่ระบุ",role=String(row.position||row.role||row.personnelType||"ไม่ระบุ").trim()||"ไม่ระบุ",status=String(row.status||"ดำรงตำแหน่ง").trim()||"ดำรงตำแหน่ง";
byFy[fy]=Number(byFy[fy]||0)+1,byRole[role]=Number(byRole[role]||0)+1,byStatus[status]=Number(byStatus[status]||0)+1,!0!==row.isActive&&"ดำรงตำแหน่ง"!==status||active++
})
}),{
ok:!0,contract:"people-directory-index-current",totalRecords:total,activeRecords:active,byFiscalYear:byFy,byRole:byRole,byStatus:byStatus,generatedAt:(new Date).toISOString()
}
}
function _peopleSalaryPaymentsRows_(){
try{
return _readPeopleSheetRowsDirect_("SalaryPayments").map(function(row,idx){
row=row||{
};
var name=String(_peopleFirstValue_(row,["personName","name","fullName","ชื่อ-สกุล","ชื่อ"])||"").trim(),amount=Number(String(_peopleFirstValue_(row,["monthlyRate","amount","salaryAmount","salary","เงินเดือน","จำนวนเงิน"])||0).replace(/,/g,""));
return{
id:String(row.id||row.personId||"PAY-"+(idx+1)),personId:String(row.personId||""),name:name,personName:name,position:String(row.position||""),salaryAmount:isFinite(amount)?amount:0,salary:isFinite(amount)?amount:0,monthlySalary:isFinite(amount)?amount:0,monthlyRate:isFinite(amount)?amount:0,fy:String(row.fy||row.fiscalYear||row["ปีงบประมาณ"]||""),months:Number(row.months||1)||1,source:"SalaryPayments"
}
}).filter(function(row){
return row.name&&Number(row.salaryAmount||0)>0
})
}
catch(e){
return _appIsFnName_("_recordWarning_")&&_recordWarning_("people.salaryPayments.read.failed",e),[]
}
}
function _Domain_getPersonnelDirectoryBundle(){
var bundleCacheKey="people:directory:projected:current";
try{
if(_appIsFnName_("_requestScopeGet_")){
var cachedBundle=_requestScopeGet_("peopleDirectoryBundle",bundleCacheKey);
if(cachedBundle&&"object"==typeof cachedBundle)return cachedBundle
}
}
catch(_bundleCacheHitErr){
_appIsFnName_("_recordWarning_")&&_recordWarning_("people.directory.requestCache.hit",_bundleCacheHitErr)
}
var directoryCacheKey="people:directory:readmodel:current:"+(_appIsFnName_("_peopleDirectoryCacheStamp_")?_peopleDirectoryCacheStamp_():"1");
try{
if(_appIsFnName_("_AppCacheGetJson_")){
var cachedDirectory=_AppCacheGetJson_(directoryCacheKey);
if(cachedDirectory&&"object"==typeof cachedDirectory&&Array.isArray(cachedDirectory.comms)&&Array.isArray(cachedDirectory.staffs)&&Array.isArray(cachedDirectory.ops)){
cachedDirectory.cacheHit=!0,cachedDirectory.cacheStatus="directory-hit",cachedDirectory.directoryPerformance=!0,!cachedDirectory.directoryIndex&&_appIsFnName_("_peopleDirectoryIndex_")&&(cachedDirectory.directoryIndex=_peopleDirectoryIndex_(cachedDirectory));
try{
_appIsFnName_("_requestScopePut_")&&(cachedDirectory=_requestScopePut_("peopleDirectoryBundle",bundleCacheKey,cachedDirectory))
}
catch(_rsErr){
_appIsFnName_("_recordWarning_")?_recordWarning_("ec",_rsErr):_appIsFnName_("_logWarn_")?_logWarn_("ec",{
error:String(_rsErr&&_rsErr.message||_rsErr)
}):void _rsErr
}
return cachedDirectory
}
}
}
catch(_directoryCacheHitErr){
_appIsFnName_("_recordWarning_")&&_recordWarning_("people.directory.cache.hit",_directoryCacheHitErr)
}
function readBucket(sheetName,mapper,prefix){
try{
return _readPeopleSheetRowsDirect_(sheetName).map(function(row,idx){
return(row=mapper(row||{
})).id||(row.id=prefix+"-"+(idx+1)),row.status||(row.status="ดำรงตำแหน่ง"),row.startDate=_normalizePeopleDateValue_(row.startDate||""),row.endDate=_peopleEndDateForStatus_(row.status,_normalizePeopleDateValue_(row.endDate||"")),row
})
}
catch(e){
return _appIsFnName_("_recordWarning_")&&_recordWarning_("people.directory.bucket.failed",e,{
sheetName:sheetName
}),[]
}
}
var bundle={
comms:readBucket("Personnel_Comm",_mapPersonnelBaseRow_,"C"),staffs:readBucket("Personnel_Staff",normalizePersonnelStaffRow_,"S"),ops:readBucket("Personnel_Op",_mapPersonnelBaseRow_,"OP"),subcommitteeMembers:readBucket("Personnel_Subcommittees",_mapPersonnelSubcommitteeRow_,"SCM"),cacheHit:!1,cacheStatus:"directory-miss",directoryPerformance:!0
};
bundle.directoryIndex=_appIsFnName_("_peopleDirectoryIndex_")?_peopleDirectoryIndex_(bundle):null,bundle.generatedAt=(new Date).toISOString();
try{
_appIsFnName_("_AppCachePutJson_")&&_AppCachePutJson_(directoryCacheKey,bundle,300)
}
catch(_directoryCachePutErr){
_appIsFnName_("_recordWarning_")&&_recordWarning_("people.directory.cache.put",_directoryCachePutErr)
}
try{
_appIsFnName_("_requestScopePut_")&&(bundle=_requestScopePut_("peopleDirectoryBundle",bundleCacheKey,bundle))
}
catch(_bundleCachePutErr){
_appIsFnName_("_recordWarning_")&&_recordWarning_("people.directory.requestCache.put",_bundleCachePutErr)
}
return bundle
}
function _Domain_getPersonnelComms(){
try{
return _readPeopleSheetRowsDirect_("Personnel_Comm").map(function(row,idx){
return(row=_mapPersonnelBaseRow_(row||{
})).id||(row.id="C-"+(idx+1)),row.status||(row.status="ดำรงตำแหน่ง"),row
})
}
catch(e){
return _recordWarning_("people.comms.readRows",e),[]
}
}
function _Domain_getPersonnelOps(){
try{
return _readPeopleSheetRowsDirect_("Personnel_Op").map(function(row,idx){
return(row=_mapPersonnelBaseRow_(row||{
})).id||(row.id="OP-"+(idx+1)),row.status||(row.status="ดำรงตำแหน่ง"),row
})
}
catch(e){
return _recordWarning_("people.staff.readRows",e),[]
}
}
function _peopleSaveHeaderAliases_(){
return{
id:["id","รหัส","ลำดับ","เลขที่","รหัสบุคลากร"],name:["name","ชื่อ-สกุล","ชื่อสกุล","ชื่อ - สกุล","ชื่อ-นามสกุล","ชื่อ","ชื่อบุคลากร","ชื่อและสกุล","fullName"],position:["position","ตำแหน่ง","ตำแหน่งในคณะ","role","ตำแหน่งงาน"],personnelType:["personnelType","ประเภทบุคลากร","ประเภท"],phone:["phone","เบอร์โทร","เบอร์โทรศัพท์","โทรศัพท์","หมายเลขโทรศัพท์"],sortOrder:["sortOrder","orderNo","order","displayOrder","ลำดับ","ลำดับที่"],addressLine:["addressLine","location","สถานที่","บ้านเลขที่ / ถนน / หมู่บ้าน","บ้านเลขที่ถนนหมู่บ้าน"],subDistrict:["subDistrict","subdistrict","tambon","ตำบล","แขวง"],district:["district","amphoe","amphur","อำเภอ","เขต"],province:["province","จังหวัด"],postalCode:["postalCode","postcode","zipCode","zip","รหัสไปรษณีย์"],address:["address","fullAddress","ที่อยู่"],proposedBy:["proposedBy","ผู้เสนอ","กรรมาธิการผู้เสนอ","ผู้เสนอชื่อ"],startDate:["startDate","วันที่เริ่ม","วันเริ่ม","วันเริ่มต้น","วันเริ่มดำรงตำแหน่ง","วันที่แต่งตั้ง"],endDate:["endDate","วันที่สิ้นสุด","วันสิ้นสุด","วันสิ้นสุดตำแหน่ง","วันที่พ้นตำแหน่ง"],status:["status","สถานะ","สถานะการดำรงตำแหน่ง"],orderRef:["orderRef","ลิงก์คำสั่ง","คำสั่ง","เลขที่คำสั่ง"],remark:["remark","หมายเหตุ"],isGov:["isGov","ข้าราชการ","เป็นข้าราชการ"],commandRef:["commandRef","commandFileUrl","ไฟล์คำสั่ง","ลิงก์คำสั่ง"],note:["note","หมายเหตุ"],createdAt:["createdAt","วันที่สร้าง","สร้างเมื่อ"],updatedAt:["updatedAt","แก้ไขล่าสุด","วันที่แก้ไข"],isDeleted:["isDeleted","deleted","ลบแล้ว"],deletedAt:["deletedAt","วันที่ลบ"]
}
}
function _peopleNormHeader_(v){
return _appIsFnName_("_normFieldKey_")?_normFieldKey_(v):String(null==v?"":v).trim().toLowerCase().replace(/\s+/g,"")
}
function _peopleFindHeaderIndex_(headers,field){
for(var aliases=_peopleSaveHeaderAliases_()[field]||[field],normalized=(headers||[]).map(_peopleNormHeader_),i=0;
i<aliases.length;
i++){
var pos=normalized.indexOf(_peopleNormHeader_(aliases[i]));
if(pos>-1)return pos
}
return-1
}
function _peopleFindExistingRowIndex_(data,headers,keyField,keyValue,patch){
var keyIdx=_peopleFindHeaderIndex_(headers,keyField||"id"),target=String(keyValue||"").trim();
if(target&&keyIdx>-1)for(var i=1;
i<data.length;
i++)if(String((data[i]||[])[keyIdx]||"").trim()===target)return i;
var nameIdx=_peopleFindHeaderIndex_(headers,"name"),posIdx=_peopleFindHeaderIndex_(headers,"position"),startIdx=_peopleFindHeaderIndex_(headers,"startDate"),name=String(patch&&patch.name||"").trim(),pos=String(patch&&patch.position||"").trim(),start=String(patch&&patch.startDate||"").trim();
if(name&&nameIdx>-1)for(var r=1;
r<data.length;
r++){
var row=data[r]||[],sameName=String(row[nameIdx]||"").trim()===name,samePos=posIdx<0||!pos||String(row[posIdx]||"").trim()===pos,sameStart=startIdx<0||!start||String(row[startIdx]||"").trim()===start;
if(sameName&&samePos&&sameStart)return r
}
return-1
}
function _peopleEnsureHeadersForDirectWrite_(sheetName,sh){
var schema="object"==typeof CANONICAL_SHEETS_&&CANONICAL_SHEETS_[sheetName]?CANONICAL_SHEETS_[sheetName].slice():[],data=getSheetMatrix_(sh),headers=data.length?(data[0]||[]).map(function(h){
return String(h||"").trim()
}):[];
return!headers.length&&schema.length?(AppRepository.setRangeValues(sheetName,1,1,[schema],{
invalidate:!1
}),schema):headers
}
function _peopleUpsertResilient_(sheetName,keyField,keyValue,patch,canonicalSaveFn){
patch=patch||{
};
var id=String(keyValue||patch[keyField||"id"]||"").trim();
try{
if("function"==typeof canonicalSaveFn)return canonicalSaveFn()
}
catch(e){
try{
"function"==typeof audit_&&audit_("people.save.canonicalDirectWrite",sheetName,String(e&&e.message?e.message:e))
}
catch(_auditErr){
_appIsFnName_("_recordWarning_")&&_recordWarning_("ec",_auditErr)
}
}
var sh=getSheet_(sheetName),headers=_peopleEnsureHeadersForDirectWrite_(sheetName,sh);
if(!headers.length)throw new Error("ไม่พบหัวตารางของชีต "+sheetName);
var data=getSheetMatrix_(sh);
data.length||(data=[headers]);
var rowIndex=_peopleFindExistingRowIndex_(data,headers,keyField||"id",id,patch),now=(new Date).toISOString();
patch.createdAt||(patch.createdAt=rowIndex>0?"":now),patch.updatedAt=patch.updatedAt||now,patch.id||(patch.id=id);
var row=rowIndex>0?(data[rowIndex]||[]).slice():headers.map(function(){
return""
});
return Object.keys(patch).forEach(function(field){
var col=_peopleFindHeaderIndex_(headers,field);
col>-1&&(row[col]=patch[field])
}),rowIndex>0?(AppRepository.setRangeValues(sheetName,rowIndex+1,1,[row.slice(0,headers.length)],{
invalidate:!1
}),invalidateSheetCache_(sheetName),ok_({
id:id||patch.id||"",mode:"update",directWrite:!0
},"บันทึกข้อมูลสำเร็จ")):(AppRepository.setRangeValues(sheetName,Math.max(sh.getLastRow(),1)+1,1,[row.slice(0,headers.length)],{
invalidate:!1
}),invalidateSheetCache_(sheetName),ok_({
id:id||patch.id||"",mode:"create",directWrite:!0
},"บันทึกข้อมูลสำเร็จ"))
}
function _Domain_getPersonnelStaffs(){
function normalizeRows(rawRows){
return(Array.isArray(rawRows)?rawRows:[]).map(function(row,idx){
return(row=normalizePersonnelStaffRow_(row||{
})).id||(row.id="S-"+(idx+1)),row.startDate=_normalizePeopleDateValue_(row.startDate||""),row.endDate=_normalizePeopleDateValue_(row.endDate||""),row.status||(row.status="ดำรงตำแหน่ง"),row
}).filter(function(row){
return!(!row||!(String(row.name||"").trim()||String(row.position||"").trim()||String(row.phone||"").trim()||String(row.proposedBy||"").trim()||String(row.startDate||"").trim()))
})
}
try{
var directRows=normalizeRows(_readPeopleSheetRowsDirect_("Personnel_Staff"));
if(directRows.length)return directRows
}
catch(_directErr){
_appIsFnName_("_recordWarning_")&&_recordWarning_("people.staff.direct",_directErr)
}
try{
var repoRows=normalizeRows(_peopleRepo_("Personnel_Staff","id").listActive());
if(repoRows.length)return repoRows
}
catch(_repoErr){
_appIsFnName_("_recordWarning_")&&_recordWarning_("people.staff.repo",_repoErr)
}
try{
audit_&&audit_("people.staff.empty.canonical","Personnel_Staff","no canonical rows")
}
catch(_auditErr){
_appIsFnName_("_recordWarning_")&&_recordWarning_("people.staff.audit",_auditErr)
}
return[]
}
function _Domain_savePersonnelComm(p){
return domainWrite_("savePersonnelComm",p,function(input){
var repo=_peopleRepo_("Personnel_Comm","id"),id=String(input.id||"").trim()||"C-"+Date.now(),commStatus=String(input.status||"ดำรงตำแหน่ง").trim(),commEndDate=_peopleEndDateForStatus_(commStatus,input.endDate||""),patch={
id:id,sortOrder:String(input.sortOrder||input.orderNo||input.order||"").trim(),name:String(input.name||"").trim(),position:String(input.position||"").trim(),phone:_appPhoneForSheet_(input.phone||""),startDate:input.startDate||"",endDate:commEndDate,status:commStatus,isDeleted:!1,deletedAt:""
},duplicate=_peopleFindActiveDuplicate_("Personnel_Comm",patch=_peopleNormalizePersonnelSavePatch_(patch),id,_mapPersonnelBaseRow_);
return duplicate?_peopleActiveDuplicateResult_(duplicate):_peopleUpsertResilient_("Personnel_Comm","id",id,patch,function(){
var result=repo.upsert(id,patch);
return ok_({
id:result.key,mode:result.mode
},"update"===result.mode?"อัปเดตคณะกรรมาธิการสำเร็จ":"เพิ่มคณะกรรมาธิการสำเร็จ")
})
})
}
function _Domain_savePersonnelOp(p){
return domainWrite_("savePersonnelOp",p,function(input){
var repo=_peopleRepo_("Personnel_Op","id"),id=String(input.id||"").trim()||"OP-"+Date.now(),opStatus=String(input.status||"ดำรงตำแหน่ง").trim(),opEndDate=_peopleEndDateForStatus_(opStatus,input.endDate||""),patch={
id:id,name:String(input.name||"").trim(),position:String(input.position||"").trim(),phone:_appPhoneForSheet_(input.phone||""),startDate:input.startDate||"",endDate:opEndDate,status:opStatus,isDeleted:!1,deletedAt:""
},duplicate=_peopleFindActiveDuplicate_("Personnel_Op",patch=_peopleNormalizePersonnelSavePatch_(patch),id,_mapPersonnelBaseRow_);
return duplicate?_peopleActiveDuplicateResult_(duplicate):_peopleUpsertResilient_("Personnel_Op","id",id,patch,function(){
var result=repo.upsert(id,patch);
return ok_({
id:result.key,mode:result.mode
},"update"===result.mode?"อัปเดตเจ้าหน้าที่ปฏิบัติการสำเร็จ":"เพิ่มเจ้าหน้าที่ปฏิบัติการสำเร็จ")
})
})
}
function _Domain_savePersonnelStaff(p){
return domainWrite_("savePersonnelStaff",p,function(input){
var repo=_peopleRepo_("Personnel_Staff","id"),id=String(input.id||"").trim()||"S-"+Date.now(),staffStatus=String(input.status||"ดำรงตำแหน่ง").trim(),staffEndDate=_peopleEndDateForStatus_(staffStatus,input.endDate||""),salaryValue=input.salaryAmount||input.monthlySalary||input.salary||input.salaryBaht||input["เงินเดือน (บาท)"]||input["เงินเดือน"]||"",patch={
id:id,name:String(input.name||"").trim(),position:String(input.position||input.otherPosition||"").trim(),personnelType:String(input.personnelType||"").trim(),phone:String(input.phone||"").trim(),proposedBy:String(input.proposedBy||"").trim(),startDate:input.startDate||"",endDate:staffEndDate,status:staffStatus,orderRef:String(input.orderRef||"").trim(),remark:String(input.remark||"").trim(),isGov:String(input.isGov||"").trim(),commandRef:String(input.commandRef||input.commandFileUrl||"").trim(),salaryAmount:salaryValue,salary:salaryValue,isDeleted:!1,deletedAt:""
},duplicate=_peopleFindActiveDuplicate_("Personnel_Staff",patch=_peopleNormalizePersonnelSavePatch_(patch),id,normalizePersonnelStaffRow_);
return duplicate?_peopleActiveDuplicateResult_(duplicate):_peopleUpsertResilient_("Personnel_Staff","id",id,patch,function(){
var result=repo.upsert(id,patch);
return ok_({
id:result.key,mode:result.mode
},"update"===result.mode?"อัปเดตบุคลากรสำเร็จ":"เพิ่มบุคลากรสำเร็จ")
})
})
}
function _Domain_deletePersonnelComm(id){
return domainWrite_("deletePersonnelComm",{
id:id
},function(input){
var ok;
return _peopleRepo_("Personnel_Comm","id").softDelete(input.id)?ok_({
id:input.id
},"ลบคณะกรรมาธิการสำเร็จ"):err_("ไม่พบข้อมูลคณะกรรมาธิการ")
})
}
function _Domain_deletePersonnelOp(id){
return domainWrite_("deletePersonnelOp",{
id:id
},function(input){
var ok;
return _peopleRepo_("Personnel_Op","id").softDelete(input.id)?ok_({
id:input.id
},"ลบเจ้าหน้าที่ปฏิบัติการสำเร็จ"):err_("ไม่พบข้อมูลเจ้าหน้าที่ปฏิบัติการ")
})
}
function _Domain_deletePersonnelStaff(id){
return domainWrite_("deletePersonnelStaff",{
id:id
},function(input){
var ok;
return _peopleRepo_("Personnel_Staff","id").softDelete(input.id)?ok_({
id:input.id
},"ลบบุคลากรสำเร็จ"):err_("ไม่พบข้อมูลบุคลากร")
})
}
function _subcommitteeDirectoryMap_(){
var byId={
},byName={
};
try{
(_Domain_getSubcommitteeList()||[]).forEach(function(row){
row=row||{
};
var id=String(row.id||"").trim(),name=String(row.name||"").trim();
id&&(byId[id]=row),name&&(byName[name.toLowerCase()]=row)
})
}
catch(e){
_appIsFnName_("_recordWarning_")&&_recordWarning_("people.subcommitteeMembers.directoryMap",e)
}
return{
byId:byId,byName:byName
}
}
function _mapPersonnelSubcommitteeRow_(r){
r=r||{
};
var name=String(_peopleFirstValue_(r,["name","ชื่อ-สกุล","ชื่อสกุล","fullName","ชื่อ"])||"").trim(),subcommitteeId=String(_peopleFirstValue_(r,["subcommitteeId","รหัสคณะอนุกรรมาธิการ"])||"").trim(),subcommitteeName=String(_peopleFirstValue_(r,["subcommitteeName","subcommittee","คณะอนุกรรมาธิการ","ชื่อคณะอนุกรรมาธิการ"])||"").trim(),directory=_subcommitteeDirectoryMap_();
subcommitteeId&&directory.byId[subcommitteeId]&&(subcommitteeName=subcommitteeName||String(directory.byId[subcommitteeId].name||"")),!subcommitteeId&&subcommitteeName&&directory.byName[subcommitteeName.toLowerCase()]&&(subcommitteeId=String(directory.byName[subcommitteeName.toLowerCase()].id||""));
var status=String(_peopleFirstValue_(r,["status","สถานะ"])||"ดำรงตำแหน่ง").trim()||"ดำรงตำแหน่ง",startDate=_normalizePeopleDateValue_(_peopleFirstValue_(r,["startDate","วันเริ่ม","วันที่เริ่ม","วันเริ่ม-สิ้นสุด"])||""),endDate=_normalizePeopleDateValue_(_peopleFirstValue_(r,["endDate","วันสิ้นสุด","วันที่สิ้นสุด"])||"");
endDate=_peopleEndDateForStatus_(status,endDate);
var appointmentDate=_normalizePeopleDateValue_(_peopleFirstValue_(r,["appointmentDate","วันแต่งตั้ง","วันที่แต่งตั้ง"])||startDate||""),fy=_peopleInferFiscalYearFromDates_(startDate||appointmentDate,endDate)||"";
return _peopleCanonicalPersonnelDto_({
id:String(_peopleFirstValue_(r,["id","membershipId","recordId"])||""),sortOrder:String(_peopleFirstValue_(r,["sortOrder","orderNo","order","displayOrder","ลำดับ","ลำดับที่"])||"").trim(),personId:String(_peopleFirstValue_(r,["personId","personnelId","รหัสบุคคล"])||""),fy:fy,name:name,subcommitteeId:subcommitteeId,subcommitteeName:subcommitteeName,position:String(_peopleFirstValue_(r,["position","role","ตำแหน่ง"])||"").trim(),phone:_appPhoneForDisplay_(_peopleFirstValue_(r,["phone","tel","mobile","เบอร์โทร","เบอร์โทรศัพท์"])||""),startDate:startDate,endDate:endDate,status:status,appointmentDate:appointmentDate,note:String(_peopleFirstValue_(r,["note","remark","หมายเหตุ"])||"").trim(),sourceRole:"subcommittee"
})
}
function _Domain_getPersonnelSubcommittees(){
try{
return _readPeopleSheetRowsDirect_("Personnel_Subcommittees").map(function(row,idx){
return(row=_mapPersonnelSubcommitteeRow_(row||{
})).id||(row.id="SCM-"+(idx+1)),row.status||(row.status="ดำรงตำแหน่ง"),row
})
}
catch(e){
return _appIsFnName_("_recordWarning_")&&_recordWarning_("people.subcommitteeMembers.readRows",e),[]
}
}
function _Domain_savePersonnelSubcommittee(p){
return domainWrite_("savePersonnelSubcommittee",p,function(input){
input=input||{
};
var repo=_peopleRepo_("Personnel_Subcommittees","id"),id=String(input.id||"").trim()||"SCM-"+Date.now(),name=String(input.name||input.fullName||"").trim(),subcommitteeName=String(input.subcommitteeName||input.subcommittee||"").trim(),subcommitteeId=String(input.subcommitteeId||"").trim(),directory=_subcommitteeDirectoryMap_();
if(subcommitteeId&&directory.byId[subcommitteeId]&&(subcommitteeName=subcommitteeName||String(directory.byId[subcommitteeId].name||"")),!subcommitteeId&&subcommitteeName&&directory.byName[subcommitteeName.toLowerCase()]&&(subcommitteeId=String(directory.byName[subcommitteeName.toLowerCase()].id||"")),!name)return err_("กรุณาระบุชื่อ-สกุล");
if(!subcommitteeName)return err_("กรุณาเลือกคณะอนุกรรมาธิการ");
var status=String(input.status||"ดำรงตำแหน่ง").trim()||"ดำรงตำแหน่ง",endDate=_peopleEndDateForStatus_(status,input.endDate||""),patch={
id:id,sortOrder:String(input.sortOrder||input.orderNo||input.order||"").trim(),personId:String(input.personId||"").trim(),name:name,subcommitteeId:subcommitteeId,subcommitteeName:subcommitteeName,position:String(input.position||input.role||"").trim(),phone:_appPhoneForSheet_(input.phone||""),subcommittee:subcommitteeName,"คณะอนุกรรมาธิการ":subcommitteeName,"ชื่อคณะอนุกรรมาธิการ":subcommitteeName,startDate:_normalizePeopleDateValue_(input.startDate||""),endDate:_normalizePeopleDateValue_(endDate||""),status:status,appointmentDate:_normalizePeopleDateValue_(input.appointmentDate||input.startDate||""),note:String(input.note||input.remark||"").trim(),isDeleted:!1,deletedAt:""
},result=repo.upsert(id,patch);
return ok_({
id:result.key,mode:result.mode
},"update"===result.mode?"อัปเดตข้อมูลคณะอนุกรรมาธิการสำเร็จ":"เพิ่มข้อมูลคณะอนุกรรมาธิการสำเร็จ")
})
}
function _Domain_deletePersonnelSubcommittee(id){
return domainWrite_("deletePersonnelSubcommittee",{
id:id
},function(input){
var ok;
return _peopleRepo_("Personnel_Subcommittees","id").softDelete(input.id)?ok_({
id:input.id
},"ลบข้อมูลคณะอนุกรรมาธิการสำเร็จ"):err_("ไม่พบข้อมูลคณะอนุกรรมาธิการ")
})
}
function _subcommitteeDateValue_(value){
if(!value)return null;
if("[object Date]"===Object.prototype.toString.call(value)&&!isNaN(value.getTime()))return value.getFullYear()<2e3?null:value;
var raw=String(value||"").trim();
if(!raw)return null;
if(/1900|GMT|เวลา|T\d{2}:\d{2}/i.test(raw))return null;
var m=raw.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
if(m){
var y=Number(m[3]);
return y>2400&&(y-=543),y<2e3?null:new Date(y,Number(m[2])-1,Number(m[1]))
}
var iso=raw.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
if(iso){
var yy=Number(iso[1]);
return yy<2e3?null:new Date(yy,Number(iso[2])-1,Number(iso[3]))
}
var d=new Date(raw);
return isNaN(d.getTime())||d.getFullYear()<2e3?null:d
}
function _subcommitteeActiveDays_(startDate,endDate){
var start=_subcommitteeDateValue_(startDate);
if(!start)return 0;
var end=_subcommitteeDateValue_(endDate)||new Date,s=new Date(start.getFullYear(),start.getMonth(),start.getDate()),e=new Date(end.getFullYear(),end.getMonth(),end.getDate()),diff=Math.floor((e.getTime()-s.getTime())/864e5)+1;
return Math.max(0,diff||0)
}
function _ensureSubcommitteeDateHeaders_(){
try{
var sh=getSheet_("Subcommittees"),schema="undefined"!=typeof SHEET_SCHEMAS&&SHEET_SCHEMAS&&Array.isArray(SHEET_SCHEMAS.Subcommittees)?SHEET_SCHEMAS.Subcommittees.slice():["id","name","status","appointmentDate","dutyStartDate","endDate","activeDays","dueDays","dueDate","extensionDays","totalExtensionDays","extendedDueDate","extensionHistory","remark","updatedAt","isDeleted","deletedAt"],lastRow=Math.max(Number(sh.getLastRow&&sh.getLastRow())||1,1),lastCol=Math.max(Number(sh.getLastColumn&&sh.getLastColumn())||0,schema.length,1),values=AppRepository.getRangeValues("Subcommittees",1,1,lastRow,lastCol),headers=(values[0]||[]).map(function(v){
return String(v||"").trim()
});
function nk(v){
return String(null==v?"":v).replace(/[\u200B-\u200D\uFEFF]/g,"").replace(/[\s\n\r\t\-–—_()（）\[\]{}:：\/\.]+/g,"").toLowerCase()
}
var alias={
appointmentdate:"appointmentDate",appointeddate:"appointmentDate",dateappointed:"appointmentDate",dateofappointment:"appointmentDate","วันแต่งตั้ง":"appointmentDate","วันที่แต่งตั้ง":"appointmentDate",startdate:"dutyStartDate",dutystartdate:"dutyStartDate",startworkingdate:"dutyStartDate",effectivedate:"dutyStartDate",commencementdate:"dutyStartDate","วันเริ่มทำหน้าที่":"dutyStartDate","วันที่เริ่มทำหน้าที่":"dutyStartDate",enddate:"endDate",finishdate:"endDate",expiredate:"endDate","วันสิ้นสุด":"endDate","วันที่สิ้นสุด":"endDate"
};
(schema||[]).forEach(function(h){
alias[nk(h)]=h
});
var extra=[];
(headers||[]).forEach(function(h){
var key=alias[nk(h)]||h;
key&&schema.indexOf(key)<0&&extra.indexOf(h)<0&&extra.push(h)
});
for(var finalHeaders=schema.concat(extra.filter(function(h){
return schema.indexOf(h)<0
})),changed=headers.length!==finalHeaders.length||headers.some(function(h,i){
return String(h||"")!==String(finalHeaders[i]||"")
}),out=[finalHeaders],r=1;
r<values.length;
r++){
var line=values[r]||[],obj={
};
(headers||[]).forEach(function(h,c){
var raw=String(h||"").trim();
if(raw){
var key=alias[nk(raw)]||raw,value=line[c];
null!=value&&""!==String(value).trim()&&(void 0!==obj[key]&&null!==obj[key]&&""!==String(obj[key]).trim()||(obj[key]=value))
}
}),out.push(finalHeaders.map(function(h){
return void 0!==obj[h]?obj[h]:""
}))
}
return changed&&(AppRepository.setRangeValues("Subcommittees",1,1,out,{
invalidate:!1
}),lastCol>finalHeaders.length&&AppRepository.clearRangeContent("Subcommittees",1,finalHeaders.length+1,Math.max(lastRow,1),lastCol-finalHeaders.length),"function"==typeof invalidateSheetCache_&&invalidateSheetCache_("Subcommittees")),!0
}
catch(e){
return _appIsFnName_("_recordWarning_")&&_recordWarning_("people.subcommittee.ensureEnglishDateHeaders",e),!1
}
}
function _subcommitteeStatusFromDates_(status,startDate,endDate){
return status=String(status||"").trim()||"ใช้งาน",endDate&&"ใช้งาน"===status?"สิ้นสุด":status
}
function _Domain_getSubcommitteeList(){
try{
_ensureSubcommitteeDateHeaders_()
}
catch(_ensureSubcommitteeListHeadersErr){
_appIsFnName_("_recordWarning_")&&_recordWarning_("people.subcommittee.ensureHeaders.list",_ensureSubcommitteeListHeadersErr)
}
function peopleSubcommitteePickCanonical_(row,keys){
return"undefined"!=typeof AppBackendCore&&AppBackendCore.pickNormalized?AppBackendCore.pickNormalized(row,keys,""):_peoplePick_(row,keys)
}
function toDto(row,idx){
row=row||{
};
var name=String(peopleSubcommitteePickCanonical_(row,["name","subcommitteeName","committeeName","title","ชื่อคณะอนุกรรมาธิการ","คณะอนุกรรมาธิการ","ชื่อ","รายการ"])||"").trim(),appointmentDate=String(peopleSubcommitteePickCanonical_(row,["appointmentDate","appointedDate","วันที่แต่งตั้ง","วันแต่งตั้ง"])||"").trim(),startDate=String(peopleSubcommitteePickCanonical_(row,["dutyStartDate","startDate","startWorkingDate","effectiveDate","วันเริ่มทำหน้าที่","วันที่เริ่มทำหน้าที่","วันที่เริ่ม","วันเริ่ม"])||"").trim(),endDate=String(peopleSubcommitteePickCanonical_(row,["endDate","วันที่สิ้นสุด","วันสิ้นสุด","วันที่ยุติ","วันยุติ"])||"").trim(),status=_subcommitteeStatusFromDates_(String(peopleSubcommitteePickCanonical_(row,["status","active","สถานะ","activeStatus"])||"ใช้งาน").trim()||"ใช้งาน",startDate,endDate),activeDays=_subcommitteeActiveDays_(startDate,endDate);
function cleanSubDays(v){
var raw=String(null==v?"":v).trim();
if(!raw||/1900|GMT|เวลา|T\d{2}:\d{2}|\d{4}-\d{2}-\d{2}/i.test(raw))return"";
var n=Number(raw.replace(/[^0-9]/g,""));
return isFinite(n)&&n>0?String(Math.floor(n)):""
}
startDate||(activeDays=Number(peopleSubcommitteePickCanonical_(row,["activeDays","จำนวนวัน","รวมวัน"])||0)||0);
var dueDays=cleanSubDays(peopleSubcommitteePickCanonical_(row,["dueDays","deadlineDays","จำนวนวันครบกำหนด","วันครบกำหนด(จำนวนวัน)"])),dueDate=String(peopleSubcommitteePickCanonical_(row,["dueDate","deadline","วันครบกำหนด","วันที่ครบกำหนด"])||"").trim();
/1900|GMT|เวลา|T\d{2}:\d{2}/i.test(dueDate)&&(dueDate=""),startDate&&dueDays&&(dueDate=_subcommitteeAddDays_(startDate,dueDays)||dueDate);
var totalExtensionDays=String(peopleSubcommitteePickCanonical_(row,["totalExtensionDays","totalExtendDays","รวมวันขยาย"])||"").trim(),extendedDueDate=String(peopleSubcommitteePickCanonical_(row,["extendedDueDate","finalDueDate","latestDueDate","วันครบกำหนดหลังขยาย","วันที่ครบกำหนดหลังขยาย"])||"").trim()||dueDate;
return{
id:String(peopleSubcommitteePickCanonical_(row,["id","subcommitteeId","SubcommitteeId","รหัส","ลำดับ","เลขที่"])||"SUB-"+String(idx+1)).trim(),name:name,subcommitteeName:name,status:status,appointmentDate:appointmentDate,startDate:startDate,dutyStartDate:startDate,startWorkingDate:startDate,endDate:endDate,activeDays:activeDays,dueDays:dueDays,dueDate:dueDate,extensionDays:String(peopleSubcommitteePickCanonical_(row,["extensionDays","extendDays","ขยายระยะเวลา","จำนวนวันขยาย"])||"").trim(),totalExtensionDays:totalExtensionDays,extendedDueDate:extendedDueDate,extensionHistory:String(peopleSubcommitteePickCanonical_(row,["extensionHistory","ประวัติการขยายเวลา"])||"").trim(),remark:String(peopleSubcommitteePickCanonical_(row,["remark","note","หมายเหตุ","รายละเอียด"])||"").trim(),updatedAt:String(peopleSubcommitteePickCanonical_(row,["updatedAt","createdAt","วันที่แก้ไข","วันที่สร้าง"])||"").trim()
}
}
function readSheet(sheetName){
var projectedFields=["id","subcommitteeId","name","subcommitteeName","committeeName","title","ชื่อคณะอนุกรรมาธิการ","คณะอนุกรรมาธิการ","ชื่อ","รายการ","dutyStartDate","startDate","startWorkingDate","effectiveDate","วันเริ่มทำหน้าที่","วันที่เริ่มทำหน้าที่","appointmentDate","วันที่แต่งตั้ง","วันแต่งตั้ง","วันที่เริ่ม","วันเริ่ม","endDate","วันที่สิ้นสุด","วันสิ้นสุด","วันที่ยุติ","วันยุติ","status","active","สถานะ","activeStatus","activeDays","จำนวนวัน","รวมวัน","dueDays","deadlineDays","จำนวนวันครบกำหนด","วันครบกำหนด(จำนวนวัน)","dueDate","deadline","วันครบกำหนด","วันที่ครบกำหนด","totalExtensionDays","totalExtendDays","รวมวันขยาย","extendedDueDate","finalDueDate","latestDueDate","วันครบกำหนดหลังขยาย","วันที่ครบกำหนดหลังขยาย","extensionDays","extendDays","ขยายระยะเวลา","จำนวนวันขยาย","extensionHistory","ประวัติการขยายเวลา","remark","note","หมายเหตุ","รายละเอียด","updatedAt","createdAt","วันที่แก้ไข","วันที่สร้าง","isDeleted","deleted","deletedAt","ลบ"];
try{
var projected=_peopleDataServiceRows_(sheetName,projectedFields,{
includeDeleted:!1,requireCanonical:!1,ttl:120,owner:"people.subcommittee"
})||[];
if(projected.length)return projected
}
catch(projectedErr){
_appIsFnName_("_recordWarning_")&&_recordWarning_("people.subcommittee.projected.failed",projectedErr,{
sheetName:sheetName
})
}
var allowFull=!!_appIsFnName_("_productionHotPathFullSheetReadAllowed_")&&_productionHotPathFullSheetReadAllowed_("people.subcommittee."+sheetName);
if(!allowFull)return[];
var ss="function"==typeof getSpreadsheet_?getSpreadsheet_():null,sh=ss&&_appIsFn_(ss.getSheetByName)?ss.getSheetByName(sheetName):null;
if(!sh)return[];
var values="function"==typeof getSheetMatrixCached_?getSheetMatrixCached_(sh,0,{
allowFullMatrix:allowFull
}):"function"==typeof getSheetMatrix_?getSheetMatrix_(sh,0,{
allowFullMatrix:allowFull
}):[];
if(!Array.isArray(values)||values.length<2)return[];
var schema="undefined"!=typeof SHEET_SCHEMAS&&SHEET_SCHEMAS&&Array.isArray(SHEET_SCHEMAS.Subcommittees)?SHEET_SCHEMAS.Subcommittees:[],aliases="undefined"!=typeof SHEET_HEADER_ALIASES&&SHEET_HEADER_ALIASES&&SHEET_HEADER_ALIASES.Subcommittees?SHEET_HEADER_ALIASES.Subcommittees:{
},rows="undefined"!=typeof AppBackendCore&&AppBackendCore.matrixToObjects?AppBackendCore.matrixToObjects(values,{
schema:schema,aliases:aliases,normalizeKey:normKey,includeDeleted:!1,headerResolver:function(raw,nk,i,aliasMap,_appAliases,schemaList){
return aliasMap&&aliasMap[nk]||raw||schemaList[i]||"col"+(i+1)
}
}):[];
return _appIsFnName_("_requestScopeNoteRowsRead_")&&_requestScopeNoteRowsRead_(sheetName,rows.length),rows
}
var raw=[];
if(["Subcommittees","Subcommittee","คณะอนุกรรมาธิการ"].some(function(sheetName){
try{
return(raw=readSheet(sheetName)).length>0
}
catch(e){
return _appIsFnName_("_recordWarning_")&&_recordWarning_("people.subcommittee.sheet."+sheetName,e),!1
}
}),!raw.length)try{
raw=_peopleRepo_("Subcommittees","id").listActive()||[]
}
catch(repoErr){
_appIsFnName_("_recordWarning_")&&_recordWarning_("people.subcommittee.repo",repoErr)
}
var seen={
},rows=(Array.isArray(raw)?raw:[]).map(toDto).filter(function(row){
var name=String(row.name||"").trim();
if(!name)return!1;
var key=(String(row.id||"").trim()||name)+"|"+name;
return!seen[key]&&(seen[key]=1,!0)
});
return rows.sort(function(a,b){
return String(a.name||"").localeCompare(String(b.name||""),"th")
}),rows
}
function _subcommitteeFormatThaiDate_(date){
return _appThaiDateText_(date)
}
function _subcommitteeAddDays_(baseDate,days){
var d=_subcommitteeDateValue_(baseDate),n=Number(days||0)||0;
if(!d||!n)return"";
var out=new Date(d.getFullYear(),d.getMonth(),d.getDate());
return out.setDate(out.getDate()+n),_subcommitteeFormatThaiDate_(out)
}
function _subcommitteeExtensionHistory_(value){
if(!value)return[];
if(Array.isArray(value))return value.filter(function(x){
return x
});
try{
var parsed=JSON.parse(String(value));
return Array.isArray(parsed)?parsed.filter(function(x){
return x
}):[]
}
catch(e){
return String(value||"").trim()?[{
note:String(value)
}
]:[]
}
}
function _subcommitteeDeadlinePatch_(input,previous){
function cleanDays(v){
var raw=String(null==v?"":v).trim();
if(!raw)return"";
if(/\d{4}-\d{2}-\d{2}|GMT|เวลา|T\d{2}:\d{2}|1900/i.test(raw))return"";
var n=Number(raw.replace(/[^0-9.-]/g,""));
return isFinite(n)&&n>0?String(Math.floor(n)):""
}
input=input||{
},previous=previous||{
};
var startDate=String(input.dutyStartDate||input.startDate||input.startWorkingDate||input.effectiveDate||previous.dutyStartDate||previous.startDate||previous.startWorkingDate||"").trim(),dueDays=cleanDays(input.dueDays||input.deadlineDays||input["จำนวนวันครบกำหนด"]||previous.dueDays||""),dueDate=String(input.dueDate||input.deadline||"").trim();
/1900|GMT|เวลา|T\d{2}:\d{2}/i.test(dueDate)&&(dueDate=""),startDate&&dueDays&&(dueDate=_subcommitteeAddDays_(startDate,dueDays)||dueDate),dueDate||(dueDate=String(previous.dueDate||previous.deadline||"").trim());
var history=_subcommitteeExtensionHistory_(previous.extensionHistory||""),newExtendDays=Number(cleanDays(input.extensionDays||input.extendDays||0))||0,totalExtensionDays=Number(cleanDays(previous.totalExtensionDays||0))||0,latestDue=String(previous.extendedDueDate||previous.finalDueDate||previous.latestDueDate||dueDate||"").trim();
if(/1900|GMT|เวลา|T\d{2}:\d{2}/i.test(latestDue)&&(latestDue=""),latestDue||(latestDue=dueDate),newExtendDays>0){
var base=latestDue||dueDate||startDate;
latestDue=_subcommitteeAddDays_(base,newExtendDays)||latestDue||dueDate,totalExtensionDays+=newExtendDays,history.push({
days:newExtendDays,baseDate:base||"",extendedDueDate:latestDue||"",updatedAt:(new Date).toISOString()
})
}
else latestDue||(latestDue=dueDate);
return{
dueDays:dueDays,dueDate:dueDate,extensionDays:newExtendDays>0?String(newExtendDays):"",totalExtensionDays:totalExtensionDays?String(totalExtensionDays):"",extendedDueDate:latestDue||dueDate||"",extensionHistory:history.length?JSON.stringify(history):String(previous.extensionHistory||"")
}
}
function _Domain_saveSubcommittee(p){
return domainWrite_("saveSubcommittee",p,function(input){
_ensureSubcommitteeDateHeaders_();
var repo=_peopleRepo_("Subcommittees","id"),id=String(input.id||"").trim(),name=String(input.name||"").trim(),rows,dup;
if(!name)return err_("กรุณาระบุชื่อ");
if(repo.listActive().some(function(r){
return String(r.name||"").trim().toLowerCase()===name.toLowerCase()&&String(r.id||"")!==id
}))return err_("มีชื่อคณะอนุกรรมาธิการนี้อยู่แล้ว");
var resolvedId=id||"SUB-"+Date.now(),previous={
};
try{
previous=id&&repo&&_appIsFn_(repo.findByKey)&&repo.findByKey(id,{
includeDeleted:!0
})||{
}
}
catch(_prevErr){
previous={
}
}
var appointmentDate=String(input.appointmentDate||input.appointedDate||input["วันแต่งตั้ง"]||input["วันที่แต่งตั้ง"]||"").trim(),startDate=String(input.dutyStartDate||input.startDate||input.startWorkingDate||input.effectiveDate||"").trim(),endDate=String(input.endDate||"").trim(),status=_subcommitteeStatusFromDates_(String(input.status||"ใช้งาน"),startDate,endDate),deadlinePatch=_subcommitteeDeadlinePatch_(Object.assign({
},input,{
startDate:startDate
}),previous),result=repo.upsert(resolvedId,Object.assign({
id:resolvedId,name:name,status:status,appointmentDate:appointmentDate,"วันแต่งตั้ง":appointmentDate,"วันที่แต่งตั้ง":appointmentDate,dutyStartDate:startDate,startDate:startDate,startWorkingDate:startDate,"วันเริ่มทำหน้าที่":startDate,"วันที่เริ่มทำหน้าที่":startDate,endDate:endDate,activeDays:_subcommitteeActiveDays_(startDate,endDate),remark:String(input.remark||""),isDeleted:!1,deletedAt:""
},deadlinePatch));
return ok_({
id:result.key,mode:result.mode
},"update"===result.mode?"อัปเดตคณะอนุกรรมาธิการสำเร็จ":"เพิ่มคณะอนุกรรมาธิการสำเร็จ")
})
}
function _Domain_deleteSubcommittee(id){
return domainWrite_("deleteSubcommittee",{
id:id
},function(input){
var ok;
return _peopleRepo_("Subcommittees","id").softDelete(input.id)?ok_({
id:input.id
},"ลบคณะอนุกรรมาธิการสำเร็จ"):err_("ไม่พบข้อมูลคณะอนุกรรมาธิการ")
})
}
function _Domain_budgetUnifiedSubcommitteeOptions(){
try{
var merged=[];
function text_(v){
return String(null==v?"":v).replace(/[​-‍\uFEFF]/g," ").replace(/\s+/g," ").trim()
}
function active_(r){
var s=text_(r&&r.status).toLowerCase();
return!s||"ใช้งาน"===s||"active"===s||"ดำรงตำแหน่ง"===s||"ปัจจุบัน"===s
}
function add_(row){
var name=text_((row=row||{
}).subcommitteeName||row.name||row.committeeName||row.title||row.groupName||row["ชื่อคณะอนุกรรมาธิการ"]||row["คณะอนุกรรมาธิการ"]||row["ชื่อคณะ"]||row["ชื่อ"]);
name&&active_(row)&&merged.push(Object.assign({
},row,{
id:text_(row.subcommitteeId||row.id||row.key||row.code||name)||name,subcommitteeId:text_(row.subcommitteeId||row.id||row.key||row.code||name)||name,name:name,subcommitteeName:name
}))
}
try{
_Domain_getSubcommitteeList().forEach(add_)
}
catch(_a){
_appIgnore_(_a,"c6.C33:978")
}
try{
_Domain_getPersonnelSubcommittees().forEach(add_)
}
catch(_b){
_appIgnore_(_b,"c6.C33:983")
}
var seen={
},rows=[];
return merged.forEach(function(r){
var k=text_(r.name).toLowerCase();
k&&!seen[k]&&(seen[k]=!0,rows.push(r))
}),ok_({
names:rows.map(function(r){
return r.name
}),rows:rows,items:rows,records:rows,subcommittees:rows,totalRecords:rows.length,source:"Subcommittees+Personnel_Subcommittees"
},"โหลดรายการคณะอนุกรรมาธิการสำเร็จ")
}
catch(e){
return err_(e.message||String(e))
}
}
function apiAdminListUsers(payload){
var _auth=_peopleSafeReq_(payload,"admin","apiAdminListUsers");
return _auth.ok?(payload=_auth.payload||{
},AdminDomain.listUsers(payload||{
})):_auth.result
}
function apiAdminSaveUser(payload){
return writeGateway_("apiAdminSaveUser",payload||{
},function(input){
var _auth=_peopleSafeReq_(input,"admin","apiAdminSaveUser");
return _auth.ok?(input=_auth.payload||{
},AdminDomain.saveUser(input||{
})):_auth.result
},"บันทึกผู้ใช้งานสำเร็จ","บันทึกผู้ใช้งานไม่สำเร็จ")
}
function apiAdminDeleteUser(payload){
return writeGateway_("apiAdminDeleteUser",payload||{
},function(input){
var _auth=_peopleSafeReq_(input,"admin","apiAdminDeleteUser");
return _auth.ok?(input=_auth.payload||{
},AdminDomain.deleteUser(input||{
})):_auth.result
},"ลบ/ระงับผู้ใช้งานสำเร็จ","ลบ/ระงับผู้ใช้งานไม่สำเร็จ")
}
function apiAdminListSubcommittees(payload){
var _auth=_peopleSafeReq_(payload,"admin","apiAdminListSubcommittees");
return _auth.ok?(payload=_auth.payload||{
},AdminDomain.listSubcommittees(payload||{
})):_auth.result
}
function apiAdminSaveSubcommittee(payload){
return writeGateway_("apiAdminSaveSubcommittee",payload||{
},function(input){
var _auth=_peopleSafeReq_(input,"admin","apiAdminSaveSubcommittee");
return _auth.ok?(input=_auth.payload||{
},AdminDomain.saveSubcommittee(input||{
})):_auth.result
},"บันทึกคณะอนุกรรมาธิการสำเร็จ","บันทึกคณะอนุกรรมาธิการไม่สำเร็จ")
}
function apiAdminDeleteSubcommittee(payload){
return writeGateway_("apiAdminDeleteSubcommittee",payload||{
},function(input){
var _auth=_peopleSafeReq_(input,"admin","apiAdminDeleteSubcommittee");
return _auth.ok?(input=_auth.payload||{
},AdminDomain.deleteSubcommittee(input||{
})):_auth.result
},"ลบคณะอนุกรรมาธิการสำเร็จ","ลบคณะอนุกรรมาธิการไม่สำเร็จ")
}
function _peopleParseThaiAddress_(value){
var text=String(value||"").trim(),out={
addressLine:"",subDistrict:"",district:"",province:"",postalCode:""
};
if(!text)return out;
var zip=text.match(/(\d{5})(?!.*\d)/);
zip&&(out.postalCode=zip[1]);
var province=text.match(/(?:จ\.|จังหวัด)\s*([^\s,]+)/);
province&&(out.province=province[1].trim());
var district=text.match(/(?:อ\.|อำเภอ|เขต)\s*([^\s,]+)/);
district&&(out.district=district[1].trim());
var subDistrict=text.match(/(?:ต\.|ตำบล|แขวง)\s*([^\s,]+)/);
subDistrict&&(out.subDistrict=subDistrict[1].trim());
var line=text;
return[zip&&zip[0],province&&province[0],district&&district[0],subDistrict&&subDistrict[0]].forEach(function(token){
token&&(line=line.replace(token," "))
}),out.addressLine=line.replace(/\s+/g," ").trim().replace(/[,]+$/,""),out
}
function _peopleComposeThaiAddress_(parts){
parts=parts||{
};
var line=String(parts.addressLine||"").trim(),subDistrict=String(parts.subDistrict||"").trim(),district=String(parts.district||"").trim(),province=String(parts.province||"").trim(),postalCode=String(parts.postalCode||"").trim(),out=[];
return line&&out.push(line),subDistrict&&out.push(("กรุงเทพมหานคร"===province?"แขวง":"ต.")+subDistrict),district&&out.push(("กรุงเทพมหานคร"===province?"เขต":"อ.")+district),province&&out.push("จ."+province),postalCode&&out.push(postalCode),out.join(" ")
}
function _peopleCanonicalPetitionerAddress_(r){
r=r||{
};
var sourceAddress=String(_peopleFirstValue_(r,["address","fullAddress","ที่อยู่"])||"").trim(),parsed=_peopleParseThaiAddress_(sourceAddress),directLine=String(_peopleFirstValue_(r,["addressLine","location","สถานที่","บ้านเลขที่ / ถนน / หมู่บ้าน","บ้านเลขที่ถนนหมู่บ้าน"])||"").trim(),directSubDistrict=String(_peopleFirstValue_(r,["subDistrict","subdistrict","tambon","ตำบล","แขวง"])||"").trim(),directDistrict=String(_peopleFirstValue_(r,["district","amphoe","amphur","อำเภอ","เขต"])||"").trim(),directProvince=String(_peopleFirstValue_(r,["province","จังหวัด"])||"").trim(),directPostalCode=String(_peopleFirstValue_(r,["postalCode","postcode","zipCode","zip","รหัสไปรษณีย์"])||"").trim(),looksLikeProjectedAddressLine;
directLine&&sourceAddress&&directLine===sourceAddress&&!directSubDistrict&&!directDistrict&&!directPostalCode&&(directLine="");
var parts={
addressLine:directLine||parsed.addressLine||"",subDistrict:directSubDistrict||parsed.subDistrict||"",district:directDistrict||parsed.district||"",province:directProvince||parsed.province||"",postalCode:directPostalCode||parsed.postalCode||""
};
return parts.address=_peopleComposeThaiAddress_(parts)||sourceAddress,parts
}
function _peopleEnsurePetitionerAddressColumns_(){
["addressLine","subDistrict","district","province","postalCode","address"].forEach(function(header){
try{
ensureHeaderColumn_("Petitioners",header)
}
catch(_e){
_appIsFnName_("_recordWarning_")&&_recordWarning_("people.silentDirectColumn",_e)
}
})
}
function normalizePetitionerRow_(r){
var addr=_peopleCanonicalPetitionerAddress_(r=r||{
});
return{
petId:String(_peopleFirstValue_(r,["petId","id","petitionerId"])||""),name:String(_peopleFirstValue_(r,["name","fullName","ชื่อ-สกุล","ชื่อสกุล","ชื่อ"])||"").trim(),phone:_appPhoneForDisplay_(_peopleFirstValue_(r,["phone","tel","telephone","mobile","เบอร์โทร","เบอร์โทรศัพท์","โทรศัพท์"])||""),addressLine:addr.addressLine,subDistrict:addr.subDistrict,district:addr.district,province:addr.province,postalCode:addr.postalCode,address:addr.address,petitionerId:String(_peopleFirstValue_(r,["petitionerId","เลขประจำตัวผู้ร้อง"])||"").trim(),idCard:String(_peopleFirstValue_(r,["idCard","citizenId","nationalId","เลขบัตรประชาชน"])||"").trim(),caseId:String(_peopleFirstValue_(r,["caseId","เลขเรื่อง"])||"").trim(),remark:String(_peopleFirstValue_(r,["remark","note","หมายเหตุ"])||"").trim(),createdAt:String(_peopleFirstValue_(r,["createdAt","วันที่สร้าง"])||""),updatedAt:String(_peopleFirstValue_(r,["updatedAt","วันที่แก้ไข"])||""),isDeleted:_peopleBoolDeleted_(_peopleFirstValue_(r,["isDeleted","ลบ","สถานะลบ"])||r.isDeleted),deletedAt:String(_peopleFirstValue_(r,["deletedAt","วันที่ลบ"])||"")
}
}
function _Domain_getPetitioners(){
var rows=[];
try{
rows=_readPeopleSheetRowsDirect_("Petitioners").map(normalizePetitionerRow_)
}
catch(e){
rows=[]
}
if((rows=(Array.isArray(rows)?rows:[]).filter(function(r){
return r&&String(r.name||"").trim()&&!_peopleBoolDeleted_(r.isDeleted)
})).length)return rows;
try{
var main=_appIsFnName_("_listMainDataRows_")?_listMainDataRows_(!1):[],map={
};
return(Array.isArray(main)?main:[]).forEach(function(row,idx){
row=row||{
};
var name=String(_peopleFirstValue_(row,["petitioners","petitionerName","petitioner","proposer","ผู้ร้อง","ผู้ร้องเรียน","ผู้เสนอญัตติ","ผู้เสนอ"])||"").trim();
if(name){
var parts=name.split(/[;,、\n]+/).map(function(x){
return String(x||"").trim()
}).filter(Boolean);
parts.length||(parts=[name]),parts.forEach(function(n){
var key=n.toLowerCase();
map[key]||(map[key]=normalizePetitionerRow_({
petId:"AUTO-"+(Object.keys(map).length+1),name:n,phone:_peopleFirstValue_(row,["petitionerPhone","phone","tel","เบอร์โทรศัพท์"])||"",caseId:row.caseId||"",remark:"derived-from-maindata"
}))
})
}
}),Object.keys(map).map(function(k){
return map[k]
})
}
catch(_directErr){
return[]
}
}
function _Domain_savePetitioner(p){
return domainWrite_("savePetitioner",p,function(input){
_peopleEnsurePetitionerAddressColumns_();
var repo=_peopleRepo_("Petitioners","petId"),id=String(input.petId||input.id||"").trim()||"P-"+Date.now(),normalized=normalizePetitionerRow_(Object.assign({
},input||{
},{
petId:id
})),patch={
petId:id,name:normalized.name,phone:_appPhoneForSheet_(normalized.phone),addressLine:normalized.addressLine,subDistrict:normalized.subDistrict,district:normalized.district,province:normalized.province,postalCode:normalized.postalCode,address:normalized.address,petitionerId:normalized.petitionerId,idCard:normalized.idCard,caseId:normalized.caseId,remark:normalized.remark,isDeleted:!1,deletedAt:""
};
return _peopleUpsertResilient_("Petitioners","petId",id,patch,function(){
var result=repo.upsert(id,patch);
return ok_({
petId:result.key,mode:result.mode
},"update"===result.mode?"อัปเดตข้อมูลผู้ร้องสำเร็จ":"เพิ่มผู้ร้องสำเร็จ")
})
})
}
function _Domain_deletePetitioner(petId){
return domainWrite_("deletePetitioner",{
petId:petId
},function(input){
var ok;
return _peopleRepo_("Petitioners","petId").softDelete(input.petId)?ok_({
petId:input.petId
},"ลบข้อมูลผู้ร้องสำเร็จ"):err_("ไม่พบข้อมูลผู้ร้อง")
})
}
function _Domain_getPetitionerById_(petId){
var targetId=String(petId||"").trim();
if(!targetId)return null;
for(var rows=_Domain_getPetitioners(),i=0;
i<rows.length;
i++){
var row=rows[i]||{
};
if(String(row.petId||"").trim()===targetId)return normalizePetitionerRow_(row)
}
return null
}
function _Domain_getPetitionerPrintPayload(petId){
try{
var row=_Domain_getPetitionerById_(petId);
return row?ok_({
profileName:"petitioner-detail",meta:{
title:"คณะกรรมาธิการการป้องกันและปราบปรามการทุจริตประพฤติมิชอบ",subtitle:"สภาผู้แทนราษฎร",classification:"ข้อมูลผู้ร้องและรายละเอียดเรื่องร้องเรียน",caseNo:String(row.caseId||""),referenceNo:String(row.petId||"")
},record:row,sections:[{
key:"petitioner",title:"ข้อมูลผู้ร้อง",fields:{
"ชื่อผู้ร้อง":row.name,"โทรศัพท์":row.phone,"ที่อยู่":row.address,"เลขประจำตัวผู้ร้อง":row.petitionerId,"เลขบัตรประชาชน":row.idCard
}
},{
key:"case",title:"ข้อมูลเรื่องร้องเรียน",fields:{
"เลขเรื่อง":row.caseId,"หมายเหตุ":row.remark,"ปรับปรุงล่าสุด":row.updatedAt,"สร้างข้อมูลเมื่อ":row.createdAt
}
}
]
},"โหลดข้อมูลพิมพ์ผู้ร้องสำเร็จ"):err_("ไม่พบข้อมูลผู้ร้อง")
}
catch(e){
return err_(e.message||String(e))
}
}
function apiSavePetitioner(payload){
return writeGateway_("apiSavePetitioner",payload||{
},function(input){
var _auth=_peopleSafeReq_(input,"staff","apiSavePetitioner");
if(!_auth.ok)return _auth.result;
input=_auth.payload;
var res=normalizeResult_(_Domain_savePetitioner(input||{
}),"บันทึกข้อมูลผู้ร้องเรียนสำเร็จ","บันทึกข้อมูลผู้ร้องเรียนไม่สำเร็จ");
if(res&&res.ok)try{
_peopleMarkDirtyDomains_(["petitioners"],"apiSavePetitioner")
}
catch(_dirtyErr){
_appIsFnName_("_recordWarning_")?_recordWarning_("ec",_dirtyErr):_appIsFnName_("_logWarn_")?_logWarn_("ec",{
error:String(_dirtyErr&&_dirtyErr.message||_dirtyErr)
}):void _dirtyErr
}
return res
},"บันทึกข้อมูลผู้ร้องเรียนสำเร็จ","บันทึกข้อมูลผู้ร้องเรียนไม่สำเร็จ")
}
function apiDeletePetitioner(payload){
return writeGateway_("apiDeletePetitioner",payload||{
},function(input){
var _auth=_peopleSafeReq_(input,"staff","apiDeletePetitioner");
if(!_auth.ok)return _auth.result;
input=_auth.payload;
var res=normalizeResult_(_Domain_deletePetitioner(_payloadValue_(input,["petId","id"])),"ลบข้อมูลผู้ร้องเรียนสำเร็จ","ลบข้อมูลผู้ร้องเรียนไม่สำเร็จ");
if(res&&res.ok)try{
_peopleMarkDirtyDomains_(["petitioners"],"apiDeletePetitioner")
}
catch(_dirtyErr){
_appIsFnName_("_recordWarning_")?_recordWarning_("ec",_dirtyErr):_appIsFnName_("_logWarn_")?_logWarn_("ec",{
error:String(_dirtyErr&&_dirtyErr.message||_dirtyErr)
}):void _dirtyErr
}
return res
},"ลบข้อมูลผู้ร้องเรียนสำเร็จ","ลบข้อมูลผู้ร้องเรียนไม่สำเร็จ")
}
function _peoplePersonnelRowsByKind_(kind,options){
options=options||{
};
var getter="ops"===(kind=String(kind||"staffs"))?_Domain_getPersonnelOps:"comms"===kind?_Domain_getPersonnelComms:"subcommitteeMembers"===kind?_Domain_getPersonnelSubcommittees:_Domain_getPersonnelStaffs,cacheStampKey="ops"===kind?"personnel_op":"comms"===kind?"personnel_comm":"subcommitteeMembers"===kind?"personnel_subcommittees":"personnel_staff",cacheStamp,cacheKey="people:personnel-cache-current:"+kind+":"+(_appIsFnName_("_entityCacheStamp_")?_entityCacheStamp_(cacheStampKey):"1");
try{
var bypassCache=!0===options.forceFresh||!0===options.forceRefresh||!0===options.noCache||!0===options.reload;
if(_appIsFnName_("_AppCacheGetJson_")&&!bypassCache){
var hit=_AppCacheGetJson_(cacheKey);
if(Array.isArray(hit)&&("subcommitteeMembers"!==kind||0!==hit.length))return hit._loadOk=!0,hit
}
}
catch(_cacheReadErr){
_appIsFnName_("_recordWarning_")?_recordWarning_("ec",_cacheReadErr):_appIsFnName_("_logWarn_")?_logWarn_("ec",{
error:String(_cacheReadErr&&_cacheReadErr.message||_cacheReadErr)
}):void _cacheReadErr
}
var rows=[],loadError="";
try{
rows=getter()
}
catch(err){
loadError=String(err&&err.message||err||"โหลดข้อมูลบุคลากรไม่สำเร็จ"),_appIsFnName_("_recordWarning_")&&_recordWarning_("people.rows."+kind,err)
}
(rows=(Array.isArray(rows)?rows:[]).map(_peopleNormalizePersonnelContractRow_))._loadOk=!loadError,rows._loadError=loadError;
try{
_appIsFnName_("_AppCachePutJson_")&&!loadError&&_AppCachePutJson_(cacheKey,rows,240)
}
catch(_cachePutErr){
_appIsFnName_("_recordWarning_")?_recordWarning_("ec",_cachePutErr):_appIsFnName_("_logWarn_")?_logWarn_("ec",{
error:String(_cachePutErr&&_cachePutErr.message||_cachePutErr)
}):void _cachePutErr
}
return rows
}
function _peoplePagedPersonnelResponse_(payload,kind,source,message){
var all=_peoplePersonnelRowsByKind_(kind,payload||{
}),total=all.length,page=Math.max(1,Number((payload||{
}).page||1)||1),reqLimit=Math.max(0,Math.min(Number((payload||{
}).limit||(payload||{
}).pageSize||0)||0,5e3)),limit=reqLimit||total,rows=reqLimit?all.slice((page-1)*limit,page*limit):all,loadOk=!1!==all._loadOk,loadError=String(all._loadError||""),out={
rows:rows,data:rows,items:rows,records:rows,list:rows,values:rows,totalRecords:total,page:page,limit:limit,pageSize:limit,totalPages:limit?Math.max(1,Math.ceil(total/limit)):1,serverPaged:!!reqLimit,source:source,loadOk:loadOk,degraded:!loadOk,warning:loadError,noFyColumn:!0,cacheStamp:"people-personnel-cache-current"
};
"ops"===kind&&(out.ops=rows),"comms"===kind&&(out.comms=rows,out.personnelComms=rows),"staffs"===kind&&(out.staffs=rows,out.personnelStaffs=rows),"subcommitteeMembers"===kind&&(out.subcommitteeMembers=rows,out.personnelSubcommittees=rows);
var response=ok_(out,message);
return["rows","items","records","list","values"].forEach(function(k){
response[k]=rows
}),["totalRecords","page","limit","totalPages","serverPaged","source","loadOk","degraded","warning"].forEach(function(k){
response[k]=out[k]
}),"ops"===kind&&(response.ops=rows),"comms"===kind&&(response.comms=rows),"staffs"===kind&&(response.staffs=rows,response.personnelStaffs=rows),"subcommitteeMembers"===kind&&(response.subcommitteeMembers=rows,response.personnelSubcommittees=rows),response
}
function apiGetPersonnelComms(payload){
var _auth=_peopleSafeReq_(payload,"viewer","apiGetPersonnelComms");
return _auth.ok?_peoplePagedPersonnelResponse_(payload=_auth.payload,"comms","Personnel_Comm","โหลดข้อมูลบุคลากรคณะกรรมาธิการสำเร็จ"):_auth.result
}
function apiGetPersonnelOps(payload){
var _auth=_peopleSafeReq_(payload,"viewer","apiGetPersonnelOps");
return _auth.ok?_peoplePagedPersonnelResponse_(payload=_auth.payload,"ops","Personnel_Op","โหลดข้อมูลเจ้าหน้าที่ปฏิบัติงานจาก Personnel_Op สำเร็จ"):_auth.result
}
function apiGetPersonnelStaffs(payload){
var _auth=_peopleSafeReq_(payload,"viewer","apiGetPersonnelStaffs");
return _auth.ok?_peoplePagedPersonnelResponse_(payload=_auth.payload,"staffs","Personnel_Staff","โหลดข้อมูลบุคลากรจาก Personnel_Staff สำเร็จ"):_auth.result
}
function apiGetPersonnelSubcommittees(payload){
var _auth=_peopleSafeReq_(payload,"viewer","apiGetPersonnelSubcommittees");
if(!_auth.ok)return _auth.result;
if(!0===(payload=_auth.payload).forceFresh||!0===payload.forceRefresh||!0===payload.noCache||!0===payload.reload){
var directRows="function"==typeof _Domain_getPersonnelSubcommittees?_Domain_getPersonnelSubcommittees():[];
return directRows=(Array.isArray(directRows)?directRows:[]).map(_peopleNormalizePersonnelContractRow_),ok_({
rows:directRows,data:directRows,items:directRows,records:directRows,list:directRows,values:directRows,subcommitteeMembers:directRows,personnelSubcommittees:directRows,totalRecords:directRows.length,total:directRows.length,page:1,limit:directRows.length,pageSize:directRows.length,totalPages:1,serverPaged:!1,source:"Personnel_Subcommittees/direct-forceFresh",loadOk:!0
},"โหลดข้อมูลคณะอนุกรรมาธิการสำเร็จ")
}
return _peoplePagedPersonnelResponse_(payload,"subcommitteeMembers","Personnel_Subcommittees","โหลดข้อมูลคณะอนุกรรมาธิการสำเร็จ")
}
function apiGetPersonnelDirectoryBundle(payload){
var _auth=_peopleSafeReq_(payload,"viewer","apiGetPersonnelDirectoryBundle");
return _auth.ok?(payload=_auth.payload,_peopleApiOk_(_Domain_getPersonnelDirectoryBundle,{
comms:[],staffs:[],ops:[]
},"โหลดข้อมูลสารบบบุคลากรสำเร็จ")):_auth.result
}
function _peopleBundleDate_(value){
var raw=_normalizePeopleDateValue_(value||""),m=String(raw||"").match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
if(!m)return null;
var y=Number(m[1]);
y>2400&&(y-=543);
var d=new Date(y,Number(m[2])-1,Number(m[3]));
return isNaN(d.getTime())?null:d
}
function _peopleBundleFy_(date){
return date&&!isNaN(date.getTime())?String(date.getMonth()>=9?date.getFullYear()+544:date.getFullYear()+543):""
}
function _peopleFiscalYearRange_(fy){
var y=Number(String(fy||"").replace(/[^0-9]/g,""));
if(!y)return null;
var ad=y-543;
return{
fy:String(y),start:new Date(ad-1,9,1),end:new Date(ad,8,30,23,59,59)
}
}
function _peopleDateOverlapsRange_(start,end,range){
if(!range)return!0;
var s=start||range.start,e=end||range.end;
return s.getTime()<=range.end.getTime()&&e.getTime()>=range.start.getTime()
}
function _peopleIsActiveOnDate_(row,date){
row=row||{
},date=date||new Date;
var target=new Date(date.getFullYear(),date.getMonth(),date.getDate()),start=_peopleBundleDate_(row.startDate||row["วันที่เริ่ม"]||row["วันเริ่ม"]),end=_peopleBundleDate_(row.endDate||row["วันที่สิ้นสุด"]||row["วันสิ้นสุด"]);
return _peopleIsActiveStatus_(row.status||row["สถานะ"])&&(!start||start.getTime()<=target.getTime())&&(!end||end.getTime()>=target.getTime())
}
function _peopleNormalizePersonnelContractRow_(row){
row=row||{
};
var out=Object.assign({
},row),status;
return _peopleIsActiveStatus_(out.status||out["สถานะ"]||"")&&(out.endDate="",out["วันที่สิ้นสุด"]="",out["วันสิ้นสุด"]=""),out.fiscalYear=out.fiscalYear||out.fy||_peopleInferFiscalYearFromDates_(out.startDate||out["วันที่เริ่ม"]||out["วันเริ่ม"],out.endDate||out["วันที่สิ้นสุด"]||out["วันสิ้นสุด"]),out.contractStamp=out.contractStamp||"people-contract-dto-current",_peopleCanonicalPersonnelDto_(out)
}
function _peopleBundleFiscalYears_(bundle){
var map={
};
function addFiscalYear_(v){
(v=String(v||"").replace(/[^0-9]/g,""))&&(map[v]=!0)
}
return addFiscalYear_(_peopleBundleFy_(new Date)),["comms","staffs","ops","subcommitteeMembers"].forEach(function(kind){
(Array.isArray(bundle&&bundle[kind])?bundle[kind]:[]).forEach(function(row){
addFiscalYear_((row=row||{
}).fy||row.fiscalYear||row["ปีงบประมาณ"]),addFiscalYear_(_peopleInferFiscalYearFromDates_(row.startDate||row["วันที่เริ่ม"]||row["วันเริ่ม"],row.endDate||row["วันที่สิ้นสุด"]||row["วันสิ้นสุด"]))
})
}),Object.keys(map).sort(function(a,b){
return Number(b)-Number(a)
})
}
function _peopleBundleSalaryNumber_(row){
var raw=(row=row||{
}).salaryAmount||row.monthlySalary||row.salary||row.salaryBaht||row["เงินเดือน (บาท)"]||row["เงินเดือน"]||row.amount||0;
return Math.max(0,Number(String(null==raw?"":raw).replace(/[^0-9.\-]/g,""))||0)
}
function _peopleBundleSummary_(bundle,selectedFy){
var today=new Date;
today=new Date(today.getFullYear(),today.getMonth(),today.getDate());
var range=_peopleFiscalYearRange_(selectedFy||""),currentMonthlyExpense=0,monthlyRateTotal=0,activeStaffs=0;
return(Array.isArray(bundle&&bundle.staffs)?bundle.staffs:[]).forEach(function(row){
var amount=_peopleBundleSalaryNumber_(row=_peopleNormalizePersonnelContractRow_(row||{
})),start,end;
_peopleDateOverlapsRange_(_peopleBundleDate_(row.startDate||row["วันที่เริ่ม"]||row["วันเริ่ม"]),_peopleBundleDate_(row.endDate||row["วันที่สิ้นสุด"]||row["วันสิ้นสุด"]),range)&&(monthlyRateTotal+=amount,_peopleIsActiveOnDate_(row,today)&&(activeStaffs++,currentMonthlyExpense+=amount))
}),{
comms:(bundle.comms||[]).length,staffs:(bundle.staffs||[]).length,ops:(bundle.ops||[]).length,activeStaffs:activeStaffs,selectedFiscalYear:String(selectedFy||""),monthlyRateTotal:monthlyRateTotal,currentMonthlyExpense:currentMonthlyExpense,contractStamp:"people-performance-split-current",generatedAt:(new Date).toISOString()
}
}
function _peoplePageBundleCacheKey_(selectedFy){
var cacheStamps=["personnel_comm","personnel_staff","personnel_op","personnel_subcommittees","salarysettings"].map(function(k){
try{
return k+":"+(_appIsFnName_("_entityCacheStamp_")?_entityCacheStamp_(k):"1")
}
catch(_e){
return k+":1"
}
}).join("|");
return"people_pb_current_"+String(selectedFy||"latest")+"_"+_peopleBundleFy_(new Date)+"_"+cacheStamps
}
function _apiGetPeoplePageBundleCore_(payload){
var _auth=_peopleSafeReq_(payload,"viewer","apiGetPeoplePageBundle");
if(!_auth.ok)return _auth.result;
payload=_auth.payload;
var requestedFy=String(payload.fy||payload.fiscalYear||payload.year||payload.budgetFy||payload.selectedFiscalYear||payload.currentFy||payload["ปีงบประมาณ"]||"").replace(/[^0-9]/g,""),cacheKey=_peoplePageBundleCacheKey_(requestedFy||"latest");
if(!0!==payload.forceFresh&&_appIsFnName_("_AppCacheGetJson_")){
var cached=_AppCacheGetJson_(cacheKey);
if(cached&&cached.loadOk)return cached.cached=!0,cached.cacheStatus="hit",ok_(cached,"โหลดข้อมูลหน้าบุคลากรสำเร็จ")
}
try{
var bundle=_Domain_getPersonnelDirectoryBundle(),selectedFy=requestedFy,salarySettings={
};
try{
"function"==typeof getSalarySettings&&(salarySettings=getSalarySettings(selectedFy||"")||{
})
}
catch(_salaryErr){
salarySettings={
}
}
var fiscalYears=_peopleBundleFiscalYears_(bundle);
if(selectedFy&&fiscalYears.indexOf(selectedFy)<0&&fiscalYears.unshift(selectedFy),selectedFy=selectedFy||fiscalYears[0]||"",!requestedFy&&"function"==typeof getSalarySettings)try{
salarySettings=getSalarySettings(selectedFy||"")||salarySettings||{
}
}
catch(_salaryDefaultErr){
_appIsFnName_("_recordWarning_")&&_recordWarning_("people.salarySettings.default.failed",_salaryDefaultErr,{
fy:selectedFy
})
}
bundle.comms=(bundle.comms||[]).map(_peopleNormalizePersonnelContractRow_),bundle.staffs=(bundle.staffs||[]).map(_peopleNormalizePersonnelContractRow_),bundle.ops=(bundle.ops||[]).map(_peopleNormalizePersonnelContractRow_),bundle.subcommitteeMembers=(bundle.subcommitteeMembers||[]).map(_mapPersonnelSubcommitteeRow_);
var summary=_peopleBundleSummary_(bundle,selectedFy),data={
comms:bundle.comms||[],staffs:bundle.staffs||[],ops:bundle.ops||[],subcommitteeMembers:bundle.subcommitteeMembers||[],personnelSubcommittees:bundle.subcommitteeMembers||[],fiscalYears:fiscalYears,selectedFiscalYear:selectedFy,salarySettings:salarySettings,salarySummary:summary,currentMonthlyExpense:summary.currentMonthlyExpense,summary:summary,cacheStamp:"people-dto-current",contractStamp:"people-page-bundle-dto-current",loadedAt:(new Date).toISOString(),loadOk:!0,cached:!1,cacheStatus:"miss",directoryPerformance:!0,performance:{
directoryReadModel:!0,directoryCacheStatus:String(bundle.cacheStatus||"unknown"),selectedFiscalYear:selectedFy
}
};
data.committeeMembers=data.comms,data.staffMembers=data.staffs,data.operationStaff=data.ops;
var includeSalaryRows=!(payload&&(!0===payload.liteFirstPaint||!1===payload.includeSalaryRows||"false"===String(payload.includeSalaryRows||"").toLowerCase()));
var salaryPayments=includeSalaryRows?_peopleSalaryPaymentsRows_():[],salaryByName={
};
function _peopleSalaryRoleKeyCurrent_(row){
row=row||{
};
var pos=String(row.position||row.role||row.title||row["ตำแหน่ง"]||"").replace(/\s+/g,"");
return/ที่ปรึกษาประจำคณะกรรมาธิการ/.test(pos)?"advisor":/นักวิชาการประจำคณะกรรมาธิการ/.test(pos)?"academic":/ผู้ชำนาญ(?:การ)?ประจำคณะกรรมาธิการ/.test(pos)?"expert":/เลขานุการประจำคณะกรรมาธิการ/.test(pos)?"secretary":""
}
function _peopleSalaryCurrent_(row){
row=row||{
};
try{
if(_appIsFnName_("_peopleIsActiveOnDate_"))return!!_peopleIsActiveOnDate_(row,new Date)
}
catch(_activeErr){
_appIsFnName_("_recordWarning_")&&_recordWarning_("people.salary.currentActiveCheck",_activeErr)
}
var st=String(row.status||row["สถานะ"]||row.activeStatus||"");
if(/พ้น|สิ้นสุด|ยุติ|ลาออก|inactive/i.test(st))return!1;
var end=String(row.endDate||row.dateEnd||row.expireDate||row["วันสิ้นสุด"]||row["วันสิ้นสุดตำแหน่ง"]||"");
return!end||"-"===end||"ปัจจุบัน"===end||/current|present/i.test(end)
}
function _peopleSalarySettingRateCurrent_(role){
var ss=salarySettings||{
};
function n(v){
var x=Number(String(v||0).replace(/,/g,""));
return isFinite(x)?x:0
}
for(var keys="advisor"===role?["adv","advisor","ที่ปรึกษา","advisorRate","advisorSalary"]:"academic"===role?["aca","academic","นักวิชาการ","academicRate","academicSalary"]:"secretary"===role?["sec","secretary","เลขานุการ","secretaryRate","secretarySalary"]:["exp","expert","ผู้ชำนาญ","ผู้ชำนาญการ","expertRate","expertSalary"],i=0;
i<keys.length;
i++)if(n(ss[keys[i]])>0)return n(ss[keys[i]]);
return 0
}
salaryPayments.forEach(function(row){
var k=String(row.name||row.personName||"").trim().toLowerCase();
k&&(salaryByName[k]=row)
}),data.staffs=(data.staffs||[]).map(function(row){
row=row||{
};
var k=String(row.name||row.fullName||row["ชื่อ-สกุล"]||"").trim().toLowerCase(),pay=k&&salaryByName[k],amount=Number(String(row.salaryAmount||row.salary||row.monthlySalary||row.monthlyRate||row.payAmount||row.salaryRate||row["จำนวนเงิน"]||row["เงินเดือน"]||0).replace(/,/g,""));
return(!isFinite(amount)||amount<=0)&&pay&&(row.salaryAmount=pay.salaryAmount,row.salary=pay.salaryAmount,row.monthlySalary=pay.salaryAmount,row.monthlyRate=pay.monthlyRate||pay.salaryAmount),row
}),data.salaryPayments=salaryPayments;
var salaryByNameCurrent={
};
salaryPayments.forEach(function(row){
var k=String(row.name||row.personName||"").trim().toLowerCase();
k&&Number(row.salaryAmount||0)>0&&(salaryByNameCurrent[k]=Number(row.salaryAmount||0))
}),data.salaryRows=(data.staffs||[]).filter(function(row){
return row&&row.name&&_peopleSalaryRoleKeyCurrent_(row)&&_peopleSalaryCurrent_(row)
}).map(function(row){
row=Object.assign({
},row||{
});
var k=String(row.name||row.fullName||row["ชื่อ-สกุล"]||"").trim().toLowerCase(),amount=Number(String(row.salaryAmount||row.salary||row.monthlySalary||row.monthlyRate||row.payAmount||row.salaryRate||row["จำนวนเงิน"]||row["เงินเดือน"]||0).replace(/,/g,""));
return(!isFinite(amount)||amount<=0)&&salaryByNameCurrent[k]&&(amount=salaryByNameCurrent[k]),(!isFinite(amount)||amount<=0)&&(amount=_peopleSalarySettingRateCurrent_(_peopleSalaryRoleKeyCurrent_(row))),row.salaryAmount=isFinite(amount)?amount:0,row.salary=row.salaryAmount,row.monthlySalary=row.salaryAmount,row.monthlyRate=row.salaryAmount,row
}).filter(function(row){
return Number(row.salaryAmount||0)>0
}),includeSalaryRows||(data.salaryRows=[],data.salaryPayments=[],data.salaryRowsDeferred=!0),data.historyRows=data.historyRows||[],data.peopleProductionDto=!0,data.peopleDtoOwner="Code_33_Domain_People.apiGetPeoplePageBundle",data.contractStamp="people-page-bundle-dto-ppl-current";
try{
_appIsFnName_("_AppCachePutJson_")&&_AppCachePutJson_(cacheKey,data,Math.max(120,Math.min(Number(payload.cacheTtlSeconds||240)||240,600)))
}
catch(_peopleCachePutErr){
_appIsFnName_("_recordWarning_")&&_recordWarning_("people.bundle.cachePut.failed",_peopleCachePutErr,{
fy:selectedFy
})
}
return ok_(data,"โหลดข้อมูลหน้าบุคลากรสำเร็จ")
}
catch(e){
return _appIsFnName_("_logApiFailure_")&&_logApiFailure_("people.pageBundle.failed",e,{
fy:requestedFy
}),ok_({
comms:[],staffs:[],ops:[],subcommitteeMembers:[],personnelSubcommittees:[],fiscalYears:requestedFy?[requestedFy]:[],selectedFiscalYear:requestedFy||"",salarySettings:{
},summary:{
currentMonthlyExpense:0
},currentMonthlyExpense:0,cacheStamp:"people-dto-current",contractStamp:"people-page-bundle-dto-current",loadedAt:(new Date).toISOString(),loadOk:!1,degraded:!0,errorCode:"PEOPLE_PAGE_BUNDLE_DEGRADED",totalRecords:0,page:1,limit:Math.max(25,Number(payload.limit||payload.pageSize||25)||25),warning:String(e&&e.message||e||"โหลดข้อมูลบุคลากรไม่สำเร็จ")
},"โหลดหน้าบุคลากรแบบจำกัด")
}
}
"function"==typeof _Domain_getPersonnelComms&&(AppDomain.getPersonnelComms=_Domain_getPersonnelComms),"function"==typeof _Domain_getPersonnelOps&&(AppDomain.getPersonnelOps=_Domain_getPersonnelOps),"function"==typeof _Domain_getPersonnelStaffs&&(AppDomain.getPersonnelStaffs=_Domain_getPersonnelStaffs),"function"==typeof _Domain_getPersonnelDirectoryBundle&&(AppDomain.getPersonnelDirectoryBundle=_Domain_getPersonnelDirectoryBundle),"function"==typeof _Domain_savePersonnelComm&&(AppDomain.savePersonnelComm=_Domain_savePersonnelComm),"function"==typeof _Domain_savePersonnelOp&&(AppDomain.savePersonnelOp=_Domain_savePersonnelOp),"function"==typeof _Domain_savePersonnelStaff&&(AppDomain.savePersonnelStaff=_Domain_savePersonnelStaff),"function"==typeof _Domain_deletePersonnelComm&&(AppDomain.deletePersonnelComm=_Domain_deletePersonnelComm),"function"==typeof _Domain_deletePersonnelOp&&(AppDomain.deletePersonnelOp=_Domain_deletePersonnelOp),"function"==typeof _Domain_deletePersonnelStaff&&(AppDomain.deletePersonnelStaff=_Domain_deletePersonnelStaff),"function"==typeof _Domain_getPersonnelSubcommittees&&(AppDomain.getPersonnelSubcommittees=_Domain_getPersonnelSubcommittees),"function"==typeof _Domain_savePersonnelSubcommittee&&(AppDomain.savePersonnelSubcommittee=_Domain_savePersonnelSubcommittee),"function"==typeof _Domain_deletePersonnelSubcommittee&&(AppDomain.deletePersonnelSubcommittee=_Domain_deletePersonnelSubcommittee),"function"==typeof _Domain_getSubcommitteeList&&(AppDomain.getSubcommitteeList=_Domain_getSubcommitteeList),"function"==typeof _Domain_saveSubcommittee&&(AppDomain.saveSubcommittee=_Domain_saveSubcommittee),"function"==typeof _Domain_deleteSubcommittee&&(AppDomain.deleteSubcommittee=_Domain_deleteSubcommittee),"function"==typeof _Domain_getPetitioners&&(AppDomain.getPetitioners=_Domain_getPetitioners),"function"==typeof _Domain_savePetitioner&&(AppDomain.savePetitioner=_Domain_savePetitioner),"function"==typeof _Domain_getPetitionerPrintPayload&&(AppDomain.getPetitionerPrintPayload=_Domain_getPetitionerPrintPayload);
PeopleDomain.VERSION="people-domain-final-current",PeopleDomain.normalizeBundle=function(res){
var data=res&&res.data&&"object"==typeof res.data?res.data:res;
if(data&&"object"==typeof data){
var rows=Array.isArray(data.rows)?data.rows:Array.isArray(data.items)?data.items:Array.isArray(data.data)?data.data:[];
!Array.isArray(data.rows)&&rows.length&&(data.rows=rows),data.totalRecords=Number(data.totalRecords||data.total||rows.length||0)||0,data.owner="PeopleDomain.getPageBundle",data.domainOwner="PeopleDomain"
}
return res
},PeopleDomain.getPageBundle=function(payload){
var res=_apiGetPeoplePageBundleCore_(payload||{
});
return PeopleDomain.normalizeBundle(res)
};
PeopleDomain.OWNER_CONTRACT_PHASE5=_peopleDomainOwnerContractPhase5_();
PetitionerDomain.OWNER_CONTRACT_PHASE5=Object.assign({},PeopleDomain.OWNER_CONTRACT_PHASE5,{
owner:"PetitionerDomain",
sourceOfTruth:["Petitioners","MainData-related-counts"],
readOwner:"PetitionerDomain.getList",
writeOwner:"PetitionerDomain.save/delete"
});
PeopleDomain.status=PeopleDomain.status||function(){
return{
ok:!0,
owner:"PeopleDomain",
version:PeopleDomain.VERSION||"people-domain-final-current",
contract:PeopleDomain.OWNER_CONTRACT,
phase5:PeopleDomain.OWNER_CONTRACT_PHASE5,
uiDomChanged:!1,
businessLogicChanged:!1,
apiNamesPreserved:!0
}
};
PetitionerDomain.status=function(){
return{
ok:!0,
owner:"PetitionerDomain",
phase5:PetitionerDomain.OWNER_CONTRACT_PHASE5,
uiDomChanged:!1,
businessLogicChanged:!1,
apiNamesPreserved:!0
}
};
function apiGetPeoplePageBundle(payload){
return _appIsFnName_("_withHotApiTelemetry_")?_withHotApiTelemetry_("apiGetPeoplePageBundle",payload||{
},"people.pageBundle",function(p){
return PeopleDomain.getPageBundle(p||{
})
}):PeopleDomain.getPageBundle(payload||{
})
}
function _peopleInvalidatePersonnelDomains_(reason){
try{
_appIsFnName_("_AppCacheInvalidateDomain_")&&(_AppCacheInvalidateDomain_("personnel"),_AppCacheInvalidateDomain_("dashboard"))
}
catch(_cacheErr){
_appIsFnName_("_recordWarning_")?_recordWarning_("ec",_cacheErr):_appIsFnName_("_logWarn_")?_logWarn_("ec",{
error:String(_cacheErr&&_cacheErr.message||_cacheErr)
}):void _cacheErr
}
try{
_peopleMarkDirtyDomains_(["people","dashboard"],reason||"people-write")
}
catch(_dirtyErr){
_appIsFnName_("_recordWarning_")?_recordWarning_("ec",_dirtyErr):_appIsFnName_("_logWarn_")?_logWarn_("ec",{
error:String(_dirtyErr&&_dirtyErr.message||_dirtyErr)
}):void _dirtyErr
}
}
function apiDeletePersonnelComm(payload){
return writeGateway_("apiDeletePersonnelComm",payload||{
},function(input){
var _auth=_peopleSafeReq_(input,"staff","apiDeletePersonnelComm");
if(!_auth.ok)return _auth.result;
input=_auth.payload;
var res=normalizeResult_(_Domain_deletePersonnelComm(_payloadValue_(input,["id","personnelId","commId"])),"ลบข้อมูลคณะกรรมาธิการสำเร็จ","ลบข้อมูลคณะกรรมาธิการไม่สำเร็จ");
return res&&res.ok&&_peopleInvalidatePersonnelDomains_("apiDeletePersonnelComm"),res
},"ลบข้อมูลคณะกรรมาธิการสำเร็จ","ลบข้อมูลคณะกรรมาธิการไม่สำเร็จ")
}
function apiDeletePersonnelOp(payload){
return writeGateway_("apiDeletePersonnelOp",payload||{
},function(input){
var _auth=_peopleSafeReq_(input,"staff","apiDeletePersonnelOp");
if(!_auth.ok)return _auth.result;
input=_auth.payload;
var res=normalizeResult_(_Domain_deletePersonnelOp(_payloadValue_(input,["id","personnelId","opId"])),"ลบข้อมูลเจ้าหน้าที่ฝ่ายเลขานุการสำเร็จ","ลบข้อมูลเจ้าหน้าที่ฝ่ายเลขานุการไม่สำเร็จ");
return res&&res.ok&&_peopleInvalidatePersonnelDomains_("apiDeletePersonnelOp"),res
},"ลบข้อมูลเจ้าหน้าที่ฝ่ายเลขานุการสำเร็จ","ลบข้อมูลเจ้าหน้าที่ฝ่ายเลขานุการไม่สำเร็จ")
}
function apiDeletePersonnelStaff(payload){
return writeGateway_("apiDeletePersonnelStaff",payload||{
},function(input){
var _auth=_peopleSafeReq_(input,"staff","apiDeletePersonnelStaff");
if(!_auth.ok)return _auth.result;
input=_auth.payload;
var res=normalizeResult_(_Domain_deletePersonnelStaff(_payloadValue_(input,["id","personnelId","staffId"])),"ลบข้อมูลบุคลากรสำเร็จ","ลบข้อมูลบุคลากรไม่สำเร็จ");
return res&&res.ok&&_peopleInvalidatePersonnelDomains_("apiDeletePersonnelStaff"),res
},"ลบข้อมูลบุคลากรสำเร็จ","ลบข้อมูลบุคลากรไม่สำเร็จ")
}
function apiDeletePersonnelSubcommittee(payload){
return writeGateway_("apiDeletePersonnelSubcommittee",payload||{
},function(input){
var _auth=_peopleSafeReq_(input,"staff","apiDeletePersonnelSubcommittee");
if(!_auth.ok)return _auth.result;
input=_auth.payload;
var res=normalizeResult_(_Domain_deletePersonnelSubcommittee(_payloadValue_(input,["id","personnelId","subcommitteeId"])),"ลบข้อมูลคณะอนุกรรมาธิการสำเร็จ","ลบข้อมูลคณะอนุกรรมาธิการไม่สำเร็จ");
return res&&res.ok&&_peopleInvalidatePersonnelDomains_("apiDeletePersonnelSubcommittee"),res
},"ลบข้อมูลคณะอนุกรรมาธิการสำเร็จ","ลบข้อมูลคณะอนุกรรมาธิการไม่สำเร็จ")
}
function apiSavePersonnelComm(payload){
return writeGateway_("apiSavePersonnelComm",payload||{
},function(input){
var _auth=_peopleSafeReq_(input,"staff","apiSavePersonnelComm");
if(!_auth.ok)return _auth.result;
input=_auth.payload;
var res=normalizeResult_(_Domain_savePersonnelComm(input),"บันทึกข้อมูลคณะกรรมาธิการสำเร็จ","บันทึกข้อมูลคณะกรรมาธิการไม่สำเร็จ");
return res&&res.ok&&_peopleInvalidatePersonnelDomains_("apiSavePersonnelComm"),res
},"บันทึกข้อมูลคณะกรรมาธิการสำเร็จ","บันทึกข้อมูลคณะกรรมาธิการไม่สำเร็จ")
}
function apiSavePersonnelSubcommittee(payload){
return writeGateway_("apiSavePersonnelSubcommittee",payload||{
},function(input){
var _auth=_peopleSafeReq_(input,"staff","apiSavePersonnelSubcommittee");
if(!_auth.ok)return _auth.result;
input=_auth.payload;
var res=normalizeResult_(_Domain_savePersonnelSubcommittee(input),"บันทึกข้อมูลคณะอนุกรรมาธิการสำเร็จ","บันทึกข้อมูลคณะอนุกรรมาธิการไม่สำเร็จ");
return res&&res.ok&&_peopleInvalidatePersonnelDomains_("apiSavePersonnelSubcommittee"),res
},"บันทึกข้อมูลคณะอนุกรรมาธิการสำเร็จ","บันทึกข้อมูลคณะอนุกรรมาธิการไม่สำเร็จ")
}
function apiSavePersonnelOp(payload){
return writeGateway_("apiSavePersonnelOp",payload||{
},function(input){
var _auth=_peopleSafeReq_(input,"staff","apiSavePersonnelOp");
if(!_auth.ok)return _auth.result;
input=_auth.payload;
var res=normalizeResult_(_Domain_savePersonnelOp(input),"บันทึกข้อมูลเจ้าหน้าที่ฝ่ายเลขานุการสำเร็จ","บันทึกข้อมูลเจ้าหน้าที่ฝ่ายเลขานุการไม่สำเร็จ");
return res&&res.ok&&_peopleInvalidatePersonnelDomains_("apiSavePersonnelOp"),res
},"บันทึกข้อมูลเจ้าหน้าที่ฝ่ายเลขานุการสำเร็จ","บันทึกข้อมูลเจ้าหน้าที่ฝ่ายเลขานุการไม่สำเร็จ")
}
function apiSavePersonnelStaff(payload){
return writeGateway_("apiSavePersonnelStaff",payload||{
},function(input){
var _auth=_peopleSafeReq_(input,"staff","apiSavePersonnelStaff");
if(!_auth.ok)return _auth.result;
input=_auth.payload;
var res=normalizeResult_(_Domain_savePersonnelStaff(input),"บันทึกข้อมูลบุคลากรสำเร็จ","บันทึกข้อมูลบุคลากรไม่สำเร็จ");
return res&&res.ok&&_peopleInvalidatePersonnelDomains_("apiSavePersonnelStaff"),res
},"บันทึกข้อมูลบุคลากรสำเร็จ","บันทึกข้อมูลบุคลากรไม่สำเร็จ")
}
function _petitionerRelatedNormalizeText_(value){
return String(null==value?"":value).replace(/\s+/g," ").trim().toLowerCase()
}
function _petitionerRelatedMainDataRows_(){
var rows=[];
try{
_appIsFnName_("_caseProjectedRows_")&&(rows=_caseProjectedRows_(["caseId","id","caseNum","recNo","receiveNo","title","caseTitle","subject","petitioners","petitioner","petitionerName","ผู้ร้อง","ผู้ร้องเรียน","ผู้เสนอ","ผู้เสนอญัตติ/ผู้ร้อง","petitionerPhone","status","recDate","receiveDate","dateReceived","createdAt","updatedAt","isDeleted","deletedAt"],60)||[])
}
catch(_caseProjectedErr){
rows=[]
}
if(!Array.isArray(rows)||!rows.length)try{
_appIsFnName_("_listMainDataRows_")&&(rows=_listMainDataRows_(!1)||[])
}
catch(_listErr){
rows=[]
}
if(!Array.isArray(rows)||!rows.length)try{
rows=_peopleDataServiceRows_("MainData",[],{
includeDeleted:!1,ttl:60,owner:"people.mainDataRead"
})||[]
}
catch(_cachedErr){
rows=[]
}
if(!Array.isArray(rows)||!rows.length)try{
"function"==typeof readSheetObjects_&&(rows=readSheetObjects_("MainData",{
includeDeleted:!1
})||[])
}
catch(_readErr){
rows=[]
}
return(Array.isArray(rows)?rows:[]).filter(function(row){
return!(row&&(!0===row.isDeleted||"true"===String(row.isDeleted||row.deleted||"").toLowerCase()||"1"===String(row.isDeleted||row.deleted||"")))
})
}
function _petitionerRelatedCaseHaystack_(row){
return _petitionerRelatedNormalizeText_([(row=row||{
}).petitioners,row.petitioner,row.petitionerName,row["ผู้ร้อง"],row["ผู้ร้องเรียน"],row["ผู้เสนอ"],row["ผู้เสนอญัตติ/ผู้ร้อง"],row.title,row.caseTitle,row.subject,row.recNo,row.caseNum].join(" "))
}
function _petitionerRelatedCaseDto_(row){
return row=row||{
},{
caseId:String(row.caseId||row.id||"").trim(),caseNum:String(row.caseNum||row.caseNo||"").trim(),recNo:String(row.recNo||row.receiveNo||row["เลขรับ"]||row["เลขรับเรื่อง"]||"").trim(),title:String(row.title||row.caseTitle||row.subject||row["เรื่อง"]||row["เรื่องพิจารณา"]||"").trim(),caseTitle:String(row.caseTitle||row.title||row.subject||"").trim(),petitioners:String(row.petitioners||row.petitioner||row.petitionerName||row["ผู้ร้อง"]||row["ผู้ร้องเรียน"]||"").trim(),status:String(row.status||row.caseStatus||row["สถานะ"]||row["สถานะเรื่อง"]||"").trim(),recDate:row.recDate||row.receiveDate||row.dateReceived||row["วันที่รับเรื่อง"]||"",receiveDate:row.receiveDate||row.recDate||row.dateReceived||"",updatedAt:row.updatedAt||row.createdAt||"",createdAt:row.createdAt||""
}
}
function apiGetPetitionerRelatedCounts(payload){
var _auth=_peopleSafeReq_(payload||{
},"viewer","apiGetPetitionerRelatedCounts");
if(!_auth.ok)return _auth.result;
payload=_auth.payload;
var names=Array.isArray(payload.names)?payload.names:[],includeRows=!0===payload.includeRows||"true"===String(payload.includeRows||"").toLowerCase(),limit=Math.max(1,Math.min(Number(payload.limit||50)||50,100)),counts={
},rowsByName={
};
names.map(function(name){
return String(name||"").trim()
}).filter(Boolean).forEach(function(name){
counts[name]=0,rowsByName[name]=[]
});
var keys=Object.keys(counts);
if(!keys.length)return ok_({
counts:counts,rowsByName:rowsByName,rows:[]
},"โหลดจำนวนเรื่องที่เกี่ยวข้องสำเร็จ");
try{
var rows;
_petitionerRelatedMainDataRows_().forEach(function(row){
var hay=_petitionerRelatedCaseHaystack_(row);
hay&&keys.forEach(function(name){
var n=_petitionerRelatedNormalizeText_(name);
n&&(-1===hay.indexOf(n)&&-1===n.indexOf(hay)||(counts[name]+=1,includeRows&&rowsByName[name].length<limit&&rowsByName[name].push(_petitionerRelatedCaseDto_(row))))
})
});
var firstName=keys[0]||"";
return ok_({
counts:counts,rowsByName:rowsByName,rows:rowsByName[firstName]||[],total:counts[firstName]||0,source:"maindata-related-current"
},"โหลดจำนวนเรื่องที่เกี่ยวข้องสำเร็จ")
}
catch(e){
return ok_({
counts:counts,rowsByName:rowsByName,rows:[],total:0,loadOk:!1,warning:e&&e.message?e.message:String(e)
},"โหลดจำนวนเรื่องที่เกี่ยวข้องแบบจำกัด")
}
}
function _peoplePetitionerText_(v){
return null==v?"":String(v).trim()
}
function _peoplePetitionerPick_(row,keys){
row=row&&"object"==typeof row?row:{
};
for(var i=0;
i<keys.length;
i++){
var v=row[keys[i]];
if(null!=v&&""!==String(v).trim())return v
}
return""
}
function _peoplePetitionerSplit_(value){
return _peoplePetitionerText_(value).split(/[\n,;、]+/).map(function(x){
return String(x||"").trim()
}).filter(Boolean)
}
function _peoplePetitionerNormalize_(row,idx){
var name=_peoplePetitionerPick_(row=row&&"object"==typeof row?row:{
},["name","fullName","fullname","personName","petitionerName","requester","complainant","proposer","petitioners","ผู้ร้อง","ผู้เสนอญัตติ/ผู้ร้อง","ชื่อ-สกุล"]);
return Object.assign({
},row,{
petId:_peoplePetitionerText_(_peoplePetitionerPick_(row,["petId","id","uid","rowId","เลขที่"])||"PET-"+(idx+1)),name:_peoplePetitionerText_(name),phone:_appPhoneForDisplay_(_peoplePetitionerPick_(row,["phone","tel","mobile","petitionerPhone","เบอร์โทรศัพท์"])),address:_peoplePetitionerText_(_peoplePetitionerPick_(row,["address","fullAddress","ที่อยู่"])),relatedCount:Number(row.relatedCount||row.caseCount||0)||0
})
}
function _peoplePetitionerRowsFromMainData_(){
var rows=[];
try{
var cases=[];
_appIsFnName_("_peopleDataServiceRows_")?cases=_peopleDataServiceRows_("MainData",[],{
includeDeleted:!1,ttl:120,owner:"people.petitionerMainData"
})||[]:_appIsFnName_("_listMainDataRows_")&&(cases=_listMainDataRows_(!1)||[]);
var map={
};
(Array.isArray(cases)?cases:[]).forEach(function(row){
var names=_peoplePetitionerSplit_(_peoplePetitionerPick_(row=row&&"object"==typeof row?row:{
},["petitioners","petitioner","requester","complainant","proposer","ผู้เสนอญัตติ/ผู้ร้อง","ผู้ร้อง"]));
if(names.length){
var phone=_appPhoneForDisplay_(_peoplePetitionerPick_(row,["petitionerPhone","phone","tel","mobile","เบอร์โทรศัพท์"]));
names.forEach(function(name){
var key=name.replace(/\s+/g," ").toLowerCase();
map[key]||(map[key]={
petId:"PET-"+(Object.keys(map).length+1),name:name,phone:phone,address:"",relatedCount:0
}),phone&&!map[key].phone&&(map[key].phone=phone),map[key].relatedCount=(Number(map[key].relatedCount)||0)+1
})
}
}),rows=Object.keys(map).map(function(k){
return map[k]
})
}
catch(e){
_appIsFnName_("_recordWarning_")&&_recordWarning_("people.petitioner.mainDataRead",e)
}
return rows
}
function _petitionerGetListDomainOwnerPhase5_(payload){
var _auth=_peopleSafeReq_(payload,"viewer","apiGetPetitioners");
if(!_auth.ok)return _auth.result;
payload=_auth.payload;
var rows=[];
try{
rows="function"==typeof _Domain_getPetitioners?_Domain_getPetitioners():[]
}
catch(e){
_appIsFnName_("_recordWarning_")&&_recordWarning_("people.petitioner.domain",e),rows=[]
}
var previousMainDataReadKey="forceMainData"+String.fromCharCode(70,97,108,108,98,97,99,107),forceMainDataRead=!0===payload.forceMainDataRead||"true"===String(payload.forceMainDataRead||"").toLowerCase()||!0===payload[previousMainDataReadKey]||"true"===String(payload[previousMainDataReadKey]||"").toLowerCase();
Array.isArray(rows)&&rows.length||!forceMainDataRead||(rows=_peoplePetitionerRowsFromMainData_());
var data={
rows:rows=(Array.isArray(rows)?rows:[]).map(_peoplePetitionerNormalize_).filter(function(r){
return r&&r.name
}),items:rows,records:rows,data:rows,totalRecords:rows.length,total:rows.length,page:1,limit:rows.length,source:"apiGetPetitioners-current",loadOk:!0,degraded:!1
},res="function"==typeof ok_?ok_(data,"โหลดข้อมูลผู้ร้องเรียนสำเร็จ"):{
ok:!0,data:data,message:"โหลดข้อมูลผู้ร้องเรียนสำเร็จ"
};
return res.rows=rows,res.items=rows,res.records=rows,res.totalRecords=rows.length,res.total=rows.length,res
}
PetitionerDomain.getList=function(payload){
return _petitionerGetListDomainOwnerPhase5_(payload||{
})
};
function apiGetPetitioners(payload){
return PetitionerDomain.getList(payload||{
})
}
AdminDomain.VERSION="admin-domain-final-current",AdminDomain.normalizeUserRows=function(result){
var data=result&&result.data&&"object"==typeof result.data?result.data:result,rows;
return(Array.isArray(data)?data:Array.isArray(data&&data.rows)?data.rows:Array.isArray(data&&data.data)?data.data:Array.isArray(data&&data.items)?data.items:[]).map(function(row,idx){
return row=row||{
},{
username:String(row.username||row.user||row.email||row["ชื่อผู้ใช้"]||"").trim(),name:String(row.name||row.fullName||row.displayName||row["ชื่อ-สกุล"]||row["ชื่อ"]||"").trim(),email:String(row.email||row.mail||row["อีเมล"]||"").trim(),role:String(row.role||row.userRole||row["ระดับสิทธิ์"]||(0===idx?"Admin":"Viewer")).trim()||"Viewer",active:String(row.active||row.isActive||row.status||row["สถานะ"]||"Y").trim()||"Y"
}
}).filter(function(row){
return row.username||row.name||row.email
})
},AdminDomain.listUsers=function(payload){
payload=payload||{
};
try{
_appIsFnName_("_routerReq_")&&(payload=_routerReq_(payload,"admin"));
var rows=[];
try{
"function"==typeof _listUsersEnvelope_&&(rows=AdminDomain.normalizeUserRows(_listUsersEnvelope_(payload)))
}
catch(domainErr){
_appIsFnName_("_recordWarning_")&&_recordWarning_("AdminDomain.listUsers.domain",domainErr)
}
return!rows.length&&"undefined"!=typeof AppRepository&&AppRepository.readObjects&&(rows=AdminDomain.normalizeUserRows(AppRepository.readObjects("Users"))),AdminDomain.rowsEnvelope(rows,"AdminDomain.listUsers","โหลดรายชื่อผู้ใช้งานสำเร็จ")
}
catch(e){
return err_(e&&e.message?e.message:String(e),{
rows:[],data:[],items:[],totalRecords:0,total:0,owner:"AdminDomain.listUsers"
})
}
},AdminDomain.saveUser=function(payload){
payload=payload||{
};
try{
return _appIsFnName_("_routerReq_")&&(payload=_routerReq_(payload,"admin")),"function"==typeof auditEvent_&&auditEvent_("admin",{
route:"apiAdminSaveUser",action:String(payload.action||"save")
}),"function"==typeof _saveUserCanonical_?normalizeResult_(_saveUserCanonical_(payload),"บันทึกผู้ใช้งานสำเร็จ","บันทึกผู้ใช้งานไม่สำเร็จ"):err_("ADMIN_USER_SAVE_OWNER_UNAVAILABLE")
}
catch(e){
return err_(e&&e.message?e.message:String(e))
}
},AdminDomain.deleteUser=function(payload){
payload=payload||{
};
try{
return _appIsFnName_("_routerReq_")&&(payload=_routerReq_(payload,"admin")),"function"==typeof auditEvent_&&auditEvent_("admin",{
route:"apiAdminDeleteUser",username:payload.username||payload.oldUsername||""
}),"function"==typeof _deactivateUserCanonical_?normalizeResult_(_deactivateUserCanonical_(payload),"ลบ/ระงับผู้ใช้งานสำเร็จ","ลบ/ระงับผู้ใช้งานไม่สำเร็จ"):err_("ADMIN_USER_DELETE_OWNER_UNAVAILABLE")
}
catch(e){
return err_(e&&e.message?e.message:String(e))
}
},AdminDomain.rowsEnvelope=function(rows,owner,msg){
return rows=Array.isArray(rows)?rows:[],ok_({
rows:rows,data:rows,items:rows,totalRecords:rows.length,total:rows.length,owner:owner,domainOwner:"AdminDomain"
},msg||"โหลดข้อมูลสำเร็จ")
},AdminDomain.listSubcommittees=function(payload){
payload=payload||{
};
try{
var rows="function"==typeof _Domain_getSubcommitteeList?_Domain_getSubcommitteeList():[];
return AdminDomain.rowsEnvelope(rows,"AdminDomain.listSubcommittees","โหลดรายการคณะอนุกรรมาธิการสำเร็จ")
}
catch(e){
return err_(e&&e.message?e.message:String(e),{
rows:[],data:[],items:[],totalRecords:0,total:0,owner:"AdminDomain.listSubcommittees"
})
}
},AdminDomain.saveSubcommittee=function(payload){
return payload=payload||{
},"function"==typeof _Domain_saveSubcommittee?normalizeResult_(_Domain_saveSubcommittee(payload),"บันทึกคณะอนุกรรมาธิการสำเร็จ","บันทึกคณะอนุกรรมาธิการไม่สำเร็จ"):err_("ADMIN_SUBCOMMITTEE_SAVE_OWNER_UNAVAILABLE")
},AdminDomain.deleteSubcommittee=function(payload){
payload=payload||{
};
var id=_appIsFnName_("_payloadValue_")?_payloadValue_(payload,["id","subcommitteeId"]):payload.id||payload.subcommitteeId;
return"function"==typeof _Domain_deleteSubcommittee?normalizeResult_(_Domain_deleteSubcommittee(id),"ลบคณะอนุกรรมาธิการสำเร็จ","ลบคณะอนุกรรมาธิการไม่สำเร็จ"):err_("ADMIN_SUBCOMMITTEE_DELETE_OWNER_UNAVAILABLE")
};