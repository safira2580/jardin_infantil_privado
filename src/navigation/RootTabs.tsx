import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ContactoScreen from '../screens/ContactoScreen';
import HomeScreen from '../screens/HomeScreen';
import { blocks, colors } from '../theme';
import type { RootTabParamList } from '../types/navigation';
import GruposStack from './GruposStack';
import MaterialesStack from './MaterialesStack';
import NinosStack from './NinosStack';

const Tab = createBottomTabNavigator<RootTabParamList>();

type IconName = keyof typeof Ionicons.glyphMap;

const ICONS: Record<keyof RootTabParamList, { active: IconName; inactive: IconName }> = {
  InicioTab: { active: 'home', inactive: 'home-outline' },
  GruposTab: { active: 'people', inactive: 'people-outline' },
  NinosTab: { active: 'happy', inactive: 'happy-outline' },
  MaterialesTab: { active: 'color-palette', inactive: 'color-palette-outline' },
  ContactoTab: { active: 'call', inactive: 'call-outline' },
};

export default function RootTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: blocks.blue.main,
        tabBarInactiveTintColor: '#8A9AB3',
        tabBarLabelStyle: { fontWeight: '700', fontSize: 11 },
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.line, borderTopWidth: 2 },
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons name={focused ? ICONS[route.name].active : ICONS[route.name].inactive} size={size} color={color} />
        ),
      })}
    >
      <Tab.Screen name="InicioTab" component={HomeScreen} options={{ title: 'Inicio' }} />
      <Tab.Screen name="GruposTab" component={GruposStack} options={{ title: 'Grupos' }} />
      <Tab.Screen name="NinosTab" component={NinosStack} options={{ title: 'Niños' }} />
      <Tab.Screen name="MaterialesTab" component={MaterialesStack} options={{ title: 'Material' }} />
      <Tab.Screen
        name="ContactoTab"
        component={ContactoScreen}
        options={{
          title: 'Contacto',
          headerShown: true,
          headerTitle: 'Contacto',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: colors.bg },
          headerTintColor: colors.ink,
          headerTitleStyle: { fontWeight: '800', fontSize: 20 },
        }}
      />
    </Tab.Navigator>
  );
}
