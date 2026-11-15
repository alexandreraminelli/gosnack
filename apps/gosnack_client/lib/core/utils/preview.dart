import 'package:flutter/material.dart';
import 'package:flutter/widget_previews.dart';
import 'package:gosnack_client/core/theme/theme.dart';

/// Classe que define o tema do Flutter Widget Preview para o app GoSnack.
final class GoSnackPreviewTheme extends PreviewThemeData {
  /// Construtor da classe [GoSnackPreviewTheme].
  const new();

  @override
  Widget apply(BuildContext context, Widget child) {
    final isDark = MediaQuery.platformBrightnessOf(context) == Brightness.dark;
    return Theme(
      data: isDark ? AppTheme.dark : AppTheme.light,
      child: child,
    );
  }
}

/// Classe que define o Widget Preview para o app GoSnack.
final class GoSnackPreview extends Preview {
  /// Construtor da classe [GoSnackPreview].
  const new({
    super.name,
    super.group,
    super.size,
    super.textScaleFactor,
    super.wrapper,
    super.brightness,
    super.localizations,
  }) : super(theme: GoSnackPreviewTheme.new);
}
