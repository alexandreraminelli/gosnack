import 'package:flutter/material.dart';
import 'package:gosnack_client/core/extensions/context_extensions.dart';
import 'package:gosnack_client/core/theme/colors/color_schemes.dart';
import 'package:gosnack_client/core/theme/typography/typography.dart';

/// Widget raiz do aplicativo GoSnack.
class GoSnackApp extends StatelessWidget {
  // Constructor ------------------------------------------------------------ //
  /// Construtor da classe [GoSnackApp].
  const new({super.key});

  // Build Method ----------------------------------------------------------- //
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      // Theme -------------------------------------------------------------- //
      // TODO(Theme): Extrair ThemeData para arquivo separado.
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: AppColorSchemes.light,
        fontFamily: AppTypography.fontFamily,
        textTheme: AppTypography.textTheme,
      ),

      home: Scaffold(
        body: ListView(
          children: [
            Text(
              'Display Large',
              style: context.textTheme.displayLarge,
            ),
            Text(
              'Display Medium',
              style: context.textTheme.displayMedium,
            ),
            Text(
              'Display Small',
              style: context.textTheme.displaySmall,
            ),

            Text(
              'Headline Large',
              style: context.textTheme.headlineLarge,
            ),
            Text(
              'Headline Medium',
              style: context.textTheme.headlineMedium,
            ),
            Text(
              'Headline Small',
              style: context.textTheme.headlineSmall,
            ),

            Text('Title Large', style: context.textTheme.titleLarge),
            Text(
              'Title Medium',
              style: context.textTheme.titleMedium,
            ),
            Text('Title Small', style: context.textTheme.titleSmall),

            Text('Body Large', style: context.textTheme.bodyLarge),
            Text('Body Medium', style: context.textTheme.bodyMedium),
            Text('Body Small', style: context.textTheme.bodySmall),

            Text('Label Large', style: context.textTheme.labelLarge),
            Text(
              'Label Medium',
              style: context.textTheme.labelMedium,
            ),
            Text('Label Small', style: context.textTheme.labelSmall),
          ],
        ),
      ),
    );
  }
}
