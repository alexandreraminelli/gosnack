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

  validation: {
    firstName: {
      required: "O primeiro nome é obrigatório.",
    },
    lastName: {
      required: "O sobrenome é obrigatório.",
    },
    email: {
      required: "O e-mail é obrigatório.",
      invalid: "Forneça um e-mail válido.",
    },
    password: {
      required: "A senha é obrigatória.",
      length: "A senha deve ter pelo menos 8 caracteres.",
      upperCase: "A senha deve conter pelo menos uma letra maiúscula.",
      lowerCase: "A senha deve conter pelo menos uma letra minúscula.",
      number: "A senha deve conter pelo menos um número.",
      specialChar: "A senha deve conter pelo menos um caractere especial.",
    },
    role: {
      required: "Selecione um tipo de usuário.",
    },
  },
} as const
