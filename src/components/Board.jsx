import React, { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCorners
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import confetti from 'canvas-confetti';
import { Column } from './Column';
import { TaskCard } from './TaskCard';
import { COLUMNS } from '../utils/constants';

/**
 * Board Component
 * Master container hosting the 3 Kanban columns.
 * Manages @dnd-kit sensors, drag overlays, drag-end events, and confetti animations.
 */
export const Board = ({
  tasks,
  onDeleteTask,
  onMoveTask,
  onUpdateTask,
  onReorderTasks,
  isFiltered
}) => {
  const [activeTask, setActiveTask] = useState(null);

  // Setup DnD Sensors with activation constraints to prevent accidental triggers on click
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5 // 5px movement required before drag activates
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const handleDragStart = (event) => {
    const { active } = event;
    const task = tasks.find((t) => t.id === active.id);
    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const activeTaskObj = tasks.find((t) => t.id === activeId);
    if (!activeTaskObj) return;

    // Check if over target is a Column or a Task inside a column
    let targetStatus = null;

    // Is over target a column ID? ('todo', 'in_progress', 'done')
    if (COLUMNS.some((col) => col.id === overId)) {
      targetStatus = overId;
    } else {
      // Over target is another task card
      const overTask = tasks.find((t) => t.id === overId);
      if (overTask) {
        targetStatus = overTask.status;
      }
    }

    if (targetStatus && activeTaskObj.status !== targetStatus) {
      // Trigger confetti if moved into 'done'
      if (targetStatus === 'done' && activeTaskObj.status !== 'done') {
        try {
          confetti({
            particleCount: 70,
            spread: 60,
            origin: { y: 0.6 }
          });
        } catch (e) {
          // ignore if canvas not supported
        }
      }

      onMoveTask(activeId, targetStatus);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId !== overId) {
      onReorderTasks(activeId, overId);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {COLUMNS.map((column) => {
          const columnTasks = tasks.filter((task) => task.status === column.id);
          return (
            <Column
              key={column.id}
              column={column}
              tasks={columnTasks}
              onDeleteTask={onDeleteTask}
              onMoveTask={onMoveTask}
              onUpdateTask={onUpdateTask}
              isFiltered={isFiltered}
            />
          );
        })}
      </div>

      {/* Floating Drag Overlay */}
      <DragOverlay>
        {activeTask ? (
          <div className="rotate-2 scale-105 shadow-2xl transition-transform">
            <TaskCard
              task={activeTask}
              onDeleteTask={() => {}}
              onMoveTask={() => {}}
              onUpdateTask={() => {}}
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
