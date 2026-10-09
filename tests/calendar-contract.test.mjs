import test from 'node:test';
import assert from 'node:assert/strict';
import {fromCanonicalEvent,readCanonicalEvents} from '../apps/web/src/lib/calendar-contract.js';
import {upcomingEvents} from '../apps/api/src/event-policy.js';
const canonical={id:'import:123',title:'Festival',place:'Praça',start_date:'2026-10-09',end_date:'2026-10-09',source_url:'https://cultura.sumare.sp.gov.br/eventos',verified_at:'2026-10-09',status:'published',admin_notes:'private'};
test('canonical projection preserves facts and uses React contract',()=>{
  const event=fromCanonicalEvent(canonical);
  assert.equal(event.name,'Festival'); assert.equal(event.date_start,'2026-10-09');
  assert.equal(event.status,'confirmed'); assert.equal(event.source_url,canonical.source_url);
  assert.equal(event.admin_notes,undefined);
  assert.equal(upcomingEvents([event],new Date('2026-10-10T02:59:59Z')).length,1);
  assert.equal(upcomingEvents([event],new Date('2026-10-10T03:00:00Z')).length,0);
});
test('candidate/cancelled/malformed feed cannot become a confirmed event',()=>{
  for(const status of ['candidate','cancelled','confirmed',undefined]) assert.throws(()=>fromCanonicalEvent({...canonical,status}));
});
test('feed requests never send admin token and never use stale fallback',async()=>{
  const calls=[];
  const fetcher=async(url,options)=>{calls.push({url,options});return {ok:true,json:async()=>[canonical]}};
  assert.equal((await readCanonicalEvents('/calendar-feed.php',undefined,fetcher))[0].id,'import:123');
  assert.deepEqual(calls[0].options,{cache:'no-store',credentials:'omit'});
  await assert.rejects(readCanonicalEvents('/calendar-feed.php',undefined,async()=>{throw new Error('offline')}));
});
test('canonical details use correctly encoded ID; HTTP errors remain unavailable',async()=>{
  let url;
  const result=await readCanonicalEvents('/calendar-feed.php','import%3A123',async value=>{url=value;return {ok:true,json:async()=>canonical}});
  assert.equal(url,'/calendar-feed.php?id=import%3A123'); assert.equal(result.name,'Festival');
  await assert.rejects(readCanonicalEvents('/calendar-feed.php','missing',async()=>({ok:false})));
});
