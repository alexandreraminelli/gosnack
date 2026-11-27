import z from "zod";

/**
 * Zod Schema para o formulário de recuperação de senha.
 */
export const forgotPasswordSchema = z.object({
  /** Validação do campo de e-mail. */
  email: z.email({ error: "invalid_email" }).nonempty({ error: "required" }),
});

/**
 * Tipagem para os dados de entrada do formulário de recuperação de senha.
 */
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
