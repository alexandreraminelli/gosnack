// ignore: unused_import
import 'package:intl/intl.dart' as intl;

import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for Portuguese (`pt`).
class AppLocalizationsPt extends AppLocalizations {
  AppLocalizationsPt([String locale = 'pt']) : super(locale);

  @override
  String get commonContinue => 'Continuar';

  @override
  String get onBoardingPage1Title => 'Bem-vindo ao GoSnack';

  @override
  String get onBoardingPage1Description =>
      'O jeito mais rápido e fácil de pedir seus lanches dentro do colégio. Evite filas e aproveite seus intervalos ao máximo!';

  @override
  String get onBoardingPage2Title => 'Explore o cardápio da sua unidade';

  @override
  String get onBoardingPage2Description =>
      'Selecione a lanchonete do seu colégio, descubra o cardápio disponível e monte seu pedido do seu jeito!';

  @override
  String get onBoardingPage3Title => 'Pague e Retire Sem Complicações';

  @override
  String get onBoardingPage3Description =>
      'Finalize o pedido pelo app e retire quando estiver pronto. Rápido, seguro e sem filas!';
}
