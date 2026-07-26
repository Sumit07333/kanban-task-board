import React from 'react';
import { Kanban, RotateCcw, Sparkles, Moon, Sun } from 'lucide-react';

/**
 * Navbar Component
 * Application header displaying branding, theme controls, and task board reset options.
 */
export const Navbar = ({ onResetData, isDarkMode, toggleDarkMode, totalTasks }) => {
  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-indigo-600 dark:bg-indigo-500 rounded-xl text-white shadow-md shadow-indigo-500/20">
            <Kanban className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold text-slate-800 dark:text-white tracking-tight">
                Kanban Task Board
              </h1>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
              Organize, track, and manage team deliverables
            </p>
          </div>
        </div>

        {/* Right Side Header Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Total tasks pill */}
          <div className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>{totalTasks} Total Tasks</span>
          </div>

          {/* Reset Board Button */}
          <button
            onClick={onResetData}
            title="Reset Board (Clear all tasks)"
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-all border border-slate-200 dark:border-slate-700 active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Board</span>
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle Theme"
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-all border border-slate-200 dark:border-slate-700 active:scale-95"
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
