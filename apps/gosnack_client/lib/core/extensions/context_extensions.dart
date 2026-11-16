import 'package:flutter/material.dart';
import 'package:gosnack_client/core/theme/colors/app_palette.dart';

/// Extensão para acessar o tema do contexto do Material de forma mais
/// conveniente.
extension ContextExtensions on BuildContext {
  // Theme ------------------------------------------------------------------ //

  /// Retorna o [ThemeData] do contexto atual.
  ThemeData get theme => Theme.of(this);

  /// Retorna o [ColorScheme] do contexto atual.
  ColorScheme get colors => theme.colorScheme;

  /// Retorna o [TextTheme] do contexto atual.
  TextTheme get textTheme => theme.textTheme;

  /// Retorna o [AppPalette] do contexto atual.
  AppPalette get palette => theme.extension<AppPalette>() ?? AppPalette.light;

  /// Retorna se o tema atual é o modo escuro.
  bool get isDarkMode => theme.brightness == Brightness.dark;

  // Media Query ------------------------------------------------------------ //

  /// Retorna o [MediaQueryData] do contexto atual.
  MediaQueryData get mediaQuery => MediaQuery.of(this);

  /// Retorna o tamanho da tela do contexto atual.
  Size get size => MediaQuery.sizeOf(this);

  /// Retorna a largura da tela do contexto atual.
  double get width => size.width;

  /// Retorna a altura da tela do contexto atual.
  double get height => size.height;

  /// Retorna a densidade de pixels da tela do contexto atual.
  double get pixelRatio => MediaQuery.devicePixelRatioOf(this);

  /// Retorna a altura da barra de status do contexto atual.
  double get statusBarHeight => MediaQuery.paddingOf(this).top;

  /// Retorna a altura do teclado virtual do contexto atual.
  double get keyboardHeight => MediaQuery.viewInsetsOf(this).bottom;

  /// Retorna se o teclado virtual está visível no contexto atual.
  bool get isKeyboardVisible => keyboardHeight > 0;
}
