/**
 * Função para obter as variáveis de ambiente do `.env.local`.
 * Se a variável não estiver definida, retorna uma exceção.
 */
function getEnv(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

/**
 * Variáveis de ambiente do projeto.
 */
const appEnvs = {
  /** Variáveis de ambiente do Supabase. */
  supabase: {
    url: getEnv("NEXT_PUBLIC_SUPABASE_URL"),
    publishableKey: getEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"),
  },
} as const;

export default appEnvs;
