import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AvisoDetailScreen from '../screens/AvisoDetailScreen';
import AvisoFormScreen from '../screens/AvisoFormScreen';
import AvisosListScreen from '../screens/AvisosListScreen';
import { colors } from '../theme';
import type { AvisosStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<AvisosStackParamList>();

export default function AvisosStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: { backgroundColor: colors.bg },
        headerTintColor: colors.ink,
        headerTitleStyle: { fontWeight: '800', fontSize: 20 },
      }}
    >
      <Stack.Screen name="AvisosList" component={AvisosListScreen} options={{ title: 'Avisos' }} />
      <Stack.Screen name="AvisoDetail" component={AvisoDetailScreen} options={{ title: 'Aviso' }} />
      <Stack.Screen
        name="AvisoForm"
        component={AvisoFormScreen}
        options={{ title: 'Nuevo aviso', presentation: 'modal' }}
      />
    </Stack.Navigator>
  );
}
