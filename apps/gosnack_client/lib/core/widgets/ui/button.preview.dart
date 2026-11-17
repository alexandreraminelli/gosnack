import 'package:flutter/material.dart';
import 'package:gosnack_client/core/resources/icons.dart';
import 'package:gosnack_client/core/utils/preview.dart';
import 'package:gosnack_client/core/widgets/ui/button.dart';

/// Pré-visualização do botão primário.
@GoSnackPreview(
  name: 'Variant: Primary',
  group: 'Button',
)
Widget primaryButtonPreview() => AppButton(
  label: 'Primary',
  onPressed: () {},
);

/// Pré-visualização do botão secundário.
@GoSnackPreview(
  name: 'Variant: Secondary',
  group: 'Button',
  size: Size(320, 72),
)
Widget secondaryButtonPreview() => AppButton(
  label: 'Secondary',
  variant: ButtonVariant.secondary,
  onPressed: () {},
);

/// Pré-visualização do botão terciário.
@GoSnackPreview(
  name: 'Variant: Tertiary',
  group: 'Button',
  size: Size(320, 72),
)
Widget tertiaryButtonPreview() => AppButton(
  label: 'Tertiary',
  variant: ButtonVariant.tertiary,
  onPressed: () {},
);

/// Pré-visualização do botão de contorno.
@GoSnackPreview(
  name: 'Variant: Outline',
  group: 'Button',
  size: Size(320, 72),
)
Widget outlineButtonPreview() => AppButton(
  label: 'Outline',
  variant: ButtonVariant.outline,
  onPressed: () {},
);

/// Pré-visualização do botão de aviso.
@GoSnackPreview(
  name: 'Variant: Warning',
  group: 'Button',
  size: Size(320, 72),
)
Widget warningButtonPreview() => AppButton(
  label: 'Warning',
  variant: ButtonVariant.warning,
  onPressed: () {},
);

/// Pré-visualização do botão destrutivo.
@GoSnackPreview(
  name: 'Variant: Danger',
  group: 'Button',
  size: Size(320, 72),
)
Widget dangerButtonPreview() => AppButton(
  label: 'Danger',
  variant: ButtonVariant.danger,
  onPressed: () {},
);

/// Pré-visualização do botão primário desabilitado.
@GoSnackPreview(
  name: 'Disabled: Primary',
  group: 'Button',
  size: Size(320, 72),
)
Widget disabledPrimaryButtonPreview() => const AppButton(
  label: 'Primary',
);

/// Pré-visualização do botão secundário desabilitado.
@GoSnackPreview(
  name: 'Disabled: Secondary',
  group: 'Button',
  size: Size(320, 72),
)
Widget disabledSecondaryButtonPreview() => const AppButton(
  label: 'Secondary',
  variant: ButtonVariant.secondary,
);

/// Pré-visualização do botão terciário desabilitado.
@GoSnackPreview(
  name: 'Disabled: Tertiary',
  group: 'Button',
  size: Size(320, 72),
)
Widget disabledTertiaryButtonPreview() => const AppButton(
  label: 'Tertiary',
  variant: ButtonVariant.tertiary,
);

/// Pré-visualização do botão de contorno desabilitado.
@GoSnackPreview(
  name: 'Disabled: Outline',
  group: 'Button',
  size: Size(320, 72),
)
Widget disabledOutlineButtonPreview() => const AppButton(
  label: 'Outline',
  variant: ButtonVariant.outline,
);

/// Pré-visualização do botão de aviso desabilitado.
@GoSnackPreview(
  name: 'Disabled: Warning',
  group: 'Button',
  size: Size(320, 72),
)
Widget disabledWarningButtonPreview() => const AppButton(
  label: 'Warning',
  variant: ButtonVariant.warning,
);

/// Pré-visualização do botão destrutivo desabilitado.
@GoSnackPreview(
  name: 'Disabled: Danger',
  group: 'Button',
  size: Size(320, 72),
)
Widget disabledDangerButtonPreview() => const AppButton(
  label: 'Danger',
  variant: ButtonVariant.danger,
);

/// Pré-visualização do botão primário pequeno.
@GoSnackPreview(
  name: 'Size: Small',
  group: 'Button / Primary',
  size: Size(320, 64),
)
Widget smallPrimaryButtonPreview() => AppButton(
  label: 'Small',
  size: ButtonSize.sm,
  onPressed: () {},
);

/// Pré-visualização do botão primário médio.
@GoSnackPreview(
  name: 'Size: Medium',
  group: 'Button / Primary',
  size: Size(320, 72),
)
Widget mediumPrimaryButtonPreview() => AppButton(
  label: 'Medium',
  onPressed: () {},
);

