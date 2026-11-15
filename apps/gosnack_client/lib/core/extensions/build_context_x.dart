import 'package:flutter/material.dart';
import 'package:gosnack_client/l10n/app_localizations.dart';

/// Extensão para acessar as traduções do aplicativo a partir do [BuildContext].
extension BuildContextL10n on BuildContext {
  /// Retorna a instância de [AppLocalizations] associada ao [BuildContext].
  AppLocalizations get l10n => AppLocalizations.of(this);
}
