import 'package:dartz/dartz.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:gosnack_client/core/errors/exceptions.dart';
import 'package:gosnack_client/core/errors/failures.dart';
import 'package:gosnack_client/features/auth/data/datasources/auth_remote_data_source.dart';
import 'package:gosnack_client/features/auth/data/models/user_model.dart';
import 'package:gosnack_client/features/auth/data/repositories/auth_repository_impl.dart';
import 'package:mocktail/mocktail.dart';

import '../../../../core/utils/app_logger.mock.dart';

class MockAuthRemoteDataSource extends Mock implements AuthRemoteDataSource;

void main() {
  late MockAuthRemoteDataSource remoteDataSource;
  late MockAppLogger logger;
  late AuthRepositoryImpl repository;

  const user = UserModel(
    uid: 'user-1',
    email: 'alexandre@example.com',
    firstName: 'Alexandre',
    lastName: 'Raminelli',
  );

  setUp(() {
    remoteDataSource = MockAuthRemoteDataSource();
    logger = MockAppLogger();
    repository = AuthRepositoryImpl(remoteDataSource, logger);
  });

  group('signUpWithEmailAndPassword', () {
    test('returns the created user', () async {
      when(
        () => remoteDataSource.signUpWithEmailAndPassword(
          email: user.email,
          password: '123456',
          firstName: user.firstName,
          lastName: user.lastName!,
        ),
      ).thenAnswer((_) async => user);

      final result = await repository.signUpWithEmailAndPassword(
        email: user.email,
        password: '123456',
        firstName: user.firstName,
        lastName: user.lastName!,
      );

      expect(result, const Right<Failure, UserModel>(user));
      verify(
        () => remoteDataSource.signUpWithEmailAndPassword(
          email: user.email,
          password: '123456',
          firstName: user.firstName,
          lastName: user.lastName!,
        ),
      ).called(1);
    });

    test('returns ServerFailure when ServerException is thrown', () async {
      const exception = ServerException(message: 'Email already registered');

      when(
        () => remoteDataSource.signUpWithEmailAndPassword(
          email: user.email,
          password: '123456',
          firstName: user.firstName,
          lastName: user.lastName!,
        ),
      ).thenThrow(exception);

      final result = await repository.signUpWithEmailAndPassword(
        email: user.email,
        password: '123456',
        firstName: user.firstName,
        lastName: user.lastName!,
      );

      expect(
        result,
        const Left<Failure, UserModel>(
          ServerFailure(message: 'Email already registered'),
        ),
      );
      verify(
        () => logger.error(
          any(),
          error: exception,
          stackTrace: any(named: 'stackTrace'),
        ),
      ).called(1);
    });
  });

  group('loginWithEmailAndPassword', () {
    test('returns the authenticated user', () async {
      when(
        () => remoteDataSource.loginWithEmailAndPassword(
          email: user.email,
          password: '123456',
        ),
      ).thenAnswer((_) async => user);

      final result = await repository.loginWithEmailAndPassword(
        email: user.email,
        password: '123456',
      );

      expect(result, const Right<Failure, UserModel>(user));
      verify(
        () => remoteDataSource.loginWithEmailAndPassword(
          email: user.email,
          password: '123456',
        ),
      ).called(1);
    });

    test('returns unexpected ServerFailure for generic Exception', () async {
      when(
        () => remoteDataSource.loginWithEmailAndPassword(
          email: user.email,
          password: '123456',
        ),
      ).thenThrow(Exception('Unexpected'));

      final result = await repository.loginWithEmailAndPassword(
        email: user.email,
        password: '123456',
      );

      expect(
        result,
        const Left<Failure, UserModel>(
          ServerFailure(message: 'Ocorreu um erro inesperado'),
        ),
      );
      verify(
        () => logger.error(
          any(),
          error: any(named: 'error'),
          stackTrace: any(named: 'stackTrace'),
        ),
      ).called(1);
    });
  });

  group('signInWithGoogle', () {
    test('returns the authenticated user', () async {
      when(
        () => remoteDataSource.loginWithGoogle(),
      ).thenAnswer((_) async => user);

      final result = await repository.signInWithGoogle();

      expect(result, const Right<Failure, UserModel>(user));
      verify(() => remoteDataSource.loginWithGoogle()).called(1);
    });

    test('returns ServerFailure when sign-in throws', () async {
      const exception = ServerException(message: 'Google sign-in failed');
      when(
        () => remoteDataSource.loginWithGoogle(),
      ).thenThrow(exception);

      final result = await repository.signInWithGoogle();

      expect(
        result,
        const Left<Failure, UserModel>(
          ServerFailure(message: 'Google sign-in failed'),
        ),
      );
    });
  });

  group('logout', () {
    test('returns Right<void> when logout succeeds', () async {
      when(
        () => remoteDataSource.logout(),
      ).thenAnswer((_) async {});

      final result = await repository.logout();

      expect(result, const Right<Failure, void>(null));
      verify(() => remoteDataSource.logout()).called(1);
    });

    test('returns ServerFailure when logout throws', () async {
      const exception = ServerException(message: 'Unable to logout');
      when(
        () => remoteDataSource.logout(),
      ).thenThrow(exception);

      final result = await repository.logout();

      expect(
        result,
        const Left<Failure, void>(
          ServerFailure(message: 'Unable to logout'),
        ),
      );
    });
  });

  test('exposes the current user', () {
    when(() => remoteDataSource.currentUser).thenReturn(user);

    expect(repository.currentUser, user);
  });

  test('exposes auth state changes', () {
    final changes = Stream<UserModel?>.value(user);
    when(() => remoteDataSource.authStateChanges).thenAnswer((_) => changes);

    expect(repository.authStateChanges, changes);
  });
}
