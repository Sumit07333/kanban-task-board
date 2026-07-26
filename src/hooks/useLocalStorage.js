import { useState, useEffect } from 'react';

// Set of legacy built-in demo task IDs to automatically strip out
const DEMO_TASK_IDS = new Set(['task-101', 'task-102', 'task-103', 'task-104', 'task-105']);

/**
 * Custom hook to synchronize React state with browser localStorage.
 * Handles parsing, serialization, and fallback recovery gracefully.
 * 
 * @param {string} key - The localStorage key
 * @param {any} initialValue - Fallback value if key does not exist
 * @returns {[any, Function]} - [storedValue, setValue]
 */
export const useLocalStorage = (key, initialValue) => {
  // State initialization function (runs once on mount)
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        const parsed = JSON.parse(item);
        if (Array.isArray(parsed)) {
          // Remove built-in demo tasks if stored from previous versions
          return parsed.filter((t) => !DEMO_TASK_IDS.has(t?.id));
        }
      }
      return typeof initialValue === 'function' ? initialValue() : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return typeof initialValue === 'function' ? initialValue() : initialValue;
    }
  });

  // Sync to localStorage whenever key or storedValue changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};
