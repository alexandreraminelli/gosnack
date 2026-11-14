import 'package:flutter_test/flutter_test.dart';
import 'package:gosnack_client/core/router/session.dart';

void main() {
  group(
    'onBoarding isFirstTimer',
    () {
      test('completes onboarding and notifies listeners', () {
        final session = AppSession(isFirstTimer: true);
        var notifications = 0;

        session
          ..addListener(() => notifications++)
          ..completeOnBoarding();

        expect(session.isFirstTimer, isFalse);
        expect(notifications, 1);
      });

      test('does nothing when onboarding is already completed', () {
        final session = AppSession(isFirstTimer: false);
        var notifications = 0;

        session
          ..addListener(() => notifications++)
          ..completeOnBoarding();

        expect(session.isFirstTimer, isFalse);
        expect(notifications, 0);
      });
    },
  );
}
