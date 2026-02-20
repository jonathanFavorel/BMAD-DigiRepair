import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

async function DashboardContent() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Dashboard DigiRepair</h1>
      <p className="mt-2 text-muted-foreground">
        Bienvenue dans le back-office. Connecté en tant que {user.email}.
      </p>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <Suspense fallback={<div className="p-8">Chargement...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
