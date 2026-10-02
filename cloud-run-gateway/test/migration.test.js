'use strict';

const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const domainRouter=require('../cloud-domain-router');
const sheets=require('../google-sheets-repository');

test('P0 static partial manifest resolves every production controller locally',()=>{
  const root=path.join(__dirname,'..','public');
  const manifest=JSON.parse(fs.readFileSync(path.join(root,'static-partials-manifest.json'),'utf8'));
  assert.equal(manifest.version,'cloud-run-static-partials-p0-20261002');
  const required=[
    'Scripts_Core_Runtime','Runtime_01_Request_Lifecycle','Runtime_02_Date_Time','Runtime_03_Table_UI',
    'Runtime_04_Thailand_Location','Runtime_05_Status_Aging','Runtime_06_Print','Runtime_08_AI_Bridge',
    'Scripts_Page_Dashboard','Scripts_Page_ReportTrack::reporttrack-common','Scripts_Page_Search',
    'Scripts_Page_Report','Scripts_Page_Tracking','Scripts_Page_Petitioner','Scripts_Page_People',
    'Scripts_Page_Budget','Scripts_Page_Admin','Scripts_Page_Meeting::meeting-common',
    'Scripts_Page_Meeting::meeting','Scripts_Page_Meeting::committee'
  ];
  for(const name of required){
    assert.ok(manifest.assets[name],name+' missing');
    const rel=manifest.assets[name].replace(/^\.\//,'');
    assert.ok(fs.existsSync(path.join(root,rel)),name+' target missing: '+rel);
  }
  const budget=fs.readFileSync(path.join(root,'static-partials','Scripts_Page_Budget.html'),'utf8');
  assert.equal(budget.includes('<?!='),false,'server template expression leaked into static Budget controller');
  assert.ok(budget.includes('Code_32_Domain_Budget._budgetPersonnelRuleContract_'));
});

test('P2 domain ownership is explicit and fail-closed',async()=>{
  assert.equal(domainRouter.domainForMethod('apiGetTracking'),'tracking');
  assert.equal(domainRouter.domainForMethod('apiSaveLetter'),'tracking');
  assert.equal(domainRouter.domainForMethod('apiBudgetGetSummary'),'budget');
  assert.equal(domainRouter.domainForMethod('apiSearchCasesLite'),'cases');
  assert.deepEqual([...domainRouter.owners({CLOUD_RUN_DOMAIN_OWNERS:''})],[]);
  assert.deepEqual([...domainRouter.owners({CLOUD_RUN_DOMAIN_OWNERS:'tracking,budget'})],['tracking','budget']);
  assert.deepEqual(await domainRouter.dispatch('apiGetTracking',{}, {env:{CLOUD_RUN_DOMAIN_OWNERS:''}}),{handled:false,domain:'tracking'});
  await assert.rejects(
    domainRouter.dispatch('apiGetTracking',{}, {env:{CLOUD_RUN_DOMAIN_OWNERS:'tracking'}}),
    e=>e&&e.code==='CLOUD_DOMAIN_OWNER_NOT_READY'
  );
});

test('Google Sheets repository keeps row/header contract stable without credentials',()=>{
  const table=sheets.tableFromValues({values:[['id','ชื่อ','status'],['1','ทดสอบ','Y'],['2','','N']]});
  assert.deepEqual(table.headers,['id','ชื่อ','status']);
  assert.deepEqual(table.rows,[
    {__rowNumber:2,id:'1','ชื่อ':'ทดสอบ',status:'Y'},
    {__rowNumber:3,id:'2','ชื่อ':'',status:'N'}
  ]);
  const status=sheets.status({});
  assert.equal(status.configured,false);
  assert.equal(status.authMode,'cloud-run-metadata-service-account');
});
