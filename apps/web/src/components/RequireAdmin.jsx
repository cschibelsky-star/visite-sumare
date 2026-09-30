import {useEffect,useState} from 'react';
import {Navigate,useLocation} from 'react-router-dom';
import {api} from '../services/api';

export default function RequireAdmin({children}){
  const location=useLocation();
  const [status,setStatus]=useState('checking');

  useEffect(()=>{
    const token=localStorage.getItem('sumare_admin_token');
    if(!token){setStatus('denied');return;}
    api.checkAdmin()
      .then(()=>setStatus('ok'))
      .catch(()=>{
        localStorage.removeItem('sumare_admin_token');
        setStatus('denied');
      });
  },[]);

  if(status==='checking')return <div className="container section">Validando acesso administrativo...</div>;
  if(status==='denied')return <Navigate to="/admin/login" state={{from:location}} replace/>;
  return children;
}