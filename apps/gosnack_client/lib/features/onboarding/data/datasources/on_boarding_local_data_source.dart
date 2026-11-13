/// Contrato para o acesso de dados locais do OnBoarding.
abstract class OnBoardingLocalDataSource {
  // Constructor ------------------------------------------------------------ //

  /// Construtor da classe [OnBoardingLocalDataSource].
  const new();

  // Data Access Methods ---------------------------------------------------- //

  /// Armazenar a informação de que o usuário já completou o OnBoarding.
  Future<void> cacheFirstTimer();

  /// Verificar se o usuário já completou o OnBoarding.
  Future<bool> checkIfUserIsFirstTimer();
}
