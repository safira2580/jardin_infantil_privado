# Jardín Infantil Semillitas - Semana 05: Networking y TanStack Query v5

Bootcamp React Native (bc-reactnative) - Dominio: **Jardín infantil privado**.

## Qué incluye esta semana

- Todo lo de las semanas 1 a 4.
- **Axios** con instancia centralizada (`baseURL` desde `EXPO_PUBLIC_API_URL`, `timeout`, interceptors).
- **TanStack Query v5**: `useQuery` para listar y ver el detalle de avisos.
- **useMutation** para crear y eliminar avisos, con `invalidateQueries` y `setQueryData`.
- Estados de carga, error y lista vacía, y pull-to-refresh con `refetch`.
- Favoritos en Zustand (solo los ids; los datos del servidor viven en TanStack Query).

## Archivos principales

- `src/services/api.ts`, `src/services/avisosService.ts`
- `src/hooks/useAvisos.ts`
- `src/screens/AvisosListScreen.tsx`, `AvisoDetailScreen.tsx`, `AvisoFormScreen.tsx`

## Cómo ejecutarlo

```
npm install
# .env.local: EXPO_PUBLIC_API_URL=https://jsonplaceholder.typicode.com
npx expo start
```

## Nota

JSONPlaceholder simula los POST y DELETE sin guardar nada, por eso las mutaciones
actualizan el caché a mano (`setQueryData`) y usan `refetchType: 'none'`.

## Siguiente semana

Semana 6: formularios con React Hook Form + Zod.
