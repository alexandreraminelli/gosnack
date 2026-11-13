import 'package:dartz/dartz.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:gosnack_client/core/errors/failures.dart';
import 'package:gosnack_client/features/onboarding/domain/usecases/cache_first_timer.dart';
import 'package:mocktail/mocktail.dart';

import '../repositories/on_boarding_repository.mock.dart';

void main() {
  late MockOnBoardingRepository repository;
  late CacheFirstTimer useCase;

  setUp(() {
    repository = MockOnBoardingRepository();
    useCase = CacheFirstTimer(repository);
  });

  group('CacheFirstTimer', () {
    test(
      'delegates caching to the repository and returns its result',
      () async {
        final expected = right<Failure, void>(null);

        when(
          () => repository.cacheFirstTimer(),
        ).thenAnswer((_) async => expected);

        final result = await useCase();

        expect(result, expected);
        verify(() => repository.cacheFirstTimer()).called(1);
        verifyNoMoreInteractions(repository);
      },
    );
  });
}
