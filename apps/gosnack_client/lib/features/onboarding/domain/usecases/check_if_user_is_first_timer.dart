import 'package:gosnack_client/core/utils/typedef.dart';
import 'package:gosnack_client/core/utils/usecases.dart';
import 'package:gosnack_client/features/onboarding/domain/repositories/on_boarding_repository.dart';

/// Caso de uso para verificar se o usuário está acessando o aplicativo pela
/// primeira vez.
class CheckIfUserIsFirstTimer extends UseCaseWithoutParams<bool> {
  // Constructor ------------------------------------------------------------ //

  /// Construtor da classe [CheckIfUserIsFirstTimer].
  const new(this._repository);

  // Dependencies ----------------------------------------------------------- //

  final OnBoardingRepository _repository;

  // UC Implementation ------------------------------------------------------ //
  @override
  ResultFuture<bool> call() => _repository.checkIfUserIsFirstTimer();
}
