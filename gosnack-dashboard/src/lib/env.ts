/**
 * Obter e armazenar as variáveis de ambiente para uso em toda a aplicação.
 */
const env = {
  /** URL pública do aplicativo. */
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "",

  /** Variáveis de ambiente do Supabase. */
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    publishableKey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "",
    anonKey: process.env.NEXT_SUPABASE_ANON_KEY || "",
    serviceRoleKey: process.env.NEXT_SUPABASE_SERVICE_ROLE_KEY || "",
  },

  /** E-mails de teste com acesso irrestrito. */
  devEmails: process.env.DEV_EMAILS?.split(",") ?? [],
} as const
export default env
