import 'dart:async';

import 'package:flutter/foundation.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:intl/intl.dart' as intl;

import 'app_localizations_pt.dart';

// ignore_for_file: type=lint

/// Callers can lookup localized strings with an instance of AppLocalizations
/// returned by `AppLocalizations.of(context)`.
///
/// Applications need to include `AppLocalizations.delegate()` in their app's
/// `localizationDelegates` list, and the locales they support in the app's
/// `supportedLocales` list. For example:
///
/// ```dart
/// import 'l10n/app_localizations.dart';
///
/// return MaterialApp(
///   localizationsDelegates: AppLocalizations.localizationsDelegates,
///   supportedLocales: AppLocalizations.supportedLocales,
///   home: MyApplicationHome(),
/// );
/// ```
///
/// ## Update pubspec.yaml
///
/// Please make sure to update your pubspec.yaml to include the following
/// packages:
///
/// ```yaml
/// dependencies:
///   # Internationalization support.
///   flutter_localizations:
///     sdk: flutter
///   intl: any # Use the pinned version from flutter_localizations
///
///   # Rest of dependencies
/// ```
///
/// ## iOS Applications
///
/// iOS applications define key application metadata, including supported
/// locales, in an Info.plist file that is built into the application bundle.
/// To configure the locales supported by your app, you’ll need to edit this
/// file.
///
/// First, open your project’s ios/Runner.xcworkspace Xcode workspace file.
/// Then, in the Project Navigator, open the Info.plist file under the Runner
/// project’s Runner folder.
///
/// Next, select the Information Property List item, select Add Item from the
/// Editor menu, then select Localizations from the pop-up menu.
///
/// Select and expand the newly-created Localizations item then, for each
/// locale your application supports, add a new item and select the locale
/// you wish to add from the pop-up menu in the Value field. This list should
/// be consistent with the languages listed in the AppLocalizations.supportedLocales
/// property.
abstract class AppLocalizations {
  AppLocalizations(String locale)
    : localeName = intl.Intl.canonicalizedLocale(locale.toString());

  final String localeName;

  static AppLocalizations of(BuildContext context) {
    return Localizations.of<AppLocalizations>(context, AppLocalizations)!;
  }

  static const LocalizationsDelegate<AppLocalizations> delegate =
      _AppLocalizationsDelegate();

  /// A list of this localizations delegate along with the default localizations
  /// delegates.
  ///
  /// Returns a list of localizations delegates containing this delegate along with
  /// GlobalMaterialLocalizations.delegate, GlobalCupertinoLocalizations.delegate,
  /// and GlobalWidgetsLocalizations.delegate.
  ///
  /// Additional delegates can be added by appending to this list in
  /// MaterialApp. This list does not have to be used at all if a custom list
  /// of delegates is preferred or required.
  static const List<LocalizationsDelegate<dynamic>> localizationsDelegates =
      <LocalizationsDelegate<dynamic>>[
        delegate,
        GlobalMaterialLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
      ];

  /// A list of this localizations delegate's supported locales.
  static const List<Locale> supportedLocales = <Locale>[Locale('pt')];

  /// Texto de dica do campo de e-mail.
  ///
  /// In pt, this message translates to:
  /// **'Entre com seu e-mail acadêmico ou, se for pai/responsável, seu e-mail pessoal.'**
  String get authEmailDescription;

  /// Placeholder do campo de e-mail.
  ///
  /// In pt, this message translates to:
  /// **'Digite seu e-mail'**
  String get authEmailHint;

  /// Rótulo de e-mail
  ///
  /// In pt, this message translates to:
  /// **'E-mail'**
  String get authEmailLabel;

  /// Ação de entrar no aplicativo como visitante.
  ///
  /// In pt, this message translates to:
  /// **'Entrar como visitante'**
  String get authEnterAsGuest;

  /// Subtítulo da tela de login.
  ///
  /// In pt, this message translates to:
  /// **'Entre com sua conta para explorar o cardápio da lanchonete do seu colégio, fazer pedidos e aproveitar seus intervalos ao máximo!'**
  String get authLoginSubTitle;

  /// Título da tela de login.
  ///
  /// In pt, this message translates to:
  /// **'Bem-vindo ao GoSnack'**
  String get authLoginTitle;

  /// Placeholder do campo de criar senha.
  ///
  /// In pt, this message translates to:
  /// **'Digite sua nova senha'**
  String get authPasswordCreateHint;

  /// Rótulo de criar senha
  ///
  /// In pt, this message translates to:
  /// **'Criar senha'**
  String get authPasswordCreateLabel;

  /// Placeholder do campo de senha.
  ///
  /// In pt, this message translates to:
  /// **'Digite sua senha'**
  String get authPasswordHint;

  /// Rótulo de senha
  ///
  /// In pt, this message translates to:
  /// **'Senha'**
  String get authPasswordLabel;

  /// Mensagem de requisito de senha sobre tamanho.
  ///
  /// In pt, this message translates to:
  /// **'A senha deve ter pelo menos 8 caracteres.'**
  String get authPasswordRequirementLength;

