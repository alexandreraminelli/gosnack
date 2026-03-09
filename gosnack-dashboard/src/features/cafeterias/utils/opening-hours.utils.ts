import { CAFETERIA_TEXTS } from "@/constants/texts/entities/cafeterias.texts"
import { DayPeriod, OpeningHours } from "@/features/cafeterias/types/opening-hours.types"

/**
 * Formatar período de funcionamento (dias da semana ou sábado).
 */
function formatPeriod(period: DayPeriod): string {
  return CAFETERIA_TEXTS.fields.openingHours[period]
}

/**
 * Formatar horário no formato "HH:mm".
 */
function formatTime(time: string): string {
  return time.slice(0, 5) // Extrai apenas "HH:mm" de "HH:mm:ss"
}

/**
 * Formatar horário de funcionamento no formato "Período: HH:mm – HH:mm".
 */
export function formatOpeningHours(hours: OpeningHours): string {
  if (!hours.isOpen || !hours.openTime || !hours.closeTime) {
    return `${formatPeriod(hours.period)}: ${CAFETERIA_TEXTS.fields.openingHours.closed}`
  }

  return `${formatPeriod(hours.period)}: ${formatTime(hours.openTime)} – ${formatTime(hours.closeTime)}`
}
