import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { CheckCircle, Trash2 } from 'lucide-react';

export const TaskCard = ({ task, onUpdate, onDelete }) => {
  const { lang } = useContext(AppContext);
  const isCompleted = task.status === 'completed';

  return (
    <div className={`task-card ${isCompleted ? 'completed' : ''}`}>
      <div className="info">
        <div className="title">{task.title[lang] || task.title.en}</div>
        <div className="meta">
          <span>{lang === 'ar' ? 'الأولوية:' : 'Priority:'} {task.priority}</span>
          <span>•</span>
          <span>{new Date(task.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
      <div className="actions">
        <button onClick={() => onUpdate(task._id, { status: isCompleted ? 'todo' : 'completed' })}>
          <CheckCircle size={20} color={isCompleted ? '#10b981' : 'currentColor'} />
        </button>
        <button className="delete" onClick={() => onDelete(task._id)}>
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};