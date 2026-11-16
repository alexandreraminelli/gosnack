import 'package:flutter/material.dart';
import 'package:gosnack_client/core/theme/dimensions/sizes.dart';
import 'package:gosnack_client/core/widgets/logo.dart';
import 'package:gosnack_client/features/onboarding/presentation/widgets/on_boarding_carrousel.dart';

/// Tela de OnBoarding (Boas-Vindas).
class OnBoardingScreen extends StatelessWidget {
  // Constructors ----------------------------------------------------------- //
  /// Construtor da tela de OnBoarding.
  const new({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
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
    );
  }
}
