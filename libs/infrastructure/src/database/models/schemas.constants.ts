/**
 * Schemas
 */
export const DB_SCHEMAS = Object.freeze({
  PUBLIC: 'public',
  INFO: process.env.NODE_ENV === 'test' ? undefined : 'info',
});
