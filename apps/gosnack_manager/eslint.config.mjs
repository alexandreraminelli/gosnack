import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

/**
 * Regra que restringe a importação de determinados módulos.
 * @param patters - Padrões de importação a serem restringidos.
 * @returns Configuração da regra "no-restricted-imports".
 */
const restrictImports = (patterns) => ({
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

  // domains: não importa nada acima dele, só pode importar core
  {
    files: ["src/domains/**/*.{ts, tsx}"],
    rules: restrictImports([
      noReactNext,
      noApp,
      {
        group: ["@/features/*", "@/ui/*"],
        message: "Domain modules must not depend on feature or presentation layers. Domain code must remain framework-independent and must not import React or Next.js.",
      },
    ]),
  },

  // core: não importa nada acima dele, só pode importar core
  {
    files: ["src/core/**/*.{ts,tsx}"],
    rules: restrictImports([
      noApp,
      {
        group: ["@/features/*", "@/domains/*", "@/ui/*"],
        message: "Core infrastructure must not depend on app, domain, feature, or UI layers.",
      },
    ]),
  },

  // ui: não importa nada acima dele, só pode importar core
  {
    files: ["src/ui/**/*.{ts,tsx}"],
    rules: restrictImports([
      noApp,
      {
        group: ["@/features/*", "@/domains/*"],
        message: "Shared UI components must remain presentation-only and must not depend on domain or feature modules.",
      },
    ]),
  },

  // features: não importa nada acima dele, só pode importar features, ui e core
  {
    files: ["src/features/**/*.{ts,tsx}"],
    rules: restrictImports([
      noApp,
      {
        group: ["@/features/*"],
        message: "Feature modules must not depend on other features. Use relative imports within the same feature.",
      },
      {
        group: ["@/domains/*/*"],
        message: "Import domain modules through their public barrel (e.g., @/domains/auth), not through internal files.",
      },
    ]),
  },

  // app/: não importa nada acima dele, só pode importar features e ui
  {
    files: ["src/app/**/*.{ts,tsx}"],
    rules: restrictImports([
      {
        group: ["@/domains/*/*", "@/features/*/*"],
        message: "Import features and domains through their public barrels; avoid deep imports into internal modules.",
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
