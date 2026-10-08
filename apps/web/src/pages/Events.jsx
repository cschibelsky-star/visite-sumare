import {Link} from 'react-router-dom';
import Agenda from '../components/Agenda';
export default function Events(){return <div className="page"><div className="hero"><div className="container"><h1 className="title">O que fazer em Sumaré</h1><p className="subtitle">Cultura, turismo e gastronomia com programação confirmada.</p></div></div><div className="container section"><Agenda/><p className="muted">Confira a fonte do evento antes de sair: a programação pode mudar.</p><Link to="/enviar-evento">Sugerir um evento para a agenda →</Link></div></div>}
