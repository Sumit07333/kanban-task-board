/**
 * Kanban Task Board - Helper Utilities
 * Contains pure functions for ID generation, date formatting, title sanitization, and column transition logic.
 */

/**
 * Generates a unique task identifier.
 * @returns {string} Unique task ID string.
 */
export const generateUniqueId = () => {
  const timestamp = Date.now();
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  return `task-${timestamp}-${randomSuffix}`;
};

/**
 * Sanitizes input text by trimming whitespace.
 * @param {string} text 
 * @returns {string}
 */
export const sanitizeTitle = (text) => {
  if (typeof text !== 'string') return '';
  return text.trim();
};

/**
 * Formats timestamp into readable relative or concise date.
 * @param {number} timestamp 
 * @returns {string}
 */
export const formatDate = (timestamp) => {
  if (!timestamp) return 'Just now';
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Calculates next forward status according to sprint rules:
 * To Do -> In Progress -> Done
 * @param {string} currentStatus 
 * @returns {string|null}
 */
export const getNextStatus = (currentStatus) => {
  if (currentStatus === 'todo') return 'in_progress';
  if (currentStatus === 'in_progress') return 'done';
  return null;
};

/**
 * Calculates previous status according to sprint rules:
 * Done -> In Progress -> To Do
 * @param {string} currentStatus 
 * @returns {string|null}
 */
export const getPreviousStatus = (currentStatus) => {
  if (currentStatus === 'done') return 'in_progress';
  if (currentStatus === 'in_progress') return 'todo';
  return null;
};
