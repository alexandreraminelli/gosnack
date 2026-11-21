
import 'package:dartz/dartz.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:gosnack_client/core/errors/failures.dart';
import 'package:gosnack_client/features/auth/domain/entities/user.dart';
import 'package:gosnack_client/features/auth/domain/usecases/sign_up_with_email_and_password.dart';
import 'package:mocktail/mocktail.dart';

import '../repositories/auth_repository.mock.dart';

void main() {
  late MockAuthRepository repository;
  late SignUpWithEmailAndPassword useCase;

  const params = SignUpParams(
    email: 'alexandre@example.com',
    password: '123456',
    firstName: 'Alexandre',
    lastName: 'Raminelli',
  );

  setUp(() {
    repository = MockAuthRepository();
    useCase = SignUpWithEmailAndPassword(repository);
  });

  group('SignUpWithEmailAndPassword', () {
    test('delegates registration params and returns the created user', () async {
      const user = AppUser(
        uid: 'user-1',
        email: 'alexandre@example.com',
        firstName: 'Alexandre',
        lastName: 'Raminelli',
      );
      final expected = right<Failure, AppUser>(user);

      when(
        () => repository.signUpWithEmailAndPassword(
          email: params.email,
          password: params.password,
          firstName: params.firstName,
          lastName: params.lastName,
        ),
      ).thenAnswer((_) async => expected);

      final result = await useCase(params);

      expect(result, expected);
      verify(
        () => repository.signUpWithEmailAndPassword(
          email: params.email,
          password: params.password,
          firstName: params.firstName,
          lastName: params.lastName,
        ),
      ).called(1);
      verifyNoMoreInteractions(repository);
    });

    test('returns the repository failure unchanged', () async {
      const failure = ServerFailure(
        message: 'Email already registered',
        statusCode: 409,
      );
      final expected = left<Failure, AppUser>(failure);

      when(
        () => repository.signUpWithEmailAndPassword(
          email: params.email,
          password: params.password,
          firstName: params.firstName,
          lastName: params.lastName,
        ),
      ).thenAnswer((_) async => expected);

      final result = await useCase(params);

      expect(result, expected);
      verify(
        () => repository.signUpWithEmailAndPassword(
          email: params.email,
          password: params.password,
          firstName: params.firstName,
          lastName: params.lastName,
        ),
      ).called(1);
      verifyNoMoreInteractions(repository);
    });
  });
}