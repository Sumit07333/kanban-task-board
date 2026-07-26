import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { TaskCard } from './TaskCard';
import { Inbox } from 'lucide-react';

/**
 * Column Component
 * Represents a Kanban board column (To Do, In Progress, Done)
 * Acts as a @dnd-kit droppable container and hosts sortable task cards.
 */
export const Column = ({
  column,
  tasks,
  onDeleteTask,
  onMoveTask,
  onUpdateTask,
  isFiltered
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
    data: {
      type: 'Column',
      column
    }
  });

  const taskIds = tasks.map((t) => t.id);

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col bg-slate-100/80 dark:bg-slate-900/60 rounded-2xl p-4 border transition-all duration-200 min-h-[500px] ${
        column.accentBorder
      } ${
        isOver
          ? 'border-indigo-400 dark:border-indigo-500 bg-indigo-50/40 dark:bg-indigo-950/20 ring-2 ring-indigo-500/20'
          : 'border-slate-200 dark:border-slate-800'
      }`}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center space-x-2.5">
          <span className={`w-2.5 h-2.5 rounded-full ${column.dotColor}`} />
          <h3 className="font-bold text-base text-slate-800 dark:text-slate-100">
            {column.title}
          </h3>
        </div>

        {/* Task Count Badge */}
        <span
          className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${column.badgeBg}`}
        >
          {tasks.length}
        </span>
      </div>

      {/* Task List / Sortable Context */}
      <div className="flex-1 space-y-3">
        <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDeleteTask={onDeleteTask}
              onMoveTask={onMoveTask}
              onUpdateTask={onUpdateTask}
            />
          ))}
        </SortableContext>

        {/* Empty State */}
        {tasks.length === 0 && (
          <div className="h-44 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl flex flex-col items-center justify-center text-center p-4 text-slate-400 dark:text-slate-600 transition-colors">
            <Inbox className="w-8 h-8 mb-2 opacity-60" />
            <p className="text-sm font-medium">
              {isFiltered ? 'No matching tasks.' : 'No tasks available.'}
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
              {isFiltered
                ? 'Try adjusting your search query'
                : 'Drag or add new tasks here'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
