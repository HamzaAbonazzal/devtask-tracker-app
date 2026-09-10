import { useState, useEffect, useContext } from 'react';
import { Header } from './components/Header';
import { TaskForm } from './components/TaskForm';
import { TaskCard } from './components/TaskCard';
import { fetchTasks, createTask, updateTask, deleteTask } from './services/api';
import { AppContext } from './context/AppContext';
import { ClipboardList, Loader2 } from 'lucide-react';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true); // حالة التحميل الأولى
  const { lang } = useContext(AppContext);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const { data } = await fetchTasks();
      setTasks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); // إيقاف التحميل سواء نجح الطلب أو فشل
    }
  };

  useEffect(() => { 
    loadTasks(); 
  }, []);

  const handleAdd = async (taskData) => {
    const { data } = await createTask(taskData);
    setTasks([data, ...tasks]);
  };

  const handleUpdate = async (id, updatedData) => {
    const { data } = await updateTask(id, updatedData);
    setTasks(tasks.map(t => t._id === id ? data : t));
  };

  const handleDelete = async (id) => {
    setTasks(prev => prev.filter(t => t._id !== id));
    await deleteTask(id);
  };

  if (lang == 'ar') {
    document.title = "متتبع المهام"
  } else {
    document.title = "Task Tracker"
  }

  return (
    <div className="container">
      <Header />
      <TaskForm onAdd={handleAdd} />
      <div className="task-list">
        {loading ? (
          /* شاشة التحميل في البداية */
          <div className="loading-state">
            <Loader2 size={40} className="spinner-large" />
            <p>{lang === 'ar' ? 'جاري تحميل المهام...' : 'Loading tasks...'}</p>
          </div>
        ) : tasks.length > 0 ? (
          /* عرض المهام في حال وجودها */
          tasks.map(task => (
            <TaskCard 
              key={task._id} 
              task={task} 
              onUpdate={handleUpdate} 
              onDelete={handleDelete} 
            />
          ))
        ) : (
          /* عرض رسالة القائمة الفارغة */
          <div className="empty-state">
            <ClipboardList size={48} />
            <p>{lang === 'ar' ? 'لا توجد مهام حالياً' : 'No tasks found'}</p>
            <span>{lang === 'ar' ? 'قم بإضافة مهمتك الأولى باستخدام النموذج أعلاه!' : 'Add your first task using the form above!'}</span>
          </div>
        )}
      </div>
    </div>
  );
}