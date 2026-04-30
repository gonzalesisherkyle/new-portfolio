import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Alert from '../../components/ui/Alert';
import { ConfirmModal } from '../../components/ui/Modal';
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiUpload } from 'react-icons/hi';
import { getImageUrl } from '../../utils/imageUrl';

const ProjectAdmin = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });
  const [currentProject, setCurrentProject] = useState({
    title: '', thumbnail: '', description: '',
    techStack: '', githubUrl: '', liveUrl: '', featured: false
  });

  const { user } = useAuth();
  const config = { headers: { Authorization: `Bearer ${user.token}` } };

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await api.get('/projects');
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const { data } = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user.token}`
        }
      });
      setCurrentProject({ ...currentProject, thumbnail: data.image });
      setNotification({ type: 'success', message: 'ASSET_UPLOADED' });
    } catch (error) {
      setNotification({ type: 'error', message: 'UPLOAD_FAILED' });
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (project) => {
    setCurrentProject({
      ...project,
      techStack: project.techStack ? project.techStack.join(', ') : '',
      githubUrl: project.githubUrl || '',
      liveUrl: project.liveUrl || ''
    });
    setNotification(null);
    setIsEditing(true);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/projects/${deleteModal.id}`, config);
      setNotification({ type: 'success', message: 'PROJECT_DELETED' });
      fetchProjects();
    } catch (err) {
      setNotification({ type: 'error', message: 'DELETE_FAILED' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotification(null);

    const projectData = {
      ...currentProject,
      techStack: currentProject.techStack ? currentProject.techStack.split(',').map(s => s.trim()).filter(s => s !== '') : []
    };

    try {
      if (currentProject._id) {
        await api.put(`/projects/${currentProject._id}`, projectData, config);
        setNotification({ type: 'success', message: 'PROJECT_UPDATED' });
      } else {
        await api.post('/projects', projectData, config);
        setNotification({ type: 'success', message: 'PROJECT_DEPLOYED' });
      }
      setIsEditing(false);
      setCurrentProject({ title: '', thumbnail: '', description: '', techStack: '', githubUrl: '', liveUrl: '', featured: false });
      fetchProjects();
    } catch (err) {
      setNotification({ type: 'error', message: err.response?.data?.message || 'DEPLOYMENT_ERROR' });
    }
  };

  if (loading) return <div className="p-8 text-center font-pixel text-xs animate-pulse">BOOTING_PROJECTS...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold uppercase tracking-tighter">Manage_Repository</h1>
        {!isEditing && (
          <Button onClick={() => {
            setCurrentProject({ title: '', thumbnail: '', description: '', techStack: '', githubUrl: '', liveUrl: '', featured: false });
            setNotification(null);
            setIsEditing(true);
          }}>
            <HiOutlinePlus /> Create New
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
        title="DELETE_PROJECT"
        message="Are you sure you want to remove this project from the repository? This action will permanently erase the data module."
      />

      {isEditing ? (
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Title" value={currentProject.title} onChange={e => setCurrentProject({ ...currentProject, title: e.target.value })} required />

              <div className="space-y-1">
                <label className="block font-pixel text-[10px] text-slate-500 uppercase ml-1">Thumbnail Image</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={currentProject.thumbnail}
                    onChange={e => setCurrentProject({ ...currentProject, thumbnail: e.target.value })}
                    className="flex-grow bg-[#0d1117] border-2 border-[#30363d] text-[#c9d1d9] px-3 py-2 font-mono text-xs outline-none focus:border-primary-500"
                    placeholder="URL or upload file"
                    required
                  />
                  <label className="cursor-pointer bg-[#161b22] hover:bg-[#30363d] p-2.5 border-2 border-[#30363d] transition-colors">
                    <HiUpload />
                    <input type="file" className="hidden" onChange={uploadFileHandler} />
                  </label>
                </div>
                {uploading && <p className="text-[10px] font-pixel text-primary-500 animate-pulse uppercase">UPLOADING_ASSET...</p>}
              </div>
            </div>

            <Input label="Description" value={currentProject.description} onChange={e => setCurrentProject({ ...currentProject, description: e.target.value })} required />
            <Input label="Tech Stack (comma separated)" value={currentProject.techStack} onChange={e => setCurrentProject({ ...currentProject, techStack: e.target.value })} required />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="GitHub URL (Optional)" value={currentProject.githubUrl} onChange={e => setCurrentProject({ ...currentProject, githubUrl: e.target.value })} />
              <Input label="Live Demo URL (Optional)" value={currentProject.liveUrl} onChange={e => setCurrentProject({ ...currentProject, liveUrl: e.target.value })} />
            </div>

            <div className="flex items-center gap-3">
              <input type="checkbox" checked={currentProject.featured} onChange={e => setCurrentProject({ ...currentProject, featured: e.target.checked })} id="featured" className="w-5 h-5 accent-primary-500" />
              <label htmlFor="featured" className="font-pixel text-[10px] uppercase tracking-tighter">Featured Project</label>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit">COMMIT_TO_PROD</Button>
              <Button variant="secondary" onClick={() => setIsEditing(false)}>ABORT</Button>
            </div>
          </form>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {projects.map(project => (
            <Card key={project._id} className="p-3 flex items-center justify-between hover:border-primary-500 transition-colors">
              <div className="flex items-center gap-4">
                <img src={getImageUrl(project.thumbnail)} className="w-12 h-12 border border-[#30363d] object-cover bg-[#0d1117]" />
                <div>
                  <h3 className="font-bold text-base text-white uppercase">{project.title}</h3>
                  <div className="flex gap-2 mt-0.5">
                    {project.featured && <Badge variant="success" className="text-[9px] px-1.5 py-0">FEATURED</Badge>}
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-tighter">ID_{project._id.slice(-6)}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" onClick={() => handleEdit(project)} className="p-2"><HiOutlinePencil /></Button>
                <Button variant="ghost" onClick={() => setDeleteModal({ isOpen: true, id: project._id })} className="p-2 text-red-500"><HiOutlineTrash /></Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectAdmin;
