# GoSnack: Painel Administrativo

<!-- ----------------------------------------------------------------------- -->

## 📁 Estrutura de Arquivos

<!-- Gerar árvore mais facilmente: https://devtool.tech/en/tree -->

```bash
gosnack-dashboard/
├── public/
│   └── ...
├── src/
│   └── ...
├── .env.example
├── .gitignore
├── components.json
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── postcss.config.mjs
└── tsconfig.json
```

| Path/Arquivo         | Descrição                                                                   |
| -------------------- | --------------------------------------------------------------------------- |
| `public/`            | Arquivos estáticos.                                                         |
| `src/`               | Código-fonte da aplicação.                                                  |
| `.env.example`       | Modelo de variáveis de ambiente, sem os valores.                            |
| `.gitignore`         | Arquivos e pastas ignorados pelo Git.                                       |
| `components.json`    | Configurações do Shadcn.                                                    |
| `eslint.config.mjs`  | Regras de qualidade e estilo de código (ESLint).                            |
| `next.config.ts`     | Configuração do Next.js.                                                    |
| `package.json`       | Dependências e scripts do projeto.                                          |
| `pnpm-lock.yaml`     | Lockfile do pnpm. Garante versões idênticas em todos os ambientes.          |
| `postcss.config.mjs` | Configuração do PostCSS. Necessário para o Tailwind CSS funcionar no build. |
| `tsconfig.json`      | Configuração do TypeScript.                                                 |

### `src/`

```bash
gosnack-dashboard/src/
├── app/
│   ├── (auth)/
│   ├── (private)/
│   ├── icon.svg
│   ├── layout.tsx
│   └── not-found.tsx
├── components/
│   ├── layout/
│   ├── providers/
│   ├── shared/
│   └── ui/
├── constants/
│   ├── icons.ts
│   ├── order-status.ts
│   ├── roles.ts
│   └── routes.ts
├── hooks/
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   └── server.ts
│   ├── permissions.ts
│   └── utils.ts
├── services/
│   ├── orders.ts
│   ├── products.ts
│   ├── school-units.ts
│   └── users.ts
├── styles/
│   └── globals.css
├── types/
│   └── index.ts
└── middleware.ts
```

#### `app/`

| Path/Arquivo        | Descrição                                                                                                              |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `app/`              | Diretório principal do App Router do Next.js. Contém todas as rotas, layouts e páginas.                                |
| `app/(auth)/`       | Route group para as rotas de autenticação (login, recuperação de senha).                                               |
| `app/(private)/`    | Route group para as páginas protegidas do dashboard, com controle de acesso por papel (RBAC).                          |
| `app/icon.svg`      | Ícone do site, usado como favicon.                                                                                     |
| `app/layout.tsx`    | Root layout que envolve toda a aplicação. Contém providers globais, fontes, metadados base e tags `<html>` e `<body>`. |
| `app/not-found.tsx` | Página personalizada para rotas não encontradas (404).                                                                 |

#### `components/`

| Path/Arquivo            | Descrição                                                             |
| ----------------------- | --------------------------------------------------------------------- |
| `components/`           | Componentes reutilizáveis, organizados por responsabilidade.          |
| `components/layout/`    | Componentes estruturais da página, como header, sidebar e rodapé.     |
| `components/providers/` | Provedores de contexto global (autenticação, unidade ativa, etc.).    |
| `components/shared/`    | Componentes reutilizáveis sem vínculo com seção ou layout específico. |
| `components/ui/`        | Componentes base do Shadcn.                                           |

#### `constants/`

| Path/Arquivo                | Descrição                                                                   |
| --------------------------- | --------------------------------------------------------------------------- |
| `constants/`                | Constantes globais da aplicação.                                            |
| `constants/icons.ts`        | Mapeamento dos ícones usados na aplicação.                                  |
| `constants/order-status.ts` | Labels e variantes visuais para os status de pedido.                        |
| `constants/roles.ts`        | Definição dos papéis de usuário (`client`, `employee`, `manager`, `admin`). |
| `constants/routes.ts`       | Rotas da aplicação.                                                         |

#### `lib/`

| Path/Arquivo             | Descrição                                                                                    |
| ------------------------ | -------------------------------------------------------------------------------------------- |
| `lib/`                   | Utilitários e configurações de infraestrutura.                                               |
| `lib/supabase/`          | Configurações e clientes para integração com Supabase.                                       |
| `lib/supabase/client.ts` | Instância do Supabase para uso client-side (Client Components e browser).                    |
| `lib/supabase/server.ts` | Instância do Supabase para uso server-side (Server Components, Server Actions e middleware). |
| `lib/permissions.ts`     | Lógica centralizada de verificação de permissões por papel (RBAC).                           |
| `lib/utils.ts`           | Funções utilitárias genéricas.                                                               |

#### `services/`

| Path/Arquivo               | Descrição                                                               |
| -------------------------- | ----------------------------------------------------------------------- |
| `services/`                | Funções que encapsulam as queries ao Supabase, organizadas por domínio. |
| `services/orders.ts`       | Queries e mutações relacionadas a pedidos.                              |
| `services/products.ts`     | Queries e mutações relacionadas a produtos.                             |
| `services/school-units.ts` | Queries e mutações relacionadas a unidades escolares.                   |
| `services/users.ts`        | Queries e mutações relacionadas a usuários e papéis.                    |

#### Outros

| Path/Arquivo         | Descrição                                                                                                                                   |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `hooks/`             | Custom hooks reutilizáveis.                                                                                                                 |
| `styles/globals.css` | Estilos globais da aplicação, tema do Shadcn e configurações do Tailwind CSS.                                                               |
| `types/index.ts`     | Tipagens TypeScript globais das entidades de domínio (`User`, `Order`, `Product`, `SchoolUnit`, etc.).                                      |
| `middleware.ts`      | Middleware do Next.js executado antes de cada requisição. Responsável pelo redirecionamento com base na autenticação e no papel do usuário. |
