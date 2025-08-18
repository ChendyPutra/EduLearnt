import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function Toast({ message, type = 'success', show, onClose, duration = 3000 }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, onClose, duration]);

  if (!show) return null;

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white';
      case 'error':
        return 'bg-gradient-to-r from-red-500 to-pink-500 text-white';
      case 'warning':
        return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white';
      case 'info':
        return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white';
      default:
        return 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case 'info':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
    }
  };

  return createPortal(
    <div className="fixed top-24 right-8 animate-in slide-in-from-right duration-300" style={{zIndex: 9999999}}>
      <div className={`${getToastStyles()} px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-sm border border-white/20 flex items-center gap-3 min-w-80 max-w-md`}>
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <p className="font-medium flex-1">{message}</p>
        <button
          onClick={onClose}
          className="flex-shrink-0 hover:bg-white/20 p-1 rounded-lg transition-colors duration-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>, document.body
  );
}