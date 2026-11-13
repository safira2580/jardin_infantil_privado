export interface Aviso {
  id: number;
  titulo: string;
  mensaje: string;
  autorId: number;
}

export type NuevoAviso = Pick<Aviso, 'titulo' | 'mensaje'>;
