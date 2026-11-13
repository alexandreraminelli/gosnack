import 'package:dartz/dartz.dart';
import 'package:gosnack_client/core/errors/exceptions.dart';
import 'package:gosnack_client/core/errors/failures.dart';
import 'package:gosnack_client/core/utils/typedef.dart';
import 'package:gosnack_client/features/onboarding/data/datasources/on_boarding_local_data_source.dart';
import 'package:gosnack_client/features/onboarding/domain/repositories/on_boarding_repository.dart';

/// Implementação concreta do repositório de onboarding na camada de dados.
class OnBoardingRepositoryImpl implements OnBoardingRepository {
  // Constructor ------------------------------------------------------------ //
  /// Construtor da classe [OnBoardingRepositoryImpl].
  const new(this._localDataSource);

  // Dependencies ----------------------------------------------------------- //

  final OnBoardingLocalDataSource _localDataSource;

  // Implemented Methods ---------------------------------------------------- //

  @override
  ResultFuture<void> cacheFirstTimer() async {
    try {
      await _localDataSource.cacheFirstTimer();
      return const Right(null);
    } on CacheException catch (e) {
      return Left(CacheFailure(message: e.message));
    }
  }

  @override
  ResultFuture<bool> checkIfUserIsFirstTimer() async {
    try {
      final result = await _localDataSource.checkIfUserIsFirstTimer();
      return Right(result);
    } on CacheException catch (e) {
      return Left(CacheFailure(message: e.message));
    }
  }
}
