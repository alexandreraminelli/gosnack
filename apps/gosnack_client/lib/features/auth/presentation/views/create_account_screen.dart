import 'package:flutter/material.dart';
import 'package:gosnack_client/core/widgets/common/texts/form_header.dart';
import 'package:gosnack_client/core/widgets/layout/main_appbar.dart';

/// Tela de criação de conta.
class CreateAccountScreen extends StatelessWidget {
  // Constructors ----------------------------------------------------------- //
  /// Construtor padrão da tela de criação de conta.
  const new({super.key});

  // Build Method ----------------------------------------------------------- //
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // AppBar ------------------------------------------------------------- //
      appBar: const MainAppBar(showBackButton: true),

      // Body --------------------------------------------------------------- //
      body: SingleChildScrollView(
        child: Column(
          children: [
            // Header ------------------------------------------------------- //
            FormHeader(title: 'Criar Conta'),

            // Form --------------------------------------------------------- //

            // Footer ------------------------------------------------------- //
          ],
        ),
      ),
    );
  }
}
