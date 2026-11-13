import 'package:equatable/equatable.dart';

/// Classe base para todas as exceções da camada de dados.
sealed class AppException extends Equatable implements Exception {
  // Constructor ------------------------------------------------------------ //
  /// Construtor da classe [AppException].
  const new({required this.message, this.cause, this.stackTrace});

  // Properties ------------------------------------------------------------- //

  /// Mensagem de erro associada à exceção.
  final String message;

  /// Causa da exceção, se disponível.
  final Object? cause;

  /// Stack trace da exceção, se disponível.
  final StackTrace? stackTrace;

  // Overrides -------------------------------------------------------------- //

  @override
  List<Object?> get props => [message]; // Props do Equatable

  @override
  String toString() => 'AppException: $message';
}

// -------------------------------------------------------------------------- //

/// Erro de cache no armazenamento local.
final class CacheException extends AppException {
  /// Construtor da classe [CacheException].
  const new({
    required super.message,
    super.cause,
    super.stackTrace,
  });
}

// -------------------------------------------------------------------------- //

/// Falha de conectividade (sem internet, timeout, DNS).
final class NetworkException extends AppException {
  /// Construtor da classe [NetworkException].
  const new({
    super.message = 'Network error occurred',
    super.cause,
    super.stackTrace,
  });
}

// -------------------------------------------------------------------------- //

/// Erro retornado pelo servidor ou API.
final class ServerException extends AppException {
  /// Construtor da classe [ServerException].
  const new({
    required super.message,
    this.statusCode,
    super.cause,
    super.stackTrace,
  });

  /// Código de status HTTP, quando existir.
  final int? statusCode;

  // Overrides -------------------------------------------------------------- //
  @override
  List<Object?> get props => [message, statusCode];

  @override
  String toString() => 'ServerException($statusCode): $message';
}
