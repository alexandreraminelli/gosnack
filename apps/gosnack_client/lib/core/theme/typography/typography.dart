// ignore_for_file: public_member_api_docs Nomes de propriedades tipográficas
// são autoexplicativos

import 'package:flutter/material.dart';

/// Tipografia do aplicativo.
abstract final class AppTypography {
  // Font Family ------------------------------------------------------------ //

  /// Fonte padrão do aplicativo.
  static const String fontFamily = 'Geist';

  // Font Sizes ------------------------------------------------------------- //

  static const fontXs = 12.0;
  static const fontSm = 14.0;
  static const fontMd = 16.0;
  static const fontLg = 18.0;
  static const fontXl = 20.0;
  static const font2xl = 24.0;
  static const font3xl = 30.0;
  static const font4xl = 36.0;
  static const font5xl = 48.0;
  static const font6xl = 60.0;
  static const font7xl = 72.0;
  static const font8xl = 96.0;
  static const font9xl = 128.0;

  // Font Weight ------------------------------------------------------------ //

  static const FontWeight light = FontWeight.w300;
  static const FontWeight regular = FontWeight.w400;
  static const FontWeight medium = FontWeight.w500;
  static const FontWeight semiBold = FontWeight.w600;
  static const FontWeight bold = FontWeight.w700;
  static const FontWeight extrabold = FontWeight.w800;

  // Height ----------------------------------------------------------------- //

  static const heightTightest = 1.1;
  static const heightTighter = 1.17;
  static const heightTight = 1.25;
  static const heightSnug = 1.33;
  static const heightCompact = 1.39;
  static const heightNormal = 1.5;
  static const heightRelaxed = 1.75;

  // TextTheme -------------------------------------------------------------- //

  /// Tipografia padrão do aplicativo.
  static TextTheme get textTheme => const TextTheme(
    // Display -------------------------------------------------------------- //
    displayLarge: TextStyle(
      fontSize: font4xl,
      fontWeight: semiBold,
      height: heightTightest,
    ),
    displayMedium: TextStyle(
      fontSize: font3xl,
      fontWeight: semiBold,
      height: heightTighter,
    ),
    displaySmall: TextStyle(
      fontSize: font2xl,
      fontWeight: semiBold,
      height: heightTight,
    ),

    // Headline ------------------------------------------------------------- //
    headlineLarge: TextStyle(
      fontSize: font3xl,
      fontWeight: semiBold,
      height: heightTighter,
    ),
    headlineMedium: TextStyle(
      fontSize: font2xl,
      fontWeight: semiBold,
      height: heightTight,
    ),
    headlineSmall: TextStyle(
      fontSize: fontXl,
      fontWeight: semiBold,
      height: heightSnug,
    ),

    // Title ---------------------------------------------------------------- //
    titleLarge: TextStyle(
      fontSize: fontXl,
      fontWeight: semiBold,
      height: heightSnug,
    ),
    titleMedium: TextStyle(
      fontSize: fontLg,
      fontWeight: semiBold,
      height: heightCompact,
    ),
    titleSmall: TextStyle(
      fontSize: fontMd,
      fontWeight: semiBold,
      height: heightNormal,
    ),

    // Body ----------------------------------------------------------------- //
    bodyLarge: TextStyle(
      fontSize: fontMd,
      fontWeight: regular,
      height: heightRelaxed,
    ),
    bodyMedium: TextStyle(
      fontSize: fontSm,
      fontWeight: regular,
      height: heightNormal,
    ),
    bodySmall: TextStyle(
      fontSize: fontXs,
      fontWeight: regular,
      height: heightTight,
    ),

    // Label ---------------------------------------------------------------- //
    labelLarge: TextStyle(
      fontSize: fontSm,
      fontWeight: medium,
      height: heightNormal,
    ),
    labelMedium: TextStyle(
      fontSize: fontXs,
      fontWeight: medium,
      height: heightTight,
    ),
    labelSmall: TextStyle(
      fontSize: fontXs,
      fontWeight: medium,
      height: heightTight,
    ),
  );
}
