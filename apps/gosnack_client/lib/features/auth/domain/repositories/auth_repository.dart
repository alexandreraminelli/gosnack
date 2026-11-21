import 'package:gosnack_client/core/utils/typedef.dart';
import 'package:gosnack_client/features/auth/domain/entities/user.dart';

/// Repositório de autenticação na camada de domínio.
///
/// Define o contrato para operações de autenticação.
abstract interface class AuthRepository {
  /// Criar uma nova conta de usuário com email e senha.
  ResultFuture<AppUser> signUpWithEmailAndPassword({
    required String email,
    required String password,
    required String firstName,
    required String lastName,
  });

  /// Fazer login com email e senha.
  ResultFuture<AppUser> loginWithEmailAndPassword({
    required String email,
    required String password,
  });

  /// Autenticação com o Google.
  /// Login e cadastro são a mesma operação no Google Sign-In.
  ResultFuture<AppUser> signInWithGoogle();

  /// Usuário da sessão atual.
  /// Retorna `null` se não houver usuário logado.
  AppUser? get currentUser;

  /// Emitir usuário a cada login, logout ou mudança de estado de autenticação.
  Stream<AppUser?> get authStateChanges;

  /// Fazer logout do usuário atual.
  ResultFuture<void> logout();
}
