import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Check if the current authenticated user is an admin.
 * Queries the admin_users table to verify.
 */
export async function isAdmin(supabase: SupabaseClient): Promise<boolean> {
  const { data } = await supabase
    .from("admin_users")
    .select("id")
    .single();

  return !!data;
}
