import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createAviso, deleteAviso, fetchAvisoById, fetchAvisos } from '../services/avisosService';
import type { Aviso } from '../types/aviso';

export const avisosKeys = {
  all: ['avisos'] as const,
  detail: (id: number) => ['aviso', id] as const,
};

export function useAvisos() {
  return useQuery({ queryKey: avisosKeys.all, queryFn: fetchAvisos });
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
      // refetchType 'none': JSONPlaceholder no persiste cambios; con un backend real se quita.
      queryClient.invalidateQueries({ queryKey: avisosKeys.all, refetchType: 'none' });
    },
  });
}
