import 'package:flutter_test/flutter_test.dart';
import 'package:gosnack_client/core/errors/exceptions.dart';
import 'package:gosnack_client/features/auth/data/datasources/supabase_auth_data_source.dart';
import 'package:google_sign_in_platform_interface/google_sign_in_platform_interface.dart';
import 'package:mocktail/mocktail.dart';
import 'package:supabase_flutter/supabase_flutter.dart' as supabase;

class MockGoTrueClient extends Mock implements supabase.GoTrueClient {}

class MockGoogleSignInPlatform extends GoogleSignInPlatform with Mock {}

void main() {
  late MockGoTrueClient auth;
  late MockGoogleSignInPlatform googleSignIn;
  late SupabaseAuthDataSource dataSource;

  setUpAll(() {
    registerFallbackValue(const SignOutParams());
  });

  const user = supabase.User(
    id: 'user-1',
    appMetadata: {},
    userMetadata: {
      'first_name': 'Alexandre',
      'last_name': 'Raminelli',
    },
    aud: 'authenticated',
    createdAt: '2026-01-01T00:00:00Z',
    email: 'alexandre@example.com',
  );

  setUp(() {
    auth = MockGoTrueClient();
    googleSignIn = MockGoogleSignInPlatform();
    GoogleSignInPlatform.instance = googleSignIn;
    dataSource = SupabaseAuthDataSource(auth);
  });

  group('currentUser', () {
    test('returns the mapped current user', () {
      when(() => auth.currentUser).thenReturn(user);

      final result = dataSource.currentUser;

      expect(result?.uid, 'user-1');
      expect(result?.email, 'alexandre@example.com');
      expect(result?.firstName, 'Alexandre');
      expect(result?.lastName, 'Raminelli');
    });

    test('returns null when there is no authenticated user', () {
      when(() => auth.currentUser).thenReturn(null);

      expect(dataSource.currentUser, isNull);
    });
  });

  group('loginWithEmailAndPassword', () {
    test('returns the authenticated user', () async {
      when(
        () => auth.signInWithPassword(
          email: 'alexandre@example.com',
          password: '123456',
        ),
      ).thenAnswer((_) async => supabase.AuthResponse(user: user));

      final result = await dataSource.loginWithEmailAndPassword(
        email: 'alexandre@example.com',
        password: '123456',
      );

      expect(result.uid, 'user-1');
      verify(
        () => auth.signInWithPassword(
          email: 'alexandre@example.com',
          password: '123456',
        ),
      ).called(1);
    });

    test('throws ServerException when Supabase returns no user', () async {
      when(
        () => auth.signInWithPassword(
          email: 'alexandre@example.com',
          password: '123456',
        ),
      ).thenAnswer((_) async => supabase.AuthResponse());

      expect(
        () => dataSource.loginWithEmailAndPassword(
          email: 'alexandre@example.com',
          password: '123456',
        ),
        throwsA(
          isA<ServerException>().having(
            (error) => error.message,
            'message',
            'Usuário não encontrado',
          ),
        ),
      );
    });

    test('converts Supabase errors to ServerException', () async {
      when(
        () => auth.signInWithPassword(
          email: 'alexandre@example.com',
          password: '123456',
        ),
      ).thenThrow(const supabase.AuthException('Credenciais inválidas'));

      expect(
        () => dataSource.loginWithEmailAndPassword(
          email: 'alexandre@example.com',
          password: '123456',
        ),
        throwsA(
          isA<ServerException>().having(
            (error) => error.message,
            'message',
            'Credenciais inválidas',
          ),
        ),
      );
    });
  });

  group('signUpWithEmailAndPassword', () {
    test('sends the user data and returns the created user', () async {
      when(
        () => auth.signUp(
          email: 'alexandre@example.com',
          password: '123456',
          data: {
            'first_name': 'Alexandre',
            'last_name': 'Raminelli',
          },
        ),
      ).thenAnswer((_) async => supabase.AuthResponse(user: user));

      final result = await dataSource.signUpWithEmailAndPassword(
        email: 'alexandre@example.com',
        password: '123456',
        firstName: 'Alexandre',
        lastName: 'Raminelli',
      );

      expect(result.uid, 'user-1');
      verify(
        () => auth.signUp(
          email: 'alexandre@example.com',
          password: '123456',
          data: {
            'first_name': 'Alexandre',
            'last_name': 'Raminelli',
          },
        ),
      ).called(1);
    });
  });

  group('logout', () {
    test('signs out from Supabase', () async {
      when(() => auth.signOut()).thenAnswer((_) async {});
      when(() => googleSignIn.signOut(any())).thenAnswer((_) async {});

      await dataSource.logout();

      verify(() => auth.signOut()).called(1);
      verify(() => googleSignIn.signOut(any())).called(1);
    });
  });
}
