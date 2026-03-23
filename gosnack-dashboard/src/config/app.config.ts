import env from "@/lib/env"

/**
 * Configurações gerais da aplicação.
 */
export const APP_CONFIG = {
  /**
   * Domínio de e-mail institucional permitido.
   */
  emailDomain: "colegioipsum.edu.br",
  /**
   * E-mail com acesso irrestrito (apenas desenvolvimento).
   */
  devEmails: env.devEmails,
} as const
