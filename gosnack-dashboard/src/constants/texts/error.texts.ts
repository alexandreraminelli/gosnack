/**
 * Textos para mensagens de erro.
 */
export const ERROR_TEXTS = {
  invalidLink: {
    title: "Link inválido ou expirado.",
    description: "O link que você está tentando usar é inválido ou já expirou. Por favor, solicite um novo link para redefinir sua senha.",
  },

  notFound: {
    title: "Ops! Página Não Encontrada",
    description: ["A página que você está procurando não existe ou foi movida.", "Verifique o endereço e tente novamente."],
  },

  resourceNotFound: {
    title: "Não Encontrado",
  },
} as const
