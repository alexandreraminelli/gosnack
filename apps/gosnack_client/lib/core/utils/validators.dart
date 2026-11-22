import 'package:flutter/material.dart';
import 'package:gosnack_client/core/extensions/build_context_x.dart';

/// Validações em comum do aplicativo.
abstract class AppValidators {
  // Validation Methods --------------------------------------------------- //

  /// Validar campos obrigatórios.
  static String? validateRequired(
    String? value, {
    required BuildContext context,
  }) {
    if (value == null || value.trim().isEmpty) {
      return context.l10n.validationRequiredField;
    }
    return null;
  }
}
