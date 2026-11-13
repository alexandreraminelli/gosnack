import 'package:flutter_test/flutter_test.dart';
import 'package:gosnack_client/core/errors/exceptions.dart';
import 'package:gosnack_client/features/onboarding/data/datasources/shared_preferences_on_boarding_data_source.dart';
import 'package:mocktail/mocktail.dart';
import 'package:shared_preferences/shared_preferences.dart';

// -- Mock Dependencies ----------------------------------------------------- //

class MockSharedPreferences extends Mock implements SharedPreferences;

void main() {
  late MockSharedPreferences prefs;
  late SharedPreferencesOnBoardingDataSource dataSource;

  setUp(() {
    prefs = MockSharedPreferences();
    dataSource = SharedPreferencesOnBoardingDataSource(prefs);
  });

  group('cacheFirstTimer', () {
    test('stores false under the first timer key', () async {
      when(
        () => prefs.setBool('first_timer', false),
      ).thenAnswer((_) async => true);

      await dataSource.cacheFirstTimer();

      verify(() => prefs.setBool('first_timer', false)).called(1);
      verifyNoMoreInteractions(prefs);
    });

    test('throws CacheException when storage fails', () {
      when(
        () => prefs.setBool('first_timer', false),
      ).thenThrow(Exception('write failed'));

      expect(
        dataSource.cacheFirstTimer,
        throwsA(
          isA<CacheException>().having(
            (exception) => exception.message,
            'message',
            'Exception: write failed',
          ),
        ),
      );
    });
  });

  group('checkIfUserIsFirstTimer', () {
    test('returns the stored first timer value', () async {
      when(
        () => prefs.getBool('first_timer'),
      ).thenReturn(false);

      final result = await dataSource.checkIfUserIsFirstTimer();

      expect(result, isFalse);
      verify(() => prefs.getBool('first_timer')).called(1);
      verifyNoMoreInteractions(prefs);
    });

    test('returns true when no first timer value is stored', () async {
      when(
        () => prefs.getBool('first_timer'),
      ).thenReturn(null);

      final result = await dataSource.checkIfUserIsFirstTimer();

      expect(result, isTrue);
      verify(() => prefs.getBool('first_timer')).called(1);
      verifyNoMoreInteractions(prefs);
    });

    test('throws CacheException when storage fails', () {
      when(
        () => prefs.getBool('first_timer'),
      ).thenThrow(Exception('read failed'));

      expect(
        dataSource.checkIfUserIsFirstTimer,
        throwsA(
          isA<CacheException>().having(
            (exception) => exception.message,
            'message',
            'Exception: read failed',
          ),
        ),
      );
    });
  });
}
