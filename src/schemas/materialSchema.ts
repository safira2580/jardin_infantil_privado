// SEMANA 6: reemplaza la validación manual del formulario de material (semana 2) por Zod.
import { z } from 'zod';
import { CATEGORIAS } from '../data/materials';

export const materialSchema = z.object({
  name: z.string().trim().min(3, 'Escribe un nombre de al menos 3 caracteres.'),
  category: z.enum(CATEGORIAS),
  unit: z.string().trim().min(1, 'Indica la unidad de venta (ej. caja x12).'),
  price: z
    .string()
    .trim()
    .min(1, 'Ingresa el precio.')
    .pipe(z.coerce.number<string>({ error: 'El precio debe ser un número.' }).positive('Ingresa un precio mayor a 0.')),
  stock: z
    .string()
    .trim()
    .min(1, 'Ingresa la cantidad inicial.')
    .pipe(
      z.coerce
        .number<string>({ error: 'La cantidad debe ser un número.' })
        .int('Ingresa una cantidad entera.')
        .min(0, 'La cantidad no puede ser negativa.'),
    ),
  description: z.string().trim().max(300, 'Máximo 300 caracteres.'),
});

export type MaterialFormInput = z.input<typeof materialSchema>;
export type MaterialFormData = z.output<typeof materialSchema>;
