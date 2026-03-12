/**
 * Caminhos das rotas da aplicação.
 */
export const ROUTES = {
  // Autenticação
  login: "/login",
  forgotPassword: "/recuperar-senha",

  // Visão Geral
  home: "/",

  // Unidades
  units: {
    list: "/unidades",
    details: (unitId: string) => `unidades/${unitId}`,
  },

  // Lanchonetes
  cafeterias: {
    list: "/lanchonetes",
    add: "/lanchonetes/adicionar",
    details: (cafeteriaId: string) => `/lanchonetes/${cafeteriaId}`,
    settings: (cafeteriaId: string) => `/lanchonetes/${cafeteriaId}/configuracoes`,
  },

  // Usuários e Acessos
  users: {
    list: "/usuarios",
    add: "/usuarios/adicionar",
  },
} as const
