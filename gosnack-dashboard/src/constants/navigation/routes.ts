/**
 * Caminhos das rotas da aplicação.
 */
export const ROUTES = {
  // Autenticação
  login: "/login",
  forgotPassword: "/recuperar-senha",

  // Visão Geral
  home: "/",

  // Unidades e Lanchonetes
  units: "/unidades",
  cafeterias: "/lanchonetes",
  newCafeteria: "/lanchonetes/adicionar",
  cafeteriaInfo: (unitId: string, cafeteriaId: string) => `/lanchonetes/${unitId}/${cafeteriaId}`,

  // Usuários e Acessos
  users: "/usuarios",
  addUsers: "/usuarios/adicionar",
} as const
