import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootTabs from './src/navigation/RootTabs';

// Semana 5: el QueryClientProvider va en la raíz, por fuera del NavigationContainer.
// Los stores de Zustand (semana 4) siguen siendo globales y no necesitan Provider.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 2,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar style="dark" />
          <RootTabs />
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
