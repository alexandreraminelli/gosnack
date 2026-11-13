/// Contrato para o acesso de dados locais do OnBoarding.
abstract class OnBoardingLocalDataSource {
  /// Armazenar a informação de que o usuário já completou o OnBoarding.
  Future<void> cacheFirstTimer();

  /// Verificar se o usuário já completou o OnBoarding.
  Future<bool> checkIfUserIsFirstTimer();
}
