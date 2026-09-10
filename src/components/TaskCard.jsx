import { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { CheckCircle, Trash2, Pencil, Loader2 } from 'lucide-react';

// 1. مكون نافذة التأكيد منفصل تماماً خارج المكون الرئيسي
const ConfirmDeleteModal = ({ lang, onClose, onConfirm }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <h3>{lang === 'ar' ? 'تأكيد الحذف' : 'Confirm Delete'}</h3>
      <p>
        {lang === 'ar' 
          ? 'هل أنت تأكد من رغبتك في حذف هذه المهمة؟ لا يمكنك التراجع بعد ذلك.' 
          : 'Are you sure you want to delete this task? This action cannot be undone.'}
      </p>
      <div className="modal-actions">
        <button className="btn-cancel" onClick={onClose}>
          {lang === 'ar' ? 'إلغاء' : 'Cancel'}
        </button>
        <button className="btn-danger" onClick={onConfirm}>
          {lang === 'ar' ? 'حذف' : 'Delete'}
        </button>
      </div>
    </div>
  </div>
);

// 2. مكون نافذة التعديل منفصل تماماً لتجنب Re-render المشاكل
const EditTaskModal = ({ task, lang, onClose, onSave }) => {
  const [titleAr, setTitleAr] = useState(task.title?.ar || '');
  const [titleEn, setTitleEn] = useState(task.title?.en || '');
  const [priority, setPriority] = useState(task.priority || 'medium');
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!titleAr || !titleEn) return;

    setIsSaving(true);
    try {
      await onSave({
        title: { ar: titleAr, en: titleEn },
        priority
      });
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>{lang === 'ar' ? 'تعديل المهمة' : 'Edit Task'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="edit-form-group">
            <label>{lang === 'ar' ? 'العنوان بالعربية' : 'Arabic Title'}</label>
            <input 
              type="text" 
              value={titleAr} 
              onChange={(e) => setTitleAr(e.target.value)} 
              required 
            />
            
            <label>{lang === 'ar' ? 'العنوان بالإنجليزية' : 'English Title'}</label>
            <input 
              type="text" 
              value={titleEn} 
              onChange={(e) => setTitleEn(e.target.value)} 
              required 
            />

            <label>{lang === 'ar' ? 'الأولوية' : 'Priority'}</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="low">{lang === 'ar' ? 'منخفضة' : 'Low'}</option>
              <option value="medium">{lang === 'ar' ? 'متوسطة' : 'Medium'}</option>
              <option value="high">{lang === 'ar' ? 'عالية' : 'High'}</option>
            </select>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              {lang === 'ar' ? 'إلغاء' : 'Cancel'}
            </button>
            <button type="submit" className="btn-save" style={{ background: 'var(--primary-color)' }} disabled={isSaving}>
              {isSaving ? <Loader2 size={18} className="spinner" /> : (lang === 'ar' ? 'حفظ التعديلات' : 'Save Changes')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 3. المكون الرئيسي للكارت
export const TaskCard = ({ task, onUpdate, onDelete }) => {
  const { lang } = useContext(AppContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(task.status === 'completed');

  const handleToggleComplete = () => {
    const newStatus = isCompleted ? 'todo' : 'completed';
    setIsCompleted(!isCompleted);

    onUpdate(task._id, { status: newStatus }).catch(() => {
      setIsCompleted(isCompleted);
    });
  };

  const handleConfirmDelete = async () => {
    setShowDeleteModal(false);
    setIsDeleting(true);
    try {
      await onDelete(task._id);
    } catch (error) {
      setIsDeleting(false);
    }
  };

  const handleSaveEdit = async (updatedData) => {
    await onUpdate(task._id, updatedData);
  };

  return (
    <>
      <div className={`task-card ${isCompleted ? 'completed' : ''}`}>
        <div className="info">
          <div className="title">{task.title[lang] || task.title.en}</div>
          <div className="meta">
            <span>{lang === 'ar' ? 'الأولوية:' : 'Priority:'} {
              task.priority == "high" ? (lang === 'ar' ? 'عالية' : 'High') : (lang === 'ar' ? 'منخفضة' : 'Low')
            }</span>
            <span>•</span>
            <span>{new Date(task.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        <div className="actions">
          <button onClick={handleToggleComplete} title={lang === 'ar' ? 'تغيير الحالة' : 'Toggle status'}>
            <CheckCircle size={20} color={isCompleted ? '#10b981' : 'currentColor'} />
          </button>
          <button onClick={() => setShowEditModal(true)} title={lang === 'ar' ? 'تعديل' : 'Edit'}>
            <Pencil size={20} />
          </button>
          <button className="delete" onClick={() => setShowDeleteModal(true)} disabled={isDeleting} title={lang === 'ar' ? 'حذف' : 'Delete'}>
            {isDeleting ? <Loader2 size={20} className="spinner" /> : <Trash2 size={20} />}
          </button>
        </div>
      </div>

      {showDeleteModal && (
        <ConfirmDeleteModal 
          lang={lang} 
          onClose={() => setShowDeleteModal(false)} 
          onConfirm={handleConfirmDelete} 
        />
      )}

      {showEditModal && (
        <EditTaskModal 
          task={task} 
          lang={lang} 
          onClose={() => setShowEditModal(false)} 
          onSave={handleSaveEdit} 
        />
      )}
    </>
  );
};