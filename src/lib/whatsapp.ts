/**
 * Lógica pura de WhatsApp para DentFlow.
 * Construcción de mensajes y URLs wa.me sin dependencias externas.
 */

import { WHATSAPP_NUMBER } from './constants';
import type { FranjaHoraria } from './constants';

/** Estructura de datos para armar el mensaje de turno. */
export interface TurnoMessageData {
  nombre: string;
  apellido: string;
  especialidad: string;
  fechaTexto: string;
  franja: FranjaHoraria;
  mensajeExtra?: string;
}

/**
 * Limpia un número de WhatsApp dejando solo dígitos.
 * Asegura el prefijo país si no lo tiene.
 */
function cleanNumber(number: string): string {
  const digits = number.replace(/\D/g, '');
  return digits;
}

/**
 * Construye el mensaje multilínea estructurado para un turno.
 *
 * Línea 1: Saludo y intención
 * Línea 2: Nombre y apellido
 * Línea 3: Especialidad
 * Línea 4: Fecha formateada
 * Línea 5: Horario
 * Línea 6: Mensaje extra opcional
 */
export function buildTurnoMessage(data: TurnoMessageData): string {
  const { nombre, apellido, especialidad, fechaTexto, franja, mensajeExtra } =
    data;

  const franjaLabel =
    franja === 'MANANA' ? 'Mañana (9 a 13 hs)' : 'Tarde (14 a 18 hs)';

  const lines: string[] = [
    'Hola DentFlow, quiero solicitar un turno',
    `Nombre: ${nombre} ${apellido}`,
    `Especialidad: ${especialidad}`,
    `Fecha preferida: ${fechaTexto}`,
    `Horario: ${franjaLabel}`,
  ];

  if (mensajeExtra && mensajeExtra.trim().length > 0) {
    lines.push(`Mensaje: ${mensajeExtra.trim()}`);
  }

  return lines.join('\n');
}

/**
 * Construye la URL completa de wa.me con un mensaje codificado.
 *
 * @param message - Mensaje a enviar (se codifica con encodeURIComponent)
 * @param number - Número de WhatsApp (opcional, usa el default de constants)
 * @returns URL completa ej: https://wa.me/5491134567890?text=...
 */
export function buildWhatsappUrl(
  message: string,
  number: string = WHATSAPP_NUMBER,
): string {
  const cleanNum = cleanNumber(number);
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanNum}?text=${encodedMessage}`;
}

/**
 * Construye una URL de WhatsApp con un mensaje genérico para CTAs.
 *
 * @param origen - Sección desde donde se dispara (hero, navbar, etc.)
 * @param number - Número de WhatsApp (opcional)
 * @returns URL completa de wa.me
 */
export function buildGenericWhatsappUrl(
  origen: string,
  number: string = WHATSAPP_NUMBER,
): string {
  const message = `Hola, vengo de la web DentFlow (sección: ${origen}), quiero info sobre turnos y especialidades.`;
  return buildWhatsappUrl(message, number);
}