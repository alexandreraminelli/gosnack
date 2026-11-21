import 'package:gosnack_client/features/auth/domain/repositories/auth_repository.dart';
import 'package:mocktail/mocktail.dart';

/// Mock da interface [AuthRepository] para testes unitários.
class MockAuthRepository extends Mock implements AuthRepository;
