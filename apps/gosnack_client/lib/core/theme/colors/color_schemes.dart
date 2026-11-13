// ignore_for_file: public_member_api_docs - Os nomes das cores são
// autodescritivas

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:gosnack_client/core/theme/colors/app_palette.dart';
import 'package:gosnack_client/core/theme/colors/colors.dart';

/// Esquema de cores do app para o modo claro e escuro.
abstract final class AppColorSchemes {
  // Properties ------------------------------------------------------------- //

  /// Esquema de cores do app no modo claro.
  static final light = _build(Brightness.light, AppPalette.light);

  /// Esquema de cores do app no modo escuro.
  static final dark = _build(Brightness.dark, AppPalette.dark);

  // Private Methods -------------------------------------------------------- //

  static ColorScheme _build(Brightness brightness, AppPalette palette) {
    return ColorScheme(
      brightness: brightness,

      // Iguais Nos Dois Temas ---------------------------------------------- //
      primary: AppColors.primary,
      onPrimary: AppColors.primaryForeground,

      error: AppColors.danger,
      onError: AppColors.dangerForeground,

      // Variam Com O Tema -------------------------------------------------- //
      secondary: palette.defaultColor,
      onSecondary: palette.defaultForeground,

      surface: palette.background,
      onSurface: palette.foreground,
      onSurfaceVariant: palette.defaultScale[600],
      surfaceContainerLow: palette.defaultScale[50],
      surfaceContainer: palette.defaultScale[100],
      surfaceContainerHigh: palette.defaultScale[200],
      surfaceContainerHighest: palette.defaultScale[300],

      outline: palette.defaultColor,
      outlineVariant: palette.divider,
    );
  }
}
