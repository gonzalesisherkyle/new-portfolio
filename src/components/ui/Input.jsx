import React from 'react';

const Input = ({ label, error, className = '', ...props }) => {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="block text-[10px] font-pixel text-slate-500 uppercase ml-1">
          {label}
        </label>
      )}
      <input
        className={`w-full bg-[#0d1117] border-2 border-[#30363d] text-[#c9d1d9] px-4 py-2 font-mono text-sm focus:border-primary-500 outline-none transition-all placeholder:text-slate-600 ${
          error ? 'border-red-500' : ''
        }`}
        {...props}
      />
      {error && <p className="text-[10px] font-pixel text-red-500 ml-1 mt-1">{error}</p>}
    </div>
  );
};

export const TextArea = ({ label, error, className = '', ...props }) => {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="block text-[10px] font-pixel text-slate-500 uppercase ml-1">
          {label}
        </label>
      )}
      <textarea
        className={`w-full bg-[#0d1117] border-2 border-[#30363d] text-[#c9d1d9] px-4 py-2 font-mono text-sm focus:border-primary-500 outline-none transition-all placeholder:text-slate-600 min-h-[120px] ${
          error ? 'border-red-500' : ''
        }`}
        {...props}
      />
      {error && <p className="text-[10px] font-pixel text-red-500 ml-1 mt-1">{error}</p>}
    </div>
  );
};

export default Input;
