import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:gosnack_client/core/extensions/build_context_x.dart';
import 'package:gosnack_client/core/extensions/context_extensions.dart';
import 'package:gosnack_client/core/resources/animations.dart';
import 'package:gosnack_client/core/theme/dimensions/sizes.dart';
import 'package:gosnack_client/features/onboarding/presentation/cubit/on_boarding_cubit.dart';
import 'package:gosnack_client/features/onboarding/presentation/widgets/on_boarding_slide.dart';
import 'package:smooth_page_indicator/smooth_page_indicator.dart';

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

  /// Lista de slides do carrossel.
  List<Widget> get slides => [
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

  /// Página atual do carrossel de slides.
  final currentPage = ValueNotifier<int>(0);

  int get lastPageIndex => slides.length;

  // Lifecycle Methods ------------------------------------------------------ //

  @override
  void dispose() {
    pageController.dispose();
    currentPage.dispose();
    super.dispose();
  }

  // Event Handlers --------------------------------------------------------- //

  /// Avança para a próxima página do carrossel de slides.
  void _nextPage() {
    if (currentPage.value >= lastPageIndex - 1) return;
    pageController.nextPage(
      duration: const Duration(milliseconds: 300), // Tempo da animação
      curve: Curves.easeInOut, // Curva da animação
    );
  }

  /// Finalizar OnBoarding.
  Future<void> _finish() {
    return context.read<OnBoardingCubit>().cacheFirstTimer();
  }

  // Helper Methods --------------------------------------------------------- //

  // Build Method ----------------------------------------------------------- //
  @override
  Widget build(BuildContext context) {
    // Slides Carrousel ----------------------------------------------------- //
    final slidesCarrousel = PageView(
      controller: pageController,
      children: slides,
    );

    // Page Indicator ------------------------------------------------------- //
    final pageIndicator = SmoothPageIndicator(
      controller: pageController,
      count: slides.length,
      effect: ExpandingDotsEffect(
        dotHeight: KSizes.xs2, // espessura
        // Cor dos pontos:
        dotColor: context.palette.content4,
        activeDotColor: context.palette.content1foreground,
      ),
    );

    // Main Widget ---------------------------------------------------------- //
    return SafeArea(
      child: Padding(
        padding: const EdgeInsets.only(bottom: KSizes.md),
        child: Column(
          children: [
            Expanded(child: slidesCarrousel), // Carrousel
            pageIndicator, // Indicador
          ],
        ),
      ),
    );
  }
}
