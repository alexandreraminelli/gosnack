import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:gosnack_client/features/onboarding/domain/usecases/cache_first_timer.dart';
import 'package:gosnack_client/features/onboarding/domain/usecases/check_if_user_is_first_timer.dart';

part 'on_boarding_state.dart';

/// Cubit responsável por gerenciar o estado do OnBoarding.
class OnBoardingCubit extends Cubit<OnBoardingState> {
  // Constructor ------------------------------------------------------------ //

  /// Construtor do Cubit de OnBoarding [OnBoardingCubit].
  new({required this._cacheFirstTimer, required this._checkIfUserIsFirstTimer})
    : super(const OnBoardingInitial());

  // Use Cases -------------------------------------------------------------- //

  final CacheFirstTimer _cacheFirstTimer;
  final CheckIfUserIsFirstTimer _checkIfUserIsFirstTimer;

  // Methods ---------------------------------------------------------------- //

  /// Método responsável por cachear o primeiro acesso do usuário.
  Future<void> cacheFirstTimer() async {
    emit(const CachingFirstTimer()); // Emitir estado de carregamento

    final result = await _cacheFirstTimer(); // Executar caso de uso

    result.fold(
      (failure) => emit(OnBoardingError(failure.message)), // erro
      (_) => emit(const UserCached()), // sucesso
    );
  }

  /// Método responsável por verificar se o usuário é um primeiro acesso ou não.
  Future<void> checkIfUserIsFirstTimer() async {
    emit(const CheckingIfUserIsFirstTimer()); // Emitir estado de carregamento

    final result = await _checkIfUserIsFirstTimer(); // Executar caso de uso

    result.fold(
      (failure) => emit(const OnBoardingStatus(isFirstTimer: true)), // erro
      (status) => emit(OnBoardingStatus(isFirstTimer: status)), // sucesso
    );
  }
}
