import 'package:equatable/equatable.dart';

/// Conteúdo de uma página de OnBoarding.
class OnBoardingPageContent extends Equatable {
  // Constructor ------------------------------------------------------------ //
  /// Construtor da classe [OnBoardingPageContent].
  const new({
    required this.title,
    required this.description,
    required this.animation,
  });

  // Properties ------------------------------------------------------------- //

  /// Título da página.
  final String title;

  /// Descrição da página.
  final String description;

  /// Animação Lottie da página.
  final String animation;

  // Overrides -------------------------------------------------------------- //
  @override
  List<String?> get props => [title, description, animation];
}
