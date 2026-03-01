/**
 *
 */
export const ACCOUNT_TEXTS = {
  avatar: {
    alt: (name: string) => `Avatar de ${name}`,
  },

  logout: {
    action: "Sair",
    loading: "Encerrando sessão...",
    success: "Sessão encerrada com sucesso!",
    error: "Erro ao fazer logout!",
  },
} as const
