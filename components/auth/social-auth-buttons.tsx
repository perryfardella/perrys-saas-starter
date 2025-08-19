"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Provider } from "@supabase/supabase-js";
import { socialAuthProviders } from "@/config";

import type { IconType } from "react-icons";
import {
  FaGoogle,
  FaGithub,
  FaDiscord,
  FaApple,
  FaBitbucket,
  FaFacebook,
  FaFigma,
  FaGitlab,
  FaLinkedin,
  FaSlack,
  FaSpotify,
  FaTwitch,
  FaTwitter,
  FaMicrosoft,
} from "react-icons/fa6";
import { RiKakaoTalkFill, RiNotionFill } from "react-icons/ri";
import { SiKeycloak, SiZoom } from "react-icons/si";
import { TbAirBalloon } from "react-icons/tb";
import { BsChevronExpand } from "react-icons/bs";

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

  // Map the provider to the lucide icon name
  const providerToIcon = new Map<Provider, IconType>([
    ["apple", FaApple],
    ["azure", FaMicrosoft],
    ["bitbucket", FaBitbucket],
    ["discord", FaDiscord],
    ["facebook", FaFacebook],
    ["figma", FaFigma],
    ["github", FaGithub],
    ["gitlab", FaGitlab],
    ["google", FaGoogle],
    ["kakao", RiKakaoTalkFill],
    ["keycloak", SiKeycloak],
    ["linkedin", FaLinkedin],
    ["linkedin_oidc", FaLinkedin],
    ["notion", RiNotionFill],
    ["slack", FaSlack],
    ["slack_oidc", FaSlack],
    ["spotify", FaSpotify],
    ["twitch", FaTwitch],
    ["twitter", FaTwitter],
    ["workos", BsChevronExpand],
    ["zoom", SiZoom],
    ["fly", TbAirBalloon],
  ]);

  const providerDisplayNames: Record<Provider, string> = {
    apple: "Apple",
    azure: "Azure",
    bitbucket: "Bitbucket",
    discord: "Discord",
    facebook: "Facebook",
    figma: "Figma",
    github: "GitHub",
    gitlab: "GitLab",
    google: "Google",
    kakao: "Kakao",
    keycloak: "Keycloak",
    linkedin: "LinkedIn",
    linkedin_oidc: "LinkedIn OIDC",
    notion: "Notion",
    slack: "Slack",
    slack_oidc: "Slack OIDC",
    spotify: "Spotify",
    twitch: "Twitch",
    twitter: "Twitter",
    workos: "WorkOS",
    zoom: "Zoom",
    fly: "Fly",
  };

  const isLoading = loadingState !== "idle";

  const buttons = socialAuthProviders.map((provider) => {
    const IconComponent = providerToIcon.get(provider);

    return (
      <Button
        key={provider}
        type="button"
        variant="outline"
        className="w-full"
        disabled={disabled || isLoading}
        onClick={() => handleSocialLogin(provider)}
      >
        {IconComponent ? <IconComponent className="mr-2 h-4 w-4" /> : null}
        {loadingState === provider
          ? `Connecting to ${providerDisplayNames[provider]}...`
          : `Continue with ${providerDisplayNames[provider]}`}
      </Button>
    );
  });

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
