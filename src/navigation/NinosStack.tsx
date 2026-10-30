import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NinoDetailScreen from '../screens/NinoDetailScreen';
import NinosListScreen from '../screens/NinosListScreen';
import type { NinosStackParamList } from '../types/navigation';
import { stackScreenOptions } from './screenOptions';

const Stack = createNativeStackNavigator<NinosStackParamList>();

export default function NinosStack() {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen name="NinosList" component={NinosListScreen} options={{ title: 'Niños' }} />
      <Stack.Screen name="NinoDetail" component={NinoDetailScreen} options={{ title: 'Ficha del niño' }} />
    </Stack.Navigator>
  );
}
