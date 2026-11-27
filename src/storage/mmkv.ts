// SEMANA 7: instancia global de MMKV (preferencias de la persona).
// Requiere build nativo (dev build): NO funciona con Expo Go.
import { createMMKV } from 'react-native-mmkv';

export const storage = createMMKV({ id: 'jardin-storage' });
