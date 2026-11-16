import 'package:flutter/material.dart';
import 'package:gosnack_client/core/extensions/build_context_x.dart';
import 'package:gosnack_client/core/resources/animations.dart';
import 'package:gosnack_client/features/onboarding/presentation/widgets/on_boarding_slide.dart';

/// Carrossel de slides do OnBoarding.
class OnBoardingCarrousel extends StatefulWidget {
  // Constructors ----------------------------------------------------------- //
  /// Construtor do carrossel de slides do OnBoarding.
  const new({super.key});

  // Overrides -------------------------------------------------------------- //
  @override
  State<OnBoardingCarrousel> createState() => _OnBoardingCarrouselState();
}

// -------------------------------------------------------------------------- //

class _OnBoardingCarrouselState extends State<OnBoardingCarrousel> {
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
    // Slides List ---------------------------------------------------------- //

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

    return Column(
      children: [
        Expanded(child: slidesCarrousel), // Carrousel
      ],
    );
  }
}
