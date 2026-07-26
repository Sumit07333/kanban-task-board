import React, { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

/**
 * NotificationToast Component
 * Displays temporary feedback toast for actions (Add, Delete, Move, Edit).
 */
export const NotificationToast = ({ toast, onClose }) => {
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        onClose();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />,
    warning: <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />,
    info: <Info className="w-4 h-4 text-indigo-500 shrink-0" />
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-slate-900 text-white rounded-xl p-3.5 shadow-2xl border border-slate-700/80 flex items-center justify-between space-x-3 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-center space-x-2.5">
        {icons[toast.type] || icons.info}
        <p className="text-xs font-medium leading-tight">{toast.message}</p>
      </div>
      <button
        onClick={onClose}
        className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors"
        aria-label="Close notification"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
