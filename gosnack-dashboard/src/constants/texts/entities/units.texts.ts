/**
 * Textos relacionados às unidades.
 */
export const UNITS_TEXTS = {
  actions: {
    add: "Adicionar Unidade",
  },

  empty: {
    title: "Nenhuma unidade encontrada",
    description: ["Ainda não há unidades escolares cadastradas no sistema.", "Clique no botão abaixo para adicionar a primeira unidade."],
  },

  error: {
    create: {
      title: "Erro ao criar unidade",
      description: "Não foi possível criar uma nova unidade. Por favor, tente novamente mais tarde.",
    },
    duplicateName: {
      title: "Nome já utilizado",
      description: "Já existe uma unidade com esse nome. Escolha um nome diferente.",
    },
    getList: {
      title: "Erro ao carregar unidades",
    },
    notFound: {
      title: "Unidade Não Encontrada",
    },
  },

  fields: {
    name: "Nome da Unidade",
  },

  loading: {
    creating: "Criando unidade...",
    saving: "Salvando unidade...",
    deleting: "Excluindo unidade...",
  },

  managerUnits: "Gerenciar Unidades",

  quant: (count: number) => `${count} unidade${count !== 1 ? "s" : ""}`,

  success: {
    create: {
      title: "Unidade criada",
      description: (name: string) => `A unidade "${name}" foi criada com sucesso`,
    },
  },

  validation: {
    name: {
      required: "O nome da unidade é obrigatório.",
    },
  },
} as const
