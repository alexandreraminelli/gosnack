/**
 * Endpoints das rotas da aplicação.
 */
export const ROUTES = {
  /* Autenticação ----------------------------------------------------------- */
  auth: {
    login: "/auth/login",
    forgotPassword: "/auth/recuperar-senha",
    updatePassword: "/auth/atualizar-senha",

    confirm: "/auth/confirm",
    error: "/auth/error",
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
