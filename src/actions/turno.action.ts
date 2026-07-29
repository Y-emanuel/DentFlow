'use server';

/**
 * Server Action para procesar solicitudes de turno.
 * Valida con Zod, formatea fecha, arma URL de WhatsApp y la retorna.
 * Incluye rate limiting en memoria y honeypot anti-bot.
 */

import { turnoSchema, type TurnoRequest, type TurnoErrors } from '@/lib/validations/turno.schema';
import { formatDateToSpanish } from '@/lib/utils';
import { buildTurnoMessage, buildWhatsappUrl } from '@/lib/whatsapp';
import type { FranjaHoraria } from '@/lib/constants';

/** Resultado exitoso de la acción. */
interface TurnoActionSuccess {
  success: true;
  url: string;
}

/** Resultado fallido de la acción. */
interface TurnoActionFailure {
  success: false;
  errors: TurnoErrors;
  message?: string;
}

/** Tipo unión del resultado de la acción. */
export type TurnoActionResult = TurnoActionSuccess | TurnoActionFailure;

/** Almacén de rate limiting en memoria por IP. */
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

/** Máximo de intentos por ventana. */
const MAX_ATTEMPTS = 5;

/** Ventana de tiempo en milisegundos (5 minutos). */
const WINDOW_MS = 5 * 60 * 1000;

/**
 * Verifica y actualiza el rate limit para una IP.
 * Retorna true si la IP está dentro del límite, false si lo excedió.
 */
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    return true;
  }

  if (entry.count >= MAX_ATTEMPTS) {
    return false;
  }

  entry.count += 1;
  return true;
}

/**
 * Server Action que valida los datos del turno y retorna una URL de WhatsApp.
 *
 * Pasos:
 * 1. Verifica honeypot vacío (anti-bot)
 * 2. Rate limiting por IP
 * 3. Valida con Zod schema
 * 4. Formatea fecha a español
 * 5. Construye mensaje multilínea
 * 6. Construye URL wa.me codificada
 * 7. Retorna URL al cliente
 *
 * @param formData - Datos del formulario recibidos del cliente
 * @returns Resultado con URL de WhatsApp o errores de validación
 */
export async function createWhatsappTurnoUrl(
  formData: FormData,
): Promise<TurnoActionResult> {
  // Obtener IP del request (para rate limiting)
  const headers = new Headers();
  const ip = headers.get('x-forwarded-for') ?? headers.get('x-real-ip') ?? 'unknown';

  // Rate limiting
  if (!checkRateLimit(ip)) {
    return {
      success: false,
      errors: {},
      message: 'Demasiados intentos. Esperá 5 minutos y probá de nuevo.',
    };
  }

  // Extraer datos del FormData
  const raw = {
    nombre: String(formData.get('nombre') ?? ''),
    apellido: String(formData.get('apellido') ?? ''),
    especialidad: String(formData.get('especialidad') ?? ''),
    fecha: String(formData.get('fecha') ?? ''),
    franjaHoraria: String(formData.get('franjaHoraria') ?? ''),
    honeypot: String(formData.get('website') ?? ''),
  };

  // Honeypot: si tiene valor, es un bot
  if (raw.honeypot.length > 0) {
    return {
      success: false,
      errors: {},
      message: 'Error de validación.',
    };
  }

  // Validar con Zod
  const result = turnoSchema.safeParse(raw);

  if (!result.success) {
    const errors: TurnoErrors = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0] as keyof TurnoRequest;
      if (!errors[field] && field !== 'honeypot') {
        errors[field] = issue.message;
      }
    }
    return {
      success: false,
      errors,
    };
  }

  const data = result.data;

  // Formatear fecha a texto legible en español
  const fechaTexto = formatDateToSpanish(data.fecha);

  // Construir mensaje de turno
  const message = buildTurnoMessage({
    nombre: data.nombre,
    apellido: data.apellido,
    especialidad: data.especialidad,
    fechaTexto,
    franja: data.franjaHoraria as FranjaHoraria,
  });

  // Limitar mensaje a 500 caracteres por seguridad
  const safeMessage = message.slice(0, 500);

  // Construir URL de WhatsApp
  const url = buildWhatsappUrl(safeMessage);

  return {
    success: true,
    url,
  };
}