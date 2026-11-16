import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:gosnack_client/core/extensions/build_context_x.dart';
import 'package:gosnack_client/core/extensions/context_extensions.dart';
import 'package:gosnack_client/core/resources/vectors.dart';

/// Variações da logo do aplicativo.
enum LogoVariation {
  // Variations ------------------------------------------------------------- //

  /// Logo com apenas ícone.
  icon(
    lightPath: AppVectors.logoIcon,
    darkPath: AppVectors.logoIcon,
  ),

  /// Logo com ícone e texto.
  inline(
    lightPath: AppVectors.logoInlineBlack,
    darkPath: AppVectors.logoInlineWhite,
  ),

  /// Logo com apenas o texto.
  typemark(
    lightPath: AppVectors.logoTypemarkBlack,
    darkPath: AppVectors.logoTypemarkWhite,
  );

  // Constructor ------------------------------------------------------------ //

  new({required this.lightPath, required this.darkPath});

  // Properties ------------------------------------------------------------- //

  /// Caminho do arquivo SVG da logo para o tema claro.
  final String lightPath;

  /// Caminho do arquivo SVG da logo para o tema escuro.
  final String darkPath;
}

// -------------------------------------------------------------------------- //

/// Widget que exibe a logo do aplicativo.
class Logo extends StatelessWidget {
  // Constructors ----------------------------------------------------------- //
  /// Construtor do widget de logo do aplicativo [Logo].
  const new({
    this.variation = LogoVariation.icon,
    this.height,
    this.width,
    super.key,
  });

  // Properties ------------------------------------------------------------- //

  /// Variação da logo a ser exibida.
  final LogoVariation variation;

  /// Altura da logo.
  final double? height;

  /// Largura da logo.
  final double? width;

  // Build Method ----------------------------------------------------------- //
  @override
  Widget build(BuildContext context) {
    final logoPath = context.isDarkMode
        ? variation.darkPath
        : variation.lightPath;

    return SvgPicture.asset(
      logoPath,
      // Size
      height: height,
      width: width,

      // Alt Text
      semanticsLabel: context.l10n.logoDescription,
    );
  }
}
