// ignore_for_file: avoid_redundant_argument_values Exibir valores para melhor
// entendimento do log.

import 'package:flutter/foundation.dart';
import 'package:logger/logger.dart';

/// Contrato de logging para o aplicativo.
abstract class AppLogger {
  /// Loga uma mensagem de depuração.
  void debug(Object? message, {Object? error, StackTrace? stackTrace});

  /// Loga uma mensagem de informação.
  void info(Object? message, {Object? error, StackTrace? stackTrace});

  /// Loga uma mensagem de aviso.
  void warning(Object? message, {Object? error, StackTrace? stackTrace});

  /// Loga uma mensagem de erro.
  void error(Object? message, {Object? error, StackTrace? stackTrace});

  /// Loga uma mensagem de falha crítica.
  void fatal(Object? message, {Object? error, StackTrace? stackTrace});
}

// -------------------------------------------------------------------------- //

/// Utilitário de logging para o aplicativo.
/// Implementa o contrato [AppLogger] usando a biblioteca [Logger].
class LoggerHelp implements AppLogger {
  // Constructor ------------------------------------------------------------ //
  /// Construtor da classe [LoggerHelp].
  new({Logger? logger}) : _logger = logger ?? _defaultLogger();

  // Properties ------------------------------------------------------------- //

  final Logger _logger;

  /// Logger padrão
  static Logger _defaultLogger() => Logger(
    printer: PrettyPrinter(
      methodCount: 2,
      errorMethodCount: 8,
      lineLength: 120,
      colors: true,
      printEmojis: true,
      dateTimeFormat: DateTimeFormat.onlyTimeAndSinceStart,
    ),
    level: kReleaseMode ? Level.warning : Level.debug,
  );

  // Logger Types ----------------------------------------------------------- //

  @override
  void debug(Object? message, {Object? error, StackTrace? stackTrace}) {
    _logger.d(message, error: error, stackTrace: stackTrace);
  }

  @override
  void info(Object? message, {Object? error, StackTrace? stackTrace}) {
    _logger.i(message, error: error, stackTrace: stackTrace);
  }

  @override
  void warning(Object? message, {Object? error, StackTrace? stackTrace}) {
    _logger.w(message, error: error, stackTrace: stackTrace);
  }

  @override
  void error(Object? message, {Object? error, StackTrace? stackTrace}) {
    _logger.e(message, error: error, stackTrace: stackTrace);
  }

  @override
  void fatal(Object? message, {Object? error, StackTrace? stackTrace}) {
    _logger.f(message, error: error, stackTrace: stackTrace);
  }
}
