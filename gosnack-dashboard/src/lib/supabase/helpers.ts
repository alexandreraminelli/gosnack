/**
 * Converte um array de colunas em uma string para o `select()` do Supabase.
 */
export function toSelect(columns: string[]): string {
  return columns.join(", ")
}
