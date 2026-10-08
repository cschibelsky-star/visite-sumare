const DAY = /^\d{4}-\d{2}-\d{2}$/;
export function validDay(value) {
  if (typeof value !== 'string' || !DAY.test(value)) return false;
  const date = new Date(`${value}T12:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0,10) === value;
}
export function publicSource(value) {
  try { const url = new URL(value); return ['https:', 'http:'].includes(url.protocol) && !url.username && !url.password; } catch { return false; }
}
export function todayKey(now = new Date()) {
  return new Intl.DateTimeFormat('en-CA', {timeZone:'America/Sao_Paulo',year:'numeric',month:'2-digit',day:'2-digit'}).format(now);
}
export function eventErrors(event) {
  const errors = [];
  if (!event.name?.trim() || !event.location?.trim()) errors.push('Informe nome e local público do evento.');
  if (!validDay(event.date_start) || (event.date_end && (!validDay(event.date_end) || event.date_end < event.date_start))) errors.push('Informe datas válidas; a data final não pode anteceder a inicial.');
  if (!publicSource(event.source_url)) errors.push('Informe um link público de confirmação (http ou https).');
  if (!validDay(event.verified_at) || event.verified_at > todayKey()) errors.push('Informe a data da última conferência, sem data futura.');
  return errors;
}
export function isPublished(event) {
  return event.status === 'confirmed' && eventErrors(event).length === 0;
}
export function upcomingEvents(events, now = new Date()) {
  const today = todayKey(now);
  return events.filter(e => isPublished(e) && (e.date_end || e.date_start) >= today)
    .sort((a,b) => a.date_start.localeCompare(b.date_start) || String(a.name).localeCompare(String(b.name)));
}
export function eventMatches(event, period, now = new Date()) {
  const today = todayKey(now);
  if (period === 'all') return true;
  let start = today, end = today;
  if (period === 'weekend') {
    const date = new Date(`${today}T12:00:00Z`), day = date.getUTCDay();
    date.setUTCDate(date.getUTCDate() + (day === 0 ? -1 : day === 6 ? 0 : 6-day));
    start = date.toISOString().slice(0,10); date.setUTCDate(date.getUTCDate()+1); end = date.toISOString().slice(0,10);
  }
  return event.date_start <= end && (event.date_end || event.date_start) >= start;
}
export function formatDay(value) { return validDay(value) ? value.split('-').reverse().join('/') : ''; }
