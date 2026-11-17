import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';
import 'package:gosnack_client/core/di/injection_container.dart';
import 'package:gosnack_client/core/router/routes.dart';
import 'package:gosnack_client/core/router/session.dart';
import 'package:gosnack_client/features/auth/presentation/views/login_screen.dart';
import 'package:gosnack_client/features/onboarding/presentation/cubit/on_boarding_cubit.dart';
import 'package:gosnack_client/features/onboarding/presentation/views/on_boarding_screen.dart';

/// Função de redirecionamento para o [GoRouter] com base no estado da sessão do
/// usuário.
String? appRedirect({
  required AppSession session,
  required String location,
}) {
  /// Verifica se a rota atual é a tela de OnBoarding.
  final isOnBoarding = location == AppRoutes.onBoarding;

  /// Verifica se a rota atual é a tela de login.
  final isLogin = location == AppRoutes.signIn;

  if (session.isFirstTimer) {
    // Primeira vez: redirecionar para OnBoarding se não estiver lá
    return isOnBoarding ? null : AppRoutes.onBoarding;
  } else if (!session.isAuthenticated) {
    // Não autenticado: redirecionar para login se não estiver lá
    return isLogin ? null : AppRoutes.signIn;
  } else {
    // Autenticado: redirecionar para menu se estiver em OnBoarding ou login
    return isOnBoarding || isLogin ? AppRoutes.menu : null;
  }
}

/// Cria e configura o [GoRouter] com base na sessão do usuário.
GoRouter createRouter(AppSession session) {
  return GoRouter(
    // Router Config -------------------------------------------------------- //
    initialLocation: AppRoutes.menu, // Rota inicial: cardápio
    refreshListenable: session, // revalidar redirect quando a sessão muda
    redirect: (_, state) => appRedirect(
      session: session, // estado atual da sessão
      location: state.matchedLocation, // location atual da rota
    ),

    // Routes --------------------------------------------------------------- //
    routes: [
      // Authentication ----------------------------------------------------- //

      GoRoute(
        path: AppRoutes.signIn,
        builder: (_, _) => const LoginScreen(),
      ),

      // Menu --------------------------------------------------------------- //
      GoRoute(
        path: AppRoutes.menu,
        builder: (_, _) =>
            const Scaffold(body: Center(child: Text('Tela de Cardápio'))),
      ),

      // OnBoarding --------------------------------------------------------- //
      GoRoute(
        path: AppRoutes.onBoarding,
        builder: (_, _) => BlocProvider(
          create: (_) => sl<OnBoardingCubit>(),
          child: OnBoardingScreen(session: session),
        ),
      ),
    ],
  );
}
