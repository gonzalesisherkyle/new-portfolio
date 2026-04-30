import React from 'react';

const Badge = ({ children, variant = 'primary', className = '' }) => {
  const variants = {
    primary: 'bg-primary-900/30 border border-primary-500/50 text-primary-400',
    secondary: 'bg-slate-800 border border-slate-700 text-slate-400',
    success: 'bg-green-900/30 border border-green-500/50 text-green-400',
    warning: 'bg-yellow-900/30 border border-yellow-500/50 text-yellow-400',
    error: 'bg-red-900/30 border border-red-500/50 text-red-400',
  };

  return (
    <span className={`inline-block px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
