import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:gap/gap.dart';
import 'package:gosnack_client/core/extensions/build_context_x.dart';
import 'package:gosnack_client/core/extensions/context_extensions.dart';
import 'package:gosnack_client/core/resources/animations.dart';
import 'package:gosnack_client/core/resources/icons.dart';
import 'package:gosnack_client/core/theme/dimensions/sizes.dart';
import 'package:gosnack_client/core/theme/dimensions/spacing.dart';
import 'package:gosnack_client/core/widgets/ui/button.dart';
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

  /// Slide atual do carrossel de slides.
  final currentSlide = ValueNotifier<int>(0);

  /// Verifica se é o último slide.
  bool get isLastSlide => currentSlide.value >= (slides.length - 1);

  // Lifecycle Methods ------------------------------------------------------ //

  @override
  void dispose() {
    // Liberar recursos da memória
    pageController.dispose();
    currentSlide.dispose();
    super.dispose();
  }

  // Event Handlers --------------------------------------------------------- //

  /// Avança para a próxima página do carrossel de slides.
  void _nextPage() {
    // Só avançar se ainda houver slides
    if (isLastSlide) return;
    pageController.nextPage(
      duration: const Duration(milliseconds: 500), // Tempo da animação
      curve: Curves.easeInOutCubic, // Curva da animação
    );
  }

  /// Finalizar OnBoarding.
  Future<void> _finish() {
    // Registrar que o usuário
    return context.read<OnBoardingCubit>().cacheFirstTimer();
  }

  // Helper Methods --------------------------------------------------------- //

  // Build Method ----------------------------------------------------------- //
  @override
  Widget build(BuildContext context) {
    // Slides Carrousel ----------------------------------------------------- //
    final slidesCarrousel = PageView(
      controller: pageController,
      // Atualizar slide atual:
      onPageChanged: (value) => currentSlide.value = value,
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

    // Next Button ---------------------------------------------------------- //

    final nextButton = ValueListenableBuilder<int>(
      valueListenable: currentSlide,
      builder: (context, value, child) {
        return Align(
          alignment: .bottomEnd,
          child: SizedBox(
            width: isLastSlide ? double.infinity : null,
            child: AppButton(
              label: context.l10n.commonContinue,
              size: ButtonSize.xl2,
              icon: AppIcons.arrowRight,
              // Variação do botão:
              isIconOnly: !isLastSlide,
              // Ação do botão:
              onPressed: isLastSlide ? _finish : _nextPage,
            ),
          ),
        );
      },
    );

    // Main Widget ---------------------------------------------------------- //
    return SafeArea(
      child: Padding(
        padding: KSpacing.horizontalScreenPadding.copyWith(
          bottom: KSizes.spacingBtwItems,
        ),
        child: Column(
          children: [
            Expanded(child: slidesCarrousel), // Carrousel
            pageIndicator, // Indicador
            const Gap(KSizes.spacingBtwItems),
            Padding(
              padding: KSpacing.horizontalXs,
              child: nextButton,
            ), // Botão de avançar
          ],
        ),
      ),
    );
  }
}
