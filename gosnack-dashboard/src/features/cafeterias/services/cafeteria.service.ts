import { mapRowToCafeteria } from "@/features/cafeterias/mappers/cafeteria.mapper"
import { mapOpeningHoursToRow } from "@/features/cafeterias/mappers/opening-hours.mapper"
import { Cafeteria, CafeteriaInputModel, CafeteriaRow } from "@/features/cafeterias/types/cafeteria.types"
import { OpeningHoursRow } from "@/features/cafeterias/types/opening-hours.types"
import { createClient } from "@/lib/supabase/client"
import { TABLES } from "@/lib/supabase/schema"

/**
 * Serviço para operações relacionadas a lanchonetes.
 */
export const cafeteriaService = {
  /**
   * Criar uma nova lanchonete no banco de dados.
   */
  async create(input: CafeteriaInputModel): Promise<Cafeteria> {
    const supabase = createClient()

    // Criar lanchonete no banco de dados
    const { data: cafeteriaRow, error: cafeteriaError } = await supabase
      .from(TABLES.cafeterias)
      .insert({
        unit_id: input.unitId,
        name: input.name,
        location: input.location,
      } as Omit<CafeteriaRow, "id" | "created_at" | "updated_at" | "is_active">)
      .select()
      .single<CafeteriaRow>()

    if (cafeteriaError) throw cafeteriaError

    // Criar horários de funcionamento no banco de dados
    const { data: openingHoursRowsData, error: openingHoursError } = await supabase
      .from(TABLES.cafeteriaOpeningHours)
      .insert(
        input.openingHours.map((hours) =>
          mapOpeningHoursToRow({
            ...hours,
            cafeteriaId: cafeteriaRow.id, // Associar ID da lanchonete criada no FK
          }),
        ),
      )
      .select()

    if (openingHoursError) throw openingHoursError

    // Cast dos dados para o tipo correto
    const openingHoursRows = openingHoursRowsData as OpeningHoursRow[]

    // Mapear os dados do banco de dados para o formato da aplicação
    return mapRowToCafeteria(cafeteriaRow, openingHoursRows)
  },
}
