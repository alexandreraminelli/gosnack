import 'package:flutter/material.dart';
import 'package:gosnack_client/core/extensions/build_context_x.dart';
import 'package:gosnack_client/core/resources/animations.dart';
import 'package:gosnack_client/core/theme/dimensions/sizes.dart';
import 'package:gosnack_client/core/widgets/logo.dart';
import 'package:gosnack_client/features/onboarding/presentation/widgets/on_boarding_slide.dart';

/// Tela de OnBoarding (Boas-Vindas).
class OnBoardingScreen extends StatefulWidget {
  // Constructors ----------------------------------------------------------- //
  /// Construtor da tela de OnBoarding.
  const new({required this.onCompleted, super.key});

  // Properties ------------------------------------------------------------- //

  /// Callback chamado quando o OnBoarding é concluído.
  final VoidCallback onCompleted;

  // Overrides -------------------------------------------------------------- //
  @override
  State<OnBoardingScreen> createState() => _OnBoardingScreenState();
}

// -------------------------------------------------------------------------- //

class _OnBoardingScreenState extends State<OnBoardingScreen> {
  // Controllers ------------------------------------------------------------ //

  final pageController = PageController();

  // Focus Nodes ------------------------------------------------------------ //

  // Variables -------------------------------------------------------------- //

  // Lifecycle Methods ------------------------------------------------------ //

  // Event Handlers --------------------------------------------------------- //

  // Helper Methods --------------------------------------------------------- //

  // Build Method ----------------------------------------------------------- //
  @override
  Widget build(BuildContext context) {
    // Slides --------------------------------------------------------------- //
    final slides = [
      // Page 1
      OnBoardingSlide(
        title: context.l10n.onBoardingPage1Title,
        description: context.l10n.onBoardingPage1Description,
        animation: LottieAnimations.servingDome,
      ),
      // Page 2
      OnBoardingSlide(
        title: context.l10n.onBoardingPage2Title,
        description: context.l10n.onBoardingPage2Description,
        animation: LottieAnimations.customerMenuOptions,
      ),
      // Page 3
      OnBoardingSlide(
        title: context.l10n.onBoardingPage3Title,
        description: context.l10n.onBoardingPage3Description,
        animation: LottieAnimations.pickingUpOrder,
      ),
    ];

    // Slides Carrousel ----------------------------------------------------- //
    final slidesCarrousel = PageView(
      controller: pageController,
      children: slides,
    );

    // Footer --------------------------------------------------------------- //

    // Scaffold ------------------------------------------------------------- //
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
      body: Column(
        children: [Expanded(child: slidesCarrousel)],
      ),
    );
  }
}
