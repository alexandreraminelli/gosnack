import 'package:dartz/dartz.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:gosnack_client/core/errors/failures.dart';
import 'package:gosnack_client/features/auth/domain/entities/user.dart';
import 'package:gosnack_client/features/auth/domain/usecases/login_with_email_and_password.dart';
import 'package:mocktail/mocktail.dart';

import '../repositories/auth_repository.mock.dart';

void main() {
  late MockAuthRepository repository;
  late LoginWithEmailAndPassword useCase;

  const params = LoginParams(
    email: 'alexandre@example.com',
    password: '123456',
  );

  setUp(() {
    repository = MockAuthRepository();
    useCase = LoginWithEmailAndPassword(repository);
  });

  group('LoginWithEmailAndPassword', () {
    test('delegates login params and returns the authenticated user', () async {
      const user = AppUser(
        uid: 'user-1',
        email: 'alexandre@example.com',
        firstName: 'Alexandre',
        lastName: 'Raminelli',
      );
      final expected = right<Failure, AppUser>(user);

      when(
        () => repository.loginWithEmailAndPassword(
          email: params.email,
          password: params.password,
        ),
      ).thenAnswer((_) async => expected);

      final result = await useCase(params);

      expect(result, expected);
      verify(
        () => repository.loginWithEmailAndPassword(
          email: params.email,
          password: params.password,
        ),
      ).called(1);
      verifyNoMoreInteractions(repository);
    });

    test('returns the repository failure unchanged', () async {
      const failure = ServerFailure(
        message: 'Invalid login credentials',
        statusCode: 401,
      );
      final expected = left<Failure, AppUser>(failure);

      when(
        () => repository.loginWithEmailAndPassword(
          email: params.email,
          password: params.password,
        ),
      ).thenAnswer((_) async => expected);

      final result = await useCase(params);

      expect(result, expected);
      verify(
        () => repository.loginWithEmailAndPassword(
          email: params.email,
          password: params.password,
        ),
      ).called(1);
      verifyNoMoreInteractions(repository);
    });
  });
  testWidgets('login with email and password ...', (tester) async {
    // TODO: Implement test
  });
}
