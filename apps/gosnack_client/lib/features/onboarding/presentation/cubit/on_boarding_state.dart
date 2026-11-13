part of 'on_boarding_cubit.dart';

// Base State --------------------------------------------------------------- //

/// Estado base do Cubit de OnBoarding.
sealed class OnBoardingState extends Equatable {
  const new();

  @override
  List<Object> get props => [];
}

// Initial State ------------------------------------------------------------ //

/// Estado inicial do Cubit de OnBoarding.
final class OnBoardingInitial extends OnBoardingState {
  /// Construtor do estado inicial [OnBoardingInitial].
  const new();
}

// Loading States ----------------------------------------------------------- //

/// Estado de carregamento do Cubit de OnBoarding para indicar que o processo de
/// cacheamento do primeiro acesso está em andamento.
final class CachingFirstTimer extends OnBoardingState {
  /// Construtor do estado de carregamento [CachingFirstTimer].
  const new();
}

/// Estado de carregamento do Cubit de OnBoarding para indicar que o processo de
/// verificação de primeiro acesso está em andamento.
final class CheckingIfUserIsFirstTimer extends OnBoardingState {
  /// Construtor do estado de carregamento [CheckingIfUserIsFirstTimer].
  const new();
}

// Success States ----------------------------------------------------------- //

/// Estado de sucesso do Cubit de OnBoarding para indicar que o usuário foi
/// cacheado com sucesso.
class UserCached extends OnBoardingState {
  /// Construtor do estado de sucesso [UserCached].
  const new();
}

/// Estado de sucesso do Cubit de OnBoarding para indicar que foi verificado se
/// o usuário é um primeiro acesso ou não.
class OnBoardingStatus extends OnBoardingState {
  /// Construtor do estado de sucesso [OnBoardingStatus].
  const new({required this.isFirstTimer});

  /// Indica se o usuário é um primeiro acesso ou não.
  final bool isFirstTimer;

  @override
  List<Object> get props => [isFirstTimer];
}

// Error States ------------------------------------------------------------- //

/// Estado de erro do Cubit de OnBoarding.
class OnBoardingError extends OnBoardingState {
  /// Construtor do estado de erro [OnBoardingError].
  const new(this.message);

  /// Mensagem de erro.
  final String message;

  @override
  List<Object> get props => [message];
}
