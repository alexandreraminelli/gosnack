"use client"

import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { UI_TEXTS } from "@/constants/texts/ui.texts"
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

  /**
   * Elementos colapsados no mobile.
   */
  const collapsedSegments = segments.slice(0, Math.max(0, segments.length - 1))

  // Renderizar breadcrumb
  return (
    <Breadcrumb className={cn(className)}>
      <BreadcrumbList>
        {/* Dropdown do Ellipsis. Primeiro elemento no mobile, oculto no Desktop */}
        {collapsedSegments.length > 0 && (
          <>
            <BreadcrumbItem className="sm:hidden">
              {/* Botão de ellipsis */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon-sm" variant="ghost">
                    <BreadcrumbEllipsis />
                    <span className="sr-only">{UI_TEXTS.navigation.expandBreadcrumb}</span>
                  </Button>
                </DropdownMenuTrigger>

                {/* Dropdown */}
                <DropdownMenuContent align="start">
                  <DropdownMenuGroup>
                    {collapsedSegments.map((segment, index) => (
                      <DropdownMenuItem key={index} asChild>
                        {segment.href ? <Link href={segment.href}>{segment.label}</Link> : <span>{segment.label}</span>}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>

            {/* Separador do Ellipsis */}
            <BreadcrumbSeparator className="sm:hidden" />
          </>
        )}

        {/* Segmentos normais */}

        {segments.map((segment, index) => {
          /** Se é o último segmento. */
          const isLast = index === segments.length - 1
          /** Se o segmento fica oculto no mobile. */
          const isCollapsed = index < segments.length - 1

          return (
            <React.Fragment key={index}>
              {/* Segmento */}
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
