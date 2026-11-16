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

    required this.content1,
    required this.content2,
    required this.content3,
    required this.content4,

    required this.content1foreground,
    required this.content2foreground,
    required this.content3foreground,
    required this.content4foreground,

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
  final Color content1;

  /// Escala da cor neutra do app.
  final Color content2;

  /// Escala da cor neutra do app.
  final Color content3;

  /// Escala da cor neutra do app.
  final Color content4;

  /// Foreground da cor neutra do app.
  final Color content1foreground;

  /// Foreground da cor neutra do app.
  final Color content2foreground;

  /// Foreground da cor neutra do app.
  final Color content3foreground;

  /// Foreground da cor neutra do app.
  final Color content4foreground;

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
    foreground: AppColors.onWhite,

    divider: AppColors.blackAlpha15,

    defaultColor: AppColors.zinc300,
    defaultForeground: AppColors.black,

    content1: AppColors.zinc50,
    content2: AppColors.zinc100,
    content3: AppColors.zinc300,
    content4: AppColors.zinc300,

    content1foreground: AppColors.zinc900,
    content2foreground: AppColors.zinc800,
    content3foreground: AppColors.zinc700,
    content4foreground: AppColors.zinc600,

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
    foreground: AppColors.onBlack,

    divider: AppColors.whiteAlpha15,

    defaultColor: AppColors.zinc700,
    defaultForeground: AppColors.white,

    content1: AppColors.zinc900,
    content2: AppColors.zinc800,
    content3: AppColors.zinc700,
    content4: AppColors.zinc600,

    content1foreground: AppColors.zinc300,
    content2foreground: AppColors.zinc200,
    content3foreground: AppColors.zinc100,
    content4foreground: AppColors.zinc50,

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
