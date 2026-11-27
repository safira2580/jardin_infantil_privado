import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createAviso,
  deleteAviso,
  fetchAvisoById,
  fetchAvisos,
  MAX_POST_ID,
  updateAviso,
} from '../services/avisosService';
import { storage } from '../storage/mmkv';
import { guardarAvisosEnCache, leerAvisosDeCache } from '../storage/avisosCache';
import { FUENTE_AVISOS_KEY } from './usePreferences';
import type { Aviso } from '../types/aviso';

export const avisosKeys = {
  all: ['avisos'] as const,
  detail: (id: number) => ['aviso', id] as const,
};

// SEMANA 7: con red se guarda la lista en AsyncStorage; sin red se muestra la última copia guardada.
// Los avisos creados en la app (id mayor que MAX_POST_ID) no existen en el servidor, así que
// se conservan desde la copia local y quedan al frente de la lista.
async function cargarAvisos(): Promise<Aviso[]> {
  try {
    const delServidor = await fetchAvisos();
    const copia = (await leerAvisosDeCache()) ?? [];
    const propios = copia.filter((a) => a.id > MAX_POST_ID);
    const lista = [...propios, ...delServidor];
    await guardarAvisosEnCache(lista);
    storage.set(FUENTE_AVISOS_KEY, 'red');
    return lista;
  } catch (error) {
    const copia = await leerAvisosDeCache();
    if (copia) {
      storage.set(FUENTE_AVISOS_KEY, 'cache');
      return copia;
    }
    throw error; // sin red y sin copia local: la pantalla muestra el error con "Reintentar"
  }
}

/** Guarda en AsyncStorage lo que hay en la caché de Query después de crear, editar o eliminar. */
function persistirLista(queryClient: ReturnType<typeof useQueryClient>) {
  const lista = queryClient.getQueryData<Aviso[]>(avisosKeys.all);
  if (lista) void guardarAvisosEnCache(lista);
}

export function useAvisos() {
  return useQuery({ queryKey: avisosKeys.all, queryFn: cargarAvisos });
}

export function useAviso(id: number) {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: avisosKeys.detail(id),
    queryFn: () => fetchAvisoById(id),
    // Reutiliza el aviso que ya está en la lista para no pedirlo de nuevo
    initialData: () => queryClient.getQueryData<Aviso[]>(avisosKeys.all)?.find((a) => a.id === id),
    initialDataUpdatedAt: () => queryClient.getQueryState(avisosKeys.all)?.dataUpdatedAt,
  });
}

export function useCreateAviso() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAviso,
    onSuccess: (creado) => {
      // JSONPlaceholder responde siempre id 101: se usa un id único para la UI
      const nuevo: Aviso = { ...creado, id: Date.now() };
      queryClient.setQueryData<Aviso[]>(avisosKeys.all, (prev) => [nuevo, ...(prev ?? [])]);
      persistirLista(queryClient);
      // refetchType 'none': JSONPlaceholder no persiste cambios; con un backend real se quita.
      queryClient.invalidateQueries({ queryKey: avisosKeys.all, refetchType: 'none' });
    },
  });
}

// SEMANA 6: actualizar un aviso (formulario de edición).
export function useUpdateAviso() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAviso,
    onSuccess: (actualizado) => {
      queryClient.setQueryData<Aviso[]>(avisosKeys.all, (prev) =>
        (prev ?? []).map((a) => (a.id === actualizado.id ? actualizado : a)),
      );
      queryClient.setQueryData<Aviso>(avisosKeys.detail(actualizado.id), actualizado);
      persistirLista(queryClient);
      // refetchType 'none': JSONPlaceholder no persiste cambios; con un backend real se quita.
      queryClient.invalidateQueries({ queryKey: avisosKeys.all, refetchType: 'none' });
    },
  });
}

export function useDeleteAviso() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAviso,
    onSuccess: (_data, id) => {
      queryClient.setQueryData<Aviso[]>(avisosKeys.all, (prev) =>
        (prev ?? []).filter((a) => a.id !== id),
      );
      queryClient.removeQueries({ queryKey: avisosKeys.detail(id) });
      persistirLista(queryClient);
      // refetchType 'none': JSONPlaceholder no persiste cambios; con un backend real se quita.
      queryClient.invalidateQueries({ queryKey: avisosKeys.all, refetchType: 'none' });
    },
  });
}
