import {useEffect,useMemo,useState} from 'react';
import {Link,useSearchParams} from 'react-router-dom';
import {api} from '../services/api';

const categoryMeta={
  natural:{label:'Natureza',icon:'🌿'},
  historico:{label:'Cultura e História',icon:'🏛'},
  gastronomia:{label:'Gastronomia',icon:'🍽'},
  lazer:{label:'Lazer e Família',icon:'✦'}
};

function Cover({item,failed,onFail}){
  const meta=categoryMeta[item.category]||{label:item.category_label||'Conheça Sumaré',icon:'⌖'};
  const isHml=typeof window!=='undefined'&&(window.location.hostname.includes('.hml.')||window.location.hostname.startsWith('p000002.'));
  const canUseImage=Boolean(item.image_url)&&(item.image_authorized==='sim'||isHml)&&!failed;
  if(canUseImage){
    return <img className="explore-card-img" src={item.image_url} alt={item.name} loading="lazy" onError={onFail}/>;
  }
  return <div className={`explore-card-fallback cat-${item.category||'default'}`} role="img" aria-label={`Capa de ${item.name}`}>
    <span>{meta.icon}</span>
    <small>{meta.label}</small>
    <b>{item.name}</b>
    <em>Imagem em atualização</em>
  </div>;
}

export default function Explore(){
  const [items,setItems]=useState([]);
  const [q,setQ]=useState('');
  const [failed,setFailed]=useState({});
  const [params,setParams]=useSearchParams();
  const category=params.get('categoria')||'todos';

  useEffect(()=>{
    api.list('attractions')
      .then(data=>setItems(Array.isArray(data)?data.filter(x=>x.active!==false):[]))
      .catch(()=>setItems([]));
  },[]);

  const categories=useMemo(()=>{
    const map=new Map();
    items.forEach(a=>map.set(a.category,a.category_label||categoryMeta[a.category]?.label||a.category));
    return [...map.entries()];
  },[items]);

  const filtered=useMemo(()=>items.filter(a=>{
    const search=(a.name+' '+(a.description||'')+' '+(a.neighborhood||'')+' '+(a.category_label||'')).toLowerCase();
    const matchQuery=search.includes(q.trim().toLowerCase());
    const matchCategory=category==='todos'||a.category===category||String(a.category_label||'').toLowerCase()===category.toLowerCase();
    return matchQuery&&matchCategory;
  }),[items,q,category]);

  const chooseCategory=value=>{
    const next=new URLSearchParams(params);
    if(value==='todos')next.delete('categoria');else next.set('categoria',value);
    setParams(next,{replace:true});
  };

  return <div className="page explore-premium-page">
    <section className="explore-premium-hero">
      <div className="container">
        <span>DESCUBRA SUMARÉ</span>
        <h1>Explore a cidade.</h1>
        <p>Natureza, cultura, memória, lazer e experiências reunidos em uma navegação mais visual e simples.</p>
      </div>
    </section>

    <div className="container explore-premium-content">
      <div className="explore-searchbar">
        <span>⌕</span>
        <input placeholder="Buscar lugar, bairro ou experiência..." value={q} onChange={e=>setQ(e.target.value)}/>
        <b>{filtered.length} resultado{filtered.length===1?'':'s'}</b>
      </div>

      <div className="explore-filter-row">
        <button className={category==='todos'?'active':''} onClick={()=>chooseCategory('todos')}>Todos</button>
        {categories.map(([key,label])=><button key={key} className={category===key?'active':''} onClick={()=>chooseCategory(key)}>{label}</button>)}
      </div>

      <div className="explore-grid">
        {filtered.map(a=><Link className="explore-card" key={a.id} to={`/atrativo/${a.id}`}>
          <Cover item={a} failed={failed[a.id]} onFail={()=>setFailed(v=>({...v,[a.id]:true}))}/>
          <div className="explore-card-body">
            <div className="explore-card-meta"><span>{a.category_label||categoryMeta[a.category]?.label||'Atrativo'}</span>{a.neighborhood&&<small>{a.neighborhood}</small>}</div>
            <h2>{a.name}</h2>
            <p>{a.description}</p>
            <b>Ver experiência →</b>
          </div>
        </Link>)}
      </div>

      {!filtered.length&&<div className="explore-empty"><strong>Nenhum resultado encontrado.</strong><p>Tente outra busca ou escolha uma categoria diferente.</p></div>}
    </div>
  </div>;
}
