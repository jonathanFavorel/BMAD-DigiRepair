"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInClient } from "@/lib/actions/auth.actions";
import { useState, useTransition } from "react";

export default function MagicLinkPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    setError(null);
    setSuccess(null);
    startTransition(async () => {
      const result = await signInClient(formData);
      if (result.error) {
        setError(result.error);
      } else if (result.data) {
        setSuccess(result.data.message);
      }
    });
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Espace Client</CardTitle>
              <CardDescription>
                Entrez votre email pour recevoir un lien de connexion
              </CardDescription>
            </CardHeader>
            <CardContent>
              {success ? (
                <div className="rounded-md bg-muted p-4 text-sm text-foreground">
                  {success}
                </div>
              ) : (
                <form action={handleSubmit}>
                  <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="votre@email.com"
                        required
                      />
                    </div>
                    {error && <p className="text-sm text-destructive">{error}</p>}
                    <Button type="submit" className="w-full" disabled={isPending}>
                      {isPending ? "Envoi en cours..." : "Recevoir le lien"}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
