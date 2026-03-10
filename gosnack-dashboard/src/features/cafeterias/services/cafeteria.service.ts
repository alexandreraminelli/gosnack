import { mapRowToCafeteria } from "@/features/cafeterias/mappers/cafeteria.mapper"
import { mapOpeningHoursToRow } from "@/features/cafeterias/mappers/opening-hours.mapper"
import { Cafeteria, CafeteriaInsert, CafeteriaRow } from "@/features/cafeterias/types/cafeteria.types"
import { OpeningHoursRow } from "@/features/cafeterias/types/opening-hours.types"
import { createClient } from "@/lib/supabase/client"
import { COLUMNS, TABLES } from "@/lib/supabase/schema"

/**
 * Serviço para operações relacionadas a lanchonetes.
 */
export const cafeteriaService = {
  /**
   * Criar uma nova lanchonete no banco de dados.
   */
  async create(input: CafeteriaInsert): Promise<Cafeteria> {
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

  /**
   * Obter todas as lanchonetes do banco de dados, incluindo seus horários
   * de funcionamento.
   */
  async getAll(): Promise<Cafeteria[]> {
    const supabase = createClient()

    const { data, error } = await supabase
      .from(TABLES.cafeterias)
      // JOIN com: nome da unidade; horários de funcionamento
      .select(`*, ${TABLES.units}(${COLUMNS.units.name}), ${TABLES.cafeteriaOpeningHours}(*), ${TABLES.products}(count), ${TABLES.cafeteriaStaffAssignments}(count)`)
      .order(COLUMNS.cafeterias.name, { ascending: true }) // ordem alfabética

    if (error) throw error
    return (data ?? []).map((row) => {
      const {
        [TABLES.units]: { name: unitName },
        [TABLES.cafeteriaOpeningHours]: cafeteriaOpeningHours,
        [TABLES.products]: [{ count: productsCount }],
        [TABLES.cafeteriaStaffAssignments]: [{ count: employeesCount }],
        ...cafeteriaRow
      } = row
      return mapRowToCafeteria(cafeteriaRow as CafeteriaRow, cafeteriaOpeningHours as OpeningHoursRow[], unitName, productsCount, employeesCount)
    })
  },
}
