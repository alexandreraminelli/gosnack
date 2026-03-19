import { createUserAction } from "@/features/user-management/actions/create-user.action"
import { userKeys } from "@/features/user-management/hooks/queries/user.keys"
import { UserInsert, UserProfile } from "@/types/user.types"
import { useMutation, useQueryClient } from "@tanstack/react-query"

/**
 * Hook para criar um novo usuário.
 */
export function useCreateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: UserInsert) => {
      const result = await createUserAction(data)

      if (!result.success) {
        throw { message: result.message } // lançar erro para ser capturado no onError
      }

      // Sucesso: retornar usuário criado
      return result.data as UserProfile
    },

    onSuccess: () => queryClient.invalidateQueries({ queryKey: userKeys.all }), // invalidar cache para refetch automático
  })
}
