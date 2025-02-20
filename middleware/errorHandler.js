// /middleware/errorHandler.js

/**
 * Wrap an API handler with error handling.
 * @param {Function} handler - The Next.js API route handler.
 * @returns {Function} - The wrapped handler.
 */
export function withErrorHandler(handler) {
    return async (req, res) => {
      try {
        await handler(req, res)
      } catch (error) {
        console.error('API Error:', error)
        res.status(500).json({ error: error.message || 'Internal server error' })
      }
    }
  }
  