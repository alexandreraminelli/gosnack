// ignore_for_file: public_member_api_docs Nomes dos ícones são autodescritivos.

import 'package:hugeicons/hugeicons.dart';

/// Tipagem dos ícones do Hugeicons.
typedef HugeIconType = List<List<dynamic>>;

/// Constantes dos ícones do Hugeicons para cada contexto do aplicativo.
abstract final class AppIcons {
  // Actions ---------------------------------------------------------------- //

  static const HugeIconType create = HugeIcons.strokeRoundedAdd01;
  static const HugeIconType edit = HugeIcons.strokeRoundedEdit04;
  static const HugeIconType delete = HugeIcons.strokeRoundedDelete02;

  // Arrows ----------------------------------------------------------------- //

  static const HugeIconType arrowLeft = HugeIcons.strokeRoundedArrowLeft01;
  static const HugeIconType arrowRight = HugeIcons.strokeRoundedArrowRight01;
  static const HugeIconType arrowUp = HugeIcons.strokeRoundedArrowUp01;
  static const HugeIconType arrowDown = HugeIcons.strokeRoundedArrowDown01;

  // Authentication --------------------------------------------------------- //

  static const HugeIconType login = HugeIcons.strokeRoundedLoginSquare01;
  static const HugeIconType logout = HugeIcons.strokeRoundedLogoutSquare01;

  static const HugeIconType showPassword = HugeIcons.strokeRoundedView;
  static const HugeIconType hidePassword = HugeIcons.strokeRoundedViewOffSlash;

  // Data & Time ------------------------------------------------------------ //

  static const HugeIconType calendar = HugeIcons.strokeRoundedCalendar03;
  static const HugeIconType clock = HugeIcons.strokeRoundedClock01;

  // Entities --------------------------------------------------------------- //

  static const HugeIconType unit = HugeIcons.strokeRoundedSchool;
  static const HugeIconType cafeteria = HugeIcons.strokeRoundedRestaurant02;

  static const HugeIconType location = HugeIcons.strokeRoundedLocation01;

  // Errors And Warnings ---------------------------------------------------- //

  static const HugeIconType noInternet = HugeIcons.strokeRoundedNoInternet;

  // Screens ---------------------------------------------------------------- //

  static const HugeIconType home = HugeIcons.strokeRoundedHome09;
  static const HugeIconType menu = HugeIcons.strokeRoundedMenuRestaurant;
  static const HugeIconType favorites = HugeIcons.strokeRoundedFavourite;
  static const HugeIconType myAccount = HugeIcons.strokeRoundedUserCircle;

  // Status ----------------------------------------------------------------- //

  static const HugeIconType info = HugeIcons.strokeRoundedInformationCircle;
  static const HugeIconType success = HugeIcons.strokeRoundedCheckmarkCircle02;
  static const HugeIconType warning = HugeIcons.strokeRoundedAlert02;
  static const HugeIconType error =
      HugeIcons.strokeRoundedMultiplicationSignCircle;

  // Roles ------------------------------------------------------------------ //

  static const HugeIconType manager = HugeIcons.strokeRoundedManager;
  static const HugeIconType employee = HugeIcons.strokeRoundedChef;

  // Users Fields ------------------------------------------------------- //

  static const HugeIconType email = HugeIcons.strokeRoundedMail01;
  static const HugeIconType password = HugeIcons.strokeRoundedLockPassword;
  static const HugeIconType name = HugeIcons.strokeRoundedIdentityCard;
}
