import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { colors } from '../theme';

/** Encabezado claro y sin sombra, compartido por todos los stacks. */
export const stackScreenOptions: NativeStackNavigationOptions = {
  headerStyle: { backgroundColor: colors.bg },
  headerShadowVisible: false,
  headerTintColor: colors.ink,
  headerTitleStyle: { fontWeight: '800', fontSize: 20 },
  contentStyle: { backgroundColor: colors.bg },
};
