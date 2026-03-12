import { CAFETERIA_TEXTS } from "@/constants/texts/entities/cafeterias.texts"
import { z } from "zod/v4"

/**
 * Zod schema para intervalo de horário de funcionamento da lanchonete.
 */
const timeRangeSchema = z
  .object({
    isOpen: z.boolean(),
    openingTime: z.string().optional(),
    closingTime: z.string().optional(),
  })
  // Se isOpen for true, openingTime e closingTime são obrigatórios e openingTime deve ser menor que closingTime
  .refine((data) => !data.isOpen || (data.openingTime && data.closingTime && data.openingTime < data.closingTime), {
    error: CAFETERIA_TEXTS.validation.openingHours.invalidRange,
  })

/**
 * Zod schema de horários de funcionamento de lanchonete.
 */
const openingHoursSchema = z.object({
  /**
   * Validação do horário de funcionamento para dias de semana. (obrigatório)
   */
  weekday: timeRangeSchema,
  /**
   * Validação do horário de funcionamento para sábado. (opcional)
   */
  saturday: timeRangeSchema.optional(),
})

/**
 * Zod schema para o formulário de lanchonetes.
 */
export const cafeteriaSchema = z.object({
  /**
   * Validação da seleção da unidade escolar.
   */
  unitId: z.string().nonempty(CAFETERIA_TEXTS.validation.unit.required),
  /**
   * Validação do campo de nome da lanchonete.
   */
  name: z.string().nonempty(CAFETERIA_TEXTS.validation.name.required),
  /**
   * Validação do campo de localização da lanchonete.
   */
  location: z.string(),
  /**
   * Validação do campo de horários de funcionamento da lanchonete.
   */
  openingHours: openingHoursSchema,
})

// Schemas específicos para campos de texto editáveis
export const cafeteriaNameSchema = cafeteriaSchema.pick({ name: true })
export const cafeteriaLocationSchema = cafeteriaSchema.pick({ location: true })

// Schema para editar horários
export const editOpeningHoursFormSchema = z.object({
  openingHours: openingHoursSchema,
})
