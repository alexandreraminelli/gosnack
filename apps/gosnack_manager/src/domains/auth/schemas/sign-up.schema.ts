import z from "zod";

/**
 * Zod Schema para o formulário de cadastro.
 */
export const signUpSchema = z.object({
  /** Validação do campo de e-mail. */
  email: z.email({ error: "invalid_email" }).nonempty({ error: "required" }),
  /** Validação do campo de senha. */
  password: z
    .string()
    .nonempty({ error: "required" })
    // Tamanho mínimo:
    .min(8, { error: "password_too_short" })
    // Letras maiúsculas e minúsculas:
    .refine((password) => /[A-Z]/.test(password), { error: "password_too_weak" })
    .refine((password) => /[a-z]/.test(password), { error: "password_too_weak" })
    // Números:
    .refine((password) => /[0-9]/.test(password), { error: "password_too_weak" })
    // Caracteres especiais:
    .refine((password) => /[!@#$%^&*]/.test(password), { error: "password_too_weak" }),
});

/**
 * Tipagem para os dados de entrada do formulário de cadastro.
 */
export type SignUpInput = z.infer<typeof signUpSchema>;
