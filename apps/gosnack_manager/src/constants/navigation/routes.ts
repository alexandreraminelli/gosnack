/**
 * Endpoints das rotas da aplicação.
 */
export const ROUTES = {
  /* Autenticação ----------------------------------------------------------- */
  auth: {
    login: "/login",
    forgotPassword: "/forgot-password",
  },

  /* Home ------------------------------------------------------------------- */
  home: "/",

  /* Unidades --------------------------------------------------------------- */
  units: {
    list: "/unidades",
    add: "/unidades/adicionar",
    details: (unitId: string) => `/unidades/${unitId}`,
  },

  /* Lanchonetes ------------------------------------------------------------ */
  cafeterias: {
    list: "/lanchonetes",
    add: "/lanchonetes/adicionar",
    details: (cafeteriaId: string) => `/lanchonetes/${cafeteriaId}`,
  },

  /* Gerenciar Usuários ----------------------------------------------------- */
  users: {
    list: "/usuarios",
    add: "/usuarios/adicionar",
  },
};
