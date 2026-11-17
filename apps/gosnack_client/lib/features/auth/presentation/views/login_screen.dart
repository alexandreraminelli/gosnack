import 'package:flutter/material.dart';
import 'package:gosnack_client/core/extensions/build_context_x.dart';
import 'package:gosnack_client/core/theme/dimensions/sizes.dart';
import 'package:gosnack_client/core/theme/dimensions/spacing.dart';
import 'package:gosnack_client/core/widgets/common/texts/form_header.dart';
import 'package:gosnack_client/core/widgets/layout/main_appbar.dart';

/// Tela de login do aplicativo.
class LoginScreen extends StatelessWidget {
  // Constructors ----------------------------------------------------------- //
  /// Construtor padrão da tela de login.
  const new({super.key});

  // Build Method ----------------------------------------------------------- //
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // AppBar ------------------------------------------------------------- //
      appBar: const MainAppBar(),
      // Body --------------------------------------------------------------- //
      body: SingleChildScrollView(
        child: Padding(
          padding: KSpacing.horizontalScreenPadding.copyWith(
            bottom: KSizes.md,
          ),
          child: Column(
            children: [
              // Header ------------------------------------------------------- //
              FormHeader(
                title: context.l10n.authLoginTitle,
                subtitle: context.l10n.authLoginSubTitle,
              ),

              // Form --------------------------------------------------------- //
            ],
          ),
        ),
      ),
    );
  }
}
