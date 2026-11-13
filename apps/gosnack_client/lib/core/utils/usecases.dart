import 'package:gosnack_client/core/utils/typedef.dart';

/// Caso de uso com parâmetros.
abstract class UseCaseWithParams<T, Params> {
  /// Construtor da classe [UseCaseWithParams].
  const new();

  /// Executa o caso de uso com os parâmetros fornecidos.
  ResultFuture<T> call(Params params);
}

/// Caso de uso sem parâmetros.
abstract class UseCaseWithoutParams<T> {
  /// Construtor da classe [UseCaseWithoutParams].
  const new();

  /// Executa o caso de uso sem parâmetros.
  ResultFuture<T> call();
}
