import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:gosnack_client/app.dart';
import 'package:gosnack_client/core/config/env.dart';
import 'package:gosnack_client/core/di/injection_container.dart';
import 'package:gosnack_client/core/router/router.dart';
import 'package:gosnack_client/core/router/session.dart';
import 'package:gosnack_client/features/onboarding/domain/usecases/check_if_user_is_first_timer.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

Future<void> main() async {
  // Garantir que bindings do Flutter estejam inicializados
  WidgetsFlutterBinding.ensureInitialized();

  // Verificar se as variáveis de ambiente estão definidas
  EnvConfig.validate();

  // Manter a orientação do dispositivo em modo retrato
  await SystemChrome.setPreferredOrientations([
    DeviceOrientation.portraitUp,
  ]);

  // Inicializar Supabase
  await Supabase.initialize(
    url: EnvConfig.supabaseUrl,
    publishableKey: EnvConfig.supabasePublishableKey,
  );

  // Iniciar dependências com GoRouter
  await initDependencies();

  // Obter a sessão do usuário: autenticado ou primeira vez
  final result = await sl<CheckIfUserIsFirstTimer>().call();
  final isFirstTimer = result.fold((_) => true, (value) => value);
  final session = AppSession(isFirstTimer: isFirstTimer);

  // Executar app Flutter
  runApp(
    GoSnackApp(
      router: createRouter(session), // Passar a sessão para o roteador
    ),
  );
}
