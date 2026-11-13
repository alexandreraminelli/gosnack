import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:gosnack_client/core/theme/colors/color_scale.dart';

void main() {
  group('ColorScale', () {
    const shades = [
      Color(0xFF000032),
      Color(0xFF000064),
      Color(0xFF000128),
      Color(0xFF000192),
      Color(0xFF000256),
      Color(0xFF000320),
      Color(0xFF000384),
      Color(0xFF000448),
      Color(0xFF000512),
      Color(0xFF000576),
    ];
    const scale = ColorScale(shades);

    test('returns the color for each supported shade', () {
      expect(scale[50], shades[0]);
      expect(scale[100], shades[1]);
      expect(scale[200], shades[2]);
      expect(scale[300], shades[3]);
      expect(scale[400], shades[4]);
      expect(scale[500], shades[5]);
      expect(scale[600], shades[6]);
      expect(scale[700], shades[7]);
      expect(scale[800], shades[8]);
      expect(scale[900], shades[9]);
    });

    test('rejects unsupported shades', () {
      expect(() => scale[25], throwsA(isA<AssertionError>()));
    });

    test('reverses the shade order', () {
      final reversed = scale.reversed;

      expect(reversed[50], shades[9]);
      expect(reversed[500], shades[4]);
      expect(reversed[900], shades[0]);
    });
  });
}
