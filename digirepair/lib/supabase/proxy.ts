import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { hasEnvVars } from "../utils";
import { isAdmin } from "./helpers";

// Route classification helpers
function isPublicRoute(pathname: string): boolean {
  return (
    pathname === "/" ||
    pathname.startsWith("/auth") ||
    // (vitrine) routes are public — Next.js strips route group names from URLs
    // These are matched by exclusion: not /dashboard, /dossiers, /facturation, /referentiel, /suivi
    pathname.startsWith("/blog") ||
    pathname.startsWith("/faq") ||
    pathname.startsWith("/contact") ||
    pathname.startsWith("/mentions-legales")
  );
}

function isAdminRoute(pathname: string): boolean {
  return (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/dossiers") ||
    pathname.startsWith("/facturation") ||
    pathname.startsWith("/referentiel")
  );
}

function isClientSuiviRoute(pathname: string): boolean {
  return pathname.startsWith("/suivi");
}

function isDevisTokenRoute(pathname: string): boolean {
  // /devis/[quoteToken] — accessible without auth
  return pathname.startsWith("/devis/");
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  if (!hasEnvVars) {
    return supabaseResponse;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // IMPORTANT: Do not run code between createServerClient and getClaims().
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;
  const pathname = request.nextUrl.pathname;

  // 1. Public routes — always pass through
  if (isPublicRoute(pathname)) {
    return supabaseResponse;
  }

  // 2. Devis token routes — no auth required (UUID token is enough)
  if (isDevisTokenRoute(pathname)) {
    return supabaseResponse;
  }

  // 3. Admin routes — require authenticated user + admin_users check
  if (isAdminRoute(pathname)) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = "/auth/login";
      return NextResponse.redirect(url);
    }

    // Check admin_users table (uses RLS — only admins can read)
    const adminCheck = await isAdmin(supabase);

    if (!adminCheck) {
      const url = request.nextUrl.clone();
      url.pathname = "/auth/login";
      return NextResponse.redirect(url);
    }

    return supabaseResponse;
  }

  // 4. Client suivi routes — require magic link auth
  if (isClientSuiviRoute(pathname)) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = "/auth/magic-link";
      return NextResponse.redirect(url);
    }
    return supabaseResponse;
  }

  // 5. SEO/ville routes — public (catch-all for dynamic SEO pages)
  // Any route not matched above is assumed public (ville pages, etc.)
  return supabaseResponse;
}
