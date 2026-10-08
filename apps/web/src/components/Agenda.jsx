import {useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import {api} from '../services/api';
import {upcomingEvents,eventMatches} from '../lib/event-policy';
import EventCard from './EventCard';
export default function Agenda({compact=false}) {
  const [items,setItems]=useState([]),[loading,setLoading]=useState(true),[error,setError]=useState(''),[period,setPeriod]=useState('all'),[category,setCategory]=useState(''),[free,setFree]=useState(false),[refresh,setRefresh]=useState(0),[now,setNow]=useState(()=>new Date());
  useEffect(()=>{let active=true;setLoading(true);setError('');api.list('events').then(data=>{if(active)setItems(Array.isArray(data)?data:[])}).catch(()=>{if(active)setError('Não foi possível carregar a agenda. Tente novamente.')}).finally(()=>{if(active)setLoading(false)});return()=>{active=false}},[refresh]);
  useEffect(()=>{const timer=setInterval(()=>setNow(new Date()),60000);return()=>clearInterval(timer)},[]);
  const upcoming=upcomingEvents(items,now);
  const filtered=upcoming.filter(e=>eventMatches(e,period,now)&&(!category||e.category===category)&&(!free||e.free_entry));
  const shown=compact?filtered.slice(0,3):filtered;
  return <div className="agenda">
    <div className="agenda-filters" aria-label="Filtros da agenda">
      <div className="chips">{[['all','Próximos eventos'],['today','Hoje'],['weekend','Fim de semana']].map(([value,label])=><button type="button" className={`chip ${period===value?'active':''}`} aria-pressed={period===value} key={value} onClick={()=>setPeriod(value)}>{label}</button>)}</div>
      {!compact&&<><label>Categoria <select className="input" value={category} onChange={e=>setCategory(e.target.value)}><option value="">Todas</option>{[...new Set(upcoming.map(e=>e.category).filter(Boolean))].sort().map(c=><option key={c}>{c}</option>)}</select></label><label className="agenda-free"><input type="checkbox" checked={free} onChange={e=>setFree(e.target.checked)}/> Entrada gratuita</label></>}
    </div>
    {loading?<p role="status">Carregando a agenda…</p>:error?<div role="alert"><p>{error}</p><button className="btn btn-outline" onClick={()=>setRefresh(v=>v+1)}>Tentar novamente</button></div>:shown.length?<div className="grid grid3">{shown.map(e=><EventCard key={e.id} event={e}/>)}</div>:<div className="agenda-empty"><h3>Nenhum evento confirmado neste período.</h3><p>Novas atrações aparecerão aqui após a conferência da programação.</p><Link to="/explorar">Explore os atrativos de Sumaré →</Link></div>}
  </div>;
}
