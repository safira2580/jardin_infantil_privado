import type { ImageSourcePropType } from 'react-native';

export type Categoria =
  | 'Arte y manualidades'
  | 'Juegos y motricidad'
  | 'Lectura y lenguaje'
  | 'Higiene y cuidado'
  | 'Alimentación'
  | 'Papelería';

export interface Material {
  id: string;
  name: string;
  category: Categoria;
  unit: string;
  price: number;
  stock: number;
  minStock: number;
  emoji: string;
  description: string;
}

export type EstadoGrupo = 'inscripciones' | 'activo' | 'completo';

export interface Grupo {
  id: string;
  nombre: string;
  docente: string;
  salon: string;
  edad: string;
  estado: EstadoGrupo;
  cupos: number;
  matriculados: number;
  mensualidad: number;
  fechaInicio: string; // ISO yyyy-mm-dd
  descripcion: string;
  materialIds: string[];
}

export type Asistencia = 'presente' | 'ausente' | 'pendiente';

export interface Nino {
  id: string;
  nombre: string;
  apellido: string;
  fechaNacimiento: string; // ISO yyyy-mm-dd
  grupoId: string;
  acudiente: string;
  telefono: string; // solo dígitos con indicativo, ej. 573005550101
  asistencia: Asistencia;
  nota?: string;
  foto?: ImageSourcePropType; // opcional: si falta, se muestra la inicial
}
