import { USERS_TEXTS } from "@/constants/texts/entities/users.texts"
import { USER_ROLES } from "@/types/user.types"
import { REGEX_PATTERNS } from "@/utils/validation/patterns"
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
  email: z.email(USERS_TEXTS.validation.email.invalid).nonempty(USERS_TEXTS.validation.email.required),
  /**
   * Validação do campo de senha.
   */
  password: z
    .string()
    .nonempty(USERS_TEXTS.validation.password.required)
    .min(8, USERS_TEXTS.validation.password.length) // comprimento
    .regex(REGEX_PATTERNS.upper, USERS_TEXTS.validation.password.upperCase) // letra maiúscula
    .regex(REGEX_PATTERNS.lower, USERS_TEXTS.validation.password.lowerCase) // letra minúscula
    .regex(REGEX_PATTERNS.digit, USERS_TEXTS.validation.password.number) // número
    .regex(REGEX_PATTERNS.specialChar, USERS_TEXTS.validation.password.specialChar), // caractere especial
  /**
   * Validação do campo de papel do usuário.
   */
  role: z.enum(USER_ROLES, USERS_TEXTS.validation.role.required),
})
