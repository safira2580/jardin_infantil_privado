// SEMANA 6: validación del formulario de avisos con Zod.
// Los TextInput siempre entregan texto, así que el campo numérico se declara como string y se
// convierte con z.coerce.number<string>(): el tipo de ENTRADA del formulario es string y el de SALIDA
// (ya validado) es number.
import { z } from 'zod';

export const avisoSchema = z.object({
  titulo: z
    .string()
    .trim()
    .min(3, 'El título debe tener al menos 3 caracteres.')
    .max(80, 'Máximo 80 caracteres.'),
  mensaje: z
    .string()
    .trim()
    .min(10, 'Escribe al menos 10 caracteres.')
    .max(500, 'Máximo 500 caracteres.'),
  autorId: z
    .string()
    .trim()
    .min(1, 'Indica el número de docente.')
    .pipe(
      z.coerce
        .number<string>({ error: 'Debe ser un número.' })
        .int('Debe ser un número entero.')
        .min(1, 'Mínimo 1.')
        .max(10, 'Máximo 10.'),
    ),
});

export type AvisoFormInput = z.input<typeof avisoSchema>; // lo que escribe la persona (texto)
export type AvisoFormData = z.output<typeof avisoSchema>; // lo validado (autorId: number)
