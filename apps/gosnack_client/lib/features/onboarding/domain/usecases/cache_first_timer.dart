import 'package:gosnack_client/core/utils/typedef.dart';
import 'package:gosnack_client/core/utils/usecases.dart';
import 'package:gosnack_client/features/onboarding/domain/repositories/on_boarding_repository.dart';

/// UseCase para marcar o usuário como tendo completado o OnBoarding.
class CacheFirstTimer extends UseCaseWithoutParams<void> {
  // Constructor ------------------------------------------------------------ //
  /// Construtor da classe [CacheFirstTimer].
  new(this._repository);

  // Dependencies ----------------------------------------------------------- //

  final OnBoardingRepository _repository;

  // UC Implementation ------------------------------------------------------ //
  @override
  ResultFuture<void> call() async => await _repository.cacheFirstTimer();
}
