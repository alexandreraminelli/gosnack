import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:go_router/go_router.dart';
import 'package:gosnack_client/core/extensions/build_context_x.dart';
import 'package:gosnack_client/core/resources/icons.dart';
import 'package:gosnack_client/core/theme/dimensions/sizes.dart';
import 'package:gosnack_client/core/theme/dimensions/spacing.dart';
import 'package:gosnack_client/core/widgets/common/texts/form_header.dart';
import 'package:gosnack_client/core/widgets/layout/main_appbar.dart';
import 'package:gosnack_client/core/widgets/ui/button.dart';
import 'package:gosnack_client/features/auth/presentation/widgets/sign_up_form.dart';

/// Tela de criação de conta.
class CreateAccountScreen extends StatelessWidget {
  // Constructors ----------------------------------------------------------- //
  /// Construtor padrão da tela de criação de conta.
  const new({super.key});

  // Build Method ----------------------------------------------------------- //
  @override
  Widget build(BuildContext context) {
    final footer = Column(
      spacing: KSizes.spacingBtwItems,
      children: [
        // Botão de entrar com o Google
        AppButton(
          label: context.l10n.authSignUpWithGoogle,
          // TODO(Google): Adicionar ícone do Google
          fullWidth: true,
          variant: .secondary,
          size: .xl,
          onPressed: () {
            // TODO(Google): Implementar login com Google
          },
        ),
        // Botão de voltar pro login
        AppButton(
          label: context.l10n.authSignInCTA,
          icon: AppIcons.login,
          fullWidth: true,
          variant: .tertiary,
          size: .lg,
          onPressed: () => context.pop(),
        ),
      ],
    );

    return Scaffold(
      // AppBar ------------------------------------------------------------- //
      appBar: const MainAppBar(showBackButton: true),

      // Body --------------------------------------------------------------- //
      body: SingleChildScrollView(
        child: Padding(
          padding: KSpacing.horizontalScreenPadding.copyWith(bottom: KSizes.md),
          child: Column(
            children: [
              // Header ------------------------------------------------------- //
              const FormHeader(title: 'Criar Conta', fullWidth: true),

              // Form --------------------------------------------------------- //
              const SignUpForm(),

              // Footer ------------------------------------------------------- //
              const Gap(KSizes.xl2),
              footer,
            ],
          ),
        ),
      ),
    );
  }
}
