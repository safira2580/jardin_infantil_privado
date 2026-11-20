import { Ionicons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable } from 'react-native';
import MaterialDetailScreen from '../screens/MaterialDetailScreen';
import MaterialFormScreen from '../screens/MaterialFormScreen';
import MaterialesListScreen from '../screens/MaterialesListScreen';
import { blocks } from '../theme';
import type { MaterialesStackParamList } from '../types/navigation';
import { stackScreenOptions } from './screenOptions';

const Stack = createNativeStackNavigator<MaterialesStackParamList>();

export default function MaterialesStack() {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen
        name="MaterialesList"
        component={MaterialesListScreen}
        options={({ navigation }) => ({
          title: 'Material didáctico',
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('MaterialForm')}
              accessibilityRole="button"
              accessibilityLabel="Agregar material"
              hitSlop={10}
            >
              <Ionicons name="add-circle" size={32} color={blocks.coral.main} />
            </Pressable>
          ),
        })}
      />
      <Stack.Screen name="MaterialDetail" component={MaterialDetailScreen} options={{ title: 'Material' }} />
      <Stack.Screen
        name="MaterialForm"
        component={MaterialFormScreen}
        options={{ title: 'Nuevo material', presentation: 'modal' }}
      />
    </Stack.Navigator>
  );
}
