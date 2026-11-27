// SEMANA 7: preferencias de la persona guardadas con MMKV.
// Los hooks useMMKV* son reactivos: al cambiar un valor se redibujan las pantallas que lo usan,
// y el valor queda guardado sin async/await y sin reiniciar la app.
import { useMMKVBoolean, useMMKVNumber, useMMKVString } from 'react-native-mmkv';
import { storage } from '../storage/mmkv';

const PREF_KEYS = {
  ORDEN_AVISOS: 'pref_ordenAvisos',
  MODO_COMPACTO: 'pref_modoCompacto',
  AVISOS_POR_PAGINA: 'pref_avisosPorPagina',
} as const;

export const ORDENES = ['recientes', 'az', 'za'] as const;
export type OrdenAvisos = (typeof ORDENES)[number];

export const OPCIONES_POR_PAGINA = [5, 10, 20] as const;
const POR_PAGINA_INICIAL = 10;

/** Clave del estado de la última carga de avisos ('red' | 'cache'); la escribe useAvisos. */
export const FUENTE_AVISOS_KEY = 'estado_fuenteAvisos';

export function usePreferences() {
  const [orden, setOrden] = useMMKVString(PREF_KEYS.ORDEN_AVISOS, storage);
  const [compacto, setCompacto] = useMMKVBoolean(PREF_KEYS.MODO_COMPACTO, storage);
  const [porPagina, setPorPagina] = useMMKVNumber(PREF_KEYS.AVISOS_POR_PAGINA, storage);

  return {
    // Se valida lo guardado: si hay un valor raro, se usa el predeterminado.
    ordenAvisos: (ORDENES as readonly string[]).includes(orden ?? '') ? (orden as OrdenAvisos) : 'recientes',
    setOrdenAvisos: (valor: OrdenAvisos) => setOrden(valor),

    modoCompacto: compacto ?? false,
    setModoCompacto: (valor: boolean) => setCompacto(valor),

    avisosPorPagina: porPagina ?? POR_PAGINA_INICIAL,
    setAvisosPorPagina: (valor: number) => setPorPagina(valor),
  };
}

/** 'cache' cuando la lista de avisos se está mostrando desde el almacenamiento local. */
export function useFuenteAvisos(): 'red' | 'cache' {
  const [fuente] = useMMKVString(FUENTE_AVISOS_KEY, storage);
  return fuente === 'cache' ? 'cache' : 'red';
}
