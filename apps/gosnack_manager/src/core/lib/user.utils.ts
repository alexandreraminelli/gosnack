/**
 * Obter o nome completo a partir do primeiro e último nome.
 */
export function getFullName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`.trim();
}

/**
 * Obter as iniciais de um nome completo.
 */
export function getInitials(firstName: string, lastName: string): string | null {
  // Remover espaços
  firstName = firstName.trim();
  lastName = lastName.trim();

  if (!firstName && !lastName) {
    // Sem nome
    return null;
  } else if (firstName && !lastName) {
    // Apenas primeiro nome
    return `${firstName.charAt(0).toUpperCase()}${firstName.charAt(1).toLowerCase()}`.trim();
  } else if (!firstName && lastName) {
    // Apenas sobrenome
    return `${lastName.charAt(0).toUpperCase()}${lastName.charAt(1).toLowerCase()}`.trim();
  } else {
    // Primeiro e último nome
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase().trim();
  }
}
