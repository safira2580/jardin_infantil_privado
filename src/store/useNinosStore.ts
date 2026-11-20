import { create } from 'zustand';
import { NINOS } from '../data/ninos';
import type { Asistencia, Nino } from '../types/models';

interface NinosState {
  ninos: Nino[];
  marcarAsistencia: (id: string, asistencia: Asistencia) => void;
}

export const useNinosStore = create<NinosState>((set) => ({
  ninos: NINOS,
  marcarAsistencia: (id, asistencia) =>
    set((state) => ({
      ninos: state.ninos.map((n) => (n.id === id ? { ...n, asistencia } : n)),
    })),
}));
