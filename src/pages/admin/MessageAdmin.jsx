import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { HiOutlineTrash, HiOutlineMailOpen, HiOutlineMail } from 'react-icons/hi';

const MessageAdmin = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const config = { headers: { Authorization: `Bearer ${user.token}` } };

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await api.get('/contact', config);
      setMessages(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleRead = async (id, currentRead) => {
    try {
      await api.put(`/contact/${id}`, { read: !currentRead }, config);
      fetchMessages();
    } catch (err) {
      alert('Update failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this message?')) {
      try {
        await api.delete(`/contact/${id}`, config);
        fetchMessages();
      } catch (err) {
        alert('Delete failed');
      }
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Contact Messages</h1>

      {loading ? (
        <p>Loading messages...</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {messages.map(msg => (
            <Card key={msg._id} className={`p-6 border-l-4 ${msg.read ? 'border-transparent opacity-60' : 'border-primary-500'}`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-white text-lg">{msg.subject}</h3>
                  <p className="text-sm text-slate-400">From: {msg.name} ({msg.email})</p>
                  <p className="text-xs text-slate-600 font-mono mt-1">{new Date(msg.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" onClick={() => toggleRead(msg._id, msg.read)} className="p-2">
                    {msg.read ? <HiOutlineMail /> : <HiOutlineMailOpen />}
                  </Button>
                  <Button variant="ghost" onClick={() => handleDelete(msg._id)} className="p-2 text-red-500">
                    <HiOutlineTrash />
                  </Button>
                </div>
              </div>
              <p className="text-slate-300 bg-slate-900/50 p-4 rounded-lg whitespace-pre-wrap">
                {msg.message}
              </p>
            </Card>
          ))}
          {messages.length === 0 && <p className="text-center text-slate-500 py-12">No messages received yet.</p>}
        </div>
      )}
    </div>
  );
};

export default MessageAdmin;
