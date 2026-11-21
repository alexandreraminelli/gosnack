import 'package:equatable/equatable.dart';

/// Entidade de usuário autenticado na camada de domínio.
class AppUser extends Equatable {
  // Constructor ------------------------------------------------------------ //
  /// Construtor da entidade de usuário.
  const new({
    required this.uid,
    required this.email,
    required this.firstName,
    this.lastName,
  });

  // Properties ------------------------------------------------------------- //

  /// User ID. Identificador único do usuário.
  final String uid;

  /// Email do usuário.
  final String email;

  /// Primeiro nome do usuário.
  final String firstName;

  /// Último nome do usuário.
  final String? lastName;

  /// Nome completo do usuário.
  String get fullName => '$firstName $lastName';

  // Overrides -------------------------------------------------------------- //
  @override
  List<Object?> get props => [uid, email, firstName, lastName];
}
