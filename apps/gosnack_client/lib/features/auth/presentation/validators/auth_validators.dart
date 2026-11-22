import 'package:flutter/material.dart';
import 'package:gosnack_client/core/extensions/build_context_x.dart';

/// Validadores dos campos de autenticação.
///
/// Usado nos formulários de login e cadastro.
abstract final class AuthValidators {
  // Field Properties ------------------------------------------------------- //

  static const _minPasswordLength = 8;

  // Regex ------------------------------------------------------------------ /
  //

  static final _emailRegex = RegExp(r'^[^@\s]+@[^@\s]+\.[^@\s]+$');

  /// Validar nomes: sem caracteres especiais, números ou emojis.
  /// Apenas letras, espaços e hifens.
  static final _nameRegex = RegExp(r'^[a-zA-ZÀ-ÿ\s-]+$');

  // Validation Methods ----------------------------------------------------- //

  /// Validar campo de e-mail.
  static String? validateEmail(
    String? value, {
    required BuildContext context,
  }) {
    final email = value?.trim() ?? '';
    if (email.isEmpty) return context.l10n.validationRequiredField;
    if (!_emailRegex.hasMatch(email)) {
      return context.l10n.validationInvalidEmail;
    }
    return null;
  }

  /// Validar campo de criação de senha.
  static String? validateCreatePassword(
    String? value, {
    required BuildContext context,
  }) {
    final password = value ?? '';
    if (password.isEmpty) return context.l10n.validationRequiredField;
    if (password.length < _minPasswordLength) {
      return context.l10n.validationPasswordTooShort(_minPasswordLength);
    }
    return null;
  }

  /// Validar campos de nome (primeiro e último).
  static String? validateName(
    String? value, {
    required BuildContext context,
  }) {
    final name = value?.trim() ?? '';
    if (name.isEmpty) return context.l10n.validationRequiredField;
    if (!_nameRegex.hasMatch(name)) {
      return context.l10n.validationInvalidName;
    }
    return null;
  }
}
