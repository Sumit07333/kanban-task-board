import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  GripVertical,
  Pencil,
  Trash2,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  Clock,
  Flag
} from 'lucide-react';
import { PRIORITIES } from '../utils/constants';
import { formatDate, getNextStatus, getPreviousStatus, sanitizeTitle } from '../utils/helpers';

/**
 * TaskCard Component
 * Renders individual task card with inline editing, movement controls, delete capability,
 * priority indicators, and @dnd-kit drag and drop hooks.
 */
export const TaskCard = ({
  task,
  onDeleteTask,
  onMoveTask,
  onUpdateTask
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editPriority, setEditPriority] = useState(task.priority);
  const [editError, setEditError] = useState('');

  // DnD Kit Sortable Hook
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task
    },
    disabled: isEditing // Disable dragging while inline editing to prevent conflict
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1
  };

  const priorityConfig = PRIORITIES[task.priority] || PRIORITIES.Medium;

  const nextStatus = getNextStatus(task.status);
  const prevStatus = getPreviousStatus(task.status);

  // Handle Edit Save
  const handleSaveEdit = (e) => {
    if (e) e.preventDefault();
    const cleanTitle = sanitizeTitle(editTitle);

    if (!cleanTitle) {
      setEditError('Title cannot be empty');
      return;
    }

    onUpdateTask(task.id, {
      title: cleanTitle,
      priority: editPriority
    });

    setIsEditing(false);
    setEditError('');
  };

  // Handle Edit Cancel
  const handleCancelEdit = () => {
    setEditTitle(task.title);
    setEditPriority(task.priority);
    setIsEditing(false);
    setEditError('');
  };

  // Handle Keyboard shortcuts during inline edit
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSaveEdit(e);
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative bg-white dark:bg-slate-800/90 rounded-xl p-3.5 sm:p-4 border border-slate-200 dark:border-slate-700/80 shadow-sm hover:shadow-md transition-all duration-200 ${priorityConfig.borderClass} ${
        isDragging ? 'ring-2 ring-indigo-500 shadow-2xl z-50' : ''
      }`}
    >
      {/* Card Header & Drag Handle */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center space-x-2">
          {/* Drag Handle */}
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing text-slate-300 dark:text-slate-600 hover:text-slate-500 dark:hover:text-slate-400 p-0.5 rounded touch-none"
            title="Drag to reorder or move column"
            aria-label="Drag handle"
          >
            <GripVertical className="w-4 h-4" />
          </button>

          {/* Priority Badge */}
          <span
            className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-md text-[11px] font-semibold border ${priorityConfig.badgeClass}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${priorityConfig.dotClass}`} />
            <span>{task.priority} Priority</span>
          </span>
        </div>

        {/* Action Buttons (Edit & Delete) */}
        {!isEditing && (
          <div className="flex items-center space-x-1 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              title="Edit Task"
              aria-label="Edit Task"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onDeleteTask(task.id)}
              className="p-1 text-slate-400 hover:text-red-600 dark:hover:text-red-400 rounded hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
              title="Delete Task"
              aria-label="Delete Task"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Card Body - View Mode or Edit Mode */}
      {isEditing ? (
        <form onSubmit={handleSaveEdit} className="space-y-3 my-2">
          <div>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => {
                setEditTitle(e.target.value);
                if (editError) setEditError('');
              }}
              onKeyDown={handleKeyDown}
              autoFocus
              className="w-full px-2.5 py-1.5 text-sm rounded-lg border border-indigo-400 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              placeholder="Task title"
            />
            {editError && (
              <p className="text-xs text-red-500 mt-1">{editError}</p>
            )}
          </div>

          <div className="flex items-center justify-between gap-2">
            <select
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value)}
              className="px-2 py-1 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            <div className="flex items-center space-x-1">
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-2 py-1 text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 rounded-md transition-colors flex items-center space-x-1"
              >
                <X className="w-3 h-3" />
                <span>Cancel</span>
              </button>
              <button
                type="submit"
                className="px-2.5 py-1 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors flex items-center space-x-1"
              >
                <Check className="w-3 h-3" />
                <span>Save</span>
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="my-1.5">
          <p className="text-sm font-medium text-slate-800 dark:text-slate-100 leading-snug break-words">
            {task.title}
          </p>
        </div>
      )}

      {/* Card Footer - Date & Sprint Movement Controls */}
      <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
        <div className="flex items-center space-x-1 text-[11px]">
          <Clock className="w-3 h-3" />
          <span>{formatDate(task.createdAt)}</span>
        </div>

        {/* Move Controls */}
        {!isEditing && (
          <div className="flex items-center space-x-1">
            {prevStatus && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onMoveTask(task.id, prevStatus);
                }}
                className="inline-flex items-center space-x-1 px-2 py-1 bg-slate-100 dark:bg-slate-700/70 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-md text-[11px] font-medium transition-colors border border-slate-200 dark:border-slate-600"
                title={`Move backward to ${prevStatus === 'todo' ? 'To Do' : 'In Progress'}`}
              >
                <ChevronLeft className="w-3 h-3" />
                <span className="hidden xs:inline">Back</span>
              </button>
            )}

            {nextStatus && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onMoveTask(task.id, nextStatus);
                }}
                className="inline-flex items-center space-x-1 px-2 py-1 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 rounded-md text-[11px] font-semibold transition-colors border border-indigo-200 dark:border-indigo-800/60"
                title={`Move forward to ${nextStatus === 'in_progress' ? 'In Progress' : 'Done'}`}
              >
                <span className="hidden xs:inline">Move</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
