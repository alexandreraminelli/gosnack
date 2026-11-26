import appEnvs from "@/core/config/env";
import { createBrowserClient } from "@supabase/ssr";
import { SupabaseClient } from "@supabase/supabase-js";

/**
 * Cria um cliente Supabase para uso no lado do cliente.
 */
export function createClient(): SupabaseClient {
  return createBrowserClient(appEnvs.supabase.url, appEnvs.supabase.publishableKey);
}
