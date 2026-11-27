/**
 * Função para obter as variáveis de ambiente do `.env.local`.
 *
 * Garante que a variável de ambiente esteja definida. Se não estiver, retorna uma exceção.
 */
function requiredEnv(name: string, value?: string): string {
  // Obtém o valor da variável de ambiente
  const trimmed = value?.trim();

  // Se a variável de ambiente não estiver definida, lança uma exceção
  if (!trimmed) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return trimmed;
}

/**
 * Variáveis de ambiente do projeto.
 */
const appEnvs = {
  /** URL da aplicação. */
  appUrl: requiredEnv("NEXT_PUBLIC_APP_URL", process.env.NEXT_PUBLIC_APP_URL),

  /** Variáveis de ambiente do Supabase. */
  supabase: {
    url: requiredEnv("NEXT_PUBLIC_SUPABASE_URL", process.env.NEXT_PUBLIC_SUPABASE_URL),
    publishableKey: requiredEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY", process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY),
  },
} as const;

export default appEnvs;
