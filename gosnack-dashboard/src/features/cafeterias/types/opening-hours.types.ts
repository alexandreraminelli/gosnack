/**
 * Grupos de dias de funcionamento da lanchonete.
 */
export type DayPeriod = "weekday" | "saturday"

/**
 * Linha da tabela `cafeteria_opening_hours` no banco de dados (snake_case).
 */
export type OpeningHoursRow = {
  id: string
  cafeteria_id: string
  period: DayPeriod
  is_open: boolean
  open_time: string | null
  close_time: string | null
  updated_at: string
}

/**
 * Horários de funcionamento da lanchonete.
 */
export interface OpeningHours {
  id: OpeningHoursRow["id"]
  cafeteriaId: OpeningHoursRow["cafeteria_id"]
  period: OpeningHoursRow["period"]
  isOpen: OpeningHoursRow["is_open"]
  openTime: OpeningHoursRow["open_time"]
  closeTime: OpeningHoursRow["close_time"]
  updatedAt: OpeningHoursRow["updated_at"]
}

/**
 * Modelo de dados para cadastro de horário de funcionamento.
 */
export type OpeningHoursInputModel = Omit<OpeningHours, "id" | "updatedAt">
