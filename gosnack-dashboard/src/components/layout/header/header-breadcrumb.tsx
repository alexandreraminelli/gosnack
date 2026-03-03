"use client"

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Skeleton } from "@/components/ui/skeleton"
import { useBreadcrumbs } from "@/hooks/use-breadcrumbs"
import Link from "next/link"
import React from "react"

/**
 * Breadcrumb do header.
 *
 * Delega toda a lógica de resolução para `useBreadcrumbs`.
 * O componente apenas renderiza, não conhece rotas nem domínio.
 */
export default function HeaderBreadcrumb() {
  // Obter segmentos e estado de carregamento do hook
  const { segments, isLoading } = useBreadcrumbs()

  // Skeleton durante loading
  if (isLoading) {
    return <Skeleton className="h-4 w-48" />
  }

  // Renderizar breadcrumb
  return (
    <Breadcrumb className="max-sm:hidden">
      <BreadcrumbList>
        {segments.map((segment, index) => {
          /** Se é o último segmento. */
          const isLast = index === segments.length - 1

          return (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {!isLast && segment.href ? (
                  <BreadcrumbLink asChild>
                    <Link href={segment.href}>{segment.label}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{segment.label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
