import { useState, useEffect, useContext } from 'react';
import { Header } from './components/Header';
import { TaskForm } from './components/TaskForm';
import { TaskCard } from './components/TaskCard';
import { fetchTasks, createTask, updateTask, deleteTask } from './services/api';
import { AppContext } from './context/AppContext';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const { lang } = useContext(AppContext);

  const loadTasks = async () => {
    try {
      const { data } = await fetchTasks();
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { loadTasks(); }, []);

  const handleAdd = async (taskData) => {
    const { data } = await createTask(taskData);
    setTasks([data, ...tasks]);
  };

  const handleUpdate = async (id, updatedData) => {
    const { data } = await updateTask(id, updatedData);
    setTasks(tasks.map(t => t._id === id ? data : t));
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter(t => t._id !== id));
  };

  return (
    <div className="container">
      <Header />
      <TaskForm onAdd={handleAdd} />
      <div className="task-list">
        {tasks.map(task => (
          <TaskCard 
            key={task._id} 
            task={task} 
            onUpdate={handleUpdate} 
            onDelete={handleDelete} 
          />
        ))}
      </div>
    </div>
  );
}