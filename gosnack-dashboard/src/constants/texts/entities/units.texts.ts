/**
 * Textos relacionados às unidades.
 */
export const UNITS_TEXTS = {
  actions: {
    add: "Adicionar Unidade",

    editName: {
      label: "Editar Nome ",
      title: "Editar Nome da Unidade",
    },

    disable: {
      label: "Desabilitar",
      title: "Desabilitar Unidade",
      description: "A unidade ficará invisível para alunos e funcionários. As lanchonetes vinculadas também serão afetadas. Você poderá reativá-la a qualquer momento.",
    },
    enable: {
      label: "Habilitar",
      title: "Habilitar Unidade",
      description: "A unidade voltará a ficar visível para alunos e funcionários. As lanchonetes vinculadas precisarão ser reativadas manualmente.",
    },
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
      description: ["A unidade que você está tentando acessar não existe ou foi removida.", "Verifique se o ID da unidade está correto ou volte para a lista de unidades para selecionar outra."],
      action: "Voltar para a lista de unidades",
    },
    updateStatus: {
      title: "Erro ao atualizar status",
      description: "Não foi possível atualizar o status da unidade. Por favor, tente novamente mais tarde.",
    },
  },

  fields: {
    name: "Nome da Unidade",
  },

  loading: {
    creating: "Criando unidade...",
    saving: "Salvando unidade...",
    disabled: "Desabilitando unidade...",
    enabled: "Habilitando unidade...",
    deleting: "Excluindo unidade...",
  },

  managerUnits: "Gerenciar Unidades",

  quant: (count: number) => `${count} unidade${count !== 1 ? "s" : ""}`,

  success: {
    create: {
      title: "Unidade criada",
      description: (name: string) => `A unidade "${name}" foi criada com sucesso`,
    },
    disabled: {
      title: "Unidade desabilitada",
      description: (name: string) => `A unidade "${name}" foi desabilitada com sucesso`,
    },
    enabled: {
      title: "Unidade habilitada",
      description: (name: string) => `A unidade "${name}" foi habilitada com sucesso`,
    },
  },

  validation: {
    name: {
      required: "O nome da unidade é obrigatório.",
    },
  },
} as const
