# Jardín Infantil Semillitas - Semana 06: Formularios con React Hook Form + Zod

Bootcamp React Native (bc-reactnative) - Dominio: **Jardín infantil privado**.

## Qué incluye esta semana

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

```
pnpm install
# .env.local: EXPO_PUBLIC_API_URL=https://jsonplaceholder.typicode.com
pnpm start
pnpm exec tsc --noEmit
pnpm lint
```

## Nota

JSONPlaceholder simula los POST, PUT y DELETE sin guardar nada. Por eso las mutaciones actualizan
el caché a mano (`setQueryData`) y usan `refetchType: 'none'`. Los avisos creados en la app (id mayor
que 100) no existen en el servidor, así que al editarlos solo se actualiza el caché.

## Siguiente semana

Semana 7: persistencia local.
