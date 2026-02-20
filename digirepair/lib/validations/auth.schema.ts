import { z } from "zod";

export const adminLoginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
});

export const magicLinkSchema = z.object({
  email: z.string().email("Email invalide"),
});

export type AdminLoginInput = z.infer<typeof adminLoginSchema>;
export type MagicLinkInput = z.infer<typeof magicLinkSchema>;
