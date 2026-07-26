import React from 'react';
import { CheckCircle2, Clock, ListTodo, TrendingUp } from 'lucide-react';

/**
 * StatsSummary Component
 * Displays real-time task counts and completion percentage bar.
 */
export const StatsSummary = ({ tasks = [] }) => {
  const total = tasks.length;
  const todoCount = tasks.filter(t => t.status === 'todo').length;
  const inProgressCount = tasks.filter(t => t.status === 'in_progress').length;
  const doneCount = tasks.filter(t => t.status === 'done').length;

  const completionRate = total > 0 ? Math.round((doneCount / total) * 100) : 0;

  return (
    <div className="bg-white dark:bg-slate-800/80 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-700/80 shadow-xs mb-6 transition-all duration-200">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-3">
        {/* Total Tasks */}
        <div className="flex items-center space-x-3 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800">
          <div className="p-2 bg-slate-200/80 dark:bg-slate-700/80 text-slate-700 dark:text-slate-200 rounded-lg">
            <ListTodo className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Total Tasks</p>
            <p className="text-lg font-bold text-slate-900 dark:text-white">{total}</p>
          </div>
        </div>

        {/* To Do Count */}
        <div className="flex items-center space-x-3 p-3 bg-amber-50/60 dark:bg-amber-950/20 rounded-xl border border-amber-100/80 dark:border-amber-900/40">
          <div className="p-2 bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 rounded-lg">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs text-amber-700 dark:text-amber-400 font-medium">To Do</p>
            <p className="text-lg font-bold text-amber-900 dark:text-amber-200">{todoCount}</p>
          </div>
        </div>

        {/* In Progress Count */}
        <div className="flex items-center space-x-3 p-3 bg-indigo-50/60 dark:bg-indigo-950/20 rounded-xl border border-indigo-100/80 dark:border-indigo-900/40">
          <div className="p-2 bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 rounded-lg">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs text-indigo-700 dark:text-indigo-400 font-medium">In Progress</p>
            <p className="text-lg font-bold text-indigo-900 dark:text-indigo-200">{inProgressCount}</p>
          </div>
        </div>

        {/* Done Count */}
        <div className="flex items-center space-x-3 p-3 bg-emerald-50/60 dark:bg-emerald-950/20 rounded-xl border border-emerald-100/80 dark:border-emerald-900/40">
          <div className="p-2 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 rounded-lg">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">Done</p>
            <p className="text-lg font-bold text-emerald-900 dark:text-emerald-200">{doneCount}</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div>
        <div className="flex justify-between items-center text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
          <span>Sprint Completion Rate</span>
          <span className="text-indigo-600 dark:text-indigo-400">{completionRate}%</span>
        </div>
        <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
          <div
            className="bg-indigo-600 dark:bg-indigo-500 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>
    </div>
  );
};
