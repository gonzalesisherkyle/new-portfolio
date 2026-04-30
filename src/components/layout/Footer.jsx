import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import Container from '../ui/Container';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/settings');
        setSettings(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSettings();
  }, []);

  if (!settings) return null;

  return (
    <footer className="bg-[#0d1117] border-t-2 border-[#30363d] py-12 mt-20">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h2 className="font-pixel text-lg text-white mb-2 uppercase tracking-tighter">
              {settings.footerLogoText}
            </h2>
            <p className="text-slate-500 font-mono text-xs">{settings.footerTagline}</p>
          </div>
          
          <div className="flex gap-6 text-xl text-slate-500">
            {settings.githubUrl && <a href={settings.githubUrl} target="_blank" rel="noreferrer" className="hover:text-primary-400 transition-colors"><FaGithub /></a>}
            {settings.linkedinUrl && <a href={settings.linkedinUrl} target="_blank" rel="noreferrer" className="hover:text-primary-400 transition-colors"><FaLinkedin /></a>}
          </div>
        </div>
        
        <div className="border-t-2 border-[#30363d] mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-slate-600 uppercase tracking-widest">
          <p>© {new Date().getFullYear()} {settings.footerLogoText}. SYSTEM_V1.0</p>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-help">PRIVACY_POLICY</span>
            <span className="hover:text-white cursor-help">TERMS_OF_SERVICE</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
