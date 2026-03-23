import { USERS_TEXTS } from "@/constants/texts/entities/users.texts"
import { passwordFieldShape } from "@/features/authentication/password-recovery/schemas/password.schema"
import { USER_ROLES } from "@/types/user.types"
import { isAllowedEmailForRole, shouldSkipInvite } from "@/utils/validation/email"
import { z } from "zod/v4"

/**
 * Zod Schema para o formulário de criar usuário.
 */
export const createUserSchema = z
  .object({
    /**
     * Validação do campo de papel do usuário.
     */
    role: z.enum(USER_ROLES, USERS_TEXTS.validation.role.required),
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
     * Validação do campo de senha (opcional, apenas para e-mails fictícios).
     */
    password: passwordFieldShape.optional(),
  })
  .superRefine((data, ctx) => {
    // E-mail institucional obrigatório para roles de trabalho
    if (data.role && !isAllowedEmailForRole(data.email, data.role)) {
      ctx.addIssue({
        code: "custom",
        path: ["email"],
        message: USERS_TEXTS.validation.email.domain,
      })
    }

    // Senha obrigatória para e-mails fictícios
    if (shouldSkipInvite(data.email) && !data.password) {
      ctx.addIssue({
        code: "custom",
        path: ["password"],
        message: USERS_TEXTS.validation.password.required,
      })
    }
  })
