import {useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import {MapContainer,TileLayer,Marker,Popup} from 'react-leaflet';
import L from 'leaflet';
import {api} from '../services/api';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl:'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl:'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png'
});

const validGeo=x=>{
  const lat=Number(x.latitude),lng=Number(x.longitude);
  return x.map_enabled===true&&x.geo_status==='verified'&&Number.isFinite(lat)&&Number.isFinite(lng)&&lat>=-23.2&&lat<=-22.4&&lng>=-47.7&&lng<=-46.8;
};

export default function MapPage(){
  const [markers,setMarkers]=useState([]);
  useEffect(()=>{
    Promise.all([api.list('attractions'),api.list('hotels')])
      .then(([a,h])=>{
        const all=[
          ...(Array.isArray(a)?a:[]).map(x=>({...x,type:'attraction'})),
          ...(Array.isArray(h)?h:[]).map(x=>({...x,type:'hotel'}))
        ];
        setMarkers(all.filter(validGeo));
      })
      .catch(()=>setMarkers([]));
  },[]);

  return <div className="page map-premium-page">
    <section className="map-premium-hero">
      <div className="container">
        <span>EXPLORE SUMARÉ</span>
        <h1>Mapa da cidade</h1>
        <p>Encontre atrativos com localização revisada. Pontos ainda em validação não são exibidos para evitar rotas incorretas.</p>
      </div>
    </section>

    <div className="container map-premium-wrap">
      <div className="map-validation-note">
        <span>✓</span>
        <div><strong>Mapa com coordenadas validadas</strong><small>{markers.length} ponto{markers.length===1?'':'s'} disponível{markers.length===1?'':'is'} nesta etapa.</small></div>
      </div>

      <div className="map-premium-canvas">
        <MapContainer center={[-22.8230,-47.2684]} zoom={14} style={{height:'100%',width:'100%'}}>
          <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
          {markers.map(x=><Marker key={x.type+x.id} position={[Number(x.latitude),Number(x.longitude)]}>
            <Popup>
              <div className="map-popup">
                <small>{x.category_label||x.type}</small>
                <strong>{x.name}</strong>
                <span>{x.address||'Sumaré/SP'}</span>
                {x.type==='attraction'&&<Link to={`/atrativo/${x.id}`}>Ver detalhes →</Link>}
              </div>
            </Popup>
          </Marker>)}
        </MapContainer>
      </div>

      <div className="map-premium-footer">
        <p><strong>Não encontrou um local?</strong> Ele pode estar aguardando validação de endereço e coordenadas. Preferimos não mostrar um pin aproximado como se fosse exato.</p>
        <Link to="/explorar">Explorar todos os atrativos →</Link>
      </div>
    </div>
  </div>
}
