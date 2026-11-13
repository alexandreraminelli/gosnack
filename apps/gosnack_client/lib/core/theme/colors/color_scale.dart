import 'package:flutter/material.dart';

/// Escala de 10 tons (50, 100, 200, ..., 800, 900) de uma cor.
@immutable
class ColorScale {
  /// Cria uma escala de cores a partir de uma lista de 10 tons.
  const new(this._shades);

  final List<Color> _shades;

  static const _keys = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

  /// Retornar o tom da cor correspondente ao valor fornecido.
  Color operator [](int shade) {
    // Buscar o índice do tom na lista de tons.
    final index = _keys.indexOf(shade);
    // Se o tom não for encontrado, lançar uma exceção.
    assert(
      index != -1,
      'O tom $shade não é válido. Use um dos seguintes: $_keys',
    );
    // Retornar a cor correspondente ao tom.
    return _shades[index];
  }

  /// Escala invertida (50 <-> 900, 100 <-> 800, ...) usada no tema dark.
  ColorScale get reversed =>
      ColorScale(_shades.reversed.toList(growable: false));
}
