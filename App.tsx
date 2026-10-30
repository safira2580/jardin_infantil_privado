import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootTabs from './src/navigation/RootTabs';

// Semana 4: ya no hace falta ningún Provider; los stores de Zustand son globales.
export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <RootTabs />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
