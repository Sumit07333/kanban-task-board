import React, { useState } from 'react';
import { Plus, Flag, AlertCircle } from 'lucide-react';
import { sanitizeTitle } from '../utils/helpers';

/**
 * TaskInput Component
 * Form to create new tasks with title validation and priority selection.
 */
export const TaskInput = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanTitle = sanitizeTitle(title);

    if (!cleanTitle) {
      setError('Task title cannot be empty.');
      return;
    }

    // Call parent handler to create task
    onAddTask({
      title: cleanTitle,
      priority: priority,
      status: 'todo'
    });

    // Reset input state
    setTitle('');
    setPriority('Medium');
    setError('');
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-700 shadow-sm mb-6 transition-colors duration-200">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center space-x-2">
        <Plus className="w-4 h-4 text-indigo-500" />
        <span>Create New Task</span>
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
        {/* Task Name Input */}
        <div className="flex-1 relative">
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError('');
            }}
            placeholder="What needs to be done? (e.g. Implement user auth flow)"
            className={`w-full px-4 py-2.5 rounded-xl border ${
              error
                ? 'border-red-500 focus:ring-red-500/20'
                : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-400'
            } bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all`}
          />
          {error && (
            <p className="absolute -bottom-5 left-1 text-xs text-red-500 flex items-center space-x-1 font-medium">
              <AlertCircle className="w-3 h-3" />
              <span>{error}</span>
            </p>
          )}
        </div>

        {/* Priority Dropdown */}
        <div className="w-full md:w-44 relative flex items-center">
          <div className="absolute left-3 pointer-events-none text-slate-400">
            <Flag className="w-4 h-4" />
          </div>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer appearance-none"
            aria-label="Task Priority"
          >
            <option value="High">Priority: High</option>
            <option value="Medium">Priority: Medium</option>
            <option value="Low">Priority: Low</option>
          </select>
          <div className="absolute right-3 pointer-events-none text-slate-400 text-xs">
            ▼
          </div>
        </div>

        {/* Add Task Button */}
        <button
          type="submit"
          className="w-full md:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-medium text-sm rounded-xl transition-all shadow-md shadow-indigo-500/20 active:scale-95 flex items-center justify-center space-x-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Task</span>
        </button>
      </form>
    </div>
  );
};
