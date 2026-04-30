import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import PageWrapper from '../components/layout/PageWrapper';
import Container from '../components/ui/Container';
import SkillCard from '../components/features/SkillCard';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await api.get('/skills');
        setSkills(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  // Dynamically get unique categories from the skills data
  const dynamicCategories = [...new Set(skills.map(s => s.category))].sort();

  const groupedSkills = dynamicCategories.reduce((acc, cat) => {
    const filtered = skills.filter(s => s.category === cat);
    if (filtered.length > 0) acc[cat] = filtered;
    return acc;
  }, {});

  return (
    <PageWrapper>
      <section className="py-20">
        <Container>
          <div className="max-w-4xl mb-16 border-l-4 border-primary-500 pl-6">
            <h2 className="text-primary-400 font-pixel text-[10px] mb-2 uppercase tracking-widest">SYSTEM_COMPONENTS</h2>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 uppercase">Technical_Arsenal</h1>
            <p className="text-slate-500 font-mono text-sm max-w-xl">
              {'>'} Loading modules... OK<br />
              {'>'} Deep expertise in full-stack engineering and modern AI integration.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-24 bg-[#161b22] card-pixel animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="space-y-12">
              {dynamicCategories.map((category) => (
                <div key={category}>
                  <div className="flex items-center gap-4 mb-6">
                    <h3 className="text-xs font-pixel text-white uppercase tracking-tighter shrink-0">
                      [{category}]
                    </h3>
                    <div className="h-[2px] bg-[#30363d] flex-grow" />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {groupedSkills[category].map((skill) => (
                      <SkillCard key={skill._id || skill.name} skill={skill} />
                    ))}
                  </div>
                </div>
              ))}
              
              {skills.length === 0 && (
                <div className="py-20 text-center card-pixel opacity-50">
                  <p className="font-mono text-slate-500 italic">No modules loaded in the current environment.</p>
                </div>
              )}
            </div>
          )}
        </Container>
      </section>
    </PageWrapper>
  );
};

export default Skills;
