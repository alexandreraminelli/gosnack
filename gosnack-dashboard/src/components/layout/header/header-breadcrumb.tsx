"use client"

import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Skeleton } from "@/components/ui/skeleton"
import { useBreadcrumbs } from "@/hooks/use-breadcrumbs"
import { cn } from "@/lib/utils"
import { ClassValue } from "clsx"
import Link from "next/link"
import React from "react"

/**
 * Props de `HeaderBreadcrumb`.
 */
interface Props {
  className?: ClassValue
}

/**
 * Breadcrumb do header.
 *
 * Delega toda a lógica de resolução para `useBreadcrumbs`.
 * O componente apenas renderiza, não conhece rotas nem domínio.
 */
export default function HeaderBreadcrumb({ className }: Props) {
  // Obter segmentos e estado de carregamento do hook
  const { segments, isLoading } = useBreadcrumbs()

  // Skeleton durante loading
  if (isLoading) {
    return <Skeleton className="h-4 w-48" />
  }

  // Renderizar breadcrumb
  return (
    <Breadcrumb className={cn(className)}>
      <BreadcrumbList>
        {segments.map((segment, index) => {
          /** Se é o último segmento. */
          const isLast = index === segments.length - 1
          /** Se é o segmento anterior. */
          const isPrevious = index === segments.length - 2
          /** Se o segmento fica oculto no mobile. */
          const isCollapsed = !isLast && !isPrevious

          return (
            <React.Fragment key={index}>
              {/* Elipse visível só no mobile */}
              {isPrevious && segments.length > 2 && (
                <>
                  <BreadcrumbItem className="sm:hidden">
                    <BreadcrumbEllipsis />
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="sm:hidden" />
                </>
              )}

              {/* Segmentos */}
              <BreadcrumbItem
                className={cn(isCollapsed && "hidden sm:inline-flex")} // ocultar segmentos anteriores no mobile
              >
                {!isLast && segment.href ? (
                  // Segmentos anteriores
                  <BreadcrumbLink asChild>
                    <Link href={segment.href}>{segment.label}</Link>
                  </BreadcrumbLink>
                ) : (
                  // Segmento atual
                  <BreadcrumbPage>{segment.label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>

              {/* Separador */}
              {!isLast && (
                <BreadcrumbSeparator
                  className={cn(isCollapsed && "hidden sm:inline-flex")} // ocultar segmentos anteriores no mobile
                />
              )}
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
