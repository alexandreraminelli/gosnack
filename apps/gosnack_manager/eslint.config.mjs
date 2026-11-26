import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

/**
 * Regra que restringe a importação de determinados módulos.
 * @param patters - Padrões de importação a serem restringidos.
 * @returns Configuração da regra "no-restricted-imports".
 */
const restrictImports = (patters) => ({
  "no-restricted-imports": ["error", { patterns }],
});

/**
 * Regra que proíbe a importação de React e Next em camadas puras.
 */
const noReactNext = {
  group: ["react", "react-dom", "next", "next/*"],
  message: "Esta camada deve ser pura: sem React nem Next.",
};

/**
 * Regra que proíbe a importação de app/ em camadas puras.
 */
const noApp = {
  group: ["@/app/*"],
  message: "Nenhuma camada importa de app/.",
};

/**
 * Configurações do ESLint para o projeto.
 */
const eslintConfig = defineConfig([
  ...nextVitals, // Regras de desempenho do Next.js.
  ...nextTs, // Regras de TypeScript do Next.js.

  // Domain: só pode importar core
  {
    files: ["src/domains/**/*.{ts, tsx}"],
    rules: restrictImports([
      noReactNext,
      noApp,
      {
        group: ["@/features/*", "@/ui/*"],
        message: "domains só pode importar core.",
      },
    ]),
  },

  // Core: não importa nada acima dele, só pode importar features e ui
  {
    files: ["src/core/**/*.{ts,tsx}"],
    rules: restrictImports([
      noApp,
      {
        group: ["@/features/*", "@/domains/*", "@/ui/*"],
        message: "core não importa camadas acima dele.",
      },
    ]),
  },

  // ui: apenas apresentação, sem dados e sem features
  {
    files: ["src/ui/**/*.{ts,tsx}"],
    rules: restrictImports([
      noApp,
      {
        group: ["@/features/*", "@/domains/*"],
        message: "ui é somente para apresentação: não conhece features nem domains.",
      },
    ]),
  },

  // features: não importam outras features; domains só pelo barrel
  {
    files: ["src/features/**/*.{ts,tsx}"],
    rules: restrictImports([
      noApp,
      {
        group: ["@/features/*"],
        message: "Features não importam outras features. Dentro da própria feature, use import relativo.",
      },
      {
        group: ["@/domains/*/*"],
        message: "Importe domains pelo barrel (@/domains/auth).",
      },
    ]),
  },

  // app: sem deep imports nos barrels
  {
    files: ["src/app/**/*.{ts,tsx}"],
    rules: restrictImports([
      {
        group: ["@/domains/*/*", "@/features/*/*"],
        message: "Importe pelo barrel (index.ts) da pasta.",
      },
    ]),
  },

  // Ignorar arquivos e pastas específicas do Next.js e do build
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
