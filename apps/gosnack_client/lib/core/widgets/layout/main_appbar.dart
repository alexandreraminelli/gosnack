import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:gosnack_client/core/extensions/build_context_x.dart';
import 'package:gosnack_client/core/extensions/context_extensions.dart';
import 'package:gosnack_client/core/resources/icons.dart';
import 'package:gosnack_client/core/resources/vectors.dart';
import 'package:gosnack_client/core/theme/dimensions/sizes.dart';
import 'package:gosnack_client/core/widgets/app_icon.dart';

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
      onPressed: () {
        // TODO(Navigation): Implementar ação de voltar.
      },
    );

    // Title Widget --------------------------------------------------------- //

    final title =
        titleWidget ??
        SvgPicture.asset(
          context.isDarkMode
              ? AppVectors.logoInlineWhite
              : AppVectors.logoInlineBlack,
          height: KSizes.xl,
          semanticsLabel: context.l10n.logoDescription,
        );

    // Main Widget ---------------------------------------------------------- //
    return AppBar(
      // Title -------------------------------------------------------------- //
      centerTitle: true,
      title: title,

      // BackButton --------------------------------------------------------- //
      automaticallyImplyLeading: false,
      leadingWidth: KSizes.horizontalScreenPadding + kToolbarHeight,
      leading: showBackButton
          ? Padding(
              padding: const EdgeInsets.only(
                left: KSizes.horizontalScreenPadding,
              ),
              child: backButton,
            )
          : null,

      // Actions ------------------------------------------------------------ //
      actions: actions,
    );
  }
}
