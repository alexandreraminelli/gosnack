/**
 * Função utilitária para obter o nome completo a partir do primeiro e último nome.
 */
export function getFullName(firstName: string, lastName: string) {
  return `${firstName} ${lastName}`
}

/**
 * Função utilitária para obter as iniciais de um nome completo.
 * Se um dos valores for ausente, retorna "??".
 */
export function getInitials(firstName: string, lastName: string) {
  if (!firstName || !lastName) return "??"
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
}
