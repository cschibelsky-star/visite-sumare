import {useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import {api} from '../services/api';
import {favorites} from '../lib/favorites';

const attractionMedia={
  'bosque-dallorto':'/images/atrativos/bosque-dallorto/capa-real.jpg',
  'represa-marcelo-pedroni':'/images/atrativos/represa-marcelo-pedroni/capa-real.jpg',
  'praca-das-bandeiras':'/images/atrativos/praca-das-bandeiras/capa-real.jpg',
  'pro-memoria':'/images/atrativos/pro-memoria/capa-real.jpg',
  'horto-florestal':'/images/atrativos/horto-florestal/capa.jpg',
  'ceav':'/images/atrativos/ceav/capa.jpg',
  'igreja-matriz-santana':'/images/atrativos/igreja-matriz-santana/capa.jpg',
  'orquidario-municipal':'/images/atrativos/orquidario-municipal/capa.jpg',
  'nova-veneza':'/images/atrativos/nova-veneza/capa.jpg',
  'shopping-parkcity':'/images/atrativos/shopping-parkcity/capa.jpg',
  'recanto-dos-animais':'/images/atrativos/recanto-dos-animais/capa.jpg',
  'estancia-arvore-da-vida':'/images/atrativos/estancia-arvore-da-vida/capa.jpg',
  'capela-bom-jesus':'/images/atrativos/capela-bom-jesus/capa.jpg',
  'casarao-sertaozinho':'/images/atrativos/casarao-sertaozinho/capa.jpg'
};

export default function AttractionDetail(){
  const {id}=useParams();
  const [a,setA]=useState(null);
  const [fav,setFav]=useState(favorites.has(id,'attraction'));
  const [imageFailed,setImageFailed]=useState(false);

  useEffect(()=>{api.get('attractions',id).then(setA)},[id]);
  if(!a)return <div className="container section">Carregando...</div>;

  const hasVerifiedGeo=a.map_enabled===true&&a.geo_status==='verified'&&Number.isFinite(Number(a.latitude))&&Number.isFinite(Number(a.longitude));
  const route=()=>{
    const query=hasVerifiedGeo?`${a.latitude},${a.longitude}`:encodeURIComponent((a.address||a.name+' Sumaré SP'));
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`,'_blank','noopener,noreferrer');
  };
  const media=attractionMedia[a.id]||a.image_url||'';
  const showImage=Boolean(media)&&!imageFailed;

  return <div className="page attraction-premium-page">
    <div className="container attraction-premium-wrap">
      {showImage
        ?<img className="attraction-detail-cover" src={media} alt={a.name} loading="eager" decoding="async" onError={()=>setImageFailed(true)}/>
        :<div className="attraction-detail-fallback"><span>{a.category==='natural'?'🌿':'🏛'}</span><small>{a.category_label||'Conheça Sumaré'}</small><strong>{a.name}</strong><em>Imagem em atualização</em></div>}
      <span className="badge">{a.category_label||a.category}</span>
      <h1>{a.name}</h1>
      <p className="attraction-lead">{a.description}</p>
      <div className="card attraction-info-card">
        <p><b>Endereço:</b> {a.address||'Em validação'}</p>
        <p><b>Horário:</b> {a.hours||'Em validação'}</p>
        <p><b>Acessibilidade:</b> {a.accessibility||'Informações em validação.'}</p>
        <p><b>Mapa:</b> {hasVerifiedGeo?'Localização validada':'Localização em validação'}</p>
      </div>
      <div className="attraction-actions">
        <button className="btn btn-primary" onClick={route}>{hasVerifiedGeo?'Abrir rota':'Buscar endereço no mapa'}</button>
        <button className="btn btn-outline" onClick={()=>{favorites.toggle({id:a.id,type:'attraction',name:a.name});setFav(!fav)}}>{fav?'Remover favorito':'Favoritar'}</button>
      </div>
    </div>
  </div>;
}
