// SEMANA 7: validación del PIN de la dirección antes de guardarlo en SecureStore.
import { z } from 'zod';

export const pinSchema = z.object({
  pin: z.string().regex(/^\d{4,6}$/, 'El PIN debe tener entre 4 y 6 dígitos.'),
});

export type PinFormData = z.infer<typeof pinSchema>;
