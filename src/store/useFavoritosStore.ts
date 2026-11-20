import { create } from 'zustand';

interface FavoritosState {
  materialIds: string[];
  toggleMaterial: (id: string) => void;
}

export const useFavoritosStore = create<FavoritosState>((set) => ({
  materialIds: [],
  toggleMaterial: (id) =>
    set((state) => ({
      materialIds: state.materialIds.includes(id)
        ? state.materialIds.filter((x) => x !== id)
        : [...state.materialIds, id],
    })),
}));
