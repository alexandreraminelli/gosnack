import 'package:equatable/equatable.dart';
import 'package:gosnack_client/core/utils/typedef.dart';
import 'package:gosnack_client/core/utils/usecases.dart';
import 'package:gosnack_client/features/auth/domain/entities/user.dart';
import 'package:gosnack_client/features/auth/domain/repositories/auth_repository.dart';

/// Caso de uso para login de usuário com email e senha.
class LoginWithEmailAndPassword
    implements UseCaseWithParams<AppUser, LoginParams> {
  // Constructor ------------------------------------------------------------ //
  /// Construtor da classe [LoginWithEmailAndPassword].
  const new(this._authRepository);

  // Dependencies ----------------------------------------------------------- //

  final AuthRepository _authRepository;

  // UC Implementation ------------------------------------------------------ //
  @override
  ResultFuture<AppUser> call(LoginParams params) {
    return _authRepository.loginWithEmailAndPassword(
      email: params.email,
      password: params.password,
    );
  }
}

/// Parâmetros necessários para o caso de uso de login de usuário.
class LoginParams extends Equatable {
  // Constructor ------------------------------------------------------------ //
  /// Construtor para criar uma instância de [LoginParams].
  const new({required this.email, required this.password});

  // Fields ----------------------------------------------------------------- //

  /// Email do usuário.
  final String email;

  /// Senha do usuário.
  final String password;

  // Overrides -------------------------------------------------------------- //
  @override
  List<String> get props => [email, password];
}
