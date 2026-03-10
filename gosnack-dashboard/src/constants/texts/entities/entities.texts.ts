/**
 * Textos relacionados às entidades do sistema.
 */
export const ENTITIES_TEXTS = {
  commonAttributes: {
    id: "ID",

    status: {
      enabled: "Ativado",
      enable: "Ativar",

      disabled: "Desativado",
      disable: "Desativar",
    },
  },

  cafeteria: {
    singular: "Lanchonete",
    plural: "Lanchonetes",
  },

  category: {
    singular: "Categoria",
    plural: "Categorias",
  },

  menu: "Cardápio",

  order: {
    singular: "Pedido",
    plural: "Pedidos",
  },

  product: {
    singular: "Produto",
    plural: "Produtos",
  },

  unit: {
    singular: "Unidade",
    plural: "Unidades",
  },

  user: {
    singular: "Usuário",
    plural: "Usuários",
  },

  roles: {
    admin: {
      singular: "Administrador",
      plural: "Administradores",
    },
    manager: {
      singular: "Gerente",
      plural: "Gerentes",
    },
    employee: {
      singular: "Funcionário",
      plural: "Funcionários",
    },
    customer: {
      singular: "Cliente",
      plural: "Clientes",
    },
  },
} as const
