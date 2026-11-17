import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';
import 'package:gosnack_client/core/router/routes.dart';
import 'package:gosnack_client/core/router/session.dart';
import 'package:gosnack_client/core/theme/dimensions/sizes.dart';
import 'package:gosnack_client/core/widgets/common/logo.dart';
import 'package:gosnack_client/features/onboarding/presentation/cubit/on_boarding_cubit.dart';
import 'package:gosnack_client/features/onboarding/presentation/widgets/on_boarding_carrousel.dart';

/// Tela de OnBoarding (Boas-Vindas).
class OnBoardingScreen extends StatelessWidget {
  // Constructors ----------------------------------------------------------- //
  /// Construtor da tela de OnBoarding.
  const new({required this.session, super.key});

  // Properties ------------------------------------------------------------- //

  /// Sessão do usuário, utilizada para determinar se o usuário já completou o
  /// OnBoarding.
  final AppSession session;

  // Build Method ----------------------------------------------------------- //
  @override
  Widget build(BuildContext context) {
    return BlocListener<OnBoardingCubit, OnBoardingState>(
      listener: (context, state) {
        if (state is UserCached) {
          // Usuário já completou OnBoarding:
          session.completeOnBoarding(); // Marcar OnBoarding como completo
          context.go(AppRoutes.signIn); // Redirecionar para a tela de login
        }
      },
      child: Scaffold(
        // AppBar ------------------------------------------------------------- //
        appBar: AppBar(
          toolbarHeight: KSizes.xl4,
          centerTitle: true,
          title: const Logo(
            variation: .inline,
            height: KSizes.xl3,
          ),
        ),

        // Body --------------------------------------------------------------- //
        body: const OnBoardingCarrousel(),
      ),
    );
  }
}
