import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import Input, { TextArea } from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import Alert from '../../components/ui/Alert';
import { ConfirmModal } from '../../components/ui/Modal';
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';

const ExperienceAdmin = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [notification, setNotification] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });
  const [currentExp, setCurrentExp] = useState({
    company: '', position: '', location: '', startDate: '', endDate: '', current: false, description: '', techStack: ''
  });

  const { user } = useAuth();
  const config = { headers: { Authorization: `Bearer ${user.token}` } };

  useEffect(() => {
    fetchExperience();
  }, []);

  const fetchExperience = async () => {
    try {
      const res = await api.get('/experience');
      setExperiences(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (exp) => {
    setCurrentExp({ 
      ...exp, 
      startDate: exp.startDate.split('T')[0], 
      endDate: exp.endDate ? exp.endDate.split('T')[0] : '',
      description: exp.description.join('\n'),
      techStack: exp.techStack.join(', ')
    });
    setIsEditing(true);
    setNotification(null);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/experience/${deleteModal.id}`, config);
      setNotification({ type: 'success', message: 'RECORD_DELETED' });
      fetchExperience();
    } catch (err) {
      setNotification({ type: 'error', message: 'DELETE_FAILED' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotification(null);
    const expData = {
      ...currentExp,
      description: currentExp.description.split('\n').filter(s => s.trim()),
      techStack: currentExp.techStack.split(',').map(s => s.trim())
    };

    try {
      if (currentExp._id) {
        await api.put(`/experience/${currentExp._id}`, expData, config);
        setNotification({ type: 'success', message: 'RECORD_UPDATED' });
      } else {
        await api.post('/experience', expData, config);
        setNotification({ type: 'success', message: 'RECORD_CREATED' });
      }
      setIsEditing(false);
      fetchExperience();
    } catch (err) {
      setNotification({ type: 'error', message: 'SAVE_ERROR' });
    }
  };

  if (loading) return <div className="p-8 text-center font-pixel text-xs animate-pulse">BOOTING_EXPERIENCE...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold uppercase tracking-tighter">Manage_History</h1>
        {!isEditing && (
          <Button onClick={() => { 
            setCurrentExp({company: '', position: '', location: '', startDate: '', endDate: '', current: false, description: '', techStack: ''}); 
            setIsEditing(true); 
            setNotification(null);
          }}>
            <HiOutlinePlus /> Add New
          </Button>
        )}
      </div>

      {notification && (
        <Alert 
          type={notification.type} 
          message={notification.message} 
          onClose={() => setNotification(null)} 
        />
      )}

      <ConfirmModal 
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        onConfirm={handleDelete}
        title="PURGE_RECORD"
        message="Are you sure you want to delete this professional experience record? This will be permanently erased from your history."
      />

      {isEditing ? (
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Company" value={currentExp.company} onChange={e => setCurrentExp({...currentExp, company: e.target.value})} required />
              <Input label="Position" value={currentExp.position} onChange={e => setCurrentExp({...currentExp, position: e.target.value})} required />
              <Input label="Start Date" type="date" value={currentExp.startDate} onChange={e => setCurrentExp({...currentExp, startDate: e.target.value})} required />
              <Input label="End Date" type="date" value={currentExp.endDate} onChange={e => setCurrentExp({...currentExp, endDate: e.target.value})} disabled={currentExp.current} />
            </div>
            <div className="flex items-center gap-3">
               <input type="checkbox" checked={currentExp.current} onChange={e => setCurrentExp({...currentExp, current: e.target.checked})} id="current" className="w-5 h-5 accent-primary-500" />
               <label htmlFor="current" className="font-pixel text-[10px] uppercase tracking-tighter">Current Role</label>
            </div>
            <TextArea 
              label="Description (Bullet points, one per line)" 
              value={currentExp.description} 
              onChange={e => setCurrentExp({...currentExp, description: e.target.value})} 
              className="min-h-[150px]" 
            />
            <Input label="Tech Stack (comma separated)" value={currentExp.techStack} onChange={e => setCurrentExp({...currentExp, techStack: e.target.value})} />
            
            <div className="flex gap-3 pt-4">
              <Button type="submit">COMMIT_DATA</Button>
              <Button variant="secondary" onClick={() => setIsEditing(false)}>ABORT</Button>
            </div>
          </form>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {experiences.map(exp => (
            <Card key={exp._id} className="p-6 flex items-center justify-between hover:border-primary-500 transition-colors">
              <div>
                <h3 className="font-bold text-lg text-white uppercase">{exp.position}</h3>
                <p className="text-primary-400 font-pixel text-[10px] uppercase tracking-tighter">{exp.company}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" onClick={() => handleEdit(exp)} className="p-2"><HiOutlinePencil /></Button>
                <Button variant="ghost" onClick={() => setDeleteModal({ isOpen: true, id: exp._id })} className="p-2 text-red-500"><HiOutlineTrash /></Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceAdmin;
