import { ICONS } from "@/constants/icons";
import { HugeiconsIcon } from "@hugeicons/react";

/**
 * Spinner de carregamento.
 */
export default function LoadingSpinner() {
  return <HugeiconsIcon icon={ICONS.feedback.loading} className="animate-spin" />;
}
