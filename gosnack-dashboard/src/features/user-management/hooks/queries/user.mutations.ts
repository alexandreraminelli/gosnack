import { createUserAction } from "@/features/user-management/actions/create-user.action"
import { userKeys } from "@/features/user-management/hooks/queries/user.keys"
import { UserInsert } from "@/types/user.types"
import { useMutation, useQueryClient } from "@tanstack/react-query"

/**
 * Hook para criar um novo usuário.
 */
export function useCreateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UserInsert) => createUserAction(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: userKeys.all }), // invalidar cache para refetch automático
  })
}