/// Pré-visualização do botão primário grande.
@GoSnackPreview(
  name: 'Size: Large',
  group: 'Button / Primary',
  size: Size(320, 80),
)
Widget largePrimaryButtonPreview() => AppButton(
  label: 'Large',
  size: ButtonSize.lg,
  onPressed: () {},
);

/// Pré-visualização do botão primário com label e ícone.
@GoSnackPreview(
  name: 'Label + Icon: Primary',
  group: 'Button / Label + Icon',
  size: Size(320, 72),
)
Widget primaryButtonWithIconPreview() => AppButton(
  label: 'Create',
  icon: AppIcons.create,
  onPressed: () {},
);

/// Pré-visualização do botão secundário com label e ícone.
@GoSnackPreview(
  name: 'Label + Icon: Secondary',
  group: 'Button / Label + Icon',
  size: Size(320, 72),
)
Widget secondaryButtonWithIconPreview() => AppButton(
  label: 'Create',
  icon: AppIcons.create,
  variant: ButtonVariant.secondary,
  onPressed: () {},
);

/// Pré-visualização do botão de contorno com label e ícone.
@GoSnackPreview(
  name: 'Label + Icon: Outline',
  group: 'Button / Label + Icon',
  size: Size(320, 72),
)
Widget outlineButtonWithIconPreview() => AppButton(
  label: 'Create',
  icon: AppIcons.create,
  variant: ButtonVariant.outline,
  onPressed: () {},
);

/// Pré-visualização do botão terciário com label e ícone.
@GoSnackPreview(
  name: 'Label + Icon: Tertiary',
  group: 'Button / Label + Icon',
  size: Size(320, 72),
)
Widget tertiaryButtonWithIconPreview() => AppButton(
  label: 'Create',
  icon: AppIcons.create,
  variant: ButtonVariant.tertiary,
  onPressed: () {},
);

/// Pré-visualização do botão destrutivo com label e ícone.
@GoSnackPreview(
  name: 'Label + Icon: Danger',
  group: 'Button / Label + Icon',
  size: Size(320, 72),
)
Widget dangerButtonWithIconPreview() => AppButton(
  label: 'Delete',
  icon: AppIcons.delete,
  variant: ButtonVariant.danger,
  onPressed: () {},
);

/// Pré-visualização do botão primário somente com ícone.
@GoSnackPreview(
  name: 'Icon only: Primary',
  group: 'Button / Icon only',
  size: Size(72, 72),
)
Widget primaryIconOnlyButtonPreview() => AppButton(
  label: 'Create',
  icon: AppIcons.create,
  iconOnly: true,
  onPressed: () {},
);

/// Pré-visualização do botão secundário somente com ícone.
@GoSnackPreview(
  name: 'Icon only: Secondary',
  group: 'Button / Icon only',
  size: Size(72, 72),
)
Widget secondaryIconOnlyButtonPreview() => AppButton(
  label: 'Create',
  icon: AppIcons.create,
  iconOnly: true,
  variant: ButtonVariant.secondary,
  onPressed: () {},
);

/// Pré-visualização do botão terciário somente com ícone.
@GoSnackPreview(
  name: 'Icon only: Tertiary',
  group: 'Button / Icon only',
  size: Size(72, 72),
)
Widget tertiaryIconOnlyButtonPreview() => AppButton(
  label: 'Create',
  icon: AppIcons.create,
  iconOnly: true,
  variant: ButtonVariant.tertiary,
  onPressed: () {},
);

/// Pré-visualização do botão de contorno somente com ícone.
@GoSnackPreview(
  name: 'Icon only: Outline',
  group: 'Button / Icon only',
  size: Size(72, 72),
)
Widget outlineIconOnlyButtonPreview() => AppButton(
  label: 'Create',
  icon: AppIcons.create,
  iconOnly: true,
  variant: ButtonVariant.outline,
  onPressed: () {},
);

/// Pré-visualização do botão destrutivo somente com ícone.
@GoSnackPreview(
  name: 'Icon only: Danger',
  group: 'Button / Icon only',
  size: Size(72, 72),
)
Widget dangerIconOnlyButtonPreview() => AppButton(
  label: 'Delete',
  icon: AppIcons.delete,
  iconOnly: true,
  variant: ButtonVariant.danger,
  onPressed: () {},
);

/// Pré-visualização do botão primário carregando.
@GoSnackPreview(
  name: 'Loading: Primary',
  group: 'Button / Loading',
  size: Size(320, 72),
)
Widget loadingPrimaryButtonPreview() => const AppButton(
  label: 'Loading',
  isLoading: true,
);

/// Pré-visualização do botão de contorno carregando.
@GoSnackPreview(
  name: 'Loading: Outline',
  group: 'Button / Loading',
  size: Size(320, 72),
)
Widget loadingOutlineButtonPreview() => const AppButton(
  label: 'Loading',
  variant: ButtonVariant.outline,
  isLoading: true,
);
