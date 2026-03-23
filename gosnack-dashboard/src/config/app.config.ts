import env from "@/lib/env"

/**
 * Configurações gerais da aplicação.
 */
export const APP_CONFIG = {
  /**
   * Configurações de e-mail institucional.
   */
  email: {
    /**
     * Domínio de e-mail institucional permitido.
     */
    emailDomain: "@colegioipsum.edu.br",
    /**
     * Se o domínio de e-mail institucional é fictício (apenas para desenvolvimento).
     */
    isFictitiousDomain: false,
    /**
     * E-mail com acesso irrestrito (apenas desenvolvimento).
     */
    devEmails: env.devEmails,
  },
} as const
