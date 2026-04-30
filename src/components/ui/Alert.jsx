import React, { useEffect } from 'react';

const Alert = ({ type = 'success', message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isError = type === 'error';

  return (
    <div className={`
      fixed bottom-8 right-8 z-50 flex items-center gap-3 p-4 
      ${isError ? 'bg-red-900/90 border-red-500' : 'bg-green-900/90 border-green-500'} 
      border-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
      animate-in slide-in-from-right fade-in duration-300
    `}>
      <div className={`w-2 h-2 ${isError ? 'bg-red-400' : 'bg-green-400'} animate-pulse`} />
      <span className="font-mono text-xs text-white uppercase tracking-tighter">
        {isError ? 'ERROR_DETECTION' : 'SYNC_SUCCESS'}: {message}
      </span>
      <button 
        onClick={onClose}
        className="ml-4 text-white/50 hover:text-white font-pixel text-[10px]"
      >
        [X]
      </button>
    </div>
  );
};

export default Alert;
