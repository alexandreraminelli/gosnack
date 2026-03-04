/**
 * Linha da tabela `units` no banco de dados (snake_case).
 */
export type UnitRow = {
  id: string
  name: string
  created_at: string
  updated_at: string
  is_active: boolean

  // Atributos derivados
  cafeterias?: { count: number }[]
}

/**
 * Tipagem de uma unidade para uso na aplicação (camelCase).
 */
export interface Unit {
  /**
   * ID da unidade.
   */
  id: UnitRow["id"]
  /**
   * Nome da unidade.
   */
  name: UnitRow["name"]
  /**
   * Data de criação da unidade.
   */
  createdAt: UnitRow["created_at"]
  /**
   * Data de atualização da unidade.
   */
  updatedAt: UnitRow["updated_at"]
  /**
   * Se a unidade está ativa.
   */
  isActive: UnitRow["is_active"]
  /**
   * Quantidade de lanchonetes associadas à unidade
   * (opcional, pode ser carregada separadamente).
   */
  cafeteriasCount?: number
}

/**
 * Tipagem de dados para inserção de unidade.
 */
export type UnitInsert = Omit<Unit, "id" | "createdAt" | "updatedAt">
