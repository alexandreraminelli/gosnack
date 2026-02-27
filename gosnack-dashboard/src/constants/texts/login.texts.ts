/**
 * Textos para a funcionalidade de login.
 */
export const LOGIN_TEXTS = {
  fields: {
    email: "E-mail",
    password: "Senha",
  },

  header: {
    title: "GoSnack: Painel de Controle",
    subtitle: "Acesse o sistema para gerenciar pedidos e produtos.",
  },

  metadata: {
    title: "Login",
  },

  submit: "Entrar",

  result: {
    loading: "Autenticando...",
    success: "Login realizado com sucesso!",
    error: {
      message: "Erro ao fazer o login!",
      fallback: "Verifique suas credenciais e tente novamente.",
    },
  },

  validation: {
    email: {
      required: "Informe seu e-mail.",
      invalid: "Digite um e-mail válido.",
    },
    password: {
      required: "Informe sua senha.",
    },
  },
} as const
