import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/ui/Card';
import { HiOutlineBriefcase, HiOutlineMail, HiOutlineCheckCircle } from 'react-icons/hi';

const Dashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    messages: 0,
    unreadMessages: 0
  });
  const { user } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const [projRes, msgRes] = await Promise.all([
          api.get('/projects'),
          api.get('/contact', config)
        ]);
        
        setStats({
          projects: projRes.data.length,
          messages: msgRes.data.length,
          unreadMessages: msgRes.data.filter(m => !m.read).length
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, [user.token]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="p-6 flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-primary-500/10 text-primary-500 flex items-center justify-center text-3xl">
            <HiOutlineBriefcase />
          </div>
          <div>
            <p className="text-slate-500 text-sm font-medium uppercase tracking-widest">Total Projects</p>
            <p className="text-3xl font-bold text-white">{stats.projects}</p>
          </div>
        </Card>

        <Card className="p-6 flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center text-3xl">
            <HiOutlineMail />
          </div>
          <div>
            <p className="text-slate-500 text-sm font-medium uppercase tracking-widest">Messages</p>
            <p className="text-3xl font-bold text-white">{stats.messages}</p>
          </div>
        </Card>

        <Card className="p-6 flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-3xl">
            <HiOutlineCheckCircle />
          </div>
          <div>
            <p className="text-slate-500 text-sm font-medium uppercase tracking-widest">Unread</p>
            <p className="text-3xl font-bold text-white">{stats.unreadMessages}</p>
          </div>
        </Card>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors text-left">
            <p className="font-bold text-white mb-1">Add Project</p>
            <p className="text-xs text-slate-500">Showcase a new work</p>
          </button>
          <button className="p-4 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors text-left">
            <p className="font-bold text-white mb-1">Update Experience</p>
            <p className="text-xs text-slate-500">Keep your career fresh</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
