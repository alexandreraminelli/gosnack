// -------------------------------------------------------------------------- //

/// Utilitário para obter as variáveis de ambiente do projeto.
abstract class EnvConfig {
  // Environment Variable Names --------------------------------------------- //

  static const _supabaseUrlEnv = 'SUPABASE_URL';
  static const _supabasePublishableKeyEnv = 'SUPABASE_PUBLISHABLE_KEY';

  // Environment Variable Getters ------------------------------------------- //

  /// URL de conexão com o Supabase.
  static const String supabaseUrl = String.fromEnvironment(_supabaseUrlEnv);

  /// Chave de publicação do Supabase.
  static const String supabasePublishableKey = String.fromEnvironment(
    _supabasePublishableKeyEnv,
  );

  // Validate --------------------------------------------------------------- //

  static String _missingEnvMessage(String variable) =>
      'Environment variable $variable is not defined!';

  /// Valida se as variáveis de ambiente necessárias estão definidas.
  static void validate() {
    assert(supabaseUrl.isNotEmpty, _missingEnvMessage(_supabaseUrlEnv));
    assert(
      supabasePublishableKey.isNotEmpty,
      _missingEnvMessage(_supabasePublishableKeyEnv),
    );
  }
}
