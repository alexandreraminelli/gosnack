import { USERS_TEXTS } from "@/constants/texts/entities/users.texts"
import { REGEX_PATTERNS } from "@/utils/validation/patterns"
import { z } from "zod/v4"

/**
 * Zod Schema para criar ou redefinir a senha do usuário.
 */
export const passwordSchema = z.object({
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
})

/**
 * Shape do campo de senha reutilizável em outros schemas.
 */
export const passwordFieldShape = passwordSchema.shape.password
