import React from 'react';
import { Search, X, Filter } from 'lucide-react';

/**
 * SearchBar Component
 * Provides real-time query searching and priority filtering across all columns simultaneously.
 */
export const SearchBar = ({
  searchQuery,
  onSearchChange,
  priorityFilter,
  onPriorityFilterChange,
  onClearFilters,
  matchingCount,
  totalCount
}) => {
  const isFiltered = searchQuery.trim() !== '' || priorityFilter !== 'All';

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-700 shadow-xs mb-6 transition-colors duration-200">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search tasks by title or priority..."
            className="w-full pl-10 pr-10 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Priority Filter */}
        <div className="flex items-center space-x-2">
          <div className="relative flex-1 sm:w-44">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <Filter className="w-3.5 h-3.5" />
            </div>
            <select
              value={priorityFilter}
              onChange={(e) => onPriorityFilterChange(e.target.value)}
              className="w-full pl-8 pr-7 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer appearance-none"
              aria-label="Filter tasks by Priority"
            >
              <option value="All">All Priorities</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
              ▼
            </div>
          </div>

          {/* Clear Filters Button */}
          {isFiltered && (
            <button
              onClick={onClearFilters}
              className="px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-xl transition-all shrink-0 border border-slate-200 dark:border-slate-600"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Filter Status Subtext */}
      {isFiltered && (
        <p className="mt-2.5 text-xs text-indigo-600 dark:text-indigo-400 font-medium">
          Showing {matchingCount} of {totalCount} tasks matching filter.
        </p>
      )}
    </div>
  );
};
