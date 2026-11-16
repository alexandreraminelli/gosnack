import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';
import 'package:gosnack_client/core/di/injection_container.dart';
import 'package:gosnack_client/core/router/routes.dart';
import 'package:gosnack_client/core/router/session.dart';
import 'package:gosnack_client/features/onboarding/presentation/cubit/on_boarding_cubit.dart';
import 'package:gosnack_client/features/onboarding/presentation/views/on_boarding_screen.dart';

/// Função de redirecionamento para o [GoRouter] com base no estado da sessão do
/// usuário.
String? appRedirect({
  required AppSession session,
  required String location,
}) {
  final isOnBoarding = location == AppRoutes.onBoarding;

  if (session.isFirstTimer) {
    return isOnBoarding ? null : AppRoutes.onBoarding;
  }
  return isOnBoarding ? AppRoutes.menu : null;
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
      // OnBoarding --------------------------------------------------------- //
      GoRoute(
        path: AppRoutes.onBoarding,
        builder: (_, _) => BlocProvider(
          create: (_) => sl<OnBoardingCubit>(),
          child: const OnBoardingScreen(),
        ),
      ),

      // Menu --------------------------------------------------------------- //
      GoRoute(
        path: AppRoutes.menu,
        builder: (_, _) => const MenuPlaceholderScreen(),
      ),
    ],
  );
}

/// TODO(Menu): Placeholder temporário até a página de menu existir.
class MenuPlaceholderScreen extends StatelessWidget {
  // Constructors ----------------------------------------------------------- //
  const new({super.key});

  // Build Method ----------------------------------------------------------- //
  @override
  Widget build(BuildContext context) {
    return const Placeholder();
  }
}
