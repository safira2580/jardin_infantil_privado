import { create } from 'zustand';

interface AvisosFavoritosState {
  avisoIds: number[];
  toggleAviso: (id: number) => void;
}

// Solo estado de UI (ids marcados). Los datos del aviso viven en TanStack Query.
export const useAvisosFavoritosStore = create<AvisosFavoritosState>((set) => ({
  avisoIds: [],
  toggleAviso: (id) =>
    set((state) => ({
      avisoIds: state.avisoIds.includes(id)
        ? state.avisoIds.filter((x) => x !== id)
        : [...state.avisoIds, id],
    })),
}));
