import {useEffect,useState} from 'react';
import {api} from '../services/api';
import './HomeReference.css';

// Port of the approved PHP homepage composition; independent React routes, data and PWA remain.
export default function Home(){
 const [events,setEvents]=useState([]);
 const [prompt,setPrompt]=useState(null);
 const [installHint,setInstallHint]=useState('');
 useEffect(()=>{
   let alive=true;
   api.list('events').then(data=>{if(alive&&Array.isArray(data))setEvents(data)}).catch(()=>{});
   function ready(e){e.preventDefault();setPrompt(e)};
   window.addEventListener('beforeinstallprompt',ready);
   return ()=>{alive=false;window.removeEventListener('beforeinstallprompt',ready)};
 },[]);
 const currentDateParts=new Intl.DateTimeFormat('en-US',{timeZone:'America/Sao_Paulo',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
 const currentDate=Object.fromEntries(currentDateParts.filter(p=>p.type==='year'||p.type==='month'||p.type==='day').map(p=>[p.type,p.value]));
 const today=`${currentDate.year}-${currentDate.month}-${currentDate.day}`;
 const nextEvent=events.filter(e=>(e.status==='confirmed'||e.status==='published')&&String(e.date_end||e.date_start||'9999-12-31')>=today).sort((a,b)=>String(a.date_start||'').localeCompare(String(b.date_start||'')))[0];
 async function installApp(){
   if(prompt){await prompt.prompt();await prompt.userChoice;setPrompt(null);return;}
   setInstallHint('Para instalar, abra o menu do navegador e escolha Adicionar à tela inicial.');
 }
 return <div className="page faithful-home">
<div className="faithful-page">
<header className="f-header">
  <a className="f-logo" href="/" aria-label="Conheça Sumaré — início"><img src="/brand/conheca-sumare.png" alt="Conheça Sumaré" width="2025" height="777"/></a>
  <nav><a className="active" href="#inicio">Início</a><a href="#turismo">Turismo</a><a href="/eventos">Eventos</a><a href="#gastronomia">Gastronomia</a><a href="/guia-comercial">Negócios</a><a href="/mapa">Mapa</a></nav>
  <div className="f-actions"><a href="/explorar" className="f-search" aria-label="Buscar">⌕</a><button type="button" onClick={installApp}>Baixar App</button></div>
</header>

<main>
<section className="f-hero" id="inicio">
  <div className="f-hero-bg"></div><div className="f-hero-overlay"></div>
  <div className="f-hero-left">
    <h1>Descubra<br/><em>Sumaré</em> no<br/>seu celular.</h1>
    <p>Turismo, cultura, eventos, gastronomia<br/>hospedagem, atrativos e experiências<br/>locais em um guia digital moderno.</p>
    <div className="f-hero-buttons"><a href="/explorar"><b>➜</b> Explorar Sumaré <span>→</span></a><button type="button" onClick={installApp}><b>▯</b> Instalar App</button></div>
    <div className="f-benefits">
      <div><b>♧</b><span>Conheça<br/>nossa região</span></div>
      <div><b>♚</b><span>Viva a<br/>cultura local</span></div>
      <div><b>▣</b><span>Acompanhe<br/>eventos</span></div>
      <div><b>♡</b><span>Apoie o<br/>comércio da cidade</span></div>
    </div>
  </div>
  <div className="f-phone">
    <div className="f-phone-screen">
      <div className="f-phone-top"><img className="f-phone-brand" src="/brand/conheca-sumare.png" alt="" width="2025" height="777"/><h3>Explore<br/>Sumaré</h3><p>Turismo, cultura,<br/>eventos e experiências</p></div>
      <div className="f-phone-search">⌕ &nbsp; O que você procura?</div>
      <div className="f-phone-icons">
        <span>♧<small>Atrações</small></span><span>▣<small>Eventos</small></span><span>♨<small>Gastronomia</small></span>
        <span>⚑<small>Hospedagem</small></span><span>⌖<small>Mapas</small></span><span>▣<small>Negócios</small></span>
      </div>
      <div className="f-phone-label"><b>Destaques</b><small>Negócios →</small></div>
      <div className="f-phone-card" style={{backgroundImage:"url('/media/images/atrativos/bosque-dallorto/capa-real.jpg')"}}><span>Bosque dos Lagos<br/>Sumaré</span></div>
    </div>
  </div>
  <div className="f-script">História<br/>Cultura<br/>Pessoas<br/>Oportunidades</div>
  <div className="f-slogan">Sumaré<br/>é para viver.</div>
</section>

<section className="f-categories" id="turismo">
  <a href="/explorar" style={{'--img':"url('/media/images/atrativos/bosque-dallorto/capa-real.jpg')"}}><i>♧</i><strong>Natureza</strong></a>
  <a href="#historia" style={{'--img':"url('/media/images/atrativos/igreja-matriz-santana/capa.jpg')"}}><i>⌂</i><strong>Cultura</strong></a>
  <a href="/eventos" style={{'--img':"url('/media/images/eventos/feira-artesanato/capa-real.jpg')"}}><i>☕</i><strong>Eventos</strong></a>
  <a href="/mapa" style={{'--img':"url('/media/assets/img/real/comercio.jpg')"}}><i>●</i><strong>Mapa</strong></a>
  <a id="gastronomia" href="/explorar" style={{'--img':"url('/media/assets/img/real/gastronomia.jpg')"}}><i>♨</i><strong>Gastronomia</strong></a>
  <a href="/explorar" style={{'--img':"url('/media/assets/img/real/hospedagem.jpg')"}}><i>▰</i><strong>Hospedagem</strong></a>
</section>

<section className="f-official">
  <div className="f-official-title">
    <div><small>✦ &nbsp; Conteúdo oficial</small><h2>Atrativos e eventos com referência nas fontes oficiais da cidade.</h2></div>
    <a href="/explorar">Ver todos os atrativos &nbsp;→</a>
  </div>
  <div className="f-feature-grid">
    <a className="f-feature" href="/explorar" style={{'--img':"url('/media/images/atrativos/bosque-dallorto/capa-real.jpg')"}}><div><small>NATUREZA</small><h3>Bosque dos Lagos</h3><p>Lazer, contato com a natureza<br/>e um dos principais cartões-postais<br/>de Sumaré.</p><b>›</b></div></a>
    <a className="f-feature" href="/explorar" style={{'--img':"url('/media/images/atrativos/pro-memoria/capa-real.jpg')"}}><div><small className="yellow">CULTURA</small><h3>Pró-Memória de Sumaré</h3><p>História, memória e identidade<br/>da nossa cidade.</p><b>›</b></div></a>
    <a className="f-feature" href="/eventos" style={{'--img':"url('/media/images/eventos/feira-artesanato/capa-real.jpg')"}}><div><small>EVENTOS</small><h3>{nextEvent?.name || "Agenda de eventos"}</h3><p>{nextEvent ? `${nextEvent.location || "Sumaré"} · ${nextEvent.date_start || "Confira a programação"}` : "Acompanhe a agenda com eventos confirmados e informações atualizadas."}</p><b>›</b></div></a>
  </div>
</section>

<section className="f-history" id="historia">
  <div className="f-history-copy">
    <h2>Cultura e História de Sumaré</h2>
    <p>Uma cidade com raízes fortes, patrimônio histórico<br/>e uma identidade construída por sua gente.</p>
    <a href="/explorar">Conheça nossa história &nbsp;→</a>
    <div className="f-mini-grid">
      <a href="/explorar" style={{'--img':"url('/media/images/atrativos/igreja-matriz-santana/capa.jpg')"}}><span>♟</span><b>Área Urbana e Rural</b></a>
      <a href="/eventos" style={{'--img':"url('/media/images/eventos/feira-artesanato/capa-real.jpg')"}}><span>♚</span><b>Cultura popular</b></a>
      <a href="/explorar" style={{'--img':"url('/media/images/atrativos/bosque-dallorto/capa-real.jpg')"}}><span>♧</span><b>Natureza e Lazer</b></a>
    </div>
  </div>
  <div className="f-history-photo" >
    <div className="f-patrimony"><b>▣</b><span>Patrimônio<br/>que inspira<br/>gerações</span></div>
  </div>
</section>

<section className="f-business" id="negocios">
  <div className="f-business-copy"><i>↗</i><h2>Sumaré também é<br/><em>destino de negócios.</em></h2><p>Localização estratégica, infraestrutura completa,<br/>conexão com os maiores centros do país e um ambiente<br/>convidativo e seguro, atraindo grandes empresas e novos<br/>investimentos.</p></div>
  <div className="f-business-grid">
    <article className="f-business-card f-biz-parkcity"><div><strong>Shopping ParkCity Sumaré</strong><p>Comércio, serviços e lazer.</p></div></article>
    <article className="f-business-card f-biz-ppg"><div><strong>PPG</strong><p>Indústria e expansão produtiva em Sumaré.</p></div></article>
    <article className="f-business-card f-biz-3m"><div><strong>3M</strong><p>Ciência, indústria e tecnologia.</p></div></article>
    <article className="f-business-card f-biz-femsa"><div><strong>Coca-Cola FEMSA</strong><p>Operação confirmada em Nova Veneza.</p></div></article>
  </div><a className="f-business-more" href="/guia-comercial">Conheça as empresas e o potencial econômico de Sumaré →</a>
</section>

<section className="f-opportunities" id="mapa">
  <h2>Negócios e Oportunidades em Sumaré</h2>
  <div className="f-op-grid">
    <article><i>↗</i><b>Potencial econômico</b><p>Cidade em crescimento<br/>consistente, com ambientes<br/>favoráveis a novos negócios.</p></article>
    <article><i>●</i><b>Localização estratégica</b><p>Acesso fácil e rápido pelas<br/>principais rodovias da região.</p></article>
    <article><i>♚</i><b>Apoio ao empreendedor</b><p>Uma cidade que valoriza<br/>o incentivo local e<br/>desenvolvimento regional.</p></article>
    <article><i>▣</i><b>Turismo de negócios</b><p>Eventos, serviços<br/>e infraestrutura para o setor<br/>corporativo.</p></article>
  </div>
</section>

<section className="f-join">
  <div className="f-join-copy"><b>▤</b><span><strong>Faça parte do Conheça Sumaré</strong><small>Sua empresa, evento ou iniciativa no guia digital da cidade.<br/>Ganhe visibilidade para moradores, visitantes e novos negócios em Sumaré.</small></span></div>
  <div className="f-join-actions"><a href="/guia-comercial">✚ &nbsp; Participe do Guia &nbsp;→</a><a className="outline" href="/guia-comercial">▤ &nbsp; Saiba como divulgar</a></div>
</section>
</main>

<footer className="f-footer">
  <div className="f-footer-logo"><img src="/brand/conheca-sumare.png" alt="Conheça Sumaré" width="2025" height="777" loading="lazy"/></div>
  <nav><a href="/">Conheça Sumaré</a><a href="/eventos">Eventos</a><a href="/explorar">Gastronomia</a><a href="/guia-comercial">Negócios</a><a href="/mapa">Mapa</a><a href="/privacidade">Política de Privacidade</a><a href="https://turismo.sumare.sp.gov.br/" target="_blank" rel="noopener">Portal Oficial da Cidade</a></nav>
  <div className="f-tech"><small>Tecnologia e desenvolvimento</small><img src="/brand/vitrine-ia-pro-oficial.webp" alt="Vitrine IA Pro"/></div>
</footer>
</div>
{installHint && <p className="home-install-hint" role="status">{installHint}</p>}
 </div>;
}

