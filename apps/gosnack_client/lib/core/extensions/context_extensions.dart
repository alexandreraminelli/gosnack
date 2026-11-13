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

  /// Retorna o tamanho da tela, [Size], do contexto atual.
  Size get size => MediaQuery.sizeOf(this);

  /// Retorna a altura da tela, [double], do contexto atual.
  double get height => size.height;

  /// Retorna a largura da tela, [double], do contexto atual.
  double get width => size.width;
}
