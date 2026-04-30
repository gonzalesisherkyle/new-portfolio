import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import PageWrapper from '../components/layout/PageWrapper';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import ProjectCard from '../components/features/ProjectCard';
import { HiArrowRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const Home = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/projects');
        setFeaturedProjects(res.data.filter(p => p.featured).slice(0, 3));
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
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <Container>
          <div className="max-w-4xl mx-auto text-center md:text-left">
            <div className="card-pixel mb-8 inline-block px-4 py-1 text-[10px] font-pixel text-primary-400">
              SYSTEM_STATUS: ONLINE
            </div>
            <h1 className="text-3xl md:text-6xl font-bold mb-6 leading-tight uppercase">
              Hello World!<br />
              I'm a <br /><span className="text-primary-400">Full-Stack</span><br />
              Developer
            </h1>
            <p className="text-slate-400 font-mono text-sm md:text-base mb-10 max-w-2xl leading-relaxed">
              {'>'} Initializing development environment...<br />
              {'>'} Specializing in MERN stack and clean code architecture.<br />
              {'>'} Turning complex bugs into elegant solutions.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-6">
              <Link to="/projects">
                <Button variant="primary" className="px-8 py-3">
                  EXECUTE PROJECTS.exe
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="secondary" className="px-8 py-3">
                  INIT_TALK()
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-[#161b22]/50 border-y-2 border-[#30363d]">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 gap-4">
            <div className="text-center md:text-left">
              <h2 className="text-primary-400 font-pixel text-[10px] mb-2 uppercase">REPOSITORY</h2>
              <h3 className="text-2xl md:text-3xl font-bold">Featured_Work</h3>
            </div>
            <Link to="/projects" className="text-primary-400 hover:text-primary-300 flex items-center gap-2 font-pixel text-[10px] uppercase">
              Browse_All <HiArrowRight />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-[300px] bg-[#161b22] card-pixel animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
              {featuredProjects.length === 0 && (
                <div className="col-span-full py-20 text-center card-pixel border-dashed opacity-50">
                  <p className="font-mono text-slate-500 italic">No featured repositories found in current branch.</p>
                </div>
              )}
            </div>
          )}
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <Container>
          <div className="card-pixel p-12 text-center relative overflow-hidden group border-primary-500/50">
            <h2 className="text-2xl md:text-4xl font-bold mb-6 uppercase">Let's build the future.cmd</h2>
            <p className="text-slate-400 font-mono text-sm md:text-lg mb-10 max-w-2xl mx-auto">
              Available for remote collaboration and creative engineering challenges.
            </p>
            <Link to="/contact" className="inline-block">
              <Button variant="primary" className="px-10 py-4">
                ESTABLISH_CONNECTION
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </PageWrapper>
  );
};

export default Home;
