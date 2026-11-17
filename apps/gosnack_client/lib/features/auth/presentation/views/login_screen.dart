import 'package:flutter/material.dart';
import 'package:gosnack_client/core/extensions/build_context_x.dart';
import 'package:gosnack_client/core/resources/icons.dart';
import 'package:gosnack_client/core/theme/dimensions/sizes.dart';
import 'package:gosnack_client/core/theme/dimensions/spacing.dart';
import 'package:gosnack_client/core/widgets/common/texts/form_header.dart';
import 'package:gosnack_client/core/widgets/layout/main_appbar.dart';
import 'package:gosnack_client/core/widgets/ui/button.dart';

/// Tela de login do aplicativo.
class LoginScreen extends StatelessWidget {
  // Constructors ----------------------------------------------------------- //
  /// Construtor padrão da tela de login.
  const new({super.key});

  // Build Method ----------------------------------------------------------- //
  @override
  Widget build(BuildContext context) {
    final footer = Column(
      spacing: KSizes.spacingBtwItems,
      children: [
        // Botão de Login com o Google
        AppButton(
          label: context.l10n.authSignInWithGoogle,
          // TODO(Google): Adicionar ícone do Google
          fullWidth: true,
          variant: .secondary,
          size: .xl,
          onPressed: () {
            // TODO(Google): Implementar login com Google
          },
        ),

        // Botão de ir pra tela de cadastro
        AppButton(
          label: context.l10n.authSignUpCTA,
          icon: AppIcons.create,
          fullWidth: true,
          variant: .tertiary,
          size: .lg,
          onPressed: () {
            // TODO(Sign-Up): Navegar pra página de cadastro
          },
        ),
        // Botão de entrar como convidado
        AppButton(
          label: context.l10n.authEnterAsGuest,
          icon: AppIcons.guest,
          fullWidth: true,
          variant: .outline,
          size: .lg,
          onPressed: () {
            // TODO(Guest): Ir pra página de cardápio sem autenticação
          },
        ),
      ],
    );

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
              // Header ----------------------------------------------------- //
              FormHeader(
                title: context.l10n.authLoginTitle,
                subtitle: context.l10n.authLoginSubTitle,
              ),

              // Form ------------------------------------------------------- //

              // Footer ----------------------------------------------------- //
              footer,
            ],
          ),
        ),
      ),
    );
  }
}
