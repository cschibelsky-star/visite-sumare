import {NavLink,Outlet,Link,useNavigate} from 'react-router-dom';
import {Home,MapPin,Hotel,CalendarDays,ClipboardList,ArrowLeft,LogOut} from 'lucide-react';

export default function AdminLayout(){
  const navigate=useNavigate();
  const nav=[
    ['/admin','Painel',Home],
    ['/admin/atrativos','Atrativos',MapPin],
    ['/admin/hoteis','Hotéis',Hotel],
    ['/admin/eventos','Eventos',CalendarDays],
    ['/admin/submissoes','Submissões',ClipboardList]
  ];
  const logout=()=>{
    localStorage.removeItem('sumare_admin_token');
    navigate('/admin/login',{replace:true});
  };
  return <div className="admin-shell">
    <aside className="sidebar">
      <h2 style={{marginTop:0}}>Admin</h2>
      {nav.map(([to,label,Icon])=><NavLink key={to} to={to} end={to==='/admin'} className={({isActive})=>isActive?'active':''}><Icon size={17}/>{label}</NavLink>)}
      <Link to="/" style={{marginTop:24,opacity:.8}}><ArrowLeft size={17}/>Voltar ao site</Link>
      <button type="button" className="admin-logout" onClick={logout}><LogOut size={17}/>Sair</button>
    </aside>
    <main className="admin-main"><Outlet/></main>
  </div>;
}