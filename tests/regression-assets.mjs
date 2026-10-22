import assert from 'node:assert/strict';
import fs from 'node:fs';
const seed=JSON.parse(fs.readFileSync('apps/api/data/db.seed.json','utf8'));
const explore=fs.readFileSync('apps/web/src/pages/Explore.jsx','utf8');
const detail=fs.readFileSync('apps/web/src/pages/AttractionDetail.jsx','utf8');
const map=fs.readFileSync('apps/web/src/pages/MapPage.jsx','utf8');
const css=fs.readFileSync('apps/web/src/pages/RecoveredPages.css','utf8');
assert(seed.attractions.length>=14,'Attraction inventory regressed below verified Sep 29 baseline');
assert(seed.official_sources.length>=3,'Official sources disappeared from baseline');
assert(seed.retired_attractions.includes('expo-aguas'),'Retired attraction may reappear');
const ids=new Set(seed.attractions.map(x=>x.id));
assert.equal(ids.size,seed.attractions.length,'Duplicate attraction IDs');
for(const a of seed.attractions) assert(!a.image_url?.startsWith('/images/'),'Missing local image path '+a.id);
for(const name of ['explore-premium-page','explore-filter-row','explore-card','explore-premium-hero']) assert(explore.includes(name),'Explore missing '+name);
for(const name of ['attraction-premium-page','attraction-detail-cover','attraction-info-card']) assert(detail.includes(name),'Detail missing '+name);
for(const name of ['map-premium-page','map-premium-canvas']) assert(map.includes(name),'Map missing '+name);
for(const cls of ['.explore-premium-page','.attraction-premium-page','.map-premium-page']) assert(css.includes(cls),'CSS missing '+cls);
console.log('Historical 14 attraction inventory, official sources and premium screens: OK');

import {createHash} from 'node:crypto';
const home=fs.readFileSync('apps/web/src/pages/Home.jsx','utf8');
const homeStyles=fs.readFileSync('apps/web/src/pages/HomeReference.css','utf8');
const routes=fs.readFileSync('apps/web/src/App.jsx','utf8');
for(const marker of [
  'faithful-home','f-hero','Descubra','Sumaré','f-categories',
  'f-feature-grid','f-history','f-business-grid','f-footer',
  'src="/brand/vitrine-ia-pro-oficial.webp"'
]) assert(home.includes(marker),'Missing approved React Home composition: '+marker);
for(const selector of ['.f-hero','.f-categories','.f-history','.f-footer'])
  assert(homeStyles.includes(selector),'Missing approved Home style: '+selector);
for(const route of ['path="/"','path="/explorar"','path="/mapa"'])
  assert(routes.includes(route),'Restored public route missing: '+route);
const footer=fs.readFileSync('apps/web/public/brand/vitrine-ia-pro-oficial.webp');
const source=Buffer.concat([Buffer.from('blob '+footer.length+'\0'),footer]);
assert.equal(createHash('sha1').update(source).digest('hex'),
  '9fd4e12a2a13e73ec809bab38bcf3bf6a9603fb5',
  'User-approved Vitrine IA Pro footer logo was replaced');
console.log('Conheça Sumaré React Home and approved footer asset regression guard: OK');
