import { UNITS_TEXTS } from "@/constants/texts/entities/units.texts"
import { z } from "zod/v4"

/**
 * Zod schema para o formulário de unidades.
 */
export const unitSchema = z.object({
  /**
   * Validação do campo de nome da unidade.
   */
  name: z.string().nonempty(UNITS_TEXTS.validation.name.required),
})
