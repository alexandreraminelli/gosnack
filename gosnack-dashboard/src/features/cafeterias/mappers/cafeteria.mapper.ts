import { mapRowToOpeningHours } from "@/features/cafeterias/mappers/opening-hours.mapper"
import { Cafeteria, CafeteriaRow } from "@/features/cafeterias/types/cafeteria.types"
import { OpeningHoursRow } from "@/features/cafeterias/types/opening-hours.types"

/**
 * Mapear `CafeteriaRow` para `Cafeteria`, adaptando os campos de snake_case para camelCase e incluindo os horários de funcionamento.
 */
export function mapRowToCafeteria(row: CafeteriaRow, openingHoursRows?: OpeningHoursRow[], unitName?: string): Cafeteria {
  return {
    id: row.id,
    unitId: row.unit_id,
    unitName,
    name: row.name,
    location: row.location,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    isActive: row.is_active,
    openingHours: openingHoursRows?.map(mapRowToOpeningHours) ?? [],
  }
}

/**
 * Converte `Cafeteria` para `CafeteriaRow`, adaptando os campos de camelCase para snake_case.
 */
export function mapCafeteriaToRow(cafeteria: Omit<Cafeteria, "openingHours" | "unitName">): Omit<CafeteriaRow, "created_at"> {
  return {
    id: cafeteria.id,
    unit_id: cafeteria.unitId,
    name: cafeteria.name,
    location: cafeteria.location,
    updated_at: cafeteria.updatedAt,
    is_active: cafeteria.isActive,
  }
}
