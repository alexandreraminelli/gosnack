import 'package:dartz/dartz.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:gosnack_client/core/errors/failures.dart';
import 'package:gosnack_client/features/auth/domain/entities/user.dart';
import 'package:gosnack_client/features/auth/domain/usecases/sign_in_with_google.dart';
import 'package:mocktail/mocktail.dart';

import '../repositories/auth_repository.mock.dart';

void main() {
  late MockAuthRepository repository;
  late SignInWithGoogle useCase;

  setUp(() {
    repository = MockAuthRepository();
    useCase = SignInWithGoogle(repository);
  });

  group('SignInWithGoogle', () {
    test('returns the authenticated user', () async {
      const user = AppUser(
        uid: 'google-user-1',
        email: 'alexandre@example.com',
        firstName: 'Alexandre',
        lastName: 'Raminelli',
      );
      final expected = right<Failure, AppUser>(user);

      when(
        () => repository.signInWithGoogle(),
      ).thenAnswer((_) async => expected);

      final result = await useCase();

      expect(result, expected);
      verify(() => repository.signInWithGoogle()).called(1);
      verifyNoMoreInteractions(repository);
    });

    test('returns the repository failure unchanged', () async {
      const failure = ServerFailure(
        message: 'Google authentication failed',
        statusCode: 401,
      );
      final expected = left<Failure, AppUser>(failure);

      when(
        () => repository.signInWithGoogle(),
      ).thenAnswer((_) async => expected);

      final result = await useCase();

      expect(result, expected);
      verify(() => repository.signInWithGoogle()).called(1);
      verifyNoMoreInteractions(repository);
    });
  });
}