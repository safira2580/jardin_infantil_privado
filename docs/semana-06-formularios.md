# Semana 6: formularios con React Hook Form + Zod

Proyecto: Jardín Infantil Semillitas (dominio: jardín infantil privado).

## Qué se logró
- Los formularios de **aviso** (crear y editar) y de **material** usan React Hook Form con validación Zod.
- Un solo `FormField` genérico para todos los campos de texto.
- Se agregó la pantalla **Editar aviso** (botón "Editar aviso" en el detalle).
- El docente que publica el aviso ahora se elige en el formulario (`autorId`, 1 a 10) y se envía como `userId`.

## Paso a paso
1. **Instalar dependencias** (solo JS, no llevan código nativo):
   ```bash
   pnpm add react-hook-form zod @hookform/resolvers
   ```
2. **Schemas Zod** en `src/schemas/`. Los TextInput entregan texto, así que los números se declaran
   `z.string()` y se convierten con `.pipe(z.coerce.number(...))`. Así:
   - `z.input<typeof schema>`: lo que escribe la persona (todo texto).
   - `z.output<typeof schema>`: lo validado (números ya convertidos).
3. **`FormField` genérico**: recibe `control` y `name`, y dentro usa `Controller`. Muestra el error de Zod bajo el campo.
4. **`useForm` con tres tipos**: `useForm<Input, unknown, Output>({ resolver: zodResolver(schema), defaultValues })`.
   `handleSubmit(onSubmit)` solo llama a `onSubmit` si Zod aprueba, y le pasa los datos ya convertidos.
5. **Crear aviso**: `AvisoFormScreen` usa `AvisoForm` y `useCreateAviso().mutateAsync`; al terminar vuelve atrás.
6. **Editar aviso**: `AvisoEditScreen` carga el aviso con `useAviso` y lo pasa como `defaultValues`;
   `useUpdateAviso` actualiza el caché de la lista y del detalle.
7. **Material**: `MaterialFormScreen` cambió los `useState` y `validate()` por `useForm` + `materialSchema`;
   la categoría se maneja con `Controller` y los `Chip`.

## Reglas que se aplicaron
- Un solo esquema por formulario: el tipo TypeScript sale del esquema (sin interfaces duplicadas).
- `defaultValues` siempre en texto (`''`, `String(n)`), porque los inputs trabajan con string.
- `mutateAsync` + `try/catch` dentro de `onSubmit`, para que `isSubmitting` dure lo que dura el envío.

## Cómo probarlo
1. Avisos → "+" → envía vacío: aparecen los errores bajo cada campo.
2. Escribe "abc" o "25" en Docente: error de número / de máximo.
3. Crea un aviso válido → aparece primero en la lista.
4. Abre un aviso → "Editar aviso" → cambia el título → vuelve y mira el cambio en lista y detalle.
5. Material → "+" → precio 0 o stock 1.5: errores de Zod.

## Pendiente (semanas siguientes)
- Persistir stores y avisos en el dispositivo (semana 7).
