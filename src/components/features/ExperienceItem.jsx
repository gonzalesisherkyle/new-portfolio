import React from 'react';
import { motion } from 'framer-motion';
import Badge from '../ui/Badge';

const ExperienceItem = ({ exp }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="relative pl-8 pb-12 border-l border-slate-800 last:pb-0">
      {/* Timeline Dot */}
      <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-primary-500 shadow-[0_0_10px_rgba(14,165,233,0.5)]" />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
        <div>
          <h3 className="text-xl font-bold text-white">{exp.position}</h3>
          <p className="text-primary-400 font-medium">{exp.company}</p>
        </div>
        <div className="text-sm text-slate-500 font-mono">
          {formatDate(exp.startDate)} — {exp.current ? 'Present' : formatDate(exp.endDate)}
        </div>
      </div>
      
      <ul className="space-y-2 mb-6">
        {exp.description.map((point, index) => (
          <li key={index} className="text-slate-400 text-sm flex gap-3">
            <span className="text-primary-500 mt-1">•</span>
            {point}
          </li>
        ))}
      </ul>
      
      <div className="flex flex-wrap gap-2">
        {exp.techStack.map((tech) => (
          <Badge key={tech} variant="neutral">{tech}</Badge>
        ))}
      </div>
    </div>
  );
};

export default ExperienceItem;
