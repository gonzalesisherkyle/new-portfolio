import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import Alert from '../../components/ui/Alert';

const SettingsAdmin = () => {
  const [settings, setSettings] = useState({
    email: '',
    phone: '',
    location: '',
    githubUrl: '',
    linkedinUrl: '',
    footerTagline: '',
    footerLogoText: ''
  });
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  const { user } = useAuth();
  const config = { headers: { Authorization: `Bearer ${user.token}` } };

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await api.get('/settings');
      setSettings(res.data);
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
      await api.put('/settings', settings, config);
      setNotification({ type: 'success', message: 'DATABASE_UPDATED' });
    } catch (err) {
      setNotification({ type: 'error', message: err.response?.data?.message || 'SYNC_FAILED' });
    }
  };

  if (loading) return <div className="p-8 text-center font-pixel text-xs animate-pulse">BOOTING_SETTINGS...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Global Settings</h1>

      {notification && (
        <Alert 
          type={notification.type} 
          message={notification.message} 
          onClose={() => setNotification(null)} 
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 space-y-4">
            <h2 className="text-sm font-pixel text-primary-400 mb-2 uppercase tracking-tighter">Contact_Info</h2>
            <Input label="Public Email" value={settings.email} onChange={e => setSettings({...settings, email: e.target.value})} />
            <Input label="Phone Number" value={settings.phone} onChange={e => setSettings({...settings, phone: e.target.value})} />
            <Input label="Location" value={settings.location} onChange={e => setSettings({...settings, location: e.target.value})} />
          </Card>

          <Card className="p-6 space-y-4">
            <h2 className="text-sm font-pixel text-primary-400 mb-2 uppercase tracking-tighter">Branding_Footer</h2>
            <Input label="Footer Logo Text" value={settings.footerLogoText} onChange={e => setSettings({...settings, footerLogoText: e.target.value})} />
            <Input label="Footer Tagline" value={settings.footerTagline} onChange={e => setSettings({...settings, footerTagline: e.target.value})} />
          </Card>

          <Card className="p-6 md:col-span-2 space-y-4">
            <h2 className="text-sm font-pixel text-primary-400 mb-2 uppercase tracking-tighter">Social_Matrix</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="GitHub URL" value={settings.githubUrl} onChange={e => setSettings({...settings, githubUrl: e.target.value})} />
              <Input label="LinkedIn URL" value={settings.linkedinUrl} onChange={e => setSettings({...settings, linkedinUrl: e.target.value})} />
            </div>
          </Card>
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="px-10 py-4">
            SAVE_CONFIG.sys
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SettingsAdmin;
