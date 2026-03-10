import { disabled } from "node_modules/@base-ui/react/esm/utils/reason-parts"

/**
 * Textos relacionados às lanchonetes.
 */
export const CAFETERIA_TEXTS = {
  actions: {
    add: "Adicionar Lanchonete",
    edit: "Editar Lanchonete",
    delete: "Excluir Lanchonete",

    view: "Ver Lanchonete",

    disable: {
      title: "Desativar Lanchonete",
      description: "Tem certeza de que deseja desativar esta lanchonete? Ela não ficará mais disponível para os clientes, mas você poderá reativá-la a qualquer momento.",
    },
    enable: {
      title: "Ativar Lanchonete",
      description: "Tem certeza de que deseja ativar esta lanchonete? Ela ficará disponível para os clientes e poderá receber pedidos normalmente.",
    },
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
    getDetails: {
      title: "Erro ao carregar lanchonete.",
      fallback: "Não foi possível carregar os dados da lanchonete. Tente novamente mais tarde.",
    },
    notFound: {
      title: "Lanchonete não encontrada",
      description: ["A lanchonete que você está tentando acessar não existe ou foi removida.", "Verifique se o link está correto ou volte para a lista de lanchonetes."],
      action: "Voltar para a lista",
    },

    enabled: {
      title: "Erro ao ativar lanchonete.",
      fallback: "Não foi possível ativar a lanchonete. Tente novamente mais tarde.",
    },
    disabled: {
      title: "Erro ao desativar lanchonete.",
      fallback: "Não foi possível desativar a lanchonete. Tente novamente mais tarde.",
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
    enable: "Ativando lanchonete...",
    disable: "Desativando lanchonete...",
  },

  management: "Gerenciar Lanchonetes",

  quant: {
    cafeterias: (quant: number) => `${quant} ${quant === 1 ? "lanchonete" : "lanchonetes"}`,
    menuItems: (quant: number) => `${quant} ${quant === 1 ? "item" : "itens"}`,
    employees: (quant: number) => `${quant} ${quant === 1 ? "funcionário" : "funcionários"}`,
  },

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
