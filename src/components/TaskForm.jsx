import { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

export const TaskForm = ({ onAdd }) => {
  const { lang } = useContext(AppContext);
  const [titleAr, setTitleAr] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titleAr || !titleEn) return;
    onAdd({ titleAr, titleEn, priority });
    setTitleAr('');
    setTitleEn('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <input 
          type="text" 
          placeholder={lang === 'ar' ? 'عنوان المهمة بالعربية' : 'Task Title in Arabic'} 
          value={titleAr}
          onChange={(e) => setTitleAr(e.target.value)}
        />
        <input 
          type="text" 
          placeholder={lang === 'ar' ? 'عنوان المهمة بالإنجليزية' : 'Task Title in English'} 
          value={titleEn}
          onChange={(e) => setTitleEn(e.target.value)}
        />
      </div>
      <div className="form-actions">
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">{lang === 'ar' ? 'منخفضة' : 'Low'}</option>
          <option value="medium">{lang === 'ar' ? 'متوسطة' : 'Medium'}</option>
          <option value="high">{lang === 'ar' ? 'عالية' : 'High'}</option>
        </select>
        <button type="submit">{lang === 'ar' ? 'إضافة مهمة' : 'Add Task'}</button>
      </div>
    </form>
  );
};