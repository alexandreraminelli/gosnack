import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:gosnack_client/core/extensions/context_extensions.dart';
import 'package:gosnack_client/core/resources/animations.dart';
import 'package:gosnack_client/core/theme/dimensions/sizes.dart';
import 'package:gosnack_client/core/theme/dimensions/spacing.dart';
import 'package:gosnack_client/core/utils/preview.dart';
import 'package:lottie/lottie.dart';

/// Slide que compõe o carrossel de OnBoarding.
class OnBoardingSlide extends StatelessWidget {
  // Constructors ----------------------------------------------------------- //

  /// Construtor da página de OnBoarding.
  const new({
    required this.title,
    required this.description,
    required this.animation,
    super.key,
  });

  // Properties ------------------------------------------------------------- //

  /// Título da página.
  final String title;

  /// Descrição da página.
  final String description;

  /// Animação Lottie da página.
  final String animation;

  // Build Method ----------------------------------------------------------- //
  @override
  Widget build(BuildContext context) {
    final animationWidget = Lottie.asset(animation);
    final titleWidget = Text(
      title,
      textAlign: .center,
      style: context.textTheme.headlineMedium,
    );
    final descriptionWidget = Text(
      description,
      textAlign: .center,
      style: context.textTheme.bodyLarge,
    );

    return Padding(
      padding: KSpacing.horizontalSm,
      child: Column(
        children: [
          animationWidget,
          titleWidget,
          const Gap(KSizes.sm),
          descriptionWidget,
        ],
      ),
    );
  }
}

// Widget Preview ----------------------------------------------------------- //

/// Widget de pré-visualização do [OnBoardingSlide].
@GoSnackPreview(
  name: 'OnBoardingPage',
  group: 'OnBoarding',
)
Widget onBoardingPagePreview() => const OnBoardingSlide(
  title: 'Bem-vindo ao GoSnack',
  description: 'Descubra uma nova forma de pedir seus lanches no colégio.',
  animation: LottieAnimations.servingDome,
);
