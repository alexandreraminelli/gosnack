import { BREADCRUMBS } from "@/constants/navigation/breadcrumbs-config"

/**
 * Tenta encontrar a configuração de breadcrumb que corresponde ao pathname
 * fornecido.
 *
 * @param pathname Caminho para a rota.
 *
 * @return Configuração do breadcrumb e correspondência de regex, ou `null`.
 * se não encontrar
 */
export function matchBreadcrumb(pathname: string) {
  for (const config of BREADCRUMBS) {
    const match = pathname.match(config.pattern)

    if (match) {
      // Encontrou correspondência
      return { config, match }
    }
    // Nenhuma correspondência encontrada
    return null
  }
}

/**
 * Extrai os parâmetros da correspondência regex com base nas chaves fornecidas.
 *
 * @param match Resultado da correspondência regex.
 * @param keys Chaves dos parâmetros a serem extraídos.
 *
 * @return Objeto com os parâmetros extraídos.
 */
export function extractParams(match: RegExpMatchArray, keys: string[]): Record<string, string> {
  return keys.reduce(
    (acc, key, index) => {
      acc[key] = match[index + 1]
      return acc
    },
    {} as Record<string, string>,
  )
}
