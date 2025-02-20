// /utils/slug.js

/**
 * Generate a unique slug using crypto.randomUUID if available,
 * otherwise fall back to Date.now with a random number.
 * @param {string} prefix - A prefix for the slug.
 * @returns {string} - The generated slug.
 */
export function generateUniqueSlug(prefix = 'item') {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return `${prefix}-${crypto.randomUUID()}`
    }
    return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`
  }
  