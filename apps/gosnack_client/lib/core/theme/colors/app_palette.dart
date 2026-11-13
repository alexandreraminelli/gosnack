import 'package:flutter/material.dart';
import 'package:gosnack_client/core/theme/colors/color_scale.dart';
import 'package:gosnack_client/core/theme/colors/colors.dart';

/// Cores que variam entre o tema claro e o escuro.
@immutable
class AppPalette extends ThemeExtension<AppPalette> {
  // Constructor ------------------------------------------------------------ //

  /// Construtor do [AppPalette] que recebe todas as cores necessárias para o
  /// tema.
  const new({
    required this.background,
    required this.foreground,
    required this.divider,
    required this.defaultColor,
    required this.defaultForeground,
    required this.primaryScale,
    required this.defaultScale,
    required this.successScale,
    required this.warningScale,
    required this.dangerScale,
  });

  // Properties ------------------------------------------------------------- //

  /// Cor de fundo do app.
  final Color background;

  /// Cor de primeiro plano do app (texto, ícones, etc.).
  final Color foreground;

  /// Cor de divisória do app (linhas, bordas, etc.).
  final Color divider;

  /// Cor padrão do app (usada em cards, containers, etc).
  final Color defaultColor;

  /// Cor de primeiro plano padrão do app (usada em texto, ícones, etc).
  final Color defaultForeground;

  /// Escala da cor primária do app.
  final ColorScale primaryScale;

  /// Escala da cor neutra do app.
  final ColorScale defaultScale;

  /// Escala da cor de sucesso do app.
  final ColorScale successScale;

  /// Escala da cor de aviso do app.
  final ColorScale warningScale;

  /// Escala da cor de perigo do app.
  final ColorScale dangerScale;

  // Light Colors ----------------------------------------------------------- //

  /// Paleta de cores no modo claro.
  static const light = AppPalette(
    background: AppColors.white,
    foreground: AppColors.whiteForeground,

    divider: AppColors.blackAlpha15,

    defaultColor: AppColors.zinc300,
    defaultForeground: AppColors.black,

    primaryScale: AppColors.primaryScale,
    defaultScale: AppColors.zincScale,
    successScale: AppColors.successScale,
    warningScale: AppColors.warningScale,
    dangerScale: AppColors.dangerScale,
  );

  // Dark Colors ------------------------------------------------------------ //

  /// Paleta de cores pro modo escuro.
  static final dark = AppPalette(
    background: AppColors.black,
    foreground: AppColors.blackForeground,

    divider: AppColors.whiteAlpha15,

    defaultColor: AppColors.zinc700,
    defaultForeground: AppColors.white,

    primaryScale: AppColors.primaryScale.reversed,
    defaultScale: AppColors.zincScale.reversed,
    successScale: AppColors.successScale.reversed,
    warningScale: AppColors.warningScale.reversed,
    dangerScale: AppColors.dangerScale.reversed,
  );

  // ThemeExtension --------------------------------------------------------- //

  @override
  AppPalette copyWith() => this;

  @override
  ThemeExtension<AppPalette> lerp(
    covariant ThemeExtension<AppPalette>? other,
    double t,
  ) => other == null || t < 0.5 ? this : other;
}

/// Extensão do [BuildContext] para acessar a paleta de cores do app.
extension AppPaletteX on BuildContext {
  /// Retorna a paleta de cores do app para o tema atual.
  AppPalette get palette => Theme.of(this).extension<AppPalette>()!;
}
