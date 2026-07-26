import React from 'react';
import { Heart, Github, Code2, Layers } from 'lucide-react';

/**
 * Footer Component
 * Professional SaaS page footer with tech stack tags and documentation links.
 */
export const Footer = () => {
  return (
    <footer className="mt-16 border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 py-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Brand & Copyright */}
          <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <Code2 className="w-4 h-4 text-indigo-500" />
            <span>
              Kanban Task Board • Production Ready
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
