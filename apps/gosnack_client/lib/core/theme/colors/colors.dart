// ignore_for_file: public_member_api_docs - Os nomes das cores são
// autodescritivas

import 'package:flutter/material.dart';
import 'package:gosnack_client/core/theme/colors/color_scale.dart';

/// Cores primitivas do aplicativo, usadas para construir o tema.
@immutable
abstract final class AppColors {
  // Base ------------------------------------------------------------------- //

  static const Color white = Colors.white;
  static const Color black = Colors.black;

  static const Color whiteForeground = Color(0xFF11181C);
  static const Color blackForeground = Color(0xFFECEDEE);

  // Transparências --------------------------------------------------------- //

  static const Color overlay = Color(0x4D000000);
  static const Color blackAlpha15 = Color(0x26111111);
  static const Color whiteAlpha15 = Color(0x26FFFFFF);

  // Primary ---------------------------------------------------------------- //

  static const Color primary50 = Color(0xFFFFF9ED);
  static const Color primary100 = Color(0xFFFFF2D4);
  static const Color primary200 = Color(0xFFFFE0A9);
  static const Color primary300 = Color(0xFFFFC972);
  static const Color primary400 = Color(0xFFFDA73A);
  static const Color primary500 = Color(0xFFFC8F1A);
  static const Color primary600 = Color(0xFFED7009);
  static const Color primary700 = Color(0xFFC4540A);
  static const Color primary800 = Color(0xFF9C4210);
  static const Color primary900 = Color(0xFF7D3811);

  static const ColorScale primaryScale = ColorScale([
    primary50,
    primary100,
    primary200,
    primary300,
    primary400,
    primary500,
    primary600,
    primary700,
    primary800,
    primary900,
  ]);

  static const Color primary = primary500;
  static const Color primaryForeground = black;

  // Zinc ------------------------------------------------------------------- //

  static const Color zinc50 = Color(0xFFFAFAFA);
  static const Color zinc100 = Color(0xFFF4F4F5);
  static const Color zinc200 = Color(0xFFE4E4E7);
  static const Color zinc300 = Color(0xFFD4D4D8);
  static const Color zinc400 = Color(0xFFA1A1AA);
  static const Color zinc500 = Color(0xFF71717A);
  static const Color zinc600 = Color(0xFF52525B);
  static const Color zinc700 = Color(0xFF3F3F46);
  static const Color zinc800 = Color(0xFF27272A);
  static const Color zinc900 = Color(0xFF18181B);

  static const ColorScale zincScale = ColorScale([
    zinc50,
    zinc100,
    zinc200,
    zinc300,
    zinc400,
    zinc500,
    zinc600,
    zinc700,
    zinc800,
    zinc900,
  ]);

  // Success ---------------------------------------------------------------- //

  static const Color success50 = Color(0xFFE8FAF0);
  static const Color success100 = Color(0xFFD1F4E0);
  static const Color success200 = Color(0xFFA2E9C1);
  static const Color success300 = Color(0xFF74DFA2);
  static const Color success400 = Color(0xFF45D483);
  static const Color success500 = Color(0xFF17C964);
  static const Color success600 = Color(0xFF12A150);
  static const Color success700 = Color(0xFF0E793C);
  static const Color success800 = Color(0xFF095028);
  static const Color success900 = Color(0xFF052814);

  static const ColorScale successScale = ColorScale([
    success50,
    success100,
    success200,
    success300,
    success400,
    success500,
    success600,
    success700,
    success800,
    success900,
  ]);

  static const Color success = success500;
  static const Color successForeground = black;

  // Warning ---------------------------------------------------------------- //

  static const Color warning50 = Color(0xFFFEFCE8);
  static const Color warning100 = Color(0xFFFDEDD3);
  static const Color warning200 = Color(0xFFFBDBA7);
  static const Color warning300 = Color(0xFFF9C97C);
  static const Color warning400 = Color(0xFFF7B750);
  static const Color warning500 = Color(0xFFF5A524);
  static const Color warning600 = Color(0xFFC4841D);
  static const Color warning700 = Color(0xFF936316);
  static const Color warning800 = Color(0xFF62420E);
  static const Color warning900 = Color(0xFF312107);

  static const ColorScale warningScale = ColorScale([
    warning50,
    warning100,
    warning200,
    warning300,
    warning400,
    warning500,
    warning600,
    warning700,
    warning800,
    warning900,
  ]);

  static const Color warning = warning500;
  static const Color warningForeground = black;

  // Danger ----------------------------------------------------------------- //

  static const Color danger50 = Color(0xFFFEE7EF);
  static const Color danger100 = Color(0xFFFDD0DF);
  static const Color danger200 = Color(0xFFFAA0BF);
  static const Color danger300 = Color(0xFFF871A0);
  static const Color danger400 = Color(0xFFF54180);
  static const Color danger500 = Color(0xFFF31260);
  static const Color danger600 = Color(0xFFC20E4D);
  static const Color danger700 = Color(0xFF920B3A);
  static const Color danger800 = Color(0xFF610726);
  static const Color danger900 = Color(0xFF310413);

  static const ColorScale dangerScale = ColorScale([
    danger50,
    danger100,
    danger200,
    danger300,
    danger400,
    danger500,
    danger600,
    danger700,
    danger800,
    danger900,
  ]);

  static const Color danger = danger500;
  static const Color dangerForeground = white;
}
