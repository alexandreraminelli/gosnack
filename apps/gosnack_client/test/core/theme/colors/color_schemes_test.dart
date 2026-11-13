import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:gosnack_client/core/theme/colors/app_palette.dart';
import 'package:gosnack_client/core/theme/colors/color_schemes.dart';
import 'package:gosnack_client/core/theme/colors/colors.dart';

void main() {
  group('AppColorSchemes', () {
    test('builds the light scheme from the light palette', () {
      final scheme = AppColorSchemes.light;
      const palette = AppPalette.light;

      expect(scheme.brightness, Brightness.light);
      expect(scheme.primary, AppColors.primary);
      expect(scheme.onPrimary, AppColors.primaryForeground);
      expect(scheme.error, AppColors.danger);
      expect(scheme.onError, AppColors.dangerForeground);
      expect(scheme.secondary, palette.defaultColor);
      expect(scheme.onSecondary, palette.defaultForeground);
      expect(scheme.surface, palette.background);
      expect(scheme.onSurface, palette.foreground);
      expect(scheme.onSurfaceVariant, palette.defaultScale[600]);
      expect(scheme.surfaceContainerLow, palette.defaultScale[50]);
      expect(scheme.surfaceContainer, palette.defaultScale[100]);
      expect(scheme.surfaceContainerHigh, palette.defaultScale[200]);
      expect(scheme.surfaceContainerHighest, palette.defaultScale[300]);
      expect(scheme.outline, palette.defaultColor);
      expect(scheme.outlineVariant, palette.divider);
    });

    test('builds the dark scheme from the dark palette', () {
      final scheme = AppColorSchemes.dark;
      final palette = AppPalette.dark;

      expect(scheme.brightness, Brightness.dark);
      expect(scheme.secondary, palette.defaultColor);
      expect(scheme.onSecondary, palette.defaultForeground);
      expect(scheme.surface, palette.background);
      expect(scheme.onSurface, palette.foreground);
      expect(scheme.onSurfaceVariant, palette.defaultScale[600]);
      expect(scheme.surfaceContainerLow, palette.defaultScale[50]);
      expect(scheme.surfaceContainer, palette.defaultScale[100]);
      expect(scheme.surfaceContainerHigh, palette.defaultScale[200]);
      expect(scheme.surfaceContainerHighest, palette.defaultScale[300]);
      expect(scheme.outlineVariant, palette.divider);
    });
  });
}
