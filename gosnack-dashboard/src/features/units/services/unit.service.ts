import { Unit, UnitRow } from "@/features/units/types/unit.types"
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
})

/**
 * Serviço para operações relacionadas a unidades.
 */
export const unitService = {
  /**
   * Obter todas as unidades do banco de dados.
   */
  async getAll(): Promise<Unit[]> {
    const supabase = createClient()

    const { data, error } = await supabase.from(TABLES.units).select("*").order(COLUMNS.units.name, { ascending: true })

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
}
