import 'package:dartz/dartz.dart';
import 'package:gosnack_client/core/errors/exceptions.dart';
import 'package:gosnack_client/core/errors/failures.dart';
import 'package:gosnack_client/core/utils/logger.dart';
import 'package:gosnack_client/core/utils/typedef.dart';
import 'package:gosnack_client/features/auth/data/datasources/auth_remote_data_source.dart';
import 'package:gosnack_client/features/auth/domain/entities/user.dart';
import 'package:gosnack_client/features/auth/domain/repositories/auth_repository.dart';

/// Implementação concreta do repositório de autenticação na camada de dados.
class AuthRepositoryImpl implements AuthRepository {
  // Constructor ------------------------------------------------------------ //
  /// Construtor da classe [AuthRepositoryImpl].
  const new(this._remoteDataSource, this._logger);

  // Dependencies ----------------------------------------------------------- //

  final AuthRemoteDataSource _remoteDataSource;
  final AppLogger _logger;

  // Helpers ---------------------------------------------------------------- //

  /// Executa [action] convertendo exceções em [Failure].
  ///
  /// Centraliza o try/catch para que cada método do repositório não precise
  /// repetir o mesmo padrão de tratamento de erros.
  ResultFuture<T> _guard<T>(
    String operation,
    Future<T> Function() action,
  ) async {
    try {
      return Right(await action());
    } on ServerException catch (e, stackTrace) {
      _logger.error(
        'AuthRepository.$operation: ${e.message}',
        error: e,
        stackTrace: stackTrace,
      );
      return Left(ServerFailure(message: e.message));
    } on Exception catch (e, stackTrace) {
      _logger.error(
        'AuthRepository.$operation: erro inesperado',
        error: e,
        stackTrace: stackTrace,
      );
      return const Left(ServerFailure(message: 'Ocorreu um erro inesperado'));
    }
  }

  // Implemented Methods ---------------------------------------------------- //

  @override
  Stream<AppUser?> get authStateChanges => _remoteDataSource.authStateChanges;

  @override
  AppUser? get currentUser => _remoteDataSource.currentUser;

  @override
  ResultFuture<AppUser> loginWithEmailAndPassword({
    required String email,
    required String password,
  }) => _guard(
    'loginWithEmailAndPassword',
    () => _remoteDataSource.loginWithEmailAndPassword(
      email: email,
      password: password,
    ),
  );

  @override
  ResultFuture<void> logout() => _guard(
    'logout',
    _remoteDataSource.logout,
  );

  @override
  ResultFuture<AppUser> signInWithGoogle() => _guard(
    'loginWithGoogle',
    _remoteDataSource.loginWithGoogle,
  );

  @override
  ResultFuture<AppUser> signUpWithEmailAndPassword({
    required String email,
    required String password,
    required String firstName,
    required String lastName,
  }) => _guard(
    'signUpWithEmailAndPassword',
    () => _remoteDataSource.signUpWithEmailAndPassword(
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    ),
  );
}
