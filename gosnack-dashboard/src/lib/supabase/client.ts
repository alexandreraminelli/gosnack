import env from "@/lib/env"
import { createBrowserClient } from "@supabase/ssr"

/**
 * Criar e configurar o cliente do Supabase para uso a partir dos
 * componentes clientes.
 */
export function createClient() {
  return createBrowserClient(env.supabase.url, env.supabase.publishableKey)
}
