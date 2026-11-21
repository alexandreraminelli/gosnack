// -------------------------------------------------------------------------- //

import 'package:gosnack_client/core/utils/logger.dart';

/// Utilitário para obter as variáveis de ambiente do projeto.
class EnvConfig {
  const new _();

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

  static String _missingEnvMessage(List<String> missing) {
    return 'Missing environment variables: ${missing.join(', ')}.\n'
        'Run `flutter run --dart-define-from-file=config/dev.json` to provide '
        'the necessary environment variables.\n'
        'Check the `config/dev.json` file for the required variables.';
  }

  /// Valida se as variáveis de ambiente necessárias estão definidas.
  static void validate() {
    /// Lista de variáveis de ambiente ausentes.
    final missing = <String>[
      if (supabaseUrl.isEmpty) _supabaseUrlEnv,
      if (supabasePublishableKey.isEmpty) _supabasePublishableKeyEnv,
    ];

    // Lançar exceção se houver variáveis ausentes.
    if (missing.isNotEmpty) {
      LoggerHelp().error(_missingEnvMessage(missing));
      throw StateError(_missingEnvMessage(missing));
    }
  }
}
