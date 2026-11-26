import { z } from "zod";

/**
 * Zod Schema para o formulário de login.
 */
export const loginSchema = z.object({
  /** Validação do campo de e-mail. */
  email: z.email().nonempty(),
  /** Validação do campo de senha. */
  password: z.string().min(8).nonempty(),
});

/**
 * Tipagem para os dados de entrada do formulário de login.
 */
export type LoginInput = z.infer<typeof loginSchema>;
