import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GrupoDetailScreen from '../screens/GrupoDetailScreen';
import GruposListScreen from '../screens/GruposListScreen';
import type { GruposStackParamList } from '../types/navigation';
import { stackScreenOptions } from './screenOptions';

const Stack = createNativeStackNavigator<GruposStackParamList>();

export default function GruposStack() {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen name="GruposList" component={GruposListScreen} options={{ title: 'Grupos' }} />
      <Stack.Screen name="GrupoDetail" component={GrupoDetailScreen} options={{ title: 'Detalle del grupo' }} />
    </Stack.Navigator>
  );
}
