import 'package:gosnack_client/core/utils/typedef.dart';
import 'package:gosnack_client/core/utils/usecases.dart';
import 'package:gosnack_client/features/auth/domain/repositories/auth_repository.dart';

/// Caso de uso para logout do usuário.
class Logout extends UseCaseWithoutParams<void> {
  // Constructor ------------------------------------------------------------ //
  /// Construtor da classe [Logout].
  const new(this._authRepository);

  // Dependencies ----------------------------------------------------------- //

  final AuthRepository _authRepository;

  // Overrides -------------------------------------------------------------- //
  @override
  ResultFuture<void> call() {
    return _authRepository.logout();
  }
}
