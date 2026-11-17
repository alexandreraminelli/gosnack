import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:gosnack_client/core/extensions/context_extensions.dart';
import 'package:gosnack_client/core/theme/dimensions/sizes.dart';
import 'package:gosnack_client/core/theme/dimensions/spacing.dart';

/// Cabeçalho para formulários com título e subtítulo.
class FormHeader extends StatelessWidget {
  // Constructors ----------------------------------------------------------- //
  /// Construtor padrão do cabeçalho de formulário.
  const new({
    required this.title,
    this.subtitle,
    super.key,
  });

  // Properties ------------------------------------------------------------- //

  /// Título do cabeçalho.
  final String title;

  /// Subtítulo do cabeçalho.
  final String? subtitle;

  // Build Method ----------------------------------------------------------- //
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: KSpacing.verticalLg,
      child: Column(
        children: [
          // Title ------------------------------------------------------------ //
          Text(
            title,
            textAlign: TextAlign.center,
            style: context.textTheme.headlineLarge,
          ),

          // Subtitle --------------------------------------------------------- //
          if (subtitle != null) ...[
            const Gap(KSizes.sm),
            Text(
              subtitle!,
              textAlign: TextAlign.center,
              style: context.textTheme.bodyMedium?.copyWith(
                color: context.palette.content4foreground,
              ),
            ),
          ],
        ],
      ),
    );
  }
}
