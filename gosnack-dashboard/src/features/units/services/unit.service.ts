import { Unit } from "@/features/units/types/unit.types"
import { createClient } from "@/lib/supabase/client"
import { COLUMNS, TABLES } from "@/lib/supabase/schema"

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
    return data
  },
}
