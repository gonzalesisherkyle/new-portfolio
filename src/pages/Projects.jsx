import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import PageWrapper from '../components/layout/PageWrapper';
import Container from '../components/ui/Container';
import ProjectCard from '../components/features/ProjectCard';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/projects');
        setProjects(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <PageWrapper>
      <section className="py-20">
        <Container>
          <div className="max-w-2xl mb-16">
            <h2 className="text-primary-400 font-mono text-sm mb-2 uppercase tracking-widest">Portfolio</h2>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Selected Works</h1>
            <p className="text-slate-400 text-lg">
              A collection of projects I've built, ranging from small experiments to complex full-stack applications.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-[400px] bg-slate-800 animate-pulse rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
              {projects.length === 0 && (
                <div className="col-span-full py-32 text-center border-2 border-dashed border-slate-800 rounded-3xl">
                  <p className="text-slate-500 text-xl">Projects are being polished. Coming soon!</p>
                </div>
              )}
            </div>
          )}
        </Container>
      </section>
    </PageWrapper>
  );
};

export default Projects;
