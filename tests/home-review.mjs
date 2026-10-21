import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {chromium} from 'playwright';
const base = process.env.REVIEW_URL || 'http://127.0.0.1:18995';
const out = 'review-evidence';
await fs.mkdir(out, {recursive:true});
const report = {url:base, syntheticData:true, checks:[], views:[], visualApproval:'PENDING: compare captures with approved reference'};
const check = (name, ok) => {report.checks.push({name,ok});assert.ok(ok,name)};
let browser;
try {
  const logo=await fetch(`${base}/brand/conheca-sumare.png`);
  const logoBytes=Buffer.from(await logo.arrayBuffer());
  check('Approved logo served byte-for-byte from original',logo.ok && createHash('sha256').update(logoBytes).digest('hex')==='4686087ea3cbdbdd6fdd0ead431e1437d8f19d7ada6b418ea152c9a6a10a26df');
  const eventsResponse = await fetch(`${base}/api/events`);
  check('Events proxied as JSON', eventsResponse.ok && eventsResponse.headers.get('content-type').includes('application/json'));
  const events = await eventsResponse.json();
  check('Disposable review events, including negative cases', events.length===4 && events.some(e=>e.id==='review-pending'));
  const image = await fetch(`${base}/uploads/review.png`);
  const bytes = new Uint8Array(await image.arrayBuffer());
  check('Upload path returns PNG bytes, not SPA HTML', image.ok && bytes[0]===137 && bytes[1]===80);
  check('Missing upload remains 404', (await fetch(`${base}/uploads/missing.png`)).status===404);
  check('Unknown API remains 404', (await fetch(`${base}/api/unknown`)).status===404);
  check('Admin data requires authorization', (await fetch(`${base}/api/admin/stats`)).status===401);
  check('Unauthorized event creation denied', (await fetch(`${base}/api/events`,{method:'POST',headers:{'Content-Type':'application/json'},body:'{}'})).status===401);
  check('Unauthorized upload denied', (await fetch(`${base}/api/uploads`,{method:'POST',headers:{'Content-Type':'application/json'},body:'{}'})).status===401);
  browser = await chromium.launch({headless:true});
  for (const width of [390,1024,1440]) {
    const context = await browser.newContext({viewport:{width,height:900},serviceWorkers:'block'});
    const page = await context.newPage();
    const failures=[], errors=[];
    page.on('requestfailed', r=>failures.push({url:r.url(),error:r.failure()?.errorText}));
    page.on('response', r=>{if(r.status()>=400)failures.push({url:r.url(),status:r.status()})});
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto(base,{waitUntil:'networkidle'});
    await page.locator('.f-feature').filter({hasText:'Evento de homologação — confirmado'}).waitFor();
    check(`Home selects confirmed upcoming event at ${width}`,await page.locator('.f-feature').filter({hasText:'Evento de homologação — confirmado'}).count()===1);
    check(`Home excludes pending/expired event at ${width}`,!(await page.locator('.faithful-home').innerText()).includes('Evento de homologação — pendente') && !(await page.locator('.faithful-home').innerText()).includes('Evento de homologação — encerrado'));
    const layout = await page.evaluate(()=>({viewport:innerWidth,scrollWidth:document.documentElement.scrollWidth,brokenImages:[...document.images].filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.src)}));
    await page.screenshot({path:`${out}/home-${width}.png`,fullPage:true});
    report.views.push({width,layout,errors,failures});
    check(`No JavaScript crash at ${width}`,errors.length===0);
    check(`No horizontal overflow at ${width}`,layout.scrollWidth<=width);
    check(`Approved logo decoded at ${width}`,await page.locator('.f-logo img').evaluate(i=>i.complete && i.naturalWidth===2025 && i.naturalHeight===777));
    check(`History photo configured at ${width}`,await page.locator('.f-history-photo').evaluate(el=>getComputedStyle(el).backgroundImage!=='none'));
    if(width>760) check(`Desktop Home has no PWA navigation overlay at ${width}`,!(await page.locator('.bottomnav').isVisible()));
    await page.getByRole('button',{name:'Baixar App',exact:true}).click();
    check(`PWA fallback guidance at ${width}`,await page.getByText('Para instalar, abra o menu do navegador e escolha Adicionar à tela inicial.').isVisible());
    await context.close();
  }
  const context = await browser.newContext({serviceWorkers:'block'});
  const page = await context.newPage();
  for (const route of ['/explorar','/eventos','/mapa','/guia-comercial','/privacidade']) {
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    const response=await page.goto(base+route,{waitUntil:'networkidle'});
    check(`Direct React route ${route}`,response.ok() && errors.length===0);
    if(route==='/explorar') {
      await page.screenshot({path:`${out}/explore-restored.png`,fullPage:true});
      check('Explore premium layout restored',await page.locator('.explore-premium-page .explore-premium-hero').count()===1);
      check('Explore category filters restored',await page.locator('.explore-filter-row button').count()>0);
    }
    if(route==='/mapa') {
      await page.screenshot({path:`${out}/map-restored.png`,fullPage:true});
      check('Premium map screen restored',await page.locator('.map-premium-page .map-premium-hero').count()===1);
    }
    if(route==='/eventos') {
      await page.getByRole('heading',{name:'Evento de homologação — confirmado',exact:true}).waitFor();
      check('Event image decoded through uploads proxy',await page.locator('img[src="/uploads/review.png"]').first().evaluate(i=>i.complete && i.naturalWidth>0));
    }
  }
  await page.goto(base+'/admin',{waitUntil:'networkidle'});
  check('Admin route redirects unauthenticated browser',new URL(page.url()).pathname==='/admin/login');
  await context.close();
} catch(e) {report.error=e.stack;process.exitCode=1}
finally {await browser?.close();await fs.writeFile(`${out}/results.json`,JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2))}
