import React from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';

const Modal = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-[#161b22] border-4 border-[#30363d] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-lg w-full p-8 animate-in zoom-in-95 fade-in duration-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold font-pixel tracking-tighter text-white uppercase shrink-0">
            {title}
          </h2>
          <button 
            onClick={onClose}
            className="text-slate-500 hover:text-white font-pixel text-xs transition-colors"
          >
            [X]
          </button>
        </div>

        <div className="mb-8 font-mono text-sm text-slate-400">
          {children}
        </div>

        {footer && (
          <div className="flex justify-end gap-4 border-t-2 border-[#30363d] pt-6">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export const ConfirmModal = ({ isOpen, onClose, onConfirm, title = "CONFIRM_ACTION", message }) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={title}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>ABORT</Button>
          <Button className="bg-red-600 hover:bg-red-700 border-red-800" onClick={() => { onConfirm(); onClose(); }}>
            PROCEED_WITH_DELETE
          </Button>
        </>
      }
    >
      <div className="flex items-center gap-4">
        <div className="w-2 h-2 bg-red-500 animate-pulse shrink-0" />
        <p>{message || "Are you sure you want to proceed with this destructive action? Data may be permanently erased from the matrix."}</p>
      </div>
    </Modal>
  );
};

export default Modal;
