import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GrupoDetailScreen from '../screens/GrupoDetailScreen';
import GruposListScreen from '../screens/GruposListScreen';
import { colors } from '../theme';
import type { GruposStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<GruposStackParamList>();

export default function GruposStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.ink },
        headerTintColor: colors.surface,
        headerTitleStyle: { fontWeight: '700' },
      }}
    >
      <Stack.Screen name="GruposList" component={GruposListScreen} options={{ title: 'Grupos' }} />
      <Stack.Screen name="GrupoDetail" component={GrupoDetailScreen} options={{ title: 'Detalle del grupo' }} />
    </Stack.Navigator>
  );
}
