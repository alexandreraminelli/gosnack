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
    this.avatarUrl,
  });

  // Properties ------------------------------------------------------------- //

  /// User ID. Identificador único do usuário.
  final String uid;

  /// Email do usuário.
  final String email;

  /// Primeiro nome do usuário.
  final String firstName;

  /// Sobrenome do usuário.
  final String? lastName;

  /// Nome completo do usuário.
  String get fullName => '$firstName $lastName';

  /// Obter iniciais do usuário.
  String get initials {
    final firstInitial = firstName.isNotEmpty ? firstName.trim()[0] : '';
    final lastInitial = lastName != null && lastName!.isNotEmpty
        ? lastName!.trim()[0]
        : '';
    return '$firstInitial$lastInitial'.toUpperCase();
  }

  /// URL do avatar do usuário.
  final String? avatarUrl;

  // Overrides -------------------------------------------------------------- //
  @override
  List<Object?> get props => [uid, email, firstName, lastName, avatarUrl];
}
