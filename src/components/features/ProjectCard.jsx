import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { getImageUrl } from '../../utils/imageUrl';

const ProjectCard = ({ project }) => {
  return (
    <Card className="flex flex-col h-full bg-[#161b22] group">
      <div className="relative aspect-video overflow-hidden border-b-2 border-[#30363d]">
        <img 
          src={getImageUrl(project.thumbnail)} 
          alt={project.title}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
        />
        <div className="absolute inset-0 bg-primary-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-sm font-pixel mb-3 leading-tight group-hover:text-primary-400 transition-colors uppercase">
          <Link to={`/projects/${project._id}`}>{project.title}</Link>
        </h3>
        <p className="text-slate-400 font-mono text-[11px] line-clamp-3 mb-4 leading-relaxed">
          {project.description}
        </p>
        
        <div className="mt-auto pt-4 border-t border-[#30363d] flex items-center justify-between">
          <div className="flex gap-3">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white text-base">
                <FaGithub />
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white text-base">
                <FaExternalLinkAlt />
              </a>
            )}
          </div>
          <Link to={`/projects/${project._id}`} className="text-[9px] font-pixel text-primary-400 hover:underline">
            DETAILS.md
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
