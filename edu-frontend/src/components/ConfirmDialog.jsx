import { createPortal } from 'react-dom';

export default function ConfirmDialog({ show, title, message, onConfirm, onCancel, type = 'danger' }) {
  if (!show) return null;

  const getColors = () => {
    switch (type) {
      case 'danger':
        return {
          button: 'bg-gradient-to-r from-red-500 to-pink-500',
          icon: 'text-red-500',
          bg: 'from-red-50 to-pink-50'
        };
      case 'warning':
        return {
          button: 'bg-gradient-to-r from-yellow-500 to-orange-500',
          icon: 'text-yellow-500',
          bg: 'from-yellow-50 to-orange-50'
        };
      default:
        return {
          button: 'bg-gradient-to-r from-red-500 to-pink-500',
          icon: 'text-red-500',
          bg: 'from-red-50 to-pink-50'
        };
    }
  };

  const colors = getColors();

  return createPortal(
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" style={{zIndex: 9999999}}>
      <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl w-full max-w-md border border-indigo-200 shadow-2xl">
        <div className={`flex items-center gap-4 mb-6 p-4 rounded-xl bg-gradient-to-r ${colors.bg}`}>
          <div className={`w-12 h-12 rounded-xl bg-white flex items-center justify-center ${colors.icon}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800">{title}</h3>
            <p className="text-slate-600 mt-1">{message}</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-all duration-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 ${colors.button} text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105`}
          >
            Delete
          </button>
        </div>
      </div>
    </div>, document.body
  );
}