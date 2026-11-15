import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:gosnack_client/core/theme/theme.dart';
import 'package:gosnack_client/l10n/app_localizations.dart';

/// Widget raiz do aplicativo GoSnack.
class GoSnackApp extends StatelessWidget {
  // Constructor ------------------------------------------------------------ //
  /// Construtor da classe [GoSnackApp].
  const new({
    required this.router,
    super.key,
  });

  // Properties ------------------------------------------------------------- //

  /// Instância do [GoRouter] para gerenciar a navegação do aplicativo.
  final GoRouter router;

  // Build Method ----------------------------------------------------------- //
  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      // Theme -------------------------------------------------------------- //
      theme: AppTheme.light,
      darkTheme: AppTheme.dark,

      // Internationalization ----------------------------------------------- //
      localizationsDelegates: AppLocalizations.localizationsDelegates,
      supportedLocales: AppLocalizations.supportedLocales,

      // Navigation --------------------------------------------------------- //
      routerConfig: router,
    );
  }
}
