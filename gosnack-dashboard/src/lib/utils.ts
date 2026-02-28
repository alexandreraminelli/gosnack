import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Função utilitária para combinar classes CSS usando `clsx` e `tailwind-merge`.
 *
 * @param inputs - Lista de classes CSS ou objetos de classes.
 *
 * @returns String combinada de classes CSS, com conflitos resolvidos pelo
 * `tailwind-merge`.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Função utilitária para obter as iniciais de um nome completo.
 */
export function getInitials(fullName: string) {
  return fullName
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}
