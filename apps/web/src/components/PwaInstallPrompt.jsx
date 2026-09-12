import { useEffect, useState } from 'react';
import { Download, X } from 'lucide-react';

export default function PwaInstallPrompt() {
  const [promptEvent, setPromptEvent] = useState(null);
  const [hidden, setHidden] = useState(() => localStorage.getItem('sumare_install_dismissed') === '1');

  useEffect(() => {
    const handler = (event) => {
      event.preventDefault();
      setPromptEvent(event);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  if (!promptEvent || hidden) return null;

  const install = async () => {
    await promptEvent.prompt();
    await promptEvent.userChoice;
    setPromptEvent(null);
  };

  const dismiss = () => {
    localStorage.setItem('sumare_install_dismissed', '1');
    setHidden(true);
  };

  return (
    <div className="install-card" role="dialog" aria-label="Instalar Conheça Sumaré">
      <div className="install-icon">S</div>
      <div className="install-copy">
        <strong>Instale o Conheça Sumaré</strong>
        <span>Abra pela tela inicial, como um aplicativo.</span>
      </div>
      <button className="install-action" onClick={install}><Download size={17}/> Instalar</button>
      <button className="install-close" onClick={dismiss} aria-label="Fechar"><X size={18}/></button>
    </div>
  );
}
