const BASE='https://sapa27-gateway-asxuzzwspa-eu.a.run.app';
function extractHtml(value){
  let current=value;
  for(let depth=0;depth<6&&current&&typeof current==='object'&&!Array.isArray(current);depth++){
    if(typeof current.html==='string') return current.html;
    if(Object.prototype.hasOwnProperty.call(current,'data')){current=current.data;continue}
    if(Object.prototype.hasOwnProperty.call(current,'result')){current=current.result;continue}
    break;
  }
  return typeof current==='string'?current:'';
}
async function probe(name){
  const res=await fetch(BASE+'/api/router',{
    method:'POST',
    headers:{'Content-Type':'application/json','Origin':BASE},
    body:JSON.stringify({method:'getDeferredInclude',payload:{name,forceFresh:true,assetStamp:'diagnostic-committee-20260922'}})
  });
  const raw=await res.text();
  let x={};
  try{x=JSON.parse(raw)}catch{}
  const html=extractHtml(x&&x.result);
  const out={
    partial:name,http:res.status,transportOk:x&&x.transportOk,
    errorCode:x&&x.error&&x.error.code||'',
    errorMessage:String(x&&x.error&&x.error.message||'').slice(0,180),
    resultType:Array.isArray(x&&x.result)?'array':typeof(x&&x.result),
    htmlBytes:Buffer.byteLength(html||''),
    hasCommitteeFragment:/data-app-fragment=["']committee["']/.test(html||''),
    hasCommitteeAdapter:/AppPages\.register\(["']committee-meeting["']/.test(html||''),
    hasMeetingAdapter:/AppPages\.register\(["']meeting["']/.test(html||'')
  };
  console.log(JSON.stringify(out));
}
for(const name of ['Scripts_Page_Meeting::committee','Scripts_Page_Meeting']) await probe(name);
