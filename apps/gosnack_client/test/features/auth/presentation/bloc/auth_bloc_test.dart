import 'package:dartz/dartz.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:gosnack_client/core/errors/failures.dart';
import 'package:gosnack_client/features/auth/domain/entities/user.dart';
import 'package:gosnack_client/features/auth/domain/usecases/login_with_email_and_password.dart';
import 'package:gosnack_client/features/auth/domain/usecases/logout.dart';
import 'package:gosnack_client/features/auth/domain/usecases/sign_in_with_google.dart';
import 'package:gosnack_client/features/auth/domain/usecases/sign_up_with_email_and_password.dart';
import 'package:gosnack_client/features/auth/presentation/bloc/auth_bloc.dart';
import 'package:mocktail/mocktail.dart';

// Mock States -------------------------------------------------------------- //
class MockSignUpWithEmailAndPassword extends Mock
    implements SignUpWithEmailAndPassword;

class MockLoginWithEmailAndPassword extends Mock
    implements LoginWithEmailAndPassword;

class MockSignInWithGoogle extends Mock implements SignInWithGoogle;

class MockLogout extends Mock implements Logout;

// Tests -------------------------------------------------------------------- //
void main() {
  late MockSignUpWithEmailAndPassword signUpWithEmailAndPassword;
  late MockLoginWithEmailAndPassword loginWithEmailAndPassword;
  late MockSignInWithGoogle signInWithGoogle;
  late MockLogout logout;
  late AuthBloc bloc;

  const user = AppUser(
    uid: 'user-1',
    email: 'alexandre@example.com',
    firstName: 'Alexandre',
    lastName: 'Raminelli',
  );

  setUp(() {
    signUpWithEmailAndPassword = MockSignUpWithEmailAndPassword();
    loginWithEmailAndPassword = MockLoginWithEmailAndPassword();
    signInWithGoogle = MockSignInWithGoogle();
    logout = MockLogout();
    bloc = AuthBloc(
      signUpWithEmailAndPassword: signUpWithEmailAndPassword,
      loginWithEmailAndPassword: loginWithEmailAndPassword,
      signInWithGoogle: signInWithGoogle,
      logout: logout,
    );
  });

  tearDown(() async {
    await bloc.close();
  });

  test('starts with AuthInitial', () {
    expect(bloc.state, const AuthInitial());
  });

  group('AuthSignUpRequested', () {
    const event = AuthSignUpRequested(
      email: 'alexandre@example.com',
      password: '123456',
      firstName: 'Alexandre',
      lastName: 'Raminelli',
    );
    const params = SignUpParams(
      email: 'alexandre@example.com',
      password: '123456',
      firstName: 'Alexandre',
      lastName: 'Raminelli',
    );

    test('emits loading and success when sign up succeeds', () async {
      when(
        () => signUpWithEmailAndPassword(params),
      ).thenAnswer((_) async => const Right<Failure, AppUser>(user));

      final states = expectLater(
        bloc.stream,
        emitsInOrder([
          const AuthLoading(),
          const AuthSuccess(user),
        ]),
      );

      bloc.add(event);
      await states;

      verify(() => signUpWithEmailAndPassword(params)).called(1);
    });

    test('emits loading and error when sign up fails', () async {
      const failure = ServerFailure(
        message: 'Unable to create account',
        statusCode: 400,
      );
      when(
        () => signUpWithEmailAndPassword(params),
      ).thenAnswer((_) async => const Left<Failure, AppUser>(failure));

      final states = expectLater(
        bloc.stream,
        emitsInOrder([
          const AuthLoading(),
          const AuthError('Unable to create account'),
        ]),
      );

      bloc.add(event);
      await states;

      verify(() => signUpWithEmailAndPassword(params)).called(1);
    });
  });

  group('AuthLoginRequested', () {
    const event = AuthLoginRequested(
      email: 'alexandre@example.com',
      password: '123456',
    );
    const params = LoginParams(
      email: 'alexandre@example.com',
      password: '123456',
    );

    test('emits loading and success when login succeeds', () async {
      when(
        () => loginWithEmailAndPassword(params),
      ).thenAnswer((_) async => const Right<Failure, AppUser>(user));

      final states = expectLater(
        bloc.stream,
        emitsInOrder([
          const AuthLoading(),
          const AuthSuccess(user),
        ]),
      );

      bloc.add(event);
      await states;

      verify(() => loginWithEmailAndPassword(params)).called(1);
    });

    test('emits loading and error when login fails', () async {
      const failure = ServerFailure(
        message: 'Invalid login credentials',
        statusCode: 401,
      );
      when(
        () => loginWithEmailAndPassword(params),
      ).thenAnswer((_) async => const Left<Failure, AppUser>(failure));

      final states = expectLater(
        bloc.stream,
        emitsInOrder([
          const AuthLoading(),
          const AuthError('Invalid login credentials'),
        ]),
      );

      bloc.add(event);
      await states;

      verify(() => loginWithEmailAndPassword(params)).called(1);
    });
  });

  group('AuthGoogleSignInRequested', () {
    test('emits loading and success when Google sign-in succeeds', () async {
      when(
        () => signInWithGoogle(),
      ).thenAnswer((_) async => const Right<Failure, AppUser>(user));

      final states = expectLater(
        bloc.stream,
        emitsInOrder([
          const AuthLoading(),
          const AuthSuccess(user),
        ]),
      );

      bloc.add(const AuthGoogleSignInRequested());
      await states;

      verify(() => signInWithGoogle()).called(1);
    });

    test('emits loading and error when Google sign-in fails', () async {
      const failure = NetworkFailure(message: 'No internet connection');
      when(
        () => signInWithGoogle(),
      ).thenAnswer((_) async => const Left<Failure, AppUser>(failure));

      final states = expectLater(
        bloc.stream,
        emitsInOrder([
          const AuthLoading(),
          const AuthError('No internet connection'),
        ]),
      );

      bloc.add(const AuthGoogleSignInRequested());
      await states;

      verify(() => signInWithGoogle()).called(1);
    });
  });

  group('AuthLogoutRequested', () {
    test('emits loading and initial when logout succeeds', () async {
      when(
        () => logout(),
      ).thenAnswer((_) async => const Right<Failure, void>(null));

      final states = expectLater(
        bloc.stream,
        emitsInOrder([
          const AuthLoading(),
          const AuthInitial(),
        ]),
      );

      bloc.add(const AuthLogoutRequested());
      await states;

      verify(() => logout()).called(1);
    });

    test('emits loading and error when logout fails', () async {
      const failure = ServerFailure(
        message: 'Unable to logout',
        statusCode: 500,
      );
      when(
        () => logout(),
      ).thenAnswer((_) async => const Left<Failure, void>(failure));

      final states = expectLater(
        bloc.stream,
        emitsInOrder([
          const AuthLoading(),
          const AuthError('Unable to logout'),
        ]),
      );

      bloc.add(const AuthLogoutRequested());
      await states;

      verify(() => logout()).called(1);
    });
  });
}
