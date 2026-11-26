/**
 * Códigos de erro do Supabase Auth.
 *
 * @see https://supabase.com/docs/guides/auth/debugging/error-codes
 */
export const AUTH_ERROR_CODES = ["email_address_invalid", "email_exists", "email_not_confirmed", "invalid_credentials", "otp_disabled", "otp_expired", "over_email_send_rate_limit", "over_request_rate_limit", "reauthentication_needed", "reauthentication_not_valid", "request_timeout", "same_password", "session_expired", "signup_disabled", "user_already_exists", "user_banned", "user_not_found", "weak_password", "unknown"] as const;

/**
 * Tipagem para os códigos de erro do Supabase Auth.
 *
 * @see https://supabase.com/docs/guides/auth/debugging/error-codes
 */
export type AuthErrorCode = (typeof AUTH_ERROR_CODES)[number];
