import { unitKeys } from "@/features/units/hooks/queries/unit.keys"
import { unitService } from "@/features/units/services/unit.service"
import { useQuery } from "@tanstack/react-query"

/**
 * Hook para buscar todas as unidades.
 */
export function useUnits() {
  return useQuery({
    queryKey: unitKeys.list(),
    queryFn: () => unitService.getAll(),
  })
}

/**
 * Hook para buscar uma unidade específica pelo ID.
 */
export function useUnit(unitId?: string) {
  return useQuery({
    queryKey: unitKeys.detail(unitId),
    queryFn: () => unitService.getById(unitId!),
    enabled: !!unitId, // habilitar apenas se unitId estiver presente
  })
}

/**
 * Hook para verificar se já existe uma unidade com o mesmo nome.
 *
 * @param name Nome da unidade a ser verificada.
 * @param excludeId ID da unidade a ser excluída da verificação (para edição).
 */
export function useCheckDuplicateUnitName(name: string, excludeId?: string) {
  // Normalizar nome
  const normalizedName = name.trim().toLowerCase()

  return useQuery({
    queryKey: unitKeys.checkDuplicateName(normalizedName, excludeId),
    queryFn: () => unitService.checkDuplicateName(normalizedName, excludeId),
    enabled: normalizedName.length > 0, // habilitar apenas se o nome não for vazio
  })
}
