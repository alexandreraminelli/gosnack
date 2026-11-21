import 'package:gosnack_client/core/utils/typedef.dart';
import 'package:gosnack_client/features/auth/domain/entities/user.dart';
import 'package:supabase_flutter/supabase_flutter.dart' as supabase;

/// Modelo de usuário na camada de dados.
/// Estende a entidade de domínio [AppUser], adicionando funcionalidades
/// específicas da camada de dados.
class UserModel extends AppUser {
  // Default Constructor ---------------------------------------------------- //
  /// Construtor padrão da classe [UserModel].
  const new({
    required super.uid,
    required super.email,
    required super.firstName,
    super.lastName,
    super.avatarUrl,
  });

  // From Supabase ---------------------------------------------------------- //

  /// Factory para criar uma instância de [UserModel] a partir de um objeto
  /// [supabase.User].
  factory fromSupabase(supabase.User user) {
    final metadata = user.userMetadata ?? const <String, dynamic>{};
    final (firstName, lastName) = _resolveName(metadata);

    return UserModel(
      uid: user.id,
      email: user.email ?? '',
      firstName: firstName,
      lastName: lastName ?? '',
      avatarUrl: (metadata['avatar_url'] ?? metadata['picture']) as String?,
    );
  }

  // Helpers ---------------------------------------------------------------- //

  /// Dividir nome completo em primeiro nome e sobrenome.
  static (String, String?) _resolveName(DataMap metadata) {
    // Se os campos de nomes estiverem presentes de forma separada
    final firstName =
        (metadata['first_name'] ?? metadata['given_name']) as String?;
    final lastName =
        (metadata['last_name'] ?? metadata['family_name']) as String?;

    if (firstName != null && firstName.trim().isNotEmpty) {
      return (firstName.trim(), (lastName ?? '').trim());
    }

    // Se o nome completo estiver presente, divida-o
    final fullName =
        ((metadata['full_name'] ?? metadata['name']) as String? ?? '').trim();
    if (fullName.isEmpty) return ('', '');

    final parts = fullName.split(RegExp(r'\s+'));
    return (
      parts.first, // Primeiro nome
      parts.skip(1).join(' '), // Sobrenome
    );
  }
}
