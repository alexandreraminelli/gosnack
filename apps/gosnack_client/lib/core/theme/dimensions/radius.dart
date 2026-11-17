// ignore_for_file: public_member_api_docs Nomes autodescritivos.

import 'package:flutter/material.dart';
import 'package:gosnack_client/core/theme/dimensions/sizes.dart';

/// Raio de borda do aplicativo.
abstract final class KRadius {
  static final sm = BorderRadius.circular(KSizes.radiusSm);
  static final md = BorderRadius.circular(KSizes.radiusMd);
  static final lg = BorderRadius.circular(KSizes.radiusLg);
  static final full = BorderRadius.circular(KSizes.radiusFull);
}
