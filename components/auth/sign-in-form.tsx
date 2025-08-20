"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SocialAuthButtons } from "./social-auth-buttons";
import { enableMagicLinks } from "@/config";

export function SignInForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [useMagicLink, setUseMagicLink] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      router.push("/protected");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/confirm?next=/protected`,
        },
      });
      if (error) throw error;
      setMagicLinkSent(true);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (enableMagicLinks && magicLinkSent) {
    return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Check Your Email</CardTitle>
            <CardDescription>Magic link sent successfully</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                We&apos;ve sent a magic link to <strong>{email}</strong>. Click
                the link in your email to sign in.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setMagicLinkSent(false);
                  setUseMagicLink(false);
                  setEmail("");
                }}
              >
                Try again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sign in</CardTitle>
          <CardDescription>
            {enableMagicLinks && useMagicLink
              ? "Enter your email to receive a magic link"
              : "Enter your email below to sign in to your account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={
              enableMagicLinks && useMagicLink ? handleMagicLink : handleSignIn
            }
          >
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {!(enableMagicLinks && useMagicLink) && (
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="/auth/forgot-password"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              )}

              {error && <p className="text-sm text-red-500">{error}</p>}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading
                  ? enableMagicLinks && useMagicLink
                    ? "Sending magic link..."
                    : "Signing in..."
                  : enableMagicLinks && useMagicLink
                  ? "Send magic link"
                  : "Sign in"}
              </Button>

              {enableMagicLinks && (
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setUseMagicLink(!useMagicLink);
                      setError(null);
                      setPassword("");
                    }}
                    className="text-sm text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
                    disabled={isLoading}
                  >
                    {useMagicLink
                      ? "Use password instead"
                      : "Use magic link instead"}
                  </button>
                </div>
              )}
            </div>

            <SocialAuthButtons
              redirectTo="/protected"
              onError={setError}
              disabled={isLoading}
            />

            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/sign-up"
                className="underline underline-offset-4"
              >
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
