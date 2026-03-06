import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { ICONS } from "@/constants/icons"
import { ROUTES } from "@/constants/navigation/routes"
import { ACCOUNT_TEXTS } from "@/constants/texts/account.texts"
import { signOutUser } from "@/features/authentication/shared/services/auth"
import { HugeiconsIcon } from "@hugeicons/react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

/**
 * Botão de logout.
 */
export default function LogoutButton() {
  const router = useRouter()

  /**
   * Função para lidar com o logout.
   */
  function handleLogout() {
    toast.promise(
      signOutUser().then((result) => {
        if (!result.success) throw new Error(result.message)
        return result
      }),
      {
        loading: ACCOUNT_TEXTS.logout.loading,
        error: (e) => ({ message: ACCOUNT_TEXTS.logout.error, description: e.message }),
        success: () => {
          router.push(ROUTES.login) // Redirecionar pro login
          return ACCOUNT_TEXTS.logout.success
        },
      },
    )
  }

  return (
    <DropdownMenuItem variant="destructive" onClick={handleLogout}>
      <HugeiconsIcon icon={ICONS.auth.logout} />
      {ACCOUNT_TEXTS.logout.action}
    </DropdownMenuItem>
  )
}
