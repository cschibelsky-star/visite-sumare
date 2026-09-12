import { Outlet, NavLink } from 'react-router-dom';
import { Home, Search, CalendarDays, Map, User } from 'lucide-react';
import PwaInstallPrompt from './PwaInstallPrompt';

export default function Layout() {
  const nav = [
    ['/', 'Início', Home],
    ['/explorar', 'Explorar', Search],
    ['/eventos', 'Eventos', CalendarDays],
    ['/mapa', 'Mapa', Map],
    ['/meu-guia', 'Meu Guia', User],
  ];

  return (
    <>
      <Outlet />
      <PwaInstallPrompt />
      <nav className="bottomnav" aria-label="Navegação principal">
        <div className="inner">
          {nav.map(([to, label, Icon]) => (
            <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => (isActive ? 'active' : '')}>
              <Icon size={19} />
              {label}
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
}
