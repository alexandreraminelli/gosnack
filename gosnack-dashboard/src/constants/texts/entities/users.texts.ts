import { APP_CONFIG } from "@/config/app.config"

/**
 * Textos para gerenciamento de usuários.
 */
export const USERS_TEXTS = {
  actions: {
    create: "Adicionar Usuário",

    editRole: {
      label: "Editar Tipo",
      title: "Editar Tipo de Usuário",
    },

    disable: {
      label: "Desativar",
      title: "Desativar Usuário",
      description: "O usuário perderá o acesso ao sistema. Você poderá reativá-lo a qualquer momento.",
    },
    enable: {
      label: "Ativar",
      title: "Ativar Usuário",
      description: "O usuário voltará a ter acesso ao sistema.",
    },

    view: "Ver Usuário",
  },

  empty: {
    title: "Nenhum usuário encontrado",
    description: "Ainda não há usuários cadastrados no sistema.",
  },

  error: {
    getAll: {
      title: "Erro ao carregar usuários",
      description: "Não foi possível carregar a lista de usuários. Tente novamente mais tarde.",
    },
    create: {
      title: "Erro ao criar usuário",
      fallback: "Não foi possível criar o usuário. Tente novamente mais tarde.",
    },
    updateRole: {
      title: "Erro ao atualizar tipo",
      description: "Não foi possível atualizar o tipo do usuário. Tente novamente mais tarde.",
    },
    updateStatus: {
      title: "Erro ao atualizar status",
      description: "Não foi possível atualizar o status do usuário. Tente novamente mais tarde.",
    },

    duplicateEmail: {
      description: "Já existe um usuário com esse e-mail.",
    },
  },

  fields: {
    name: "Nome",
    firstName: "Primeiro Nome",
    lastName: "Sobrenome",
    email: "E-mail",
    password: "Senha",
    role: {
      label: "Tipo de Usuário",
      placeholder: "Selecione o tipo de usuário",
    },
    status: "Status",
  },

  loading: {
    creating: "Criando usuário...",
    updatingRole: "Atualizando tipo...",
    activating: "Ativando usuário...",
    deactivating: "Desativando usuário...",
  },

  management: "Gerenciar Usuários",

  quant: (count: number) => `${count} usuário${count !== 1 ? "s" : ""} no sistema`,

  success: {
    created: {
      title: "Usuário criado",
      description: (name: string) => `Foi enviado um convite por e-mail para ${name} para criar uma senha e acessar o sistema.`,
    },
    enabled: {
      title: "Usuário ativado",
      description: (name: string) => `${name} voltou a ter acesso ao sistema.`,
    },
    disabled: {
      title: "Usuário desativado",
      description: (name: string) => `${name} perdeu o acesso ao sistema.`,
    },
  },

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
      domain: `É necessário usar um e-mail institucional (${APP_CONFIG.email.emailDomain}).`,
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
