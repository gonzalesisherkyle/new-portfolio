import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import Alert from '../../components/ui/Alert';
import { ConfirmModal } from '../../components/ui/Modal';
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiSearch } from 'react-icons/hi';
import { predefinedSkills } from '../../data/predefinedSkills';

const SkillAdmin = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });
  const [currentSkill, setCurrentSkill] = useState({
    name: '', category: 'Frontend', icon: '', color: '', proficiency: 0
  });

  const { user } = useAuth();
  const config = { headers: { Authorization: `Bearer ${user.token}` } };

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await api.get('/skills');
      setSkills(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPredefined = (skill) => {
    setCurrentSkill({
      ...currentSkill,
      name: skill.name,
      icon: skill.icon,
      color: skill.color,
      category: skill.category
    });
    setSearchTerm('');
    setNotification(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotification(null);
    try {
      if (currentSkill._id) {
        await api.put(`/skills/${currentSkill._id}`, currentSkill, config);
        setNotification({ type: 'success', message: 'MODULE_UPDATED' });
      } else {
        await api.post('/skills', currentSkill, config);
        setNotification({ type: 'success', message: 'MODULE_LOADED' });
      }
      setIsEditing(false);
      fetchSkills();
    } catch (err) {
      setNotification({ type: 'error', message: err.response?.data?.message || 'SYNC_ERROR' });
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/skills/${deleteModal.id}`, config);
      setNotification({ type: 'success', message: 'MODULE_REMOVED' });
      fetchSkills();
    } catch (err) {
      setNotification({ type: 'error', message: 'ERASE_FAILED' });
    }
  };

  const categories = [
    'Frontend', 'Backend', 'Database', 'AI & ML', 
    'DevOps', 'Cloud', 'Tools', 'Mobile', 'Design', 'Other'
  ];

  const filteredLibrary = predefinedSkills.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="p-8 text-center font-pixel text-xs animate-pulse">BOOTING_CORE_SKILLS...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold uppercase tracking-tighter">Manage_Abilities</h1>
        {!isEditing && (
          <Button onClick={() => { 
            setCurrentSkill({name: '', category: 'Frontend', icon: '', color: '', proficiency: 0}); 
            setIsEditing(true); 
            setNotification(null);
          }}>
            <HiOutlinePlus /> Install New
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
        title="ERASE_SKILL"
        message="Are you sure you want to uninstall this ability module? This action cannot be reversed."
      />

      {isEditing ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="Skill Name" value={currentSkill.name} onChange={e => setCurrentSkill({...currentSkill, name: e.target.value})} required />
                  <div className="space-y-1">
                    <label className="block text-[10px] font-pixel text-slate-500 uppercase ml-1">Category</label>
                    <select 
                      className="w-full bg-[#0d1117] border-2 border-[#30363d] text-[#c9d1d9] px-4 py-2 font-mono text-sm outline-none focus:border-primary-500"
                      value={currentSkill.category} 
                      onChange={e => setCurrentSkill({...currentSkill, category: e.target.value})}
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <Input label="Icon (SiName)" value={currentSkill.icon} onChange={e => setCurrentSkill({...currentSkill, icon: e.target.value})} required />
                  <Input label="Color (hex)" value={currentSkill.color} onChange={e => setCurrentSkill({...currentSkill, color: e.target.value})} />
                  
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-pixel text-slate-500 uppercase mb-2">Proficiency ({currentSkill.proficiency}%)</label>
                    <input 
                      type="range" 
                      min="0" max="100" 
                      value={currentSkill.proficiency} 
                      onChange={e => setCurrentSkill({...currentSkill, proficiency: e.target.value})}
                      className="w-full accent-primary-500"
                    />
                  </div>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <Button type="submit">COMMIT_ABILITY</Button>
                  <Button variant="secondary" onClick={() => setIsEditing(false)}>ABORT</Button>
                </div>
              </form>
            </Card>
          </div>

          <div className="space-y-4">
            <h2 className="text-base font-bold flex items-center gap-2 font-pixel tracking-tighter uppercase">
              <HiSearch /> Library_Query
            </h2>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full bg-[#0d1117] border-2 border-[#30363d] text-[#c9d1d9] px-4 py-2 font-mono text-xs outline-none focus:border-primary-500"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="bg-[#161b22] border-2 border-[#30363d] max-h-[400px] overflow-y-auto p-2 space-y-1">
              {filteredLibrary.map((skill, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectPredefined(skill)}
                  className="w-full flex items-center gap-3 p-2 hover:bg-slate-800 transition-colors text-left group"
                >
                  <div className="w-8 h-8 flex items-center justify-center text-lg bg-[#0d1117] border border-[#30363d]" style={{ color: skill.color }}>
                    {skill.name[0]}
                  </div>
                  <div>
                    <p className="text-xs font-mono font-bold text-white group-hover:text-primary-400">{skill.name}</p>
                    <p className="text-[9px] font-pixel text-slate-500 uppercase tracking-tighter">{skill.category}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {skills.map(skill => (
            <Card key={skill._id} className="p-4 flex items-center justify-between !border-l-4 hover:border-primary-500 transition-colors" style={{ borderLeftColor: skill.color }}>
              <div>
                <h3 className="font-bold text-white text-sm uppercase">{skill.name}</h3>
                <p className="text-[10px] font-mono text-slate-500 uppercase">{skill.category} • {skill.proficiency}%</p>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" onClick={() => { setCurrentSkill(skill); setIsEditing(true); setNotification(null); }} className="p-2"><HiOutlinePencil /></Button>
                <Button variant="ghost" onClick={() => setDeleteModal({ isOpen: true, id: skill._id })} className="p-2 text-red-500"><HiOutlineTrash /></Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillAdmin;
