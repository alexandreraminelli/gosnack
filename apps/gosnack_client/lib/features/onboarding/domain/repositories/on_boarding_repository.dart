import 'package:gosnack_client/core/utils/typedef.dart';

/// Repositório de OnBoarding na camada de domínio.
///
/// Responsável por definir a interface de comunicação entre a camada de domínio
/// e a camada de dados.
abstract class OnBoardingRepository {
  /// Marcar usuário como tendo completado o OnBoarding.
  ResultFuture<void> cacheFirstTimer();

  /// Verificar se o usuário já completou o OnBoarding.
  ResultFuture<bool> checkIfUserIsFirstTimer();
}
