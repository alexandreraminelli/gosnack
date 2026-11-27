"use client";

import { useRouter } from "next/navigation";

import { createClient } from "@/core/supabase/client";
import { Button } from "@/ui/primitives/button";
import { useTranslations } from "next-intl";
import { HugeiconsIcon } from "@hugeicons/react";
import { ICONS } from "@/core/constants/icons";
import { toast } from "@/ui/primitives/toast";
import { ROUTES } from "@/core/constants/navigation/routes";

/**
 * Botão de logout.
 *
 * @see https://supabase.com/library/docs/nextjs/password-based-auth
 */
export function LogoutButton() {
  // Textos
  const text = useTranslations("core.auth.logout");

  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();

    // Toast de logout
    toast.promise(
      supabase.auth.signOut(), //
      {
        loading: text("loading.title"),
        success: text("success.title"),
        error: text("error.title"),
      },
    );

    router.push(ROUTES.auth.login);
  };

  return (
    <Button onClick={logout} variant="outline">
      <HugeiconsIcon icon={ICONS.auth.logout} />
      <span>{text("label")}</span>
    </Button>
  );
}
