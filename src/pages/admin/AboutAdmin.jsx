import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/ui/Card';
import Input, { TextArea } from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';

const AboutAdmin = () => {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    resumeUrl: '',
    skills_summary: '',
    experience_summary: ''
  });
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  const { user } = useAuth();
  const config = { headers: { Authorization: `Bearer ${user.token}` } };

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const res = await api.get('/about');
      if (res.data) setFormData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotification(null);
    try {
      await api.post('/about', formData, config);
      setNotification({ type: 'success', message: 'PROFILE_SYNCHRONIZED' });
    } catch (err) {
      setNotification({ type: 'error', message: 'UPLINK_ERROR' });
    }
  };

  if (loading) return <div className="p-8 text-center font-pixel text-xs animate-pulse">BOOTING_ABOUT...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold uppercase tracking-tighter">Manage_Profile</h1>
      
      {notification && (
        <Alert 
          type={notification.type} 
          message={notification.message} 
          onClose={() => setNotification(null)} 
        />
      )}

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input 
              label="Main Title" 
              value={formData.title} 
              onChange={e => setFormData({...formData, title: e.target.value})} 
              required 
            />
            <Input 
              label="Subtitle" 
              value={formData.subtitle} 
              onChange={e => setFormData({...formData, subtitle: e.target.value})} 
              required 
            />
          </div>

          <TextArea 
            label="Main Description" 
            value={formData.description} 
            onChange={e => setFormData({...formData, description: e.target.value})} 
            required 
            rows={5}
          />

          <Input 
            label="Resume URL" 
            value={formData.resumeUrl} 
            onChange={e => setFormData({...formData, resumeUrl: e.target.value})} 
            placeholder="Link to PDF or cloud drive"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextArea 
              label="Skills Summary" 
              value={formData.skills_summary} 
              onChange={e => setFormData({...formData, skills_summary: e.target.value})} 
              rows={3}
            />

            <TextArea 
              label="Experience Summary" 
              value={formData.experience_summary} 
              onChange={e => setFormData({...formData, experience_summary: e.target.value})} 
              rows={3}
            />
          </div>

          <div className="pt-2">
            <Button type="submit" className="px-10 py-4">
              COMMIT_CHANGES.exe
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AboutAdmin;
