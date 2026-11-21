import 'package:dartz/dartz.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:gosnack_client/core/errors/failures.dart';
import 'package:gosnack_client/features/auth/domain/usecases/logout.dart';
import 'package:mocktail/mocktail.dart';

import '../repositories/auth_repository.mock.dart';

void main() {
  late MockAuthRepository repository;
  late Logout useCase;

  setUp(() {
    repository = MockAuthRepository();
    useCase = Logout(repository);
  });

  group('Logout', () {
    test('delegates logout and returns success', () async {
      final expected = right<Failure, void>(null);

      when(
        () => repository.logout(),
      ).thenAnswer((_) async => expected);

      final result = await useCase();

      expect(result, expected);
      verify(() => repository.logout()).called(1);
      verifyNoMoreInteractions(repository);
    });

    test('returns the repository failure unchanged', () async {
      const failure = ServerFailure(
        message: 'Could not complete logout',
        statusCode: 500,
      );
      final expected = left<Failure, void>(failure);

      when(
        () => repository.logout(),
      ).thenAnswer((_) async => expected);

      final result = await useCase();

      expect(result, expected);
      verify(() => repository.logout()).called(1);
      verifyNoMoreInteractions(repository);
    });
  });
}