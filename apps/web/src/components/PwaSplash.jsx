import { useEffect, useState } from 'react';

export default function PwaSplash() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  });

  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(() => setVisible(false), 900);
    return () => window.clearTimeout(timer);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="pwa-splash" role="status" aria-label="Abrindo Conheça Sumaré">
      <div className="pwa-splash-mark">S</div>
      <strong>Conheça Sumaré</strong>
      <span>Seu guia digital da cidade</span>
    </div>
  );
}
