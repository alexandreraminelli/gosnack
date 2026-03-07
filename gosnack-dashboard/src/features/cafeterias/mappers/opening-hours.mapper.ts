import { OpeningHours, OpeningHoursRow } from "@/features/cafeterias/types/opening-hours.types"

/**
 * Converte `OpeningHoursRow` para `OpeningHours`, adaptando os campos de snake_case para camelCase.
 */
export function mapOpeningHoursRowToOpeningHours(row: OpeningHoursRow): OpeningHours {
  return {
    id: row.id,
    cafeteriaId: row.cafeteria_id,
    period: row.period,
    isOpen: row.is_open,
    openTime: row.open_time,
    closeTime: row.close_time,
    updatedAt: row.updated_at,
  }
}

/**
 * Converte `OpeningHours` para `OpeningHoursRow`, adaptando os campos de camelCase para snake_case.
 */
export function mapOpeningHoursToOpeningHoursRow(hours: Omit<OpeningHours, "id" | "updatedAt">): Omit<OpeningHoursRow, "id" | "updated_at"> {
  return {
    cafeteria_id: hours.cafeteriaId,
    period: hours.period,
    is_open: hours.isOpen,
    open_time: hours.openTime,
    close_time: hours.closeTime,
  }
}
