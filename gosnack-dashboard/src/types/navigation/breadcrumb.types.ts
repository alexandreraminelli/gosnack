/**
 * Tipo de um segmento resolvido para exibição.
 */
export type ResolvedSegment = {
  /**
   * Rótulo do segmento.
   */
  label: string
  /**
   * Link do segmento (se aplicável).
   */
  href?: string
}

/**
 * Contexto disponível durante a resolução de segmentos dinâmicos.
 * Acumula os valores dos segmentos anteriores da URL.
 *
 * **Exemplo:** para `/lanchonetes/[unitId]/[cafeteriaId]`,
 * quando resolvendo `cafeteriaId`, `context.params` será `{ unitId: "abc" }`.
 */
export type SegmentContext = {
  params: Record<string, string>
}

/**
 * Configuração de um segmento de rota.
 *
 * - `static`: Segmento fixo (ex: "Início", "Lanchonetes", "adicionar", etc).
 * - `dynamic`: Segmento dinâmico, que depende de parâmetros da rota
 * (ex: nome da lanchonete).
 */
export type SegmentConfig =
  // Segmento estático
  | { type: "static"; label: string; href?: string }
  // Segmento dinâmico
  | {
      type: "dynamic"
      /**
       * Função para extrair o valor de consulta do segmento dinâmico.
       */
      queryKey: (value: string) => readonly unknown[]
      /**
       * Função para resolver o rótulo do segmento dinâmico, usando o valor do segmento.
       */
      queryFn: (value: string) => Promise<unknown>
      /**
       * Função para resolver o rótulo do segmento dinâmico, usando o
       * valor do segmento
       */
      resolveLabel: (data: unknown) => string
      /**
       * Fallback customizado por entidade.
       */
      notFoundLabel?: string
      /**
       * Função para gerar o link do segmento dinâmico, usando o valor do
       * segmento e o contexto acumulado dos segmentos anteriores.
       * Retorna `undefined` se o segmento não deve ser clicável.
       */
      href?: (value: string, context: SegmentContext) => string
    }
