"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"

/**
 * Props de `QueryProvider`.
 */
interface Props {
  children: React.ReactNode
}

/**
 * Provedor do React Query (TanStack) para a aplicação.
 *
 * Permite o uso de hooks de consulta em toda a aplicação, fornecendo um cache
 * eficiente e gerenciamento de estado para dados assíncronos.
 */
export function QueryProvider({ children }: Props) {
  // Instância do QueryClient para gerenciar o cache e as consultar do TanStack
  const [queryClient] = useState(
    () =>
      new QueryClient({
        // Configurações padrão para queries
        defaultOptions: {
          queries: {
            // Tempo que os dados ficam frescos antes de serem considerados "stale"
            // Após esse tempo, as queries serão refetchadas automaticamente ao serem acessadas
            staleTime: 1000 * 60 * 5, // 5 minutos
            // Não refazer a busca ao focar a janela
            refetchOnWindowFocus: false,
            // Número de tentativas em caso de falha
            retry: 1,
          },
        },
      }),
  )

  // Retornar componente envolto do provedor
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
