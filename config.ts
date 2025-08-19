import { Provider } from "@supabase/supabase-js";

// Edit this list to add or remove social auth providers from sign-in and sign-up pages
// Check the Supabase Provider type for all possible values
export const socialAuthProviders: Provider[] = ["github", "google", "discord"];
