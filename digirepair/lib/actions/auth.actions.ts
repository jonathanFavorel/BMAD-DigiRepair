"use server";

import { createClient } from "@/lib/supabase/server";
import { adminLoginSchema, magicLinkSchema } from "@/lib/validations/auth.schema";
import type { ActionResult } from "@/types/app.types";

export async function signInAdmin(formData: FormData): Promise<ActionResult<{ redirectTo: string }>> {
  const raw = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const parsed = adminLoginSchema.safeParse(raw);
  if (!parsed.success) {
    return { data: null, error: parsed.error.issues[0].message };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    return { data: null, error: "Email ou mot de passe incorrect" };
  }

  // Verify user is actually an admin
  const { data: adminUser } = await supabase
    .from("admin_users")
    .select("id")
    .single();

  if (!adminUser) {
    await supabase.auth.signOut();
    return { data: null, error: "Accès non autorisé" };
  }

  return { data: { redirectTo: "/dashboard" }, error: null };
}

export async function signInClient(formData: FormData): Promise<ActionResult<{ message: string }>> {
  const raw = { email: formData.get("email") };

  const parsed = magicLinkSchema.safeParse(raw);
  if (!parsed.success) {
    return { data: null, error: parsed.error.issues[0].message };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithOtp({
    email: parsed.data.email,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/auth/confirm?next=/suivi`,
    },
  });

  if (error) {
    return { data: null, error: "Erreur lors de l'envoi du lien. Réessayez." };
  }

  return { data: { message: "Vérifiez votre boîte email pour le lien de connexion." }, error: null };
}

export async function signOut(): Promise<ActionResult<null>> {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return { data: null, error: "Erreur lors de la déconnexion" };
  }

  return { data: null, error: null };
}
