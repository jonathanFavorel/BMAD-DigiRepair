/**
 * RLS Test Helpers — Reusable utilities for testing Row Level Security policies.
 *
 * These helpers simulate Supabase client behavior with mocked RLS policy logic,
 * allowing unit-level verification of access control patterns without a live DB.
 *
 * Pattern: Each table has a `createMockTable<T>()` that accepts data rows and
 * returns query functions filtered by the simulated user's role and ID.
 */

type RlsPolicy<T> = {
  action: "SELECT" | "INSERT" | "UPDATE" | "DELETE";
  check: (row: T, userId: string | null, isAdmin: boolean) => boolean;
};

type MockTableOptions<T> = {
  rows: T[];
  policies: RlsPolicy<T>[];
};

/**
 * Creates a mock table with RLS policy simulation.
 * Queries against this table are filtered through the provided policies.
 */
export function createMockTable<T extends Record<string, unknown>>(
  options: MockTableOptions<T>,
) {
  const { rows, policies } = options;

  return {
    select(userId: string | null, isAdmin: boolean): T[] {
      const selectPolicies = policies.filter((p) => p.action === "SELECT");
      if (selectPolicies.length === 0) return [];
      // OR logic: if ANY policy allows, row is returned
      return rows.filter((row) =>
        selectPolicies.some((p) => p.check(row, userId, isAdmin)),
      );
    },

    canUpdate(
      row: T,
      userId: string | null,
      isAdmin: boolean,
    ): boolean {
      const updatePolicies = policies.filter((p) => p.action === "UPDATE");
      return updatePolicies.some((p) => p.check(row, userId, isAdmin));
    },

    canDelete(
      row: T,
      userId: string | null,
      isAdmin: boolean,
    ): boolean {
      const deletePolicies = policies.filter((p) => p.action === "DELETE");
      return deletePolicies.some((p) => p.check(row, userId, isAdmin));
    },

    canInsert(
      row: T,
      userId: string | null,
      isAdmin: boolean,
    ): boolean {
      const insertPolicies = policies.filter((p) => p.action === "INSERT");
      return insertPolicies.some((p) => p.check(row, userId, isAdmin));
    },
  };
}

// =============================================
// Pre-built policy sets for DigiRepair tables
// =============================================

type ClientRow = {
  id: string;
  email: string;
  phone: string | null;
  first_name: string | null;
  last_name: string | null;
  created_at: string;
};

type AdminUserRow = {
  id: string;
  email: string;
  role: string;
  created_at: string;
};

/**
 * RLS policies for the `clients` table as defined in migrations 000, 001, 003.
 * SYNC: These must mirror the SQL policies exactly. If you change a migration,
 * update these definitions and vice versa.
 */
export const clientsPolicies: RlsPolicy<ClientRow>[] = [
  // select_clients_own: client sees own row
  { action: "SELECT", check: (row, userId) => userId === row.id },
  // select_clients_admin: admin sees all
  { action: "SELECT", check: (_row, _userId, isAdmin) => isAdmin },
  // update_clients_own: client updates own row
  { action: "UPDATE", check: (row, userId) => userId === row.id },
  // update_clients_admin: admin updates all
  { action: "UPDATE", check: (_row, _userId, isAdmin) => isAdmin },
  // delete_clients_admin: admin deletes
  { action: "DELETE", check: (_row, _userId, isAdmin) => isAdmin },
  // No INSERT policy — trigger handles it
];

/**
 * RLS policies for the `admin_users` table as defined in migrations 001, 003.
 * SYNC: These must mirror the SQL policies exactly. If you change a migration,
 * update these definitions and vice versa.
 */
export const adminUsersPolicies: RlsPolicy<AdminUserRow>[] = [
  // select_admin_users_admin: admin sees admin_users
  { action: "SELECT", check: (_row, _userId, isAdmin) => isAdmin },
  // insert_admin_users_admin
  { action: "INSERT", check: (_row, _userId, isAdmin) => isAdmin },
  // update_admin_users_admin
  { action: "UPDATE", check: (_row, _userId, isAdmin) => isAdmin },
  // delete_admin_users_admin
  { action: "DELETE", check: (_row, _userId, isAdmin) => isAdmin },
];

export type { ClientRow, AdminUserRow, RlsPolicy, MockTableOptions };
