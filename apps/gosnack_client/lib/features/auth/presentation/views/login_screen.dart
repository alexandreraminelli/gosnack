import 'package:flutter/material.dart';
import 'package:gosnack_client/core/widgets/layout/main_appbar.dart';

/// Tela de login do aplicativo.
class LoginScreen extends StatelessWidget {
  // Constructors ----------------------------------------------------------- //
  /// Construtor padrão da tela de login.
  const new({super.key});

  // Build Method ----------------------------------------------------------- //
  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      // AppBar ------------------------------------------------------------- //
      appBar: MainAppBar(),
      // Body --------------------------------------------------------------- //
      body: Center(
        child: Text('Tela de Login'),
      ),
    );
  }
}
