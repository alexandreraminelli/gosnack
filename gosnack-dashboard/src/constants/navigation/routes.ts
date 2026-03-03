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
  units: "/unidades",
  unitInfo: (unitId: string) => `unidades/${unitId}`,

  // Lanchonetes
  cafeterias: "/lanchonetes",
  newCafeteria: "/lanchonetes/adicionar",
  cafeteriaInfo: (cafeteriaId: string) => `/lanchonetes/${cafeteriaId}`,

  // Usuários e Acessos
  users: "/usuarios",
  addUsers: "/usuarios/adicionar",
} as const
