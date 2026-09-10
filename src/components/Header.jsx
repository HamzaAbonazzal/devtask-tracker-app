import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Sun, Moon, Globe } from 'lucide-react';

export const Header = () => {
  const { theme, toggleTheme, lang, toggleLang } = useContext(AppContext);

  return (
    <header className="header">
      <h1>{lang === 'ar' ? 'إدارة المهام التقنية' : 'DevTask Tracker'}</h1>
      <div className="controls">
        <button onClick={toggleTheme}>
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          {theme === 'light' ? (lang === 'ar' ? 'داكن' : 'Dark') : (lang === 'ar' ? 'فاتح' : 'Light')}
        </button>
        <button onClick={toggleLang}>
          <Globe size={18} />
          {lang === 'ar' ? 'English' : 'عربي'}
        </button>
      </div>
    </header>
  );
};