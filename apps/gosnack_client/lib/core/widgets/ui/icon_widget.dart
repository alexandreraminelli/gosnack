import 'package:flutter/material.dart';
import 'package:gosnack_client/core/extensions/context_extensions.dart';
import 'package:gosnack_client/core/resources/icons.dart';
import 'package:hugeicons/hugeicons.dart';

/// Widget de ícone do aplicativo.
///
/// Implementa o HugeIcons.
/// @see https://hugeicons.com/docs/integrations/flutter
class AppIcon extends StatelessWidget {
  // Constructors ----------------------------------------------------------- //
  /// Construtor do widget de ícone do aplicativo [AppIcon].
  const new({
    required this.icon,
    this.size,
    this.color,
    super.key,
  });

  // Properties ------------------------------------------------------------- //

  /// Ícone a ser exibido.
  final AppIconType icon;

  /// Tamanho do ícone.
  final double? size;

  /// Cor do ícone.
  final Color? color;

  // Build Method ----------------------------------------------------------- //
  @override
  Widget build(BuildContext context) {
    return HugeIcon(
      icon: icon,
      size: size,
      color: color ?? context.colors.onSurface,
    );
  }
}
