import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:gosnack_client/app.dart';

void main() async {
  // Garantir que bindings do Flutter estejam inicializados
  WidgetsFlutterBinding.ensureInitialized();

  // Manter a orientação do dispositivo em modo retrato
  await SystemChrome.setPreferredOrientations([
    DeviceOrientation.portraitUp,
  ]);

  // Executar app Flutter
  runApp(const GoSnackApp());
}
