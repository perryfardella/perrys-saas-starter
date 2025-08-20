import { Provider } from "@supabase/supabase-js";

// Set the name of your app here
export const appName = "My App";

// Edit this list to add or remove social auth providers from sign-in and sign-up pages
// Check the Supabase Provider type for all possible values
export const socialAuthProviders: Provider[] = [
  "apple",
  "azure",
  "bitbucket",
  "discord",
  "facebook",
  "figma",
  "github",
  "gitlab",
  "google",
  "kakao",
  "keycloak",
  "linkedin",
  "linkedin_oidc",
  "notion",
  "slack",
  "slack_oidc",
  "spotify",
  "twitch",
  "twitter",
  "workos",
  "zoom",
  "fly",
];
