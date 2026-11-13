import 'package:flutter/material.dart';

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
      theme: ThemeData(fontFamily: 'Geist'),

      home: const Scaffold(body: Center(child: Text('GoSnack Client'))),
    );
  }
}
