import { USERS_TEXTS } from "@/constants/texts/entities/users.texts"
import { USER_ROLES } from "@/types/user.types"
import { isAllowedEmail } from "@/utils/validation/email"
import { z } from "zod/v4"

/**
 * Zod Schema para o formulário de criar usuário.
 */
export const createUserSchema = z.object({
  /**
   * Validação do campo de primeiro nome.
   */
  firstName: z.string().nonempty(USERS_TEXTS.validation.firstName.required),
  /**
   * Validação do campo de sobrenome.
   */
  lastName: z.string().nonempty(USERS_TEXTS.validation.lastName.required),
  /**
   * Validação do campo de e-mail.
   */
  email: z
    .email(USERS_TEXTS.validation.email.invalid)
    .nonempty(USERS_TEXTS.validation.email.required)
    // Validar domínio
    .refine((email) => isAllowedEmail(email), USERS_TEXTS.validation.email.domain),
  /**
   * Validação do campo de papel do usuário.
   */
  role: z.enum(USER_ROLES, USERS_TEXTS.validation.role.required),
})
