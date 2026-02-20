-- Migration: Create clients table
-- Story: 1.2 - Schema DB fondation + Auth duale

CREATE TABLE public.clients (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  phone text,
  first_name text,
  last_name text,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

-- Temporary RLS policies (Story 1.3 will refine)
CREATE POLICY select_clients_own ON public.clients
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY update_clients_own ON public.clients
  FOR UPDATE USING (auth.uid() = id);

-- NOTE: Admin read policy (select_clients_admin) is created in 20260220100001
-- after admin_users table exists.

-- Index for email lookups
CREATE INDEX idx_clients_email ON public.clients(email);

COMMENT ON TABLE public.clients IS 'Client profiles linked to auth.users via magic link';
