import { getRequestConfig } from "next-intl/server";
import messages from "@/core/i18n/messages";

/**
 * Configuração de internacionalização para requisições do lado do servidor.
 */
export default getRequestConfig(async () => ({
  locale: "pt-BR", // idioma padrão
  messages, // mensagens de internacionalização
}));
