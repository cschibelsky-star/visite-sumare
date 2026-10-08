import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
const root=fs.mkdtempSync(path.join(os.tmpdir(),'sumare-agenda-'));
const headers={'Content-Type':'application/json','X-Admin-Token':'agenda-test-token'};
const confirmed={name:'Festival',location:'Praça',date_start:'2099-10-10',source_url:'https://cultura.sumare.sp.gov.br/eventos',verified_at:'2026-10-08',status:'confirmed'};
fs.writeFileSync(path.join(root,'db.json'),JSON.stringify({events:[], 'event-submissions':[]}));
const child=spawn(process.execPath,['apps/api/src/server.js'],{env:{...process.env,PORT:'18787',DATA_DIR:root,UPLOADS_DIR:path.join(root,'uploads'),ADMIN_TOKEN:headers['X-Admin-Token']},stdio:['ignore','pipe','pipe']});
await once(child.stdout,'data');
const request=async(url,method='GET',data,auth=false)=>{const res=await fetch('http://127.0.0.1:18787/api/'+url,{method,headers:auth?headers:{'Content-Type':'application/json'},body:data?JSON.stringify(data):undefined});return {status:res.status,data:await res.json()}};
try {
await test('HTTP curadoria, privacidade e publicação',async()=>{
 assert.equal((await request('event-submissions')).status,401);
 const submitted=await request('event-submissions','POST',{...confirmed,verified_at:undefined});
 assert.equal(submitted.data.status,'pending');
 assert.equal((await request(`event-submissions/${submitted.data.id}/approve`,'POST',{},true)).status,422);
 await request(`event-submissions/${submitted.data.id}`,'PUT',{verified_at:'2026-10-08'},true);
 assert.equal((await request(`event-submissions/${submitted.data.id}/approve`,'POST',{},true)).status,200);
 assert.equal((await request('events')).data.length,1);
 assert.equal((await request(`event-submissions/${submitted.data.id}/approve`,'POST',{},true)).status,409);
 const hidden=await request('events','POST',{...confirmed,status:'draft'},true);
 assert.equal((await request(`events/${hidden.data.id}`)).status,404);
 assert.equal((await request('events','POST',{...confirmed,source_url:''},true)).status,422);
 const publicEvent=(await request('events')).data[0];
 await request(`events/${publicEvent.id}`,'PUT',{status:'cancelled'},true);
 assert.equal((await request('events')).data.length,0);
 assert.equal((await request(`events/${publicEvent.id}`)).status,404);
 assert.equal((await request('events','GET',undefined,true)).data.length,2);
});
await test('frontend and API use identical publication rules',()=>assert.equal(fs.readFileSync('apps/api/src/event-policy.js','utf8'),fs.readFileSync('apps/web/src/lib/event-policy.js','utf8')));
} finally {child.kill();await once(child,'exit');fs.rmSync(root,{recursive:true,force:true})}
