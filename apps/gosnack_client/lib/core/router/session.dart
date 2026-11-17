import 'package:flutter/foundation.dart';

// TODO: Implementar autenticação com Supabase Auth.

/// Estado de sessão do usuário no aplicativo.
/// Utilizado para gerenciar a navegação.
class AppSession extends ChangeNotifier {
  // Constructor ------------------------------------------------------------ //

  /// Cria uma nova instância de [AppSession].
  new({
    required this._isFirstTimer,
    this._isAuthenticated = false,
  });

  // Properties ------------------------------------------------------------- //

  bool _isFirstTimer;
  bool _isAuthenticated;

  /// Indica se o usuário está acessando o aplicativo pela primeira vez.
  bool get isFirstTimer => _isFirstTimer;

  /// Indica se o usuário está autenticado.
  bool get isAuthenticated => _isAuthenticated;

  // Methods ---------------------------------------------------------------- //

  /// Marca o onboarding como concluído e avisa o router.
  void completeOnBoarding() {
    if (!_isFirstTimer) return; // Se já completou, não faz nada
    _isFirstTimer = false; // Marca como concluído
    notifyListeners(); // Notifica o router para atualizar a navegação
  }

  /// Marca o usuário como autenticado e avisa o router.
  void signIn() {
    // TODO: Implementar login com Supabase Auth.
    _isAuthenticated = true;
    notifyListeners(); // Notifica o router para atualizar a navegação
  }

  /// Marca o usuário como desautenticado e avisa o router.
  void signOut() {
    // TODO: Implementar logout com Supabase Auth.
    _isAuthenticated = false;
    notifyListeners(); // Notifica o router para atualizar a navegação
  }
}
