import { Ionicons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable } from 'react-native';
import AjustesScreen from '../screens/AjustesScreen';
import AvisoDetailScreen from '../screens/AvisoDetailScreen';
import AvisoEditScreen from '../screens/AvisoEditScreen';
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
      <Stack.Screen
        name="AvisosList"
        component={AvisosListScreen}
        options={({ navigation }) => ({
          title: 'Avisos',
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Ajustes')}
              hitSlop={10}
              accessibilityRole="button"
              accessibilityLabel="Abrir ajustes"
            >
              <Ionicons name="settings-outline" size={24} color={colors.ink} />
            </Pressable>
          ),
        })}
      />
      <Stack.Screen name="AvisoDetail" component={AvisoDetailScreen} options={{ title: 'Aviso' }} />
      <Stack.Screen
        name="AvisoForm"
        component={AvisoFormScreen}
        options={{ title: 'Nuevo aviso', presentation: 'modal' }}
      />
      <Stack.Screen
        name="AvisoEdit"
        component={AvisoEditScreen}
        options={{ title: 'Editar aviso', presentation: 'modal' }}
      />
      <Stack.Screen name="Ajustes" component={AjustesScreen} options={{ title: 'Ajustes' }} />
    </Stack.Navigator>
  );
}
