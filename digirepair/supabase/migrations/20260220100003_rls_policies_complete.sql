-- Migration: Complete RLS policies for clients and admin_users
-- Story: 1.3 - RLS Policies & Isolation données
-- Completes the temporary policies from Story 1.2
-- SYNC: Test mirrors in lib/supabase/rls-test-helpers.ts — keep in sync

-- =============================================
-- CLIENTS TABLE — Additional admin policies
-- =============================================

-- Admin can update any client
CREATE POLICY update_clients_admin ON public.clients
  FOR UPDATE USING (
    auth.uid() IN (SELECT id FROM public.admin_users)
  );

-- Admin can delete any client
CREATE POLICY delete_clients_admin ON public.clients
  FOR DELETE USING (
    auth.uid() IN (SELECT id FROM public.admin_users)
  );

-- NOTE: No INSERT policy on clients — the trigger handle_new_user()
-- uses SECURITY DEFINER to bypass RLS for auto-creation on signup.

-- =============================================
-- ADMIN_USERS TABLE — Full admin CRUD policies
-- =============================================

-- Admin can insert new admin users
-- NOTE: Bootstrap — the first admin must be created via Supabase Dashboard
-- (Auth > Users + manual INSERT), which uses service_role key and bypasses RLS.
CREATE POLICY insert_admin_users_admin ON public.admin_users
  FOR INSERT WITH CHECK (
    auth.uid() IN (SELECT id FROM public.admin_users)
  );

-- Admin can update admin users
CREATE POLICY update_admin_users_admin ON public.admin_users
  FOR UPDATE USING (
    auth.uid() IN (SELECT id FROM public.admin_users)
  );

-- Admin can delete admin users
CREATE POLICY delete_admin_users_admin ON public.admin_users
  FOR DELETE USING (
    auth.uid() IN (SELECT id FROM public.admin_users)
  );

-- =============================================
-- POLICY SUMMARY (all tables)
-- =============================================
-- clients:
--   SELECT: own row (auth.uid() = id) + admin (all)
--   UPDATE: own row (auth.uid() = id) + admin (all)
--   DELETE: admin only
--   INSERT: via trigger SECURITY DEFINER (no policy needed)
--
-- admin_users:
--   SELECT: admin only
--   INSERT: admin only
--   UPDATE: admin only
--   DELETE: admin only
--   Anonymous/non-admin: 0 rows returned (no matching policy)
