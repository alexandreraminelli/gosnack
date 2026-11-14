import 'package:flutter/material.dart';

/// Tela de OnBoarding (Boas-Vindas).
class OnBoardingScreen extends StatefulWidget {
  // Constructors ----------------------------------------------------------- //
  /// Construtor da tela de OnBoarding.
  const new({required this.onCompleted, super.key});

  // Properties ------------------------------------------------------------- //

  /// Callback chamado quando o OnBoarding é concluído.
  final VoidCallback onCompleted;

  // Overrides -------------------------------------------------------------- //
  @override
  State<OnBoardingScreen> createState() => _OnBoardingScreenState();
}

// -------------------------------------------------------------------------- //

class _OnBoardingScreenState extends State<OnBoardingScreen> {
  // Controllers ------------------------------------------------------------ //

  // Focus Nodes ------------------------------------------------------------ //

  // Variables -------------------------------------------------------------- //

  // Lifecycle Methods ------------------------------------------------------ //

  // Event Handlers --------------------------------------------------------- //

  // Helper Methods --------------------------------------------------------- //

  // Build Method ----------------------------------------------------------- //
  @override
  Widget build(BuildContext context) {
    return const Placeholder(
      child: Center(child: Text('Tela de OnBoarding')),
    );
  }
}
