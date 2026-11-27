/**
 * Papel do usuário no sistema.
 */
export type UserRole = "student" | "teacher" | "coordinator" | "staff" | "guardian" | "employee" | "manager" | "admin";

/**
 * Papéis que são apenas clientes do aplicativo.
 */
const CUSTOMER_ROLES: ReadonlySet<UserRole> = new Set(["student", "teacher", "coordinator", "staff"]);

/**
 * Retorna `true` se o usuário for cliente.
 */
export const isCustomerRole = (role: UserRole): boolean => CUSTOMER_ROLES.has(role);

/**
 * Papéis que são funcionários de lanchonete.
 */
const SNACKBAR_EMPLOYEE_ROLES: ReadonlySet<UserRole> = new Set(["employee", "manager"]);

/**
 * Retorna `true` se o usuário for funcionário de lanchonete.
 */
export const isSnackbarEmployeeRole = (role: UserRole): boolean => SNACKBAR_EMPLOYEE_ROLES.has(role);
