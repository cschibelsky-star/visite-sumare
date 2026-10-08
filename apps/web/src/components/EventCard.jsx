import {Link} from 'react-router-dom';
import {formatDay} from '../lib/event-policy';
export default function EventCard({event:e}) {
  return <article className="card agenda-card">
    <span className="badge">{e.category || 'Evento'}{e.free_entry ? ' · Gratuito' : ''}</span>
    <h3><Link to={`/eventos/${encodeURIComponent(e.id)}`}>{e.name}</Link></h3>
    <p><strong>{formatDay(e.date_start)}{e.date_end && e.date_end !== e.date_start ? ` a ${formatDay(e.date_end)}` : ''}</strong>{e.time_start ? ` · ${e.time_start}` : ''}</p>
    <p className="muted">{e.location}</p>
    {e.relevance && <p>{e.relevance}</p>}
    <Link className="btn btn-outline" to={`/eventos/${encodeURIComponent(e.id)}`}>Ver evento →</Link>
    <p className="muted agenda-source"><a href={e.source_url} target="_blank" rel="noopener noreferrer">{e.source_name || 'Fonte de confirmação'} ↗</a><br/>Conferido em {formatDay(e.verified_at)}</p>
  </article>;
}
