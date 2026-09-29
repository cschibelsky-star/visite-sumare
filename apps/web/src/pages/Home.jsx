import {useEffect,useMemo,useState} from 'react';
import {Link} from 'react-router-dom';
import {api} from '../services/api';

const quick=[
  ['Natureza','/explorar?categoria=natureza','🌿'],
  ['Cultura','/explorar?categoria=cultura','🏛'],
  ['Eventos','/eventos','✦'],
  ['Gastronomia','/guia-comercial','🍽'],
  ['Hospedagem','/guia-comercial','⌂'],
  ['Mapa','/mapa','⌖']
];

export default function Home(){
  const [events,setEvents]=useState([]);
  const [attractions,setAttractions]=useState([]);
  useEffect(()=>{
    api.list('events').then(x=>setEvents(Array.isArray(x)?x.slice(0,3):[])).catch(()=>{});
    api.list('attractions').then(x=>setAttractions(Array.isArray(x)?x.filter(a=>a.featured).slice(0,4):[])).catch(()=>{});
  },[]);
  const featured=useMemo(()=>attractions.length?attractions:[
    {id:'bosque-dallorto',name:"Bosque do Jardim Dall'Orto",neighborhood:'Natureza e lazer',image_url:null},
    {id:'pro-memoria',name:'Pró-Memória',neighborhood:'Cultura e história',image_url:null},
    {id:'praca-das-bandeiras',name:'Praça das Bandeiras',neighborhood:'Cidade e convivência',image_url:null},
  ],[attractions]);

  return <div className="page premium-home">
    <header className="premium-header">
      <Link to="/" className="premium-brand"><span className="premium-brandmark"><img src="/icons/icon.svg" alt="" aria-hidden="true"/></span><span><b>Conheça Sumaré</b><small>Guia Digital da Cidade</small></span></Link>
      <nav><Link to="/explorar">Explorar</Link><Link to="/eventos">Eventos</Link><Link to="/roteiros">Roteiros</Link><Link to="/guia-comercial">Onde ir</Link></nav>
      <Link className="premium-header-btn" to="/meu-guia">Meu Guia</Link>
    </header>

    <section className="premium-hero">
      <div className="premium-hero-media" aria-hidden="true"></div>
      <div className="premium-hero-shade"></div>
      <div className="premium-hero-content">
        <div className="premium-hero-copy">
          <span className="premium-kicker"><i/> SUMARÉ · SÃO PAULO</span>
          <h1>Descubra Sumaré.<br/><em>Viva mais a sua cidade.</em></h1>
          <p>Encontre lugares, experiências, cultura, eventos, sabores e histórias para aproveitar Sumaré de um jeito novo.</p>
          <div className="premium-actions"><Link className="premium-btn light" to="/explorar">Explorar Sumaré <b>→</b></Link><Link className="premium-btn outline" to="/eventos">O que fazer hoje</Link></div>
          <Link className="premium-search" to="/explorar"><span>⌕</span><span>Busque lugares, experiências e eventos</span><b>Buscar</b></Link>
        </div>
        <aside className="premium-hero-card">
          <small>ESCOLHA SUA EXPERIÊNCIA</small>
          <strong>Por onde você quer começar?</strong>
          {quick.slice(0,4).map(([label,to,icon])=><Link key={label} to={to}><span>{icon}</span>{label}<b>→</b></Link>)}
        </aside>
      </div>
    </section>

    <section className="premium-section">
      <div className="premium-container">
        <div className="premium-heading split"><div><span>DO SEU JEITO</span><h2>O que você quer fazer em Sumaré?</h2></div><p>Escolha uma experiência para hoje, para o fim de semana ou para montar seu próprio roteiro.</p></div>
        <div className="premium-quick-grid">
          {quick.map(([label,to,icon],i)=><Link className={i===0?'premium-quick wide':'premium-quick'} key={label} to={to}><span>{icon}</span><div><small>DESCOBRIR</small><strong>{label}</strong></div><b>→</b></Link>)}
        </div>
      </div>
    </section>

    <section className="premium-section premium-soft">
      <div className="premium-container">
        <div className="premium-heading"><span>VALE CONHECER</span><h2>Lugares que contam Sumaré.</h2><p>Natureza, memória, cultura e pontos de encontro para redescobrir a cidade.</p></div>
        <div className="premium-place-grid">
          {featured.map((a,i)=><Link className={i===0?'premium-place featured':'premium-place'} key={a.id} to={String(a.id).includes('-')?'/explorar':`/atrativo/${a.id}`}>
            {a.image_url?<img src={a.image_url} alt={a.name}/>:<div className="premium-place-fallback"/>}
            <div><small>{a.neighborhood||'SUMARÉ'}</small><h3>{a.name}</h3><b>Ver detalhes →</b></div>
          </Link>)}
          <Link className="premium-place discover" to="/explorar"><div><small>EXPLORE MAIS</small><h3>Descubra outros lugares</h3><b>Ver todos →</b></div></Link>
        </div>
      </div>
    </section>

    <section className="premium-section premium-agenda">
      <div className="premium-container">
        <div className="premium-heading split light"><div><span>AGENDA DA CIDADE</span><h2>Sempre tem algo acontecendo.</h2></div><Link to="/eventos">Ver agenda completa →</Link></div>
        <div className="premium-event-grid">
          {(events.length?events:[{id:'agenda',name:'Agenda Cultural de Sumaré',date_start:'Confira a programação',location:'Sumaré'},{id:'fimdesemana',name:'Seu fim de semana na cidade',date_start:'Experiências locais',location:'Sumaré'},{id:'eventos',name:'Eventos e atividades',date_start:'Atualizações da cidade',location:'Sumaré'}]).map((e,i)=><Link key={e.id} to="/eventos" className={i===0?'premium-event main':'premium-event'}>
            <span className="premium-event-index">0{i+1}</span><small>{e.date_start||'AGENDA'}</small><h3>{e.name}</h3><p>{e.location||'Sumaré'}</p><b>Ver programação →</b>
          </Link>)}
        </div>
        <div className="premium-source"><span>✓</span><p><b>Curadoria conectada à cidade.</b> A experiência foi preparada para integrar informações públicas e fontes oficiais sem transformar o portal em um site institucional.</p></div>
      </div>
    </section>

    <section className="premium-section">
      <div className="premium-container">
        <div className="premium-heading"><span>EXPERIÊNCIAS PRONTAS</span><h2>Escolha um roteiro e vá.</h2></div>
        <div className="premium-route-grid">
          <Link to="/roteiros"><i>☀</i><small>ROTEIRO</small><h3>Um dia em Sumaré</h3><p>Natureza, cultura, sabores e pontos marcantes.</p><b>Explorar →</b></Link>
          <Link to="/roteiros"><i>👨‍👩‍👧</i><small>ROTEIRO</small><h3>Sumaré em família</h3><p>Passeios e experiências para aproveitar juntos.</p><b>Explorar →</b></Link>
          <Link to="/roteiros"><i>🏛</i><small>ROTEIRO</small><h3>Cultura & memória</h3><p>Histórias, patrimônio e identidade local.</p><b>Explorar →</b></Link>
        </div>
      </div>
    </section>

    <section className="premium-appband">
      <div className="premium-container premium-appgrid">
        <div><span>CONHEÇA SUMARÉ NO CELULAR</span><h2>A cidade com você,<br/>onde você estiver.</h2><p>Use como app no celular e tenha acesso rápido a lugares, agenda, mapa, favoritos e, futuramente, aos benefícios do Passaporte.</p><div className="premium-checks"><b>✓ Experiência mobile</b><b>✓ Favoritos e rotas</b><b>✓ PWA pronta para instalar</b></div><Link className="premium-btn yellow" to="/meu-guia">Abrir Meu Guia</Link></div>
        <div className="premium-phone"><div><span>CONHEÇA SUMARÉ</span><strong>O que vamos descobrir hoje?</strong><b>🌿 Natureza</b><b>✦ Eventos</b><b>🍽 Sabores</b><b>⌖ Mapa</b></div></div>
      </div>
    </section>

    <section className="premium-section premium-passport">
      <div className="premium-container premium-passport-grid">
        <div><span>PRÓXIMA EXPERIÊNCIA</span><h2>Passaporte<br/>Conheça Sumaré</h2><p>Uma nova forma de descobrir negócios locais, viver experiências e acessar benefícios em parceiros da cidade.</p><b className="premium-status">Em desenvolvimento</b></div>
        <div className="premium-passport-card"><small>CONHEÇA SUMARÉ</small><b>PASSAPORTE</b><strong>Descubra. Visite.<br/>Viva Sumaré.</strong><footer><span>•••• 2026</span><span>SUMARÉ · SP</span></footer></div>
      </div>
    </section>

    <section className="premium-partner">
      <div className="premium-container premium-partner-grid">
        <div><span>PARA QUEM FAZ SUMARÉ ACONTECER</span><h2>Sua empresa também pode fazer parte.</h2><p>Prepare seu negócio para aparecer para moradores e visitantes que procuram onde comer, comprar, se hospedar e viver novas experiências.</p></div>
        <aside><small>PARTICIPE</small><strong>Comércio local conectado ao guia</strong><p>Perfis, categorias e futuras campanhas do Passaporte serão evoluídos por etapas.</p><Link className="premium-btn yellow" to="/guia-comercial">Conhecer o Guia Comercial →</Link></aside>
      </div>
    </section>

    <footer className="premium-footer">
      <div className="premium-brand"><span className="premium-brandmark"><img src="/icons/icon.svg" alt="" aria-hidden="true"/></span><span><b>Conheça Sumaré</b><small>Guia Digital da Cidade</small></span></div>
      <div className="premium-tech"><span>VIA</span><div><small>TECNOLOGIA DESENVOLVIDA PELA</small><strong>Vitrine IA Pro</strong></div></div>
    </footer>
  </div>
}
