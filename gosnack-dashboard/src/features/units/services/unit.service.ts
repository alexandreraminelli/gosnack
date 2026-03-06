import { Unit, UnitInsert, UnitRow } from "@/features/units/types/unit.types"
import { createClient } from "@/lib/supabase/client"
import { COLUMNS, TABLES } from "@/lib/supabase/schema"

/**
 * Converte `UnitRow` para `Unit`, adaptando os campos de snake_case para camelCase.
 */
const mapUnitRowToUnit = (row: UnitRow): Unit => ({
  id: row.id,
  name: row.name,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
  isActive: row.is_active,
  cafeteriasCount: row.cafeterias?.[0]?.count,
})

/**
 * Converte `Unit` para `UnitRow`, adaptando os campos de camelCase para snake_case.
 */
const mapUnitToUnitRow = (unit: Omit<Unit, "id" | "createdAt" | "updatedAt">): Omit<UnitRow, "id" | "created_at" | "updated_at"> => ({
  name: unit.name,
  is_active: unit.isActive,
})

/**
 * Serviço para operações relacionadas a unidades.
 */
export const unitService = {
  /**
   * Criar uma nova unidade no banco de dados.
   */
  async create(data: UnitInsert): Promise<Unit> {
    const supabase = createClient()

    // Mapear os dados do formato da aplicação para o formato do banco de dados
    const payload = mapUnitToUnitRow(data)

    const { data: createdData, error } = await supabase
      .from(TABLES.units)
      .insert(payload)
      .select("*, cafeterias(count)") // obter colunas e quantidade de lanchonetes
      .single<UnitRow>()

    if (error) throw error
    return mapUnitRowToUnit(createdData)
  },

  /**
   * Obter todas as unidades do banco de dados.
   */
  async getAll(): Promise<Unit[]> {
    const supabase = createClient()

    const { data, error } = await supabase
      .from(TABLES.units)
      .select("*, cafeterias(count)") // obter colunas e quantidade de lanchonetes
      .order(COLUMNS.units.name, { ascending: true })

    if (error) throw error
    return (data ?? []).map(mapUnitRowToUnit)
  },

  /**
   * Obter uma unidade específica pelo ID.
   */
  async getById(id: string): Promise<Unit> {
    const supabase = createClient()

    const { data, error } = await supabase.from(TABLES.units).select("*").eq(COLUMNS.units.id, id).single<UnitRow>()

    if (error) throw error
    return mapUnitRowToUnit(data)
  },

  /**
   * Atualizar o nome de uma unidade.
   */
  async updateName(id: string, newName: string): Promise<void> {
    const supabase = createClient()

    const { error } = await supabase.from(TABLES.units).update({ name: newName }).eq(COLUMNS.units.id, id)

    if (error) throw error
  },

  /**
   * Alternar o status de uma unidade (ativo/inativo).
   */
  async toggleStatus(id: string, value: boolean): Promise<void> {
    const supabase = createClient()

    const { error } = await supabase.from(TABLES.units).update({ is_active: value }).eq(COLUMNS.units.id, id)

    if (error) throw error
  },
}
