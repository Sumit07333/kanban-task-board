import React, { useState, useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { STORAGE_KEY, INITIAL_TASKS } from './utils/constants';
import { generateUniqueId } from './utils/helpers';
import { Navbar } from './components/Navbar';
import { StatsSummary } from './components/StatsSummary';
import { TaskInput } from './components/TaskInput';
import { SearchBar } from './components/SearchBar';
import { Board } from './components/Board';
import { Footer } from './components/Footer';
import { NotificationToast } from './components/NotificationToast';

import { ConfirmModal } from './components/ConfirmModal';

/**
 * App Component
 * Master parent component holding global task state, theme mode, filtering logic,
 * and component communication handlers.
 */
export default function App() {
  // Persistence State
  const [tasks, setTasks] = useLocalStorage(STORAGE_KEY, INITIAL_TASKS);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');

  // Reset Confirmation Modal State
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  // Dark Mode State with LocalStorage Persistence
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('kanban_theme_dark');
    if (saved !== null) {
      return saved === 'true';
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Notification Toast State
  const [toast, setToast] = useState(null);

  // Apply dark mode class to document element & persist preference
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('kanban_theme_dark', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('kanban_theme_dark', 'false');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      setToast({
        message: next ? 'Switched to Dark Mode' : 'Switched to Light Mode',
        type: 'info'
      });
      return next;
    });
  };

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  // Handler: Add New Task
  const handleAddTask = ({ title, priority, status }) => {
    const newTask = {
      id: generateUniqueId(),
      title,
      priority,
      status: status || 'todo',
      editing: false,
      createdAt: Date.now()
    };

    setTasks((prevTasks) => [newTask, ...prevTasks]);
    showToast(`Task "${title.substring(0, 24)}${title.length > 24 ? '...' : ''}" created!`, 'success');
  };

  // Handler: Delete Task
  const handleDeleteTask = (taskId) => {
    const target = tasks.find((t) => t.id === taskId);
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== taskId));
    if (target) {
      showToast(`Task "${target.title.substring(0, 20)}..." deleted`, 'warning');
    }
  };

  // Handler: Move Task to explicit status
  const handleMoveTask = (taskId, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );

    const statusLabels = {
      todo: 'To Do',
      in_progress: 'In Progress',
      done: 'Done'
    };

    showToast(`Task moved to ${statusLabels[newStatus] || newStatus}`, 'info');
  };

  // Handler: Update Task Title / Priority
  const handleUpdateTask = (taskId, updatedFields) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedFields } : task
      )
    );
    showToast('Task updated successfully', 'success');
  };

  // Handler: Reorder tasks after Drag and Drop
  const handleReorderTasks = (activeId, overId) => {
    setTasks((prevTasks) => {
      const oldIndex = prevTasks.findIndex((t) => t.id === activeId);
      const newIndex = prevTasks.findIndex((t) => t.id === overId);

      if (oldIndex < 0 || newIndex < 0 || oldIndex === newIndex) return prevTasks;

      const newTasks = [...prevTasks];
      const [movedTask] = newTasks.splice(oldIndex, 1);
      newTasks.splice(newIndex, 0, movedTask);

      return newTasks;
    });
  };

  // Handler: Open Reset Modal
  const handleOpenResetModal = () => {
    setIsResetModalOpen(true);
  };

  // Handler: Confirm Reset Board Data
  const handleConfirmReset = () => {
    setTasks(INITIAL_TASKS);
    setSearchQuery('');
    setPriorityFilter('All');
    setIsResetModalOpen(false);
    showToast('Board reset: all tasks cleared', 'info');
  };

  // Filter Logic: Query title/priority AND priority select
  const filteredTasks = tasks.filter((task) => {
    const query = searchQuery.trim().toLowerCase();
    const matchesQuery =
      query === '' ||
      task.title.toLowerCase().includes(query) ||
      task.priority.toLowerCase().includes(query) ||
      task.status.toLowerCase().includes(query);

    const matchesPriority =
      priorityFilter === 'All' || task.priority === priorityFilter;

    return matchesQuery && matchesPriority;
  });

  const isFiltered = searchQuery.trim() !== '' || priorityFilter !== 'All';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans antialiased selection:bg-indigo-500 selection:text-white transition-colors duration-200">
      {/* Navbar */}
      <Navbar
        onResetData={handleOpenResetModal}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        totalTasks={tasks.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Top Analytics Summary */}
        <StatsSummary tasks={tasks} />

        {/* Task Creator Form */}
        <TaskInput onAddTask={handleAddTask} />

        {/* Global Search and Filter Bar */}
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          priorityFilter={priorityFilter}
          onPriorityFilterChange={setPriorityFilter}
          onClearFilters={() => {
            setSearchQuery('');
            setPriorityFilter('All');
          }}
          matchingCount={filteredTasks.length}
          totalCount={tasks.length}
        />

        {/* Kanban Board */}
        <Board
          tasks={filteredTasks}
          onDeleteTask={handleDeleteTask}
          onMoveTask={handleMoveTask}
          onUpdateTask={handleUpdateTask}
          onReorderTasks={handleReorderTasks}
          isFiltered={isFiltered}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={isResetModalOpen}
        title="Reset Task Board?"
        message="Are you sure you want to reset the board? This will clear all tasks."
        onConfirm={handleConfirmReset}
        onCancel={() => setIsResetModalOpen(false)}
      />

      {/* Notification Toast */}
      <NotificationToast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
