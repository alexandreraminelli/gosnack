part of 'auth_bloc.dart';

/// Eventos de autenticação que podem ser emitidos para o [AuthBloc].
sealed class AuthEvent extends Equatable {
  const new();

  @override
  List<Object?> get props => [];
}

// -------------------------------------------------------------------------- //

/// Evento de requisição de cadastro de novo usuário.
final class AuthSignUpRequested extends AuthEvent {
  /// Cria uma nova instância de [AuthSignUpRequested].
  const new({
    required this.email,
    required this.password,
    required this.firstName,
    required this.lastName,
  });

  /// O email do usuário que está sendo registrado.
  final String email;

  /// A senha do usuário que está sendo registrado.
  final String password;

  /// O primeiro nome do usuário que está sendo registrado.
  final String firstName;

  /// O último nome do usuário que está sendo registrado.
  final String lastName;

  @override
  List<Object?> get props => [email, password, firstName, lastName];
}

// -------------------------------------------------------------------------- //

/// Evento de requisição de login de usuário com e-mail e senha.
final class AuthLoginRequested extends AuthEvent {
  /// Cria uma nova instância de [AuthLoginRequested].
  const new({required this.email, required this.password});

  /// O email do usuário que está tentando fazer login.
  final String email;

  /// A senha do usuário que está tentando fazer login.
  final String password;

  @override
  List<Object?> get props => [email, password];
}

// -------------------------------------------------------------------------- //

/// Evento de requisição de login de usuário com Google.
final class AuthGoogleSignInRequested extends AuthEvent {
  /// Cria uma nova instância de [AuthGoogleSignInRequested].
  const new();
}

// -------------------------------------------------------------------------- //

/// Evento de requisição de logout do usuário.
final class AuthLogoutRequested extends AuthEvent {
  /// Cria uma nova instância de [AuthLogoutRequested].
  const new();
}
