import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import PageWrapper from '../components/layout/PageWrapper';
import Container from '../components/ui/Container';
import ExperienceItem from '../components/features/ExperienceItem';

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await api.get('/experience');
        setExperiences(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchExperience();
  }, []);

  return (
    <PageWrapper>
      <section className="py-20">
        <Container>
          <div className="max-w-2xl mb-16">
            <h2 className="text-primary-400 font-mono text-sm mb-2 uppercase tracking-widest">Career</h2>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Professional Journey</h1>
            <p className="text-slate-400 text-lg">
              A summary of my professional experience, focusing on high-impact projects and technical leadership.
            </p>
          </div>

          <div className="max-w-4xl">
            {loading ? (
              <div className="space-y-12">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-48 bg-slate-800 animate-pulse rounded-2xl" />
                ))}
              </div>
            ) : (
              <div className="mt-12">
                {experiences.map((exp) => (
                  <ExperienceItem key={exp._id} exp={exp} />
                ))}
                {experiences.length === 0 && (
                  <div className="py-20 text-center border-2 border-dashed border-slate-800 rounded-3xl">
                    <p className="text-slate-500">Journey details are being compiled. Stay tuned!</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </Container>
      </section>
    </PageWrapper>
  );
};

export default Experience;