  /// Mensagem de requisito de senha sobre letra minúscula.
  ///
  /// In pt, this message translates to:
  /// **'A senha deve conter pelo menos uma letra minúscula.'**
  String get authPasswordRequirementLowercase;

  /// Mensagem de requisito de senha sobre número.
  ///
  /// In pt, this message translates to:
  /// **'A senha deve conter pelo menos um número.'**
  String get authPasswordRequirementNumber;

  /// Mensagem de requisito de senha sobre caractere especial.
  ///
  /// In pt, this message translates to:
  /// **'A senha deve conter pelo menos um caractere especial.'**
  String get authPasswordRequirementSpecialChar;

  /// Mensagem de requisito de senha sobre letra maiúscula.
  ///
  /// In pt, this message translates to:
  /// **'A senha deve conter pelo menos uma letra maiúscula.'**
  String get authPasswordRequirementUppercase;

  /// Ação de realizar login no aplicativo.
  ///
  /// In pt, this message translates to:
  /// **'Entrar'**
  String get authSignIn;

  /// Chamada para ação para o formulário de login.
  ///
  /// In pt, this message translates to:
  /// **'Já tem uma conta? Entre agora!'**
  String get authSignInCTA;

  /// Ação de realizar login no aplicativo com Google.
  ///
  /// In pt, this message translates to:
  /// **'Entrar com Google'**
  String get authSignInWithGoogle;

  /// Chamada de ação para criar uma conta.
  ///
  /// In pt, this message translates to:
  /// **'Não tem uma conta? Crie uma'**
  String get authSignUpCTA;

  /// Opção de criar uma conta usando o Google.
  ///
  /// In pt, this message translates to:
  /// **'Cadastrar com o Google'**
  String get authSignUpWithGoogle;

  /// Ação de avançar em fluxos
  ///
  /// In pt, this message translates to:
  /// **'Continuar'**
  String get commonContinue;

  /// Ação de avançar
  ///
  /// In pt, this message translates to:
  /// **'Próximo'**
  String get commonNext;

  /// Descrição de imagens do logo do aplicativo.
  ///
  /// In pt, this message translates to:
  /// **'Logo do GoSnack'**
  String get logoDescription;

  /// Descrição da primeira página de OnBoarding.
  ///
  /// In pt, this message translates to:
  /// **'O jeito mais rápido e fácil de pedir seus lanches dentro do colégio. Evite filas e aproveite seus intervalos ao máximo!'**
  String get onBoardingPage1Description;

  /// Título da primeira página de OnBoarding.
  ///
  /// In pt, this message translates to:
  /// **'Bem-vindo ao GoSnack'**
  String get onBoardingPage1Title;

  /// Descrição da segunda página de OnBoarding.
  ///
  /// In pt, this message translates to:
  /// **'Selecione a lanchonete do seu colégio, descubra o cardápio disponível e monte seu pedido do seu jeito!'**
  String get onBoardingPage2Description;

  /// Título da segunda página de OnBoarding.
  ///
  /// In pt, this message translates to:
  /// **'Explore o cardápio da sua unidade'**
  String get onBoardingPage2Title;

  /// Descrição da terceira página de OnBoarding.
  ///
  /// In pt, this message translates to:
  /// **'Finalize o pedido pelo app e retire quando estiver pronto. Rápido, seguro e sem filas!'**
  String get onBoardingPage3Description;

  /// Título da terceira página de OnBoarding.
  ///
  /// In pt, this message translates to:
  /// **'Pague e Retire Sem Complicações'**
  String get onBoardingPage3Title;

  /// Placeholder do campo de primeiro nome.
  ///
  /// In pt, this message translates to:
  /// **'Digite seu primeiro nome'**
  String get profileFistNameHint;

  /// Rótulo de primeiro nome
  ///
  /// In pt, this message translates to:
  /// **'Primeiro Nome'**
  String get profileFistNameLabel;

  /// Placeholder do campo de último nome.
  ///
  /// In pt, this message translates to:
  /// **'Digite seu último nome'**
  String get profileLastNameHint;

  /// Rótulo de último nome
  ///
  /// In pt, this message translates to:
  /// **'Último Nome'**
  String get profileLastNameLabel;
}

class _AppLocalizationsDelegate
    extends LocalizationsDelegate<AppLocalizations> {
  const _AppLocalizationsDelegate();

  @override
  Future<AppLocalizations> load(Locale locale) {
    return SynchronousFuture<AppLocalizations>(lookupAppLocalizations(locale));
  }

  @override
  bool isSupported(Locale locale) =>
      <String>['pt'].contains(locale.languageCode);

  @override
  bool shouldReload(_AppLocalizationsDelegate old) => false;
}

AppLocalizations lookupAppLocalizations(Locale locale) {
  // Lookup logic when only language code is specified.
  switch (locale.languageCode) {
    case 'pt':
      return AppLocalizationsPt();
  }

  throw FlutterError(
    'AppLocalizations.delegate failed to load unsupported locale "$locale". This is likely '
    'an issue with the localizations generation tool. Please file an issue '
    'on GitHub with a reproducible sample app and the gen-l10n configuration '
    'that was used.',
  );
}
