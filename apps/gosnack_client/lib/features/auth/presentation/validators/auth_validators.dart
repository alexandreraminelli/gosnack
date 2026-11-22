import 'package:flutter/material.dart';

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

  /// 
  static String? validateEmail(
    String? value, {
    required BuildContext context,
  }) {
    final email = value?.trim() ?? '';
    if (email.is)
  }
}
