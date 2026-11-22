import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:gosnack_client/core/extensions/context_extensions.dart';
import 'package:gosnack_client/core/resources/icons.dart';
import 'package:gosnack_client/core/theme/colors/app_palette.dart';
import 'package:gosnack_client/core/theme/colors/colors.dart';
import 'package:gosnack_client/core/theme/dimensions/radius.dart';
import 'package:gosnack_client/core/theme/dimensions/sizes.dart';
import 'package:gosnack_client/core/theme/dimensions/spacing.dart';
import 'package:gosnack_client/core/theme/typography/typography.dart';
import 'package:gosnack_client/core/widgets/ui/icon_widget.dart';

// Button Properties -------------------------------------------------------- //

/// Cores de uma variante.
typedef ButtonColors = ({
  Color background,
  Color foreground,
  Color? border,
});

/// Variação do botão.
enum ButtonVariant {
  /// Botão primário.
  primary,

  /// Botão secundário.
  secondary,

  /// Botão terciário.
  tertiary,

  /// Botão de contorno.
  outline,

  /// Botão de aviso.
  warning,

  /// Botão destrutivo.
  danger;

  /// Retorna as cores da variante do botão.
  ButtonColors colorsOf(AppPalette palette) => switch (this) {
    primary => (
      background: AppColors.primary,
      foreground: AppColors.primaryForeground,
      border: null,
    ),
    secondary => (
      background: palette.defaultScale[100],
      foreground: palette.defaultScale[900],
      border: AppColors.primary,
    ),
    tertiary => (
      background: palette.defaultColor,
      foreground: palette.defaultForeground,
      border: null,
    ),
    outline => (
      background: palette.background,
      foreground: palette.foreground,
      border: palette.defaultColor,
    ),
    warning => (
      background: AppColors.warning,
      foreground: AppColors.warningForeground,
      border: null,
    ),
    danger => (
      background: AppColors.danger,
      foreground: AppColors.dangerForeground,
      border: null,
    ),
  };
}

/// Tamanho do botão.
enum ButtonSize {
  /// Tamanho pequeno do botão.
  sm(
    height: 32,
    fontSize: AppTypography.fontXs,
    paddingX: KSpacing.horizontalSm,
  ),

  /// Tamanho médio do botão.
  md(
    height: 40,
    fontSize: AppTypography.fontSm,
    paddingX: KSpacing.horizontalMd,
  ),

  /// Tamanho grande do botão.
  lg(
    height: 48,
    fontSize: AppTypography.fontMd,
    paddingX: KSpacing.horizontalLg,
  ),

  /// Tamanho extra grande do botão.
  xl(
    height: 56,
    fontSize: AppTypography.fontLg,
    paddingX: KSpacing.horizontalXl,
  ),

  /// Tamanho extra grande 2 do botão.
  xl2(
    height: 64,
    fontSize: AppTypography.fontXl,
    paddingX: KSpacing.horizontalXl2,
  );

  new({
    required this.height,
    required this.fontSize,
    required this.paddingX,
  }) : // Valores iguais para todas as variantes ou calculados:
       iconSize = fontSize * 1.5;

  /// Altura do botão.
  final double height;

  /// Tamanho da fonte do botão.
  final double fontSize;

  /// Tamanho do ícone.
  final double iconSize;

  /// Padding horizontal do botão.
  final EdgeInsets paddingX;
}

// -------------------------------------------------------------------------- //

/// Botão customizado com o tema do aplicativo.
class AppButton extends StatelessWidget {
  // Constructors ----------------------------------------------------------- //
  /// Construtor do botão customizado.
  const new({
    required this.label,
    this.icon,
    this.onPressed,
    this.variant = ButtonVariant.primary,
    this.size = ButtonSize.md,
    this.fullWidth = false,
    this.iconOnly = false,
    this.isLoading = false,
    super.key,
  }) : assert(
         // Evitar botão com iconOnly sem ícone
         !iconOnly || icon != null,
         'Button cannot be icon only without an icon.',
       );

