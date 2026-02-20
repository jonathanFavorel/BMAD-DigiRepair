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

/**
 * Client profile type — mirrors public.clients table.
 * Will be replaced by auto-generated types once `npm run gen:types` works.
 */
export type Client = {
  id: string;
  email: string;
  phone: string | null;
  first_name: string | null;
  last_name: string | null;
  created_at: string;
};

/**
 * Admin user type — mirrors public.admin_users table.
 * Will be replaced by auto-generated types once `npm run gen:types` works.
 */
export type AdminUser = {
  id: string;
  email: string;
  role: string;
  created_at: string;
};
