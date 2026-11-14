import 'package:dartz/dartz.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:gosnack_client/core/errors/failures.dart';
import 'package:gosnack_client/features/onboarding/domain/usecases/cache_first_timer.dart';
import 'package:gosnack_client/features/onboarding/domain/usecases/check_if_user_is_first_timer.dart';
import 'package:gosnack_client/features/onboarding/presentation/cubit/on_boarding_cubit.dart';
import 'package:mocktail/mocktail.dart';

class MockCacheFirstTimer extends Mock implements CacheFirstTimer;

class MockCheckIfUserIsFirstTimer extends Mock
    implements CheckIfUserIsFirstTimer;

void main() {
  late MockCacheFirstTimer cacheFirstTimer;
  late MockCheckIfUserIsFirstTimer checkIfUserIsFirstTimer;
  late OnBoardingCubit cubit;

  setUp(() {
    cacheFirstTimer = MockCacheFirstTimer();
    checkIfUserIsFirstTimer = MockCheckIfUserIsFirstTimer();
    cubit = OnBoardingCubit(
      cacheFirstTimer: cacheFirstTimer,
      checkIfUserIsFirstTimer: checkIfUserIsFirstTimer,
    );
  });

  tearDown(() async {
    await cubit.close();
  });

  test('starts with OnBoardingInitial', () {
    expect(cubit.state, const OnBoardingInitial());
  });

  group('cacheFirstTimer', () {
    test('emits loading and success states when it succeeds', () async {
      when(() => cacheFirstTimer()).thenAnswer(
        (_) async => const Right<Failure, void>(null),
      );

      final states = expectLater(
        cubit.stream,
        emitsInOrder([
          const CachingFirstTimer(),
          const UserCached(),
        ]),
      );

      await cubit.cacheFirstTimer();
      await states;

      verify(() => cacheFirstTimer()).called(1);
    });

    test('emits loading and error states when it fails', () async {
      when(() => cacheFirstTimer()).thenAnswer(
        (_) async => const Left<Failure, void>(
          CacheFailure(message: 'Cache error'),
        ),
      );

      final states = expectLater(
        cubit.stream,
        emitsInOrder([
          const CachingFirstTimer(),
          const OnBoardingError('Cache error'),
        ]),
      );

      await cubit.cacheFirstTimer();
      await states;

      verify(() => cacheFirstTimer()).called(1);
    });
  });

  group('checkIfUserIsFirstTimer', () {
    test('emits loading and status states for a first-time user', () async {
      when(() => checkIfUserIsFirstTimer()).thenAnswer(
        (_) async => const Right<Failure, bool>(true),
      );

      final states = expectLater(
        cubit.stream,
        emitsInOrder([
          const CheckingIfUserIsFirstTimer(),
          const OnBoardingStatus(isFirstTimer: true),
        ]),
      );

      await cubit.checkIfUserIsFirstTimer();
      await states;

      verify(() => checkIfUserIsFirstTimer()).called(1);
    });

    test('emits loading and status states for a returning user', () async {
      when(() => checkIfUserIsFirstTimer()).thenAnswer(
        (_) async => const Right<Failure, bool>(false),
      );

      final states = expectLater(
        cubit.stream,
        emitsInOrder([
          const CheckingIfUserIsFirstTimer(),
          const OnBoardingStatus(isFirstTimer: false),
        ]),
      );

      await cubit.checkIfUserIsFirstTimer();
      await states;

      verify(() => checkIfUserIsFirstTimer()).called(1);
    });

    test('treats a check failure as a first-time user', () async {
      when(() => checkIfUserIsFirstTimer()).thenAnswer(
        (_) async => const Left<Failure, bool>(
          CacheFailure(message: 'Cache error'),
        ),
      );

      final states = expectLater(
        cubit.stream,
        emitsInOrder([
          const CheckingIfUserIsFirstTimer(),
          const OnBoardingStatus(isFirstTimer: true),
        ]),
      );

      await cubit.checkIfUserIsFirstTimer();
      await states;

      verify(() => checkIfUserIsFirstTimer()).called(1);
    });
  });
}
