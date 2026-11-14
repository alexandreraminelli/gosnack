import 'package:flutter/foundation.dart';

/// Estado de sessão do usuário no aplicativo.
/// Utilizado para gerenciar a navegação.
class AppSession extends ChangeNotifier {
  // Constructor ------------------------------------------------------------ //

  /// Cria uma nova instância de [AppSession].
  new({required this._isFirstTimer});

  // Properties ------------------------------------------------------------- //

  bool _isFirstTimer;

  /// Indica se o usuário está acessando o aplicativo pela primeira vez.
  bool get isFirstTimer => _isFirstTimer;

  // Methods ---------------------------------------------------------------- //

  /// Marca o onboarding como concluído e avisa o router.
  void completeOnBoarding() {
    if (!_isFirstTimer) return; // Se já completou, não faz nada
    _isFirstTimer = false; // Marca como concluído
    notifyListeners(); // Notifica o router para atualizar a navegação
  }
}
