/**
 * DigiRepair application-wide types.
 * Database types are auto-generated via `npm run gen:types`.
 */

/**
 * Standard response pattern for all Server Actions.
 * Inspired by Supabase's own {data, error} pattern.
 */
export type ActionResult<T> = {
  data: T | null;
  error: string | null;
};
