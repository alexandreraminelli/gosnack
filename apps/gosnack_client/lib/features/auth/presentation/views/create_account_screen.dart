import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:gap/gap.dart';
import 'package:go_router/go_router.dart';
import 'package:gosnack_client/core/di/injection_container.dart';
import 'package:gosnack_client/core/extensions/build_context_x.dart';
import 'package:gosnack_client/core/resources/icons.dart';
import 'package:gosnack_client/core/theme/dimensions/sizes.dart';
import 'package:gosnack_client/core/theme/dimensions/spacing.dart';
import 'package:gosnack_client/core/widgets/common/texts/form_header.dart';
import 'package:gosnack_client/core/widgets/layout/main_appbar.dart';
import 'package:gosnack_client/core/widgets/ui/button.dart';
import 'package:gosnack_client/features/auth/presentation/bloc/auth_bloc.dart';
import 'package:gosnack_client/features/auth/presentation/widgets/sign_up_form.dart';

/// Tela de criação de conta.
class CreateAccountScreen extends StatelessWidget {
  // Constructors ----------------------------------------------------------- //
  /// Construtor padrão da tela de criação de conta.
  const new({super.key});

  // Build Method ----------------------------------------------------------- //
  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      // Injetar o Bloc usando o Service Locator
      create: (_) => sl<AuthBloc>(),
      child: BlocListener<AuthBloc, AuthState>(
        // Escutar apenas quando houver erro de autenticação
        listenWhen: (_, state) => state is AuthError,
        // Exibir uma mensagem de erro quando ocorrer um erro de autenticação
        listener: (context, state) {
          if (state is AuthError) {
            // TODO(SnackBar): Criar SnackBar customizado
            ScaffoldMessenger.of(context)
              ..hideCurrentSnackBar()
              ..showSnackBar(SnackBar(content: Text(state.message)));
          }
        },
        child: const _CreateAccountView(),
      ),
    );
  }
}

class _CreateAccountView extends StatelessWidget {
  // Constructors ----------------------------------------------------------- //
  const new({super.key});

  // Build Method ----------------------------------------------------------- //
  @override
  Widget build(BuildContext context) {
    final isLoading = context.select<AuthBloc, bool>(
      (bloc) => bloc.state is AuthLoading,
    );

    // Footer --------------------------------------------------------------- //
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
          onPressed: isLoading
              ? null // desabilitar durante loading
              : () => context.read<AuthBloc>().add(
                  const AuthGoogleSignInRequested(),
                ),
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

    // Main Widget ---------------------------------------------------------- //
    return Scaffold(
      // AppBar ------------------------------------------------------------- //
      appBar: const MainAppBar(showBackButton: true),

      // Body --------------------------------------------------------------- //
      body: SingleChildScrollView(
        child: Padding(
          padding: KSpacing.horizontalScreenPadding.copyWith(bottom: KSizes.md),
          child: Column(
            children: [
              const FormHeader(title: 'Criar Conta', fullWidth: true),
              const SignUpForm(),
              const Gap(KSizes.xl2),
              footer,
            ],
          ),
        ),
      ),
    );
  }
}
