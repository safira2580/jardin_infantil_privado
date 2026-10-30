import { create } from 'zustand';
import { MATERIALS } from '../data/materials';
import type { Material } from '../types/models';

type NuevoMaterial = Omit<Material, 'id' | 'emoji' | 'minStock'>;

interface MaterialsState {
  materials: Material[];
  addMaterial: (data: NuevoMaterial) => Material;
  /** Suma o resta unidades al stock (nunca baja de 0). */
  ajustarStock: (id: string, delta: number) => void;
}

export const useMaterialsStore = create<MaterialsState>((set) => ({
  materials: MATERIALS,
  addMaterial: (data) => {
    const nuevo: Material = { ...data, id: `mat-${Date.now()}`, emoji: '📦', minStock: 10 };
    set((state) => ({ materials: [nuevo, ...state.materials] }));
    return nuevo;
  },
  ajustarStock: (id, delta) =>
    set((state) => ({
      materials: state.materials.map((m) => (m.id === id ? { ...m, stock: Math.max(0, m.stock + delta) } : m)),
    })),
}));
