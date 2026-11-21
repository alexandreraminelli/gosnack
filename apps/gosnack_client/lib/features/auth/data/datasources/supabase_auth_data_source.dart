import 'package:google_sign_in/google_sign_in.dart';
import 'package:gosnack_client/core/errors/exceptions.dart';
import 'package:gosnack_client/features/auth/data/datasources/auth_remote_data_source.dart';
import 'package:gosnack_client/features/auth/data/models/user_model.dart';
import 'package:supabase_flutter/supabase_flutter.dart' as supabase;

/// Implementação do [AuthRemoteDataSource] usando Supabase.
class SupabaseAuthDataSource implements AuthRemoteDataSource {
  // Constructor ------------------------------------------------------------ //
  /// Cria uma instância do [SupabaseAuthDataSource] com o cliente Supabase
  /// fornecido.
  const new(this._auth);

  // Dependencies ----------------------------------------------------------- //

  /// Instância do cliente Supabase para autenticação.
  final supabase.GoTrueClient _auth;

  // Implemented Methods ---------------------------------------------------- //

  @override
  Stream<UserModel?> get authStateChanges {
    return _auth.onAuthStateChange.map((state) {
      final user = state.session?.user; // Obter usuário atual
      return (user == null) ? null : UserModel.fromSupabase(user);
    });
  }

  @override
  UserModel? get currentUser {
    final user = _auth.currentUser; // Obter usuário atual
    return (user == null) ? null : UserModel.fromSupabase(user);
  }

  @override
  Future<UserModel> loginWithEmailAndPassword({
    required String email,
    required String password,
  }) async {
    try {
      // Realizar login
      final response = await _auth.signInWithPassword(
        email: email,
        password: password,
      );

      // Verificar se houve erro na resposta
      final user = response.user;
      if (user == null) {
        // TODO(Exceptions-Codes): Implementar códigos de exceção
        throw const ServerException(message: 'Usuário não encontrado');
      }

      // Retornar usuário autenticado
      return UserModel.fromSupabase(user);
    } on supabase.AuthException catch (e) {
      throw ServerException(message: e.message);
    }
  }

  @override
  Future<UserModel> loginWithGoogle() async {
    try {
      // Abrir seletor de conta nativo do Google
      final account = await GoogleSignIn.instance.authenticate();
      // Obter token de ID do Google
      final idToken = account.authentication.idToken;
      if (idToken == null) {
        // TODO(Exceptions-Codes): Implementar códigos de exceção
        throw const ServerException(message: 'Token do Google não encontrado');
      }

      // Realizar login no Supabase com o token de ID do Google
      final response = await _auth.signInWithIdToken(
        provider: supabase.OAuthProvider.google,
        idToken: idToken,
      );
      // Verificar se houve erro na resposta
      final user = response.user;
      if (user == null) {
        // TODO(Exceptions-Codes): Implementar códigos de exceção
        throw const ServerException(message: 'Falha ao entrar com o Google');
      }
      return UserModel.fromSupabase(user);
    } on GoogleSignInException catch (e) {
      // Erro do Google Sign-In
      // TODO(Exceptions-Codes): Implementar códigos de exceção
      throw ServerException(message: e.description ?? 'Login cancelado');
    } on supabase.AuthException catch (e) {
      // Erro do Supabase
      throw ServerException(message: e.message);
    }
  }

  @override
  Future<void> logout() async {
    try {
      await _auth.signOut(); // Logout do Supabase
      await GoogleSignIn.instance.signOut(); // Logout do Google (se aplicável)
    } on supabase.AuthException catch (e) {
      throw ServerException(message: e.message);
    }
  }

  @override
  Future<UserModel> signUpWithEmailAndPassword({
    required String email,
    required String password,
    required String firstName,
    required String lastName,
  }) async {
    try {
      // Criar novo usuário
      final response = await _auth.signUp(
        email: email,
        password: password,
        data: {'first_name': firstName, 'last_name': lastName},
      );

      // Verificar se houve erro na resposta
      final user = response.user;
      if (user == null) {
        // TODO(Exceptions-Codes): Implementar códigos de exceção
        throw const ServerException(message: 'Não foi possível criar a conta');
      }

      // Retornar o usuário criado
      return UserModel.fromSupabase(user);
    } on supabase.AuthException catch (e) {
      throw ServerException(message: e.message);
    }
  }
}
