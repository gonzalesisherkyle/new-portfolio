import React from 'react';
import * as SiIcons from 'react-icons/si';
import * as FaIcons from 'react-icons/fa';

const SkillCard = ({ skill }) => {
  // Dynamic icon resolution
  const IconComponent = SiIcons[skill.icon] || FaIcons[skill.icon] || FaIcons.FaCode;

  return (
    <div className="group flex flex-col items-center justify-center p-4 bg-[#161b22] card-pixel hover:border-primary-500 transition-all active:translate-y-1">
      <div 
        className="text-3xl mb-3 transition-transform group-hover:scale-110"
        style={{ color: skill.color || '#3fb950' }}
      >
        <IconComponent />
      </div>
      <span className="text-[10px] font-pixel text-slate-400 text-center uppercase tracking-tighter group-hover:text-white transition-colors">
        {skill.name}
      </span>
      
      {skill.proficiency > 0 && (
        <div className="w-full h-2 bg-[#0d1117] border border-[#30363d] mt-3 p-[1px]">
          <div 
            className="h-full bg-primary-500"
            style={{ width: `${skill.proficiency}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default SkillCard;
