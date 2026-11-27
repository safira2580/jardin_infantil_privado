// SEMANA 7: caché de avisos en AsyncStorage (se guarda con red y se lee cuando no hay red).
// Se valida con Zod al leer: si el contenido está dañado o cambió de formato, se descarta.
import AsyncStorage from '@react-native-async-storage/async-storage';
import { z } from 'zod';
import type { Aviso } from '../types/aviso';

const CACHE_KEY = '@jardin/avisos_cache';

const avisosCacheSchema = z.array(
  z.object({
    id: z.number(),
    titulo: z.string(),
    mensaje: z.string(),
    autorId: z.number(),
  }),
);

export async function guardarAvisosEnCache(avisos: Aviso[]): Promise<void> {
  try {
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(avisos));
  } catch {
    // Si no se puede guardar, la app sigue funcionando: la caché es solo una ayuda.
  }
}

export async function leerAvisosDeCache(): Promise<Aviso[] | null> {
  try {
    const crudo = await AsyncStorage.getItem(CACHE_KEY);
    if (!crudo) return null;
    const resultado = avisosCacheSchema.safeParse(JSON.parse(crudo));
    return resultado.success ? resultado.data : null;
  } catch {
    return null;
  }
}

export async function borrarCacheDeAvisos(): Promise<void> {
  await AsyncStorage.removeItem(CACHE_KEY);
}
