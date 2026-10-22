// Isolated, disposable review data. No runtime .env or production data is mounted.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
process.env.DATA_DIR ||= '/app/review-data';
process.env.UPLOADS_DIR ||= '/app/review-uploads';
process.env.ADMIN_TOKEN = crypto.randomBytes(32).toString('hex');
for (const dir of [process.env.DATA_DIR, process.env.UPLOADS_DIR]) fs.mkdirSync(dir, {recursive:true});
const dbFile = path.join(process.env.DATA_DIR, 'db.json');
if (!fs.existsSync(dbFile)) {
  const db = JSON.parse(fs.readFileSync(path.join(root, 'data/db.seed.json'), 'utf8'));
  const day = offset => new Date(Date.now() + offset * 86400000).toISOString().slice(0,10);
  db.events = [
    {id:'review-confirmed', name:'Evento de homologação — confirmado', status:'confirmed', date_start:day(7), date_end:day(7)},
    {id:'review-published', name:'Evento de homologação — publicado', status:'published', date_start:day(8), date_end:day(8)},
    {id:'review-pending', name:'Evento de homologação — pendente', status:'pending', date_start:day(1), date_end:day(1)},
    {id:'review-expired', name:'Evento de homologação — encerrado', status:'confirmed', date_start:day(-8), date_end:day(-7)}
  ].map(e=>({...e, location:'Ambiente isolado de revisão', category:'Teste', description:'Dado sintético; não representa evento real.', image_url:'/uploads/review.png'}));
  fs.writeFileSync(dbFile, JSON.stringify(db));
}
fs.writeFileSync(path.join(process.env.UPLOADS_DIR, 'review.png'), Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=', 'base64'));
await import('./server.js');
