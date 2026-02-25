/**
 * Obter e armazenar as variáveis de ambiente para uso em toda a aplicação.
 */
const env = {
  /** Variáveis de ambiente do Supabase. */
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    publishableKey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "",
    anonKey: process.env.NEXT_SUPABASE_ANON_KEY || "",
  },
} as const
export default env
