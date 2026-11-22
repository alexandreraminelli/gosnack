// ignore_for_file: public_member_api_docs Nomes dos ícones são autodescritivos.

import 'package:hugeicons/hugeicons.dart';

/// Tipagem da biblioteca de ícones usada pelo app.
///
/// Biblioteca em uso: HugeIcons
typedef AppIconType = List<List<dynamic>>;

/// Constantes dos ícones do Hugeicons para cada contexto do aplicativo.
abstract final class AppIcons {
  // Actions ---------------------------------------------------------------- //

  static const AppIconType create = HugeIcons.strokeRoundedAdd01;
  static const AppIconType edit = HugeIcons.strokeRoundedEdit04;
  static const AppIconType delete = HugeIcons.strokeRoundedDelete02;

  // Arrows ----------------------------------------------------------------- //

  static const AppIconType arrowLeft = HugeIcons.strokeRoundedArrowLeft01;
  static const AppIconType arrowRight = HugeIcons.strokeRoundedArrowRight01;
  static const AppIconType arrowUp = HugeIcons.strokeRoundedArrowUp01;
  static const AppIconType arrowDown = HugeIcons.strokeRoundedArrowDown01;

  // Authentication --------------------------------------------------------- //

  static const AppIconType login = HugeIcons.strokeRoundedLoginSquare01;
  static const AppIconType logout = HugeIcons.strokeRoundedLogoutSquare01;

  static const AppIconType showPassword = HugeIcons.strokeRoundedView;
  static const AppIconType hidePassword = HugeIcons.strokeRoundedViewOffSlash;

  // Data & Time ------------------------------------------------------------ //

  static const AppIconType calendar = HugeIcons.strokeRoundedCalendar03;
  static const AppIconType clock = HugeIcons.strokeRoundedClock01;

  // Entities --------------------------------------------------------------- //

  static const AppIconType unit = HugeIcons.strokeRoundedSchool;
  static const AppIconType cafeteria = HugeIcons.strokeRoundedRestaurant02;

  static const AppIconType location = HugeIcons.strokeRoundedLocation01;

  // Errors And Warnings ---------------------------------------------------- //

  static const AppIconType noInternet = HugeIcons.strokeRoundedNoInternet;

  // Screens ---------------------------------------------------------------- //

  static const AppIconType home = HugeIcons.strokeRoundedHome09;
  static const AppIconType menu = HugeIcons.strokeRoundedMenuRestaurant;
  static const AppIconType favorites = HugeIcons.strokeRoundedFavourite;
  static const AppIconType myAccount = HugeIcons.strokeRoundedUserCircle;

  // Status ----------------------------------------------------------------- //

  static const AppIconType info = HugeIcons.strokeRoundedInformationCircle;
  static const AppIconType success = HugeIcons.strokeRoundedCheckmarkCircle02;
  static const AppIconType warning = HugeIcons.strokeRoundedAlert02;
  static const AppIconType error =
      HugeIcons.strokeRoundedMultiplicationSignCircle;

  // Roles ------------------------------------------------------------------ //

  static const AppIconType employee = HugeIcons.strokeRoundedChef;
  static const AppIconType manager = HugeIcons.strokeRoundedManager;

  // Users Fields ------------------------------------------------------- //

  static const AppIconType email = HugeIcons.strokeRoundedMail01;
  static const AppIconType password = HugeIcons.strokeRoundedLockPassword;
  static const AppIconType name = HugeIcons.strokeRoundedIdentityCard;
}
