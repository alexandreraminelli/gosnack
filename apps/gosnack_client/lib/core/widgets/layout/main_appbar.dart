import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:gosnack_client/core/extensions/context_extensions.dart';
import 'package:gosnack_client/core/resources/icons.dart';
import 'package:gosnack_client/core/theme/dimensions/sizes.dart';
import 'package:gosnack_client/core/widgets/common/logo.dart';
import 'package:gosnack_client/core/widgets/ui/icon_widget.dart';

/// Appbar principal do aplicativo.
class MainAppBar extends StatelessWidget implements PreferredSizeWidget {
  // Constructors ----------------------------------------------------------- //

  /// Construtor do AppBar principal [MainAppBar].
  const new({
    this.showBackButton = false,
    this.titleWidget,
    this.actions,
    super.key,
  });

  // Properties ------------------------------------------------------------- //

  /// Se o botão de voltar deve ser exibido.
  final bool showBackButton;

  /// Widget personalizado para o título da AppBar.
  /// Se nulo, exibe a logo.
  final Widget? titleWidget;

  /// Lista de widgets de ações a serem exibidos na AppBar.
  final List<Widget>? actions;

  // Overrides -------------------------------------------------------------- //

  // Tamanho preferido: altura padrão do AppBar.
  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);

  // Build Method ----------------------------------------------------------- //
  @override
  Widget build(BuildContext context) {
    // Back Button ---------------------------------------------------------- //

    final backButton = IconButton(
      icon: const AppIcon(
        icon: AppIcons.arrowLeft,
        size: KSizes.xl,
      ),
      onPressed: () => context.pop(),
    );

    // Title Widget --------------------------------------------------------- //

    final title =
        titleWidget ?? const Logo(variation: .inline, height: KSizes.xl);

    // Main Widget ---------------------------------------------------------- //
    return AppBar(
      // Appearance --------------------------------------------------------- //
      backgroundColor: context.palette.content2,
      foregroundColor: context.palette.content2foreground,
      elevation: 0, // sem sombra
      // Border radius:
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(
          bottom: Radius.circular(KSizes.radiusLg),
        ),
      ),

      // Title -------------------------------------------------------------- //
      centerTitle: true,
      title: title,

      // BackButton --------------------------------------------------------- //
      automaticallyImplyLeading: false,
      leadingWidth: KSizes.xs + kToolbarHeight,

      leading: showBackButton
          ? Padding(
              padding: const EdgeInsets.only(left: KSizes.xs),
              child: backButton,
            )
          : null,

      // Actions ------------------------------------------------------------ //
      actionsPadding: const EdgeInsets.only(right: KSizes.xs),
      actions: actions,
    );
  }
}
