import 'package:gosnack_client/core/errors/exceptions.dart';
import 'package:gosnack_client/features/onboarding/data/datasources/on_boarding_local_data_source.dart';
import 'package:shared_preferences/shared_preferences.dart';

/// Implementação do contrato de acesso de dados locais
/// [OnBoardingLocalDataSource] utilizando o SharedPreferences.
class SharedPreferencesOnBoardingDataSource extends OnBoardingLocalDataSource {
  // Constructor ------------------------------------------------------------ //
  /// Construtor da classe [SharedPreferencesOnBoardingDataSource].
  const new(this._prefs);

  // Dependencies ----------------------------------------------------------- //

  final SharedPreferences _prefs;

  // SharedPreferences Keys ------------------------------------------------- //

  static const _firstTimerKey = 'first_timer';

  // Implemented Methods ---------------------------------------------------- //

  @override
  Future<void> cacheFirstTimer() async {
    try {
      await _prefs.setBool(_firstTimerKey, false);
    } catch (e) {
      throw CacheException(message: e.toString());
    }
  }

  @override
  Future<bool> checkIfUserIsFirstTimer() async {
    try {
      return _prefs.getBool(_firstTimerKey) ?? true;
    } catch (e) {
      throw CacheException(message: e.toString());
    }
  }
}
