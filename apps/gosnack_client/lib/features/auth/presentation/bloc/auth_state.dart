part of 'auth_bloc.dart';

// Base State --------------------------------------------------------------- //

/// Estados de autenticação que podem ser emitidos pelo [AuthBloc].
sealed class AuthState extends Equatable {
  const new();

  @override
  List<Object?> get props => [];
}

// Initial State ------------------------------------------------------------ //

/// Estado inicial do [AuthBloc].
final class AuthInitial extends AuthState {
  /// Cria uma nova instância de [AuthInitial].
  const new();
}

// Loading States ----------------------------------------------------------- //

/// Estado de carregamento do [AuthBloc].
final class AuthLoading extends AuthState {
  /// Cria uma nova instância de [AuthLoading].
  const new();
}

// Success States ----------------------------------------------------------- //

/// Estado de sucesso do [AuthBloc].
final class AuthSuccess extends AuthState {
  /// Cria uma nova instância de [AuthSuccess].
  const new(this.user);

  /// O usuário autenticado.
  final AppUser user;

  @override
  List<Object?> get props => [user];
}

// Error States ------------------------------------------------------------- //

/// Estado de erro do [AuthBloc].
final class AuthError extends AuthState {
  /// Cria uma nova instância de [AuthError].
  const new(this.message);

  /// A mensagem de erro.
  final String message;

  @override
  List<Object?> get props => [message];
}
