// ignore_for_file: public_member_api_docs Nomes autodescritivos.

import 'package:flutter/material.dart';
import 'package:gosnack_client/core/theme/dimensions/sizes.dart';

/// Contantes de espaçamentos EdgeInsets para padding e margin.
abstract final class KSpacing {
  // -- Todos os Cantos --- ------------------------------------------------- //
  static const EdgeInsets allXs = EdgeInsets.all(KSizes.xs);
  static const EdgeInsets allSm = EdgeInsets.all(KSizes.sm);
  static const EdgeInsets allMd = EdgeInsets.all(KSizes.md);
  static const EdgeInsets allLg = EdgeInsets.all(KSizes.lg);
  static const EdgeInsets allXl = EdgeInsets.all(KSizes.xl);
  static const EdgeInsets allXl2 = EdgeInsets.all(KSizes.xl2);
  static const EdgeInsets allXl3 = EdgeInsets.all(KSizes.xl3);
  static const EdgeInsets allXl4 = EdgeInsets.all(KSizes.xl4);
  static const EdgeInsets allXl5 = EdgeInsets.all(KSizes.xl5);
  static const EdgeInsets allXl6 = EdgeInsets.all(KSizes.xl6);
  static const EdgeInsets allXl7 = EdgeInsets.all(KSizes.xl7);
  static const EdgeInsets allXl8 = EdgeInsets.all(KSizes.xl8);
  static const EdgeInsets allXl9 = EdgeInsets.all(KSizes.xl9);

  // -- Apenas Eixo Horizontal ---------------------------------------------- //
  static const EdgeInsets horizontalXs = EdgeInsets.symmetric(
    horizontal: KSizes.xs,
  );
  static const EdgeInsets horizontalSm = EdgeInsets.symmetric(
    horizontal: KSizes.sm,
  );
  static const EdgeInsets horizontalMd = EdgeInsets.symmetric(
    horizontal: KSizes.md,
  );
  static const EdgeInsets horizontalLg = EdgeInsets.symmetric(
    horizontal: KSizes.lg,
  );
  static const EdgeInsets horizontalXl = EdgeInsets.symmetric(
    horizontal: KSizes.xl,
  );
  static const EdgeInsets horizontalXl2 = EdgeInsets.symmetric(
    horizontal: KSizes.xl2,
  );
  static const EdgeInsets horizontalXl3 = EdgeInsets.symmetric(
    horizontal: KSizes.xl3,
  );
  static const EdgeInsets horizontalXl4 = EdgeInsets.symmetric(
    horizontal: KSizes.xl4,
  );
  static const EdgeInsets horizontalXl5 = EdgeInsets.symmetric(
    horizontal: KSizes.xl5,
  );
  static const EdgeInsets horizontalXl6 = EdgeInsets.symmetric(
    horizontal: KSizes.xl6,
  );
  static const EdgeInsets horizontalXl7 = EdgeInsets.symmetric(
    horizontal: KSizes.xl7,
  );
  static const EdgeInsets horizontalXl8 = EdgeInsets.symmetric(
    horizontal: KSizes.xl8,
  );
  static const EdgeInsets horizontalXl9 = EdgeInsets.symmetric(
    horizontal: KSizes.xl9,
  );

  static const EdgeInsets horizontalScreenPadding = EdgeInsets.symmetric(
    horizontal: KSizes.horizontalScreenPadding,
  );

  // -- Apenas Eixo Vertical ------------------------------------------------ //
  static const EdgeInsets verticalXs = EdgeInsets.symmetric(
    vertical: KSizes.xs,
  );
  static const EdgeInsets verticalSm = EdgeInsets.symmetric(
    vertical: KSizes.sm,
  );
  static const EdgeInsets verticalMd = EdgeInsets.symmetric(
    vertical: KSizes.md,
  );
  static const EdgeInsets verticalLg = EdgeInsets.symmetric(
    vertical: KSizes.lg,
  );
  static const EdgeInsets verticalXl = EdgeInsets.symmetric(
    vertical: KSizes.xl,
  );
  static const EdgeInsets verticalXl2 = EdgeInsets.symmetric(
    vertical: KSizes.xl2,
  );
  static const EdgeInsets verticalXl3 = EdgeInsets.symmetric(
    vertical: KSizes.xl3,
  );
  static const EdgeInsets verticalXl4 = EdgeInsets.symmetric(
    vertical: KSizes.xl4,
  );
  static const EdgeInsets verticalXl5 = EdgeInsets.symmetric(
    vertical: KSizes.xl5,
  );
  static const EdgeInsets verticalXl6 = EdgeInsets.symmetric(
    vertical: KSizes.xl6,
  );
  static const EdgeInsets verticalXl7 = EdgeInsets.symmetric(
    vertical: KSizes.xl7,
  );
  static const EdgeInsets verticalXl8 = EdgeInsets.symmetric(
    vertical: KSizes.xl8,
  );
  static const EdgeInsets verticalXl9 = EdgeInsets.symmetric(
    vertical: KSizes.xl9,
  );

  // -- Buttons ------------------------------------------------------------- //
  static const EdgeInsets buttonPaddingMd = EdgeInsets.symmetric(
    horizontal: KSizes.md,
    vertical: KSizes.sm,
  );

  // -- Inputs -------------------------------------------------------------- //
  static const EdgeInsets inputPaddingSm = EdgeInsets.symmetric(
    horizontal: 12,
    vertical: 8,
  );
  static const EdgeInsets inputPaddingLg = EdgeInsets.symmetric(
    horizontal: 12,
    vertical: 14,
  );
}