  // Properties ------------------------------------------------------------- //

  /// Texto do botão.
  final String label;

  /// Ícone do botão.
  final AppIconType? icon;

  /// Função executada ao clicar no botão.
  final VoidCallback? onPressed;

  /// Variação do botão.
  final ButtonVariant variant;

  /// Tamanho do botão.
  final ButtonSize size;

  /// Se o botão deve ter width full.
  final bool fullWidth;

  /// Se o botão tem apenas um ícone.
  final bool iconOnly;

  /// Se o botão está no estado de carregamento.
  /// Se `true`, exibe um loading spinner.
  final bool isLoading;

  // Helper Methods --------------------------------------------------------- //

  /// Retorna o estilo do botão baseado na variante e no estado.
  ButtonStyle _style(BuildContext context, ButtonColors colors) {
    final background = colors.background;
    final foreground = colors.foreground;
    final border = colors.border;

    return ButtonStyle(
      // WidgetStatePropertyAll: Evita que o Material pinte o estado disabled
      backgroundColor: WidgetStatePropertyAll(background),
      foregroundColor: WidgetStatePropertyAll(foreground),

      overlayColor: WidgetStateProperty.resolveWith((states) {
        if (states.contains(WidgetState.pressed)) {
          return foreground.withValues(alpha: 0.12); // Estado Pressionado
        }
        if (states.contains(WidgetState.hovered)) {
          return foreground.withValues(alpha: 0.08); // Estado Hover
        }
        return null; // Estado Normal
      }),

      elevation: const WidgetStatePropertyAll(0), // Sem sombra
      // IconOnly: formato quadrado (width igual a height)
      minimumSize: WidgetStatePropertyAll(
        Size(
          iconOnly ? size.height : 0,
          size.height,
        ),
      ),
      maximumSize: iconOnly
          ? WidgetStatePropertyAll(Size.square(size.height))
          : null,
      padding: WidgetStatePropertyAll(
        iconOnly ? EdgeInsets.zero : size.paddingX,
      ),

      // Tipografia
      textStyle: WidgetStatePropertyAll(
        context.textTheme.labelLarge?.copyWith(
          fontSize: size.fontSize,
        ),
      ),

      shape: WidgetStatePropertyAll(
        RoundedRectangleBorder(
          // Border Radius
          borderRadius: KRadius.md,
          // Borda
          side: border == null
              ? BorderSide.none
              : BorderSide(color: border, width: 1.5),
        ),
      ),

      tapTargetSize: MaterialTapTargetSize.shrinkWrap, // Remove padding extra
    );
  }

  // Build Method ----------------------------------------------------------- //
  @override
  Widget build(BuildContext context) {
    /// Cores da variante.
    final colors = variant.colorsOf(context.palette);
    final foreground = colors.foreground;

    /// Ícone da esquerda.
    final leading = isLoading
        // Loading Icon:
        ? SizedBox.square(
            dimension: size.iconSize,
            child: CircularProgressIndicator(
              strokeWidth: 2,
              color: foreground,
            ),
          )
        : ((icon != null)
              // Custom Icon:
              ? AppIcon(icon: icon!, size: size.iconSize, color: foreground)
              // Sem Ícone:
              : null);

    /// Conteúdo do botão.
    final content = iconOnly
        ? leading!
        : Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              // Ícone
              if (leading != null) ...[
                leading,
                const Gap(KSizes.xs),
              ],
              // Label
              Flexible(child: Text(label, overflow: TextOverflow.ellipsis)),
            ],
          );

    return Semantics(
      // Label de acessibilidade
      label: iconOnly ? label : null,
      child: Opacity(
        // Escurecer quando desabilitado
        opacity: onPressed == null ? 0.5 : 1.0,
        child: SizedBox(
          width: fullWidth ? double.infinity : null,
          child: FilledButton(
            onPressed: isLoading ? null : onPressed,
            style: _style(context, colors),
            child: content,
          ),
        ),
      ),
    );
  }
}
