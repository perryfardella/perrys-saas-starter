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

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [useMagicLink, setUseMagicLink] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/protected`,
        },
      });
      if (error) throw error;
      router.push("/auth/sign-up-success");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMagicLinkSignUp = async (e: React.FormEvent) => {
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
                the link in your email to create your account and sign in.
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
          <CardTitle className="text-2xl">Sign up</CardTitle>
          <CardDescription>
            {enableMagicLinks && useMagicLink
              ? "Enter your email to receive a magic link"
              : "Create a new account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={
              enableMagicLinks && useMagicLink
                ? handleMagicLinkSignUp
                : handleSignUp
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
                <>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="repeat-password">Repeat Password</Label>
                    </div>
                    <Input
                      id="repeat-password"
                      type="password"
                      required
                      value={repeatPassword}
                      onChange={(e) => setRepeatPassword(e.target.value)}
                    />
                  </div>
                </>
              )}

              {error && <p className="text-sm text-red-500">{error}</p>}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading
                  ? enableMagicLinks && useMagicLink
                    ? "Sending magic link..."
                    : "Creating account..."
                  : enableMagicLinks && useMagicLink
                  ? "Send magic link"
                  : "Sign up"}
              </Button>

              {enableMagicLinks && (
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setUseMagicLink(!useMagicLink);
                      setError(null);
                      setPassword("");
                      setRepeatPassword("");
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
              Already have an account?{" "}
              <Link
                href="/auth/sign-in"
                className="underline underline-offset-4"
              >
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
