const APP_NAME = "GoSnack Dashboard"

/**
 * Metadados globais da aplicação web do GoSnack Dashboard.
 */
export const SITE = {
  title: {
    template: `%s | ${APP_NAME}`,
    default: APP_NAME,
  },
  description: "Plataforma de gestão de lanchonetes escolares. Gerencie pedidos, produtos, unidades e usuários em tempo real.",

  locale: "pt-BR",
} as const
