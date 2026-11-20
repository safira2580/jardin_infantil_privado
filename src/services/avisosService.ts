import { apiClient } from './api';
import type { Aviso, NuevoAviso } from '../types/aviso';

// Forma que devuelve la API (JSONPlaceholder /posts)
interface PostDto {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const toAviso = (p: PostDto): Aviso => ({
  id: p.id,
  titulo: p.title,
  mensaje: p.body,
  autorId: p.userId,
});

export async function fetchAvisos(): Promise<Aviso[]> {
  const { data } = await apiClient.get<PostDto[]>('/posts', { params: { _limit: 20 } });
  return data.map(toAviso);
}

export async function fetchAvisoById(id: number): Promise<Aviso> {
  const { data } = await apiClient.get<PostDto>(`/posts/${id}`);
  return toAviso(data);
}

export async function createAviso(payload: NuevoAviso): Promise<Aviso> {
  const { data } = await apiClient.post<PostDto>('/posts', {
    title: payload.titulo,
    body: payload.mensaje,
    userId: payload.autorId,
  });
  return toAviso(data);
}

/** JSONPlaceholder solo tiene los posts 1 a 100; los avisos creados en la app usan ids mayores. */
const MAX_POST_ID = 100;

export async function updateAviso(aviso: Aviso): Promise<Aviso> {
  // Un aviso creado en la app no existe en el servidor: se actualiza solo en la caché.
  if (aviso.id > MAX_POST_ID) return aviso;
  const { data } = await apiClient.put<PostDto>(`/posts/${aviso.id}`, {
    id: aviso.id,
    title: aviso.titulo,
    body: aviso.mensaje,
    userId: aviso.autorId,
  });
  return toAviso(data);
}

export async function deleteAviso(id: number): Promise<void> {
  await apiClient.delete(`/posts/${id}`);
}
