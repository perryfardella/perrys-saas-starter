"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { enableMagicLinks } from "@/config/config";

interface MagicLinkButtonProps {
  email: string;
  redirectTo?: string;
  onError?: (error: string) => void;
  disabled?: boolean;
}

export function MagicLinkButton({
  email,
  redirectTo = "/dashboard",
  onError,
  disabled = false,
}: MagicLinkButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [linkSent, setLinkSent] = useState(false);

  if (!enableMagicLinks) {
    return null;
  }

  const handleMagicLink = async () => {
    if (!email) {
      onError?.("Please enter your email first");
      return;
    }

    const supabase = createClient();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/confirm?next=${redirectTo}`,
        },
      });
      if (error) throw error;
      setLinkSent(true);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or use magic link
          </span>
        </div>
      </div>

      {linkSent ? (
        <div className="text-center p-4 border border-green-200 bg-green-50 rounded-lg">
          <p className="text-sm text-green-800 mb-2">
            Magic link sent to <strong>{email}</strong>
          </p>
          <p className="text-xs text-green-600 mb-3">
            Check your email and click the link to sign in
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setLinkSent(false)}
            className="text-green-700 border-green-300 hover:bg-green-100"
          >
            Send another link
          </Button>
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          className="w-full"
          disabled={disabled || isLoading}
          onClick={handleMagicLink}
        >
          {isLoading ? "Sending magic link..." : "Send magic link"}
        </Button>
      )}
    </>
  );
}
