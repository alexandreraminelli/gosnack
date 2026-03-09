import { OpeningHours, OpeningHoursInsert } from "@/features/cafeterias/types/opening-hours.types"

/**
 * Linha da tabela `cafeterias` no banco de dados (snake_case).
 */
export type CafeteriaRow = {
  // Colunas
  id: string
  unit_id: string
  name: string
  location: string | null
  created_at: string
  updated_at: string
  is_active: boolean
}

/**
 * Tipagem de uma lanchonete para uso na aplicação (camelCase).
 */
export interface Cafeteria {
  /**
   * ID da lanchonete.
   */
  id: CafeteriaRow["id"]
  /**
   * ID da unidade associada à lanchonete.
   */
  unitId: CafeteriaRow["unit_id"]
  /**
   * Nome da unidade associada à lanchonete.
   */
  unitName?: string
  /**
   * Nome da lanchonete.
   */
  name: CafeteriaRow["name"]
  /**
   * Localização da lanchonete.
   */
  location: CafeteriaRow["location"]
  /**
   * Data de criação da lanchonete.
   */
  createdAt: CafeteriaRow["created_at"]
  /**
   * Data de atualização da lanchonete.
   */
  updatedAt: CafeteriaRow["updated_at"]
  /**
   * Se a lanchonete está ativa.
   */
  isActive: CafeteriaRow["is_active"]
  /**
   * Horário de funcionamento da lanchonete.
   */
  openingHours: OpeningHours[]
}

/** Modelo de dados para cadastro de lanchonete. */
export type CafeteriaInsert = Omit<Cafeteria, "id" | "createdAt" | "updatedAt" | "isActive" | "openingHours" | "unitName"> & {
  openingHours: Omit<OpeningHoursInsert, "cafeteriaId">[]
}
