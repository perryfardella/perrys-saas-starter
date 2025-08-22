import { Provider } from "@supabase/supabase-js";
import { SocialLink } from "./types";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa6";

// Set the name of your app here
export const appName = "Perry's SaaS Starter";

// Enable or disable magic link authentication
// Set to true to show magic link options in sign-in and sign-up forms
export const enableMagicLinks = true;

// Edit this list to add or remove social auth providers from sign-in and sign-up pages
// These are all the providers that are supported by Supabase
export const socialAuthProviders: Provider[] = [
  // "apple",
  // "azure",
  // "bitbucket",
  // "discord",
  // "facebook",
  // "figma",
  "github",
  // "gitlab",
  "google",
  // "kakao",
  // "keycloak",
  // "linkedin",
  // "linkedin_oidc",
  // "notion",
  // "slack",
  // "slack_oidc",
  // "spotify",
  // "twitch",
  "twitter",
  // "workos",
  // "zoom",
  // "fly",
];

// Your social links, these are used in the footer component
// But you can also use them in your app where required, for example in the header component
export const socialLinks: SocialLink[] = [
  {
    name: "Twitter",
    href: "https://x.com/perryfardella",
    icon: FaTwitter,
    ariaLabel: "Twitter",
  },
  {
    name: "GitHub",
    href: "https://github.com/perryfardella",
    icon: FaGithub,
    ariaLabel: "GitHub",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/perry-fardella/",
    icon: FaLinkedin,
    ariaLabel: "LinkedIn",
  },
];
