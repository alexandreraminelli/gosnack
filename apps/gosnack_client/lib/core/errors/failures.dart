import 'package:equatable/equatable.dart';
import 'package:gosnack_client/core/errors/exceptions.dart';

/// Falha genérica do aplicativo.
sealed class Failure extends Equatable {
  // Constructor ------------------------------------------------------------ //

  /// Construtor da classe [Failure].
  const new({required this.message, this.statusCode});

  // Properties ------------------------------------------------------------- //

  /// Mensagem de erro associada à falha.
  final String message;

  /// Código de status HTTP associado à falha.
  final int? statusCode;

  /// Mensagem formatada para exibição ou log.
  String get errorMessage =>
      statusCode == null ? message : '$statusCode Error: $message';

  // Overrides -------------------------------------------------------------- //
  // Props do Equatable
  @override
  List<Object?> get props => [message, statusCode];
}

// -------------------------------------------------------------------------- //

/// Falha de cache no armazenamento local.
final class CacheFailure extends Failure {
  /// Construtor da classe [CacheFailure].
  const new({required super.message});

  /// Construtor que cria uma instância de [CacheFailure] a partir de uma
  /// [CacheException].
  new fromException(CacheException exception)
    : this(message: exception.message);
}

// -------------------------------------------------------------------------- //

/// Falha de conectividade (sem internet, timeout, DNS).
final class NetworkFailure extends Failure {
  /// Construtor da classe [NetworkFailure].
  const new({required super.message});

  /// Construtor que cria uma instância de [NetworkFailure] a partir de uma
  /// [NetworkException].
  new fromException(NetworkException exception)
    : this(message: exception.message);
}

// -------------------------------------------------------------------------- //

/// Falha do servidor ou API.
final class ServerFailure extends Failure {
  /// Construtor da classe [ServerFailure].
  const new({required super.message, super.statusCode});

  /// Construtor que cria uma instância de [ServerFailure] a partir de uma
  /// [ServerException].
  new fromException(ServerException exception)
    : this(message: exception.message, statusCode: exception.statusCode);
}
