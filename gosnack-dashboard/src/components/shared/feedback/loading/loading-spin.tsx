import { ICONS } from "@/constants/icons"
import { HugeiconsIcon } from "@hugeicons/react"

/**
 * Spinner de carregamento.
 */
export default function LoadingSpin() {
  return <HugeiconsIcon icon={ICONS.loading} className="animate-spin" />
}
