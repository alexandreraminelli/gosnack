import 'package:gosnack_client/features/auth/data/models/user_model.dart';

/// Contrato para o acesso remoto de dados de autenticação.
abstract interface class AuthRemoteDataSource {
  /// Realiza o login do usuário com email e senha.
  Future<UserModel> signUpWithEmailAndPassword({
    required String email,
    required String password,
    required String firstName,
    required String lastName,
  });

  /// Realiza o login do usuário com email e senha.
  Future<UserModel> loginWithEmailAndPassword({
    required String email,
    required String password,
  });

  /// Realiza o login do usuário com Google.
  Future<UserModel> loginWithGoogle();

  /// Retorna o usuário atualmente autenticado, se houver.
  UserModel? get currentUser;

  /// Retorna um fluxo de mudanças no estado de autenticação do usuário.
  Stream<UserModel?> get authStateChanges;

  /// Realiza o logout do usuário atualmente autenticado.
  Future<void> logout();
}
