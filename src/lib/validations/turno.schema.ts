/**
 * Schema de validación Zod para el formulario de turno.
 * Mensajes de error en español argentino.
 */

import { z } from 'zod';
import { LISTA_ESPECIALIDADES } from '../constants';
import { getTodayInArgentina, getMaxDateInArgentina, isDomingo } from '../utils';

/**
 * Schema para el formulario de turno.
 * Valida nombre, apellido, especialidad, fecha y franja horaria.
 */
export const turnoSchema = z.object({
  nombre: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 letras')
    .max(40, 'El nombre no puede tener más de 40 caracteres')
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/,
      'El nombre solo puede contener letras y espacios',
    ),

  apellido: z
    .string()
    .min(2, 'El apellido debe tener al menos 2 letras')
    .max(40, 'El apellido no puede tener más de 40 caracteres')
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/,
      'El apellido solo puede contener letras y espacios',
    ),

  especialidad: z
    .string()
    .min(1, 'Seleccioná una especialidad')
    .refine((val) => LISTA_ESPECIALIDADES.includes(val), {
      message: 'Seleccioná una especialidad válida',
    }),

  fecha: z
    .string()
    .min(1, 'Elegí una fecha')
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha inválido')
    .refine((val) => {
      const today = getTodayInArgentina();
      return val >= today;
    }, 'La fecha no puede ser en el pasado')
    .refine((val) => {
      const maxDate = getMaxDateInArgentina();
      return val <= maxDate;
    }, 'La fecha no puede ser más de 60 días en el futuro')
    .refine((val) => !isDomingo(val), {
      message: 'No atendemos domingos. Elegí otro día',
    }),

  franjaHoraria: z.enum(['MANANA', 'TARDE'], {
    errorMap: () => ({ message: 'Elegí una franja horaria' }),
  }),

  honeypot: z
    .string()
    .max(0, 'Bot detectado')
    .optional()
    .default(''),
});

/** Tipo derivado del schema para uso en componentes y actions. */
export type TurnoRequest = z.infer<typeof turnoSchema>;

/** Tipo de los errores de validación por campo. */
export type TurnoErrors = Partial<Record<keyof TurnoRequest, string>>;

/**
 * Valida un objeto contra el schema de turno.
 * Retorna un mapa de errores por campo, o null si es válido.
 */
export function validateTurno(data: unknown): TurnoErrors | null {
  const result = turnoSchema.safeParse(data);

  if (result.success) {
    return null;
  }

  const errors: TurnoErrors = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as keyof TurnoRequest;
    if (!errors[field]) {
      errors[field] = issue.message;
    }
  }

  return errors;
}