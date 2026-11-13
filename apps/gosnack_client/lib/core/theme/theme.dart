import 'package:flutter/material.dart';
import 'package:gosnack_client/core/theme/colors/app_palette.dart';
import 'package:gosnack_client/core/theme/colors/color_schemes.dart';
import 'package:gosnack_client/core/theme/colors/colors.dart';
import 'package:gosnack_client/core/theme/sizes.dart';
import 'package:gosnack_client/core/theme/typography/typography.dart';

/// Tema do aplicativo.
abstract final class AppTheme {
  // Light/Dark Theme ------------------------------------------------------- //

  /// Tema claro do aplicativo.
  static final ThemeData light = _build(
    AppColorSchemes.light,
    AppPalette.light,
  );

  /// Tema escuro do aplicativo.
  static final ThemeData dark = _build(
    AppColorSchemes.dark,
    AppPalette.dark,
  );

  // Theme Builder ---------------------------------------------------------- //
  static ThemeData _build(ColorScheme scheme, AppPalette palette) {
    return ThemeData(
      useMaterial3: true,

      // Colors ------------------------------------------------------------- //
      colorScheme: scheme,
      scaffoldBackgroundColor: palette.background,
      primaryColor: AppColors.primary,
      focusColor: AppColors.primary,

      // Typography --------------------------------------------------------- //
      fontFamily: AppTypography.fontFamily,
      textTheme: AppTypography.textTheme.apply(
        bodyColor: scheme.onSurface,
        displayColor: scheme.onSurface,
      ),

      // Extensions --------------------------------------------------------- //
      extensions: [palette],

      // Material Widgets --------------------------------------------------- //
      dividerTheme: DividerThemeData(
        color: palette.divider,
        thickness: KSizes.borderSm,
        space: KSizes.borderSm,
      ),
    );
  }
}
