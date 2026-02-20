-- Migration: Create admin_users table
-- Story: 1.2 - Schema DB fondation + Auth duale

CREATE TABLE public.admin_users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL UNIQUE,
  role text DEFAULT 'admin' NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Only admins can see admin_users
CREATE POLICY select_admin_users_admin ON public.admin_users
  FOR SELECT USING (
    auth.uid() IN (SELECT id FROM public.admin_users)
  );

-- Index for email lookups
CREATE INDEX idx_admin_users_email ON public.admin_users(email);

COMMENT ON TABLE public.admin_users IS 'Admin users with email/password auth for back-office access';

-- Admin can see all clients (deferred from 20260220100000 — needs admin_users to exist)
CREATE POLICY select_clients_admin ON public.clients
  FOR SELECT USING (
    auth.uid() IN (SELECT id FROM public.admin_users)
  );
