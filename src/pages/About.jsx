import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import PageWrapper from '../components/layout/PageWrapper';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import { HiDownload } from 'react-icons/hi';

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await api.get('/about');
        setAboutData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  if (loading) return <div className="py-20 text-center">Loading...</div>;

  const content = aboutData || {
    title: "Crafting Digital Experiences",
    subtitle: "Software Engineer",
    description: "I am a passionate software engineer dedicated to building high-performance, scalable web applications. My expertise lies in the MERN stack, cloud architecture, and modern frontend technologies.",
    skills_summary: "I specialize in React, Node.js, and MongoDB, with a strong focus on clean code and performance optimization.",
    experience_summary: "Over the years, I've worked on diverse projects ranging from enterprise-level platforms to innovative startup MVPs."
  };

  return (
    <PageWrapper>
      <section className="py-12 md:py-16">
        <Container>
          <div className="max-w-3xl mx-auto">
            {/* Content Section */}
            <div className="text-center md:text-left">
              <h2 className="text-primary-500 font-medium tracking-widest uppercase mb-2 text-sm">{content.subtitle}</h2>
              <h1 className="text-3xl md:text-5xl font-bold mb-6">{content.title}</h1>

              <div className="space-y-6 text-slate-400 text-base md:text-lg leading-relaxed">
                <p className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">{content.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div className="p-5 rounded-xl border border-slate-800 bg-dark-card">
                    <h3 className="text-white font-bold mb-2 text-sm uppercase tracking-wider text-primary-400">My Philosophy</h3>
                    <p className="text-sm">{content.skills_summary}</p>
                  </div>

                  <div className="p-5 rounded-xl border border-slate-800 bg-dark-card">
                    <h3 className="text-white font-bold mb-2 text-sm uppercase tracking-wider text-primary-400">My Journey</h3>
                    <p className="text-sm">{content.experience_summary}</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap justify-center md:justify-start gap-4">
                {content.resumeUrl && (
                  <a href={content.resumeUrl} target="_blank" rel="noreferrer">
                    <Button variant="primary" className="px-6 py-2.5 text-sm">
                      Download Resume <HiDownload className="ml-2" />
                    </Button>
                  </a>
                )}
                <Button variant="secondary" className="px-6 py-2.5 text-sm">
                  Let's Talk
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </PageWrapper>
  );
};

export default About;
