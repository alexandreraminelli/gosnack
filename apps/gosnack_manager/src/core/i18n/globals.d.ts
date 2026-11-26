import messages from "@/core/i18n/messages";

declare module "next-intl" {
  interface AppConfig {
    Locale: "pt-BR";
    Messages: typeof messages;
  }
}
