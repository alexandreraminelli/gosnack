import 'package:dartz/dartz.dart';
import 'package:gosnack_client/core/errors/failures.dart';

/// Definição de dados para o tipo de retorno de operações assíncronas que podem
///  falhar.
typedef ResultFuture<T> = Future<Either<Failure, T>>;

/// Definição de dados para maps de dados.
typedef DataMap = Map<String, dynamic>;
