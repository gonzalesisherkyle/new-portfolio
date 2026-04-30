import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import PageWrapper from '../components/layout/PageWrapper';
import Container from '../components/ui/Container';
import ContactForm from '../components/features/ContactForm';
import Card from '../components/ui/Card';
import { HiOutlineMail, HiOutlineLocationMarker, HiOutlinePhone } from 'react-icons/hi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Contact = () => {
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

  return (
    <PageWrapper>
      <section className="py-20">
        <Container>
          <div className="max-w-2xl mb-16 text-center md:text-left">
            <h2 className="text-primary-400 font-pixel text-[10px] mb-2 uppercase tracking-widest">ESTABLISH_CONNECTION</h2>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 uppercase tracking-tighter">Let's_Talk.exe</h1>
            <p className="text-slate-500 font-mono text-sm max-w-xl">
              {'>'} Protocol: SMTP/HTTPS<br />
              {'>'} Status: Awaiting incoming signals...
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-8">
              <Card className="p-6 space-y-8">
                {settings && (
                  <>
                    <div className="flex items-start gap-4 group">
                      <div className="w-10 h-10 bg-green-900/20 text-green-400 flex items-center justify-center text-xl pixel-border-green group-hover:scale-110 transition-transform">
                        <HiOutlineMail />
                      </div>
                      <div>
                        <h3 className="text-white font-pixel text-[10px] mb-1 uppercase tracking-tighter">EMAIL</h3>
                        <p className="text-slate-400 font-mono text-xs">{settings.email}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 group">
                      <div className="w-10 h-10 bg-green-900/20 text-green-400 flex items-center justify-center text-xl pixel-border-green group-hover:scale-110 transition-transform">
                        <HiOutlineLocationMarker />
                      </div>
                      <div>
                        <h3 className="text-white font-pixel text-[10px] mb-1 uppercase tracking-tighter">LOCATION</h3>
                        <p className="text-slate-400 font-mono text-xs">{settings.location}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 group">
                      <div className="w-10 h-10 bg-green-900/20 text-green-400 flex items-center justify-center text-xl pixel-border-green group-hover:scale-110 transition-transform">
                        <HiOutlinePhone />
                      </div>
                      <div>
                        <h3 className="text-white font-pixel text-[10px] mb-1 uppercase tracking-tighter">PHONE</h3>
                        <p className="text-slate-400 font-mono text-xs">{settings.phone}</p>
                      </div>
                    </div>
                  </>
                )}
              </Card>

              {settings && (
                <Card className="p-6">
                  <h3 className="text-white font-pixel text-[10px] mb-6 uppercase tracking-tighter">CONNECT_WITH_ME</h3>
                  <div className="flex gap-4">
                    {settings.githubUrl && (
                      <a href={settings.githubUrl} target="_blank" rel="noreferrer" className="w-10 h-10 bg-[#161b22] border-2 border-[#30363d] flex items-center justify-center text-xl text-slate-400 hover:text-primary-400 hover:border-primary-400 transition-all">
                        <FaGithub />
                      </a>
                    )}
                    {settings.linkedinUrl && (
                      <a href={settings.linkedinUrl} target="_blank" rel="noreferrer" className="w-10 h-10 bg-[#161b22] border-2 border-[#30363d] flex items-center justify-center text-xl text-slate-400 hover:text-primary-400 hover:border-primary-400 transition-all">
                        <FaLinkedin />
                      </a>
                    )}
                  </div>
                </Card>
              )}
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="p-8 md:p-10">
                <ContactForm />
              </Card>
            </div>
          </div>
        </Container>
      </section>
    </PageWrapper>
  );
};

export default Contact;
