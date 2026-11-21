import 'package:gosnack_client/core/utils/typedef.dart';
import 'package:gosnack_client/core/utils/usecases.dart';
import 'package:gosnack_client/features/auth/domain/entities/user.dart';
import 'package:gosnack_client/features/auth/domain/repositories/auth_repository.dart';

/// Caso de uso para autenticação de usuário com Google.
class SignInWithGoogle extends UseCaseWithoutParams<AppUser> {
  // Constructor ------------------------------------------------------------ //
  /// Construtor da classe [SignInWithGoogle].
  const new(this._authRepository);

  // Dependencies ----------------------------------------------------------- //

  final AuthRepository _authRepository;

  // UC Implementation ------------------------------------------------------ //
  @override
  ResultFuture<AppUser> call() {
    return _authRepository.signInWithGoogle();
  }
}
