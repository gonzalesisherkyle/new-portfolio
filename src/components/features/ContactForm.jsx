import React, { useState } from 'react';
import api from '../../api/axios';
import Input, { TextArea } from '../ui/Input';
import Button from '../ui/Button';
import { HiOutlineMailOpen } from 'react-icons/hi';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await api.post('/contact', formData);
      setStatus({ type: 'success', message: response.data.message });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: error.response?.data?.message || 'Something went wrong. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Name"
          name="name"
          placeholder="John Doe"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="john@example.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <Input
        label="Subject"
        name="subject"
        placeholder="How can I help you?"
        value={formData.subject}
        onChange={handleChange}
        required
      />
      <TextArea
        label="Message"
        name="message"
        placeholder="Your message here..."
        value={formData.message}
        onChange={handleChange}
        required
      />
      
      {status.message && (
        <div className={`p-4 rounded-lg text-sm ${
          status.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
        }`}>
          {status.message}
        </div>
      )}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Sending...' : 'Send Message'}
        <HiOutlineMailOpen />
      </Button>
    </form>
  );
};

export default ContactForm;
