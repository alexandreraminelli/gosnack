import { LOGIN_TEXTS } from "@/constants/texts/login.texts"
import { z } from "zod/v4"

/**
 * Zod Schema para o formulário de login.
 */
export const loginSchema = z.object({
  /**
   * Validação do campo de e-mail.
   */
  email: z.email(LOGIN_TEXTS.validation.email.invalid).nonempty(LOGIN_TEXTS.validation.email.required),
  /**
   * Validação do campo de senha.
   */
  password: z.string().nonempty(LOGIN_TEXTS.validation.password.required),
})
