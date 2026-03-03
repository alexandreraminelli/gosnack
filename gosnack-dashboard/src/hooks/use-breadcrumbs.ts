"use client"

import { BREADCRUMB_SEGMENT_MAP, HOME_SEGMENT } from "@/constants/navigation/breadcrumbs-config"
import { ResolvedSegment, SegmentContext } from "@/types/navigation/breadcrumb.types"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

/**
 * Hook que resolve os segmentos do breadcrumb para o pathname atual.
 *
 * Estratégia:
 * 1. Divide o pathname em segmentos
 * 2. Para cada segmento, tenta encontrar no mapa:
 *    - Segmento dinâmico: o segmento anterior define o tipo (ex: após "lanchonetes" vem "[unitId]")
 *    - Segmento estático: busca diretamente pela chave
 * 3. Resolve labels async quando necessário
 */
export function useBreadcrumbs() {
  const pathname = usePathname()
  const [segments, setSegments] = useState<ResolvedSegment[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function resolve() {
      setIsLoading(true)

      // Dividir pathname em segmentos
      const parts = pathname.split("/").filter(Boolean)

      // Se não houver segmentos, retorna a home
      if (parts.length === 0) {
        setSegments([{ label: HOME_SEGMENT.label }])
        setIsLoading(false)
        return
      }

      const resolved: ResolvedSegment[] = [HOME_SEGMENT]
      // Acumula os valores dos segmentos dinâmicos anteriores para o contexto
      const context: SegmentContext = { params: {} }

      for (let i = 0; i < parts.length; i++) {
        const part = parts[i]
        const isLast = i === parts.length - 1
        const prevPart = parts[i - 1]

        // Determinar a chave de lookup
        // Se o segmento anterior está no mapa como estático e o segmento atual
        // não tem uma entrada estática própria, tratamos como dinâmico.
        const staticConfig = BREADCRUMB_SEGMENT_MAP[part]

        if (staticConfig?.type === "static") {
          // Segmento estático conhecido
          resolved.push({
            label: staticConfig.label,
            href: isLast ? undefined : staticConfig.href,
          })
        } else {
          // Segmento dinâmico
          // O tipo dinâmico é identificado pelo segmento anterior
          const dynamicKey = prevPart ? `[${prevPart}_id]` : `[id]`
          const dynamicConfig = BREADCRUMB_SEGMENT_MAP[dynamicKey]

          if (dynamicConfig && dynamicConfig.type === "dynamic") {
            // Armazena o valor no contexto antes de resolver
            context.params[dynamicKey.replace(/[\[\]]/g, "")] = part

            const label = await dynamicConfig.resolveLabel(part, { ...context })
            const href = !isLast && dynamicConfig.href ? dynamicConfig.href(part, { ...context }) : undefined

            resolved.push({ label, href })
          } else {
            // Segmento sem configuração: exibe o valor bruto (fallback)
            resolved.push({ label: part })
          }
        }

        // Se o componente foi desmontado durante a resolução, aborta
        if (cancelled) return
      }

      // Simula um pequeno delay para demonstrar o loading state
      setSegments(resolved)
      setIsLoading(false)
    }

    resolve() // Iniciar resolução
    return () => {
      cancelled = true
    }
  }, [pathname])

  return { segments, isLoading }
}
