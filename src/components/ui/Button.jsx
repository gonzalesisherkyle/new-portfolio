import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  type = 'button',
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 transition-all';
  
  const variants = {
    primary: 'btn-pixel',
    secondary: 'btn-pixel-secondary',
    ghost: 'hover:bg-slate-800 text-slate-400 hover:text-white px-3 py-1.5 font-mono text-xs',
    danger: 'bg-red-900/20 border-2 border-red-900/50 text-red-500 hover:bg-red-900/40 px-4 py-2 font-pixel text-[10px]'
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
