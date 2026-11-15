import 'package:gosnack_client/core/resources/animations.dart';
import 'package:gosnack_client/features/onboarding/presentation/models/on_boarding_page_content.dart';
import 'package:gosnack_client/l10n/app_localizations.dart';

/// Classe que contém as páginas de OnBoarding.
abstract final class OnBoardingPages {
  /// Retorna a lista de páginas de OnBoarding.
  static List<OnBoardingPageContent> get(AppLocalizations l10n) => [
    // Page 1
    OnBoardingPageContent(
      title: l10n.onBoardingPage1Title,
      description: l10n.onBoardingPage1Description,
      animation: LottieAnimations.servingDome,
    ),
    // Page 2
    OnBoardingPageContent(
      title: l10n.onBoardingPage2Title,
      description: l10n.onBoardingPage2Description,
      animation: LottieAnimations.customerMenuOptions,
    ),
    // Page 3
    OnBoardingPageContent(
      title: l10n.onBoardingPage3Title,
      description: l10n.onBoardingPage3Description,
      animation: LottieAnimations.pickingUpOrder,
    ),
  ];
}
