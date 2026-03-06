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

  error: {
    create: "Não foi possível criar a lanchonete.",
    update: "Não foi possível salvar as alterações da lanchonete.",

    getAll: "Não foi possível carregar as lanchonetes.",
    duplicateName: "Já existe uma lanchonete com este nome nessa unidade.",
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
      weekdays: "Segunda a Sexta",
      saturday: "Sábado",
    },
  },

  management: "Gerenciar Lanchonetes",

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
  },
} as const
