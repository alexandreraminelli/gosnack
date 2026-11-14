import 'package:dartz/dartz.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:gosnack_client/core/errors/exceptions.dart';
import 'package:gosnack_client/core/errors/failures.dart';
import 'package:gosnack_client/features/onboarding/data/datasources/on_boarding_local_data_source.dart';
import 'package:gosnack_client/features/onboarding/data/repositories/on_boarding_repository_impl.dart';
import 'package:mocktail/mocktail.dart';

// Mock Dependencies -------------------------------------------------------- //

class MockOnBoardingLocalDataSource extends Mock
    implements OnBoardingLocalDataSource;

void main() {
  late MockOnBoardingLocalDataSource localDataSource;
  late OnBoardingRepositoryImpl repository;

  setUp(() {
    localDataSource = MockOnBoardingLocalDataSource();
    repository = OnBoardingRepositoryImpl(localDataSource);
  });

  group('cacheFirstTimer', () {
    test('returns right null when the data source succeeds', () async {
      when(
        () => localDataSource.cacheFirstTimer(),
      ).thenAnswer((_) async {});

      final result = await repository.cacheFirstTimer();

      expect(result, const Right<Failure, void>(null));
      verify(() => localDataSource.cacheFirstTimer()).called(1);
      verifyNoMoreInteractions(localDataSource);
    });

    test(
      'returns CacheFailure when the data source throws CacheException',
      () async {
        const exception = CacheException(message: 'Cache error');
        when(
          () => localDataSource.cacheFirstTimer(),
        ).thenThrow(exception);

        final result = await repository.cacheFirstTimer();

        expect(
          result,
          const Left<Failure, void>(
            CacheFailure(
              message: 'Cache error',
            ),
          ),
        );
        verify(() => localDataSource.cacheFirstTimer()).called(1);
        verifyNoMoreInteractions(localDataSource);
      },
    );
  });

  group('checkIfUserIsFirstTimer', () {
    test('returns the data source result when it succeeds', () async {
      when(
        () => localDataSource.checkIfUserIsFirstTimer(),
      ).thenAnswer((_) async => true);

      final result = await repository.checkIfUserIsFirstTimer();

      expect(result, const Right<Failure, bool>(true));
      verify(() => localDataSource.checkIfUserIsFirstTimer()).called(1);
      verifyNoMoreInteractions(localDataSource);
    });

    test(
      'returns CacheFailure when the data source throws CacheException',
      () async {
        const exception = CacheException(message: 'Cache error');
        when(
          () => localDataSource.checkIfUserIsFirstTimer(),
        ).thenThrow(exception);

        final result = await repository.checkIfUserIsFirstTimer();

        expect(
          result,
          const Left<Failure, bool>(
            CacheFailure(
              message: 'Cache error',
            ),
          ),
        );
        verify(() => localDataSource.checkIfUserIsFirstTimer()).called(1);
        verifyNoMoreInteractions(localDataSource);
      },
    );
  });
}
