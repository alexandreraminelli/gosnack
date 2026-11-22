import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:gap/gap.dart';
import 'package:gosnack_client/core/extensions/build_context_x.dart';
import 'package:gosnack_client/core/resources/icons.dart';
import 'package:gosnack_client/core/theme/dimensions/sizes.dart';
import 'package:gosnack_client/core/widgets/ui/button.dart';
import 'package:gosnack_client/core/widgets/ui/icon_widget.dart';
import 'package:gosnack_client/features/auth/presentation/bloc/auth_bloc.dart';
import 'package:gosnack_client/features/auth/presentation/validators/auth_validators.dart';

/// Formulário de criação de conta com e-mail e senha.
class SignUpForm extends StatefulWidget {
  // Constructors ----------------------------------------------------------- //
  /// Construtor padrão do formulário de criação de conta.
  const new({super.key});

  // Overrides -------------------------------------------------------------- //
  @override
  State<SignUpForm> createState() => _SignUpFormState();
}

// -------------------------------------------------------------------------- //

class _SignUpFormState extends State<SignUpForm> {
  // Controllers ------------------------------------------------------------ //

  final _formKey = GlobalKey<FormState>();

  final _firstNameController = TextEditingController();
  final _lastNameController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();

  // Focus Nodes ------------------------------------------------------------ //

  final _firstNameFocus = FocusNode();
  final _lastNameFocus = FocusNode();
  final _emailFocus = FocusNode();
  final _passwordFocus = FocusNode();

  // Variables -------------------------------------------------------------- //

  bool _obscurePassword = true;

  // Lifecycle Methods ------------------------------------------------------ //

  @override
  void dispose() {
    // Liberar recursos ao descartar o widget
    _firstNameController.dispose();
    _lastNameController.dispose();
    _emailController.dispose();
    _passwordController.dispose();
    _firstNameFocus.dispose();
    _lastNameFocus.dispose();
    _emailFocus.dispose();
    _passwordFocus.dispose();
    super.dispose();
  }

  // Event Handlers --------------------------------------------------------- //

  /// Função executada ao submeter o formulário.
  void _submit() {
    if (!_formKey.currentState!.validate()) return; // Validar campos

    FocusScope.of(context).unfocus(); // Fechar teclado

    // Permitir que SO ofereça opção de salvar senha
    TextInput.finishAutofillContext();

    // Executar evento do Bloc
    context.read<AuthBloc>().add(
      AuthSignUpRequested(
        email: _emailController.text.trim(),
        password: _passwordController.text.trim(),
        firstName: _firstNameController.text.trim(),
        lastName: _lastNameController.text.trim(),
      ),
    );
  }

  /// Alternar visibilidade da senha
  void _togglePasswordVisibility() {
    setState(() => _obscurePassword = !_obscurePassword);
  }

  // Helper Methods --------------------------------------------------------- //

  // Build Method ----------------------------------------------------------- //
  @override
  Widget build(BuildContext context) {
    // Loading -------------------------------------------------------------- //
    final isLoading = context.select<AuthBloc, bool>(
      (bloc) => bloc.state is AuthLoading,
    );

    // Fields --------------------------------------------------------------- //

    final fields = <Widget>[
      // Primeiro Nome ------------------------------------------------------ //
      TextFormField(
        decoration: InputDecoration(labelText: context.l10n.authFirstNameLabel),
        // Controle:
        controller: _firstNameController,
        focusNode: _firstNameFocus,
        enabled: !isLoading,
        validator: (value) =>
            AuthValidators.validateName(value, context: context),
        onFieldSubmitted: (_) => _lastNameFocus.requestFocus(),
        // Teclado:
        keyboardType: TextInputType.name,
        textCapitalization: TextCapitalization.words,
        textInputAction: TextInputAction.next,
        // Autofill:
        autofillHints: const [AutofillHints.givenName],
      ),
      // Sobrenome ---------------------------------------------------------- //
      TextFormField(
        decoration: InputDecoration(labelText: context.l10n.authLastNameLabel),
        // Controle:
        controller: _lastNameController,
        focusNode: _lastNameFocus,
        enabled: !isLoading,
        validator: (value) =>
            AuthValidators.validateName(value, context: context),
        onFieldSubmitted: (_) => _emailFocus.requestFocus(),
        // Teclado:
        keyboardType: TextInputType.name,
        textCapitalization: TextCapitalization.words,
        textInputAction: TextInputAction.next,
        // Autofill:
        autofillHints: const [AutofillHints.familyName],
      ),
      // Email -------------------------------------------------------------- //
      TextFormField(
        decoration: InputDecoration(labelText: context.l10n.authEmailLabel),
        // Controle:
        controller: _emailController,
        focusNode: _emailFocus,
        enabled: !isLoading,
        validator: (value) =>
            AuthValidators.validateEmail(value, context: context),
        onFieldSubmitted: (_) => _passwordFocus.requestFocus(),
        // Teclado:
        keyboardType: TextInputType.emailAddress,
        textInputAction: TextInputAction.next,
        // Autofill:
        autofillHints: const [AutofillHints.email],
      ),
      // Senha -------------------------------------------------------------- //
      TextFormField(
        decoration: InputDecoration(
          labelText: context.l10n.authPasswordLabel,
          // Senha:
          suffix: IconButton(
            onPressed: _togglePasswordVisibility,
            icon: AppIcon(
              icon: _obscurePassword
                  ? AppIcons.hidePassword
                  : AppIcons.showPassword,
            ),
          ),
        ),
        // Controle:
        controller: _passwordController,
        focusNode: _passwordFocus,
        enabled: !isLoading,
        validator: (value) =>
            AuthValidators.validateCreatePassword(value, context: context),
        onFieldSubmitted: (_) => _passwordFocus.requestFocus(),
        // Senha:
        obscureText: _obscurePassword,
        // Teclado:
        keyboardType: TextInputType.visiblePassword,
        textInputAction: TextInputAction.done,
        // Autofill:
        autofillHints: const [AutofillHints.newPassword],
      ),
    ];

    // Form ----------------------------------------------------------------- //
    return Form(
      key: _formKey,
      // Validação de campos: ao interagir
      autovalidateMode: AutovalidateMode.onUserInteraction,

      // Grupo de autopreenchimento
      child: AutofillGroup(
        child: Column(
          spacing: KSizes.spacingBtwFields,
          children: [
            ...fields,
            const Gap(KSizes.spacingBtwItems),
            // Botão de criar conta
            AppButton(
              label: context.l10n.authSignUpSubmit,
              fullWidth: true,
              size: .xl,
              onPressed: isLoading ? null : _submit,
            ),
          ],
        ),
      ),
    );
  }
}
