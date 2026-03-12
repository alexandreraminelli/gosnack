/**
 * Textos para gerenciamento de usuários.
 */
export const USERS_TEXTS = {
  actions: {
    create: "Adicionar Usuário",
    update: "Editar Usuário",
    disable: "Desativar Usuário",
  },

  errors: {
    getAll: {
      title: "Erro ao Buscar Usuários",
      message: "Ocorreu um erro ao carregar a lista de usuários. Por favor, tente novamente mais tarde.",
    },
  },

  quant: (count: number) => `${count} usuário${count !== 1 ? "s" : ""} no sistema`,

  management: "Gerenciar Usuários",
} as const
