export function fromCanonicalEvent(event) {
  if (!event || typeof event !== 'object' || event.status !== 'published') {
    throw new Error('Evento indisponível no contrato canônico.');
  }
  // Public projection only; avoid leaking/administering canonical approval metadata.
  return {
    id: String(event.id), name: event.title, location: event.place,
    description: event.summary || '', date_start: event.start_date,
    date_end: event.end_date || '', time_start: event.start_time || '',
    source_url: event.source_url, source_name: event.source_name || '',
    verified_at: event.verified_at, category: event.category || 'Evento',
    image_url: event.image || '', relevance: event.relevance || '',
    free_entry: event.free_entry === true, status: 'confirmed',
  };
}
export async function readCanonicalEvents(feedUrl, id, fetcher = fetch) {
  const url = id === undefined ? feedUrl : `${feedUrl}${feedUrl.includes('?') ? '&' : '?'}id=${encodeURIComponent(decodeURIComponent(String(id)))}`;
  const response = await fetcher(url, {cache: 'no-store', credentials: 'omit'});
  if (!response.ok) throw new Error('Não foi possível carregar a agenda canônica.');
  const data = await response.json();
  if (id !== undefined) return fromCanonicalEvent(data);
  if (!Array.isArray(data)) throw new Error('Formato inválido da agenda canônica.');
  return data.map(fromCanonicalEvent);
}
