import 'package:flutter_test/flutter_test.dart';
import 'package:gosnack_client/core/theme/colors/app_palette.dart';
import 'package:gosnack_client/core/theme/colors/colors.dart';

void main() {
  group('AppPalette', () {
    test('defines the light palette with the expected colors', () {
      expect(AppPalette.light.background, AppColors.white);
      expect(AppPalette.light.foreground, AppColors.onWhite);
      expect(AppPalette.light.divider, AppColors.blackAlpha15);
      expect(AppPalette.light.defaultColor, AppColors.zinc300);
      expect(AppPalette.light.defaultForeground, AppColors.black);
      expect(AppPalette.light.primaryScale, AppColors.primaryScale);
      expect(AppPalette.light.defaultScale, AppColors.zincScale);
    });

    test('defines the dark palette with reversed scales', () {
      expect(AppPalette.dark.background, AppColors.black);
      expect(AppPalette.dark.foreground, AppColors.onBlack);
      expect(AppPalette.dark.divider, AppColors.whiteAlpha15);
      expect(AppPalette.dark.defaultColor, AppColors.zinc700);
      expect(AppPalette.dark.defaultForeground, AppColors.white);
      expect(AppPalette.dark.primaryScale[50], AppColors.primary900);
      expect(AppPalette.dark.defaultScale[50], AppColors.zinc900);
      expect(AppPalette.dark.successScale[50], AppColors.success900);
      expect(AppPalette.dark.warningScale[50], AppColors.warning900);
      expect(AppPalette.dark.dangerScale[50], AppColors.danger900);
    });

    test('returns itself from copyWith', () {
      expect(AppPalette.light.copyWith(), same(AppPalette.light));
    });

    test('lerps to the other palette after the midpoint', () {
      expect(
        AppPalette.light.lerp(AppPalette.dark, 0.49),
        same(AppPalette.light),
      );
      expect(
        AppPalette.light.lerp(AppPalette.dark, 0.5),
        same(AppPalette.dark),
      );
      expect(AppPalette.light.lerp(null, 1), same(AppPalette.light));
    });
  });
}
