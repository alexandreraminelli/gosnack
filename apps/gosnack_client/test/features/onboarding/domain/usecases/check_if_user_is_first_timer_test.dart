import 'package:dartz/dartz.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:gosnack_client/core/errors/failures.dart';
import 'package:gosnack_client/features/onboarding/domain/usecases/check_if_user_is_first_timer.dart';
import 'package:mocktail/mocktail.dart';

import '../repositories/on_boarding_repository.mock.dart';

void main() {
  late MockOnBoardingRepository repository;
  late CheckIfUserIsFirstTimer useCase;

  setUp(() {
    repository = MockOnBoardingRepository();
    useCase = CheckIfUserIsFirstTimer(repository);
  });

  group('CheckIfUserIsFirstTimer', () {
    test(
      'returns true when the repository identifies a first-time user',
      () async {
        final expected = right<Failure, bool>(true);

        when(
          () => repository.checkIfUserIsFirstTimer(),
        ).thenAnswer((_) async => expected);

        final result = await useCase();

        expect(result, expected);
        verify(() => repository.checkIfUserIsFirstTimer()).called(1);
        verifyNoMoreInteractions(repository);
      },
    );

    test(
      'returns false when the repository identifies a returning user',
      () async {
        final expected = right<Failure, bool>(false);

        when(
          () => repository.checkIfUserIsFirstTimer(),
        ).thenAnswer((_) async => expected);

        final result = await useCase();

        expect(result, expected);
        verify(() => repository.checkIfUserIsFirstTimer()).called(1);
        verifyNoMoreInteractions(repository);
      },
    );
  });
}
