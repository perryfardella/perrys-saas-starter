"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Provider } from "@supabase/supabase-js";
import { socialAuthProviders } from "@/config";

type LoadingState = "idle" | Provider;

interface SocialAuthButtonsProps {
  redirectTo?: string;
  onError?: (error: string) => void;
  disabled?: boolean;
}

export function SocialAuthButtons({
  redirectTo = "/protected",
  onError,
  disabled = false,
}: SocialAuthButtonsProps) {
  const [loadingState, setLoadingState] = useState<LoadingState>("idle");

  if (!socialAuthProviders || socialAuthProviders.length === 0) {
    return null;
  }

  const handleSocialLogin = async (provider: Provider) => {
    const supabase = createClient();
    setLoadingState(provider as LoadingState);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider as Provider,
        options: {
          redirectTo: `${window.location.origin}/auth/oauth?next=${redirectTo}`,
        },
      });

      if (error) throw error;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      if (onError) {
        onError(errorMessage);
      }
      setLoadingState("idle");
    }
  };

  const isLoading = loadingState !== "idle";

  const buttons = socialAuthProviders.map((provider) => (
    <Button
      key={provider}
      type="button"
      variant="outline"
      className="w-full"
      disabled={disabled || isLoading}
      onClick={() => handleSocialLogin(provider)}
    >
      {loadingState === provider
        ? `Connecting to ${provider}...`
        : `Continue with ${provider}`}
    </Button>
  ));

  return (
    <>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3">{buttons}</div>
    </>
  );
}
