// ignore_for_file: public_member_api_docs Nomes das rotas são autoexplicativos.

/// Caminhos de todas as rotas do aplicativo.
abstract final class AppRoutes {
  // Authentication --------------------------------------------------------- //

  static const signIn = '/login';
  static const signUp = '/criar-conta';
  static const forgotPassword = '/esqueci-a-senha';

  // OnBoarding ------------------------------------------------------------- //

  static const onBoarding = '/boas-vindas';

  // Cardápio --------------------------------------------------------------- //

  static const menu = '/cardapio';

  // Pedidos ---------------------------------------------------------------- //

  static const cart = '/sacola';
  static const orders = '/pedidos';

  // ------------------------------------------------------------------------ //

  /// Rotas que exigem o usuário autenticado.
  static const Set<String> protectedPaths = {cart, orders};
}
