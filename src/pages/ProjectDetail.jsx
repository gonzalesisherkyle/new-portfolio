import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import { HiArrowLeft, HiExternalLink } from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa';
import PageWrapper from '../components/layout/PageWrapper';
import Container from '../components/ui/Container';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { getImageUrl } from '../utils/imageUrl';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get(`/projects/${id}`);
        setProject(res.data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) return (
    <PageWrapper>
      <Container className="py-20 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mx-auto"></div>
      </Container>
    </PageWrapper>
  );

  if (error || !project) return (
    <PageWrapper>
      <Container className="py-20 text-center">
        <h1 className="text-4xl font-bold mb-6">Project Not Found</h1>
        <Button variant="primary">
          <Link to="/projects">Back to Projects</Link>
        </Button>
      </Container>
    </PageWrapper>
  );

  return (
    <PageWrapper>
      <section className="py-12 md:py-20">
        <Container>
          <Link to="/projects" className="flex items-center gap-2 text-slate-400 hover:text-white mb-10 transition-colors">
            <HiArrowLeft /> Back to Projects
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Project Image */}
            <div className="rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
              <img src={getImageUrl(project.thumbnail)} alt={project.title} className="w-full h-auto" />
            </div>

            {/* Project Header Info */}
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">{project.title}</h1>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-3 mb-10">
                {project.techStack.map((tech) => (
                  <Badge key={tech} variant="primary" className="text-sm px-4 py-1">{tech}</Badge>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer">
                    <Button variant="primary" className="px-8 py-3">
                      Live Demo <HiExternalLink />
                    </Button>
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer">
                    <Button variant="secondary" className="px-8 py-3">
                      Github Source <FaGithub />
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </PageWrapper>
  );
};

export default ProjectDetail;
