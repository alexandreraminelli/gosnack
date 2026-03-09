/**
 * Textos relacionados às lanchonetes.
 */
export const CAFETERIA_TEXTS = {
  actions: {
    add: "Adicionar Lanchonete",
    edit: "Editar Lanchonete",
    delete: "Excluir Lanchonete",

    view: "Ver Lanchonete",
  },

  empty: {
    title: "Nenhuma lanchonete encontrada",
    description: ["Parece que ainda não há lanchonetes cadastradas no sistema.", "Clique no botão abaixo para adicionar a primeira lanchonete e começar a gerenciar os lanches disponíveis para os estudantes!"],
  },

  error: {
    create: {
      title: "Erro ao criar uma nova lanchonete.",
      fallback: "Não foi possível criar uma nova lanchonete. Tente novamente mais tarde.",
    },
    update: "Não foi possível salvar as alterações da lanchonete.",

    getAll: "Não foi possível carregar as lanchonetes.",
    duplicateName: {
      title: "Nome já utilizado",
      description: "Já existe uma lanchonete com este nome nessa unidade. Escolha um nome diferente.",
    },
  },

  fields: {
    unit: {
      label: "Unidade Escolar",
      placeholder: "Selecione a unidade escolar",
    },
    name: {
      label: "Nome da Lanchonete",
    },
    location: {
      label: "Localização",
      placeholder: "Ex: Bloco A, próximo à biblioteca",
    },
    openingHours: {
      label: "Horário de Funcionamento",
      weekday: "Segunda a Sexta",
      saturday: "Sábado",
      open: "Aberto",
      closed: "Fechado",
    },
  },

  loading: {
    create: "Criando lanchonete...",
  },

  management: "Gerenciar Lanchonetes",

  quant: (quant: number) => `${quant} ${quant === 1 ? "lanchonete" : "lanchonetes"}`,

  success: {
    create: {
      title: "Lanchonete Criada",
      description: (name: string) => `A lanchonete "${name}" foi criada com sucesso.`,
    },
    disabled: {
      title: "Lanchonete Desabilitada",
      description: (name: string) => `A lanchonete "${name}" foi desabilitada com sucesso.`,
    },
    enabled: {
      title: "Lanchonete Habilitada",
      description: (name: string) => `A lanchonete "${name}" foi habilitada com sucesso.`,
    },
  },

  validation: {
    unit: {
      required: "Selecione uma unidade.",
    },
    name: {
      required: "O nome da lanchonete é obrigatório.",
    },
    openingHours: {
      invalidRange: "Intervalo inválido.",
    },
  },
} as const
