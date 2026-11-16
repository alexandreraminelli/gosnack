import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';
import 'package:gosnack_client/core/router/routes.dart';
import 'package:gosnack_client/core/theme/dimensions/sizes.dart';
import 'package:gosnack_client/core/widgets/logo.dart';
import 'package:gosnack_client/features/onboarding/presentation/cubit/on_boarding_cubit.dart';
import 'package:gosnack_client/features/onboarding/presentation/widgets/on_boarding_carrousel.dart';

/// Tela de OnBoarding (Boas-Vindas).
class OnBoardingScreen extends StatelessWidget {
  // Constructors ----------------------------------------------------------- //
  /// Construtor da tela de OnBoarding.
  const new({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocListener<OnBoardingCubit, OnBoardingState>(
      listener: (context, state) {
        if (state is UserCached) {
          // Usuário já completou OnBoarding: ir para a tela de login
          context.go(AppRoutes.signIn);
        } else if (state is OnBoardingError) {
          // Erro ao salvar estado do OnBoarding: exibir mensagem de erro
          // TODO(OnBoarding): Implementar exibição do SnackBar de erro
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
