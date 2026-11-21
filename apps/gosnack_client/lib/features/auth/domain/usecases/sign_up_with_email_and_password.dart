import 'package:equatable/equatable.dart';
import 'package:gosnack_client/core/utils/typedef.dart';
import 'package:gosnack_client/core/utils/usecases.dart';
import 'package:gosnack_client/features/auth/domain/entities/user.dart';
import 'package:gosnack_client/features/auth/domain/repositories/auth_repository.dart';

/// Caso de uso para cadastro de usuário com email e senha.
class SignUpWithEmailAndPassword
    implements UseCaseWithParams<AppUser, SignUpParams> {
  // Constructor ------------------------------------------------------------ //
  /// Construtor da classe [SignUpWithEmailAndPassword].
  const new(this._authRepository);

  // Dependencies ----------------------------------------------------------- //

  final AuthRepository _authRepository;

  // UC Implementation ------------------------------------------------------ //
  @override
  ResultFuture<AppUser> call(SignUpParams params) {
    return _authRepository.signUpWithEmailAndPassword(
      email: params.email,
      password: params.password,
      firstName: params.firstName,
      lastName: params.lastName,
    );
  }
}

/// Parâmetros necessários para o caso de uso de cadastro de usuário.
class SignUpParams extends Equatable {
  // Constructor ------------------------------------------------------------ //
  /// Construtor para criar uma instância de [SignUpParams].
  const new({
    required this.email,
    required this.password,
    required this.firstName,
    required this.lastName,
  });

  // Fields ----------------------------------------------------------------- //

  /// Email do usuário.
  final String email;

  /// Senha do usuário.
  final String password;

  /// Primeiro nome do usuário.
  final String firstName;

  /// Último nome do usuário.
  final String lastName;

  // Overrides -------------------------------------------------------------- //
  @override
  List<String?> get props => [email, password, firstName, lastName];
}
