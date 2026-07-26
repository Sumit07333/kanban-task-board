/**
 * Kanban Task Board - Constants
 * Defines core column structures, priority levels, sample initial tasks, and local storage keys.
 */

export const STORAGE_KEY = 'kanban_board_tasks_v1';

export const COLUMNS = [
  {
    id: 'todo',
    title: 'To Do',
    description: 'Tasks ready to be worked on',
    color: 'amber',
    badgeBg: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800/50',
    dotColor: 'bg-amber-500',
    accentBorder: 'border-t-4 border-amber-500'
  },
  {
    id: 'in_progress',
    title: 'In Progress',
    description: 'Tasks currently under active development',
    color: 'indigo',
    badgeBg: 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 border-indigo-300 dark:border-indigo-800/50',
    dotColor: 'bg-indigo-500',
    accentBorder: 'border-t-4 border-indigo-500'
  },
  {
    id: 'done',
    title: 'Done',
    description: 'Completed tasks ready for review',
    color: 'emerald',
    badgeBg: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800/50',
    dotColor: 'bg-emerald-500',
    accentBorder: 'border-t-4 border-emerald-500'
  }
];

export const PRIORITIES = {
  High: {
    label: 'High',
    color: 'red',
    borderClass: 'border-l-4 border-red-500',
    badgeClass: 'bg-red-100 dark:bg-red-950/70 text-red-700 dark:text-red-300 border-red-200 dark:border-red-900/60',
    dotClass: 'bg-red-500'
  },
  Medium: {
    label: 'Medium',
    color: 'amber',
    borderClass: 'border-l-4 border-amber-500',
    badgeClass: 'bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-900/60',
    dotClass: 'bg-amber-500'
  },
  Low: {
    label: 'Low',
    color: 'emerald',
    borderClass: 'border-l-4 border-emerald-500',
    badgeClass: 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900/60',
    dotClass: 'bg-emerald-500'
  }
};

export const INITIAL_TASKS = [];
