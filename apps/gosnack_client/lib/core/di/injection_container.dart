import 'package:get_it/get_it.dart';
import 'package:gosnack_client/core/utils/logger.dart';
import 'package:gosnack_client/features/onboarding/data/datasources/on_boarding_local_data_source.dart';
import 'package:gosnack_client/features/onboarding/data/datasources/shared_preferences_on_boarding_data_source.dart';
import 'package:gosnack_client/features/onboarding/data/repositories/on_boarding_repository_impl.dart';
import 'package:gosnack_client/features/onboarding/domain/repositories/on_boarding_repository.dart';
import 'package:gosnack_client/features/onboarding/domain/usecases/cache_first_timer.dart';
import 'package:gosnack_client/features/onboarding/domain/usecases/check_if_user_is_first_timer.dart';
import 'package:gosnack_client/features/onboarding/presentation/cubit/on_boarding_cubit.dart';
import 'package:shared_preferences/shared_preferences.dart';

/// Instância singleton global do [GetIt] para injeção de dependências.
final GetIt sl = GetIt.instance;

/// Inicializa as dependências do projeto utilizando [GetIt].
Future<void> initDependencies() async {
  await _initCore();
  _initOnBoarding();
}

// Core --------------------------------------------------------------------- //

/// Inicializa as dependências essenciais do projeto.
Future<void> _initCore() async {
  // Inicializa o [SharedPreferences] para armazenamento local de dados.
  final prefs = await SharedPreferences.getInstance();

  sl
    // Utils ---------------------------------------------------------------- //
    ..registerLazySingleton<AppLogger>(LoggerHelp.new)
    // Dependencies --------------------------------------------------------- //
    ..registerSingleton<SharedPreferences>(prefs);
}

// OnBoarding --------------------------------------------------------------- //

void _initOnBoarding() {
  sl
    // Bloc ----------------------------------------------------------------- //
    ..registerFactory(
      () =>
          OnBoardingCubit(cacheFirstTimer: sl(), checkIfUserIsFirstTimer: sl()),
    )
    // Use Cases ------------------------------------------------------------ //
    ..registerLazySingleton(() => CacheFirstTimer(sl()))
    ..registerLazySingleton(() => CheckIfUserIsFirstTimer(sl()))
    // Repository ----------------------------------------------------------- //
    ..registerLazySingleton<OnBoardingRepository>(
      () => OnBoardingRepositoryImpl(sl(), sl()),
    )
    // Data Source ---------------------------------------------------------- //
    ..registerLazySingleton<OnBoardingLocalDataSource>(
      () => SharedPreferencesOnBoardingDataSource(sl()),
    );
}
