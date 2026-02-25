import env from "@/lib/env"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

/**
 * Criar e configurar o cliente do Supabase para uso a partir de componentes
 * de servidor, ações e servidor e manipulação de rotas.
 */
export async function createClient() {
  /** Objeto para acessar os cookies da requisição atual. */
  const cookieStore = await cookies()

  return createServerClient(env.supabase.url, env.supabase.publishableKey, {
    cookies: {
      /** Obtém todos os cookies. */
      getAll() {
        return cookieStore.getAll()
      },
      /** Define os cookies a serem enviados n */
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have proxy refreshing
          // user sessions.
        }
      },
    },
  })
}
