/**
 * Resultado de uma operação assíncrona.
 *
 * - Em caso de sucesso, retorna `success: true` e opcionalmente `data` com
 * o resultado da operação.
 * - Em caso de falha, retorna `success: false` e `message` com a descrição
 * do erro.
 */
export type ActionResult<T = void> =
  | { success: true; data?: T } // sucesso
  | { success: false; message: string } // erro
