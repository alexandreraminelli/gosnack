import 'package:flutter/material.dart';
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
              style: Theme.of(context).textTheme.displayLarge,
            ),
            Text(
              'Display Medium',
              style: Theme.of(context).textTheme.displayMedium,
            ),
            Text(
              'Display Small',
              style: Theme.of(context).textTheme.displaySmall,
            ),

            Text(
              'Headline Large',
              style: Theme.of(context).textTheme.headlineLarge,
            ),
            Text(
              'Headline Medium',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
            Text(
              'Headline Small',
              style: Theme.of(context).textTheme.headlineSmall,
            ),

            Text('Title Large', style: Theme.of(context).textTheme.titleLarge),
            Text(
              'Title Medium',
              style: Theme.of(context).textTheme.titleMedium,
            ),
            Text('Title Small', style: Theme.of(context).textTheme.titleSmall),

            Text('Body Large', style: Theme.of(context).textTheme.bodyLarge),
            Text('Body Medium', style: Theme.of(context).textTheme.bodyMedium),
            Text('Body Small', style: Theme.of(context).textTheme.bodySmall),

            Text('Label Large', style: Theme.of(context).textTheme.labelLarge),
            Text(
              'Label Medium',
              style: Theme.of(context).textTheme.labelMedium,
            ),
            Text('Label Small', style: Theme.of(context).textTheme.labelSmall),
          ],
        ),
      ),
    );
  }
}
