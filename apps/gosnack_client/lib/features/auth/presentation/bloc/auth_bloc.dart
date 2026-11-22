import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:gosnack_client/features/auth/domain/entities/user.dart';
import 'package:gosnack_client/features/auth/domain/usecases/login_with_email_and_password.dart';
import 'package:gosnack_client/features/auth/domain/usecases/logout.dart';
import 'package:gosnack_client/features/auth/domain/usecases/sign_in_with_google.dart';
import 'package:gosnack_client/features/auth/domain/usecases/sign_up_with_email_and_password.dart';

part 'auth_event.dart';
part 'auth_state.dart';

/// Bloc de autenticação.
/// Gerencia os estados e eventos relacionados à autenticação do usuário.
class AuthBloc extends Bloc<AuthEvent, AuthState> {
  // Constructor ------------------------------------------------------------ //

  /// Cria uma nova instância de [AuthBloc].
  new({
    required this._signUpWithEmailAndPassword,
    required this._loginWithEmailAndPassword,
    required this._signInWithGoogle,
    required this._logout,
  }) : super(const AuthInitial()) {
    // Registrar manipuladores de eventos
    on<AuthSignUpRequested>(_onSignUp);
    on<AuthLoginRequested>(_onLogin);
    on<AuthGoogleSignInRequested>(_onGoogleSignIn);
    on<AuthLogoutRequested>(_onLogout);
  }

  // Dependencies ----------------------------------------------------------- //

  // Use Cases
  final SignUpWithEmailAndPassword _signUpWithEmailAndPassword;
  final LoginWithEmailAndPassword _loginWithEmailAndPassword;
  final SignInWithGoogle _signInWithGoogle;
  final Logout _logout;

  // Event Handlers --------------------------------------------------------- //

  Future<void> _onSignUp(
    AuthSignUpRequested event,
    Emitter<AuthState> emit,
  ) async {
    emit(const AuthLoading()); // Emitir estado de carregamento

    // Executar caso de uso
    final result = await _signUpWithEmailAndPassword(
      SignUpParams(
        email: event.email,
        password: event.password,
        firstName: event.firstName,
        lastName: event.lastName,
      ),
    );

    result.fold(
      (failure) => emit(AuthError(failure.message)), // Emitir erro
      (user) => emit(AuthSuccess(user)), // Emitir sucesso
    );
  }

  Future<void> _onLogin(
    AuthLoginRequested event,
    Emitter<AuthState> emit,
  ) async {
    emit(const AuthLoading()); // Emitir estado de carregamento

    // Executar caso de uso
    final result = await _loginWithEmailAndPassword(
      LoginParams(email: event.email, password: event.password),
    );

    result.fold(
      (failure) => emit(AuthError(failure.message)), // Erro
      (user) => emit(AuthSuccess(user)),
    );
  }

  Future<void> _onGoogleSignIn(
    AuthGoogleSignInRequested event,
    Emitter<AuthState> emit,
  ) async {
    emit(const AuthLoading()); // Emitir estado de carregamento

    // Executar caso de uso
    final result = await _signInWithGoogle();

    result.fold(
      (failure) => emit(AuthError(failure.message)), // Erro
      (user) => emit(AuthSuccess(user)), // Sucesso
    );
  }

  Future<void> _onLogout(
    AuthLogoutRequested event,
    Emitter<AuthState> emit,
  ) async {
    emit(const AuthLoading());

    final result = await _logout();

    result.fold(
      (failure) => emit(AuthError(failure.message)),
      (_) => emit(const AuthInitial()),
    );
  }
}
