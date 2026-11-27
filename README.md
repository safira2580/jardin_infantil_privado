# Jardín Infantil Semillitas - Semana 07: Persistencia local

Bootcamp React Native (bc-reactnative) - Dominio: **Jardín infantil privado**.

## Qué incluye esta semana

- **MMKV**: preferencias de la lista de avisos (orden, modo compacto, avisos por página).
- **AsyncStorage**: copia local de los avisos para verlos sin internet (con banner de "sin conexión").
- **SecureStore**: PIN de la dirección guardado cifrado.
- Pantalla **Ajustes** (engranaje en la pestaña Avisos) y avisos de ejemplo en español.
- Detalle y pasos en `docs/semana-07-persistencia.md`.

## De la semana 6

- Todo lo de las semanas 1 a 5.
- **Zod**: `avisoSchema` y `materialSchema`, con `z.coerce.number()` en los campos numéricos.
- **React Hook Form** + `zodResolver`: los formularios ya no usan `useState` ni validación manual.
- **`FormField` genérico** (Controller + TextInput + mensaje de error), tipado sin `any`.
- **Crear aviso**, **Editar aviso** (nuevo, con `useUpdateAviso`) y **Nuevo material** reutilizan `FormField`.
- Botón con spinner y deshabilitado mientras se envía (`isSubmitting`).

## Archivos principales

- `src/schemas/avisoSchema.ts`, `src/schemas/materialSchema.ts`
- `src/components/FormField.tsx`, `AvisoForm.tsx`, `SubmitButton.tsx`
- `src/screens/AvisoFormScreen.tsx` (crear), `AvisoEditScreen.tsx` (editar), `MaterialFormScreen.tsx`
- `src/hooks/useAvisos.ts` (`useUpdateAviso`), `src/services/avisosService.ts` (`updateAviso`)

## Cómo ejecutarlo (solo pnpm)

MMKV necesita código nativo, así que esta semana **no funciona con Expo Go**: hay que generar una
development build.

```
pnpm install
pnpm expo run:android      # Android Studio + SDK de Android + JDK 17
pnpm exec tsc --noEmit
pnpm lint
```

## Nota

JSONPlaceholder simula los POST, PUT y DELETE sin guardar nada. Por eso las mutaciones actualizan
el caché a mano (`setQueryData`) y usan `refetchType: 'none'`. Los avisos creados en la app (id mayor
que 100) no existen en el servidor, así que al editarlos solo se actualiza el caché.

## Siguiente semana

Semana 8: autenticación.
