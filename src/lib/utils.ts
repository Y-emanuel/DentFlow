/**
 * Utilidades de DentFlow.
 * Función `cn` para clases y formateo de fecha a español argentino.
 */

/** Une clases condicionalmente, filtrando valores falsy. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

/** Nombres de días de la semana en español argentino (0 = Domingo). */
const DIAS_SEMANA: readonly string[] = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
] as const;

/** Nombres de meses en español argentino (0 = Enero). */
const MESES: readonly string[] = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
] as const;

/**
 * Convierte una fecha ISO (YYYY-MM-DD) a texto legible en español argentino.
 * Ejemplo: "2026-08-04" -> "Lunes 4 de Agosto 2026"
 *
 * Usa UTC para evitar desfases de zona horaria al parsear YYYY-MM-DD.
 */
export function formatDateToSpanish(isoDate: string): string {
  // Parsear como fecha local sin tiempo para evitar desfase de zona horaria
  const parts = isoDate.split('-');
  const yearStr = parts[0];
  const monthStr = parts[1];
  const dayStr = parts[2];

  if (!yearStr || !monthStr || !dayStr) {
    return isoDate;
  }

  const year = Number.parseInt(yearStr, 10);
  const month = Number.parseInt(monthStr, 10);
  const day = Number.parseInt(dayStr, 10);

  if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)) {
    return isoDate;
  }

  // Crear fecha al mediodía UTC para evitar problemas de zona horaria
  const date = new Date(Date.UTC(year, month - 1, day));
  const diaSemana = DIAS_SEMANA[date.getUTCDay()];
  const mes = MESES[date.getUTCMonth()];

  return `${diaSemana} ${day} de ${mes} ${year}`;
}

/**
 * Devuelve la fecha de hoy en zona horaria America/Argentina/Buenos_Aires
 * en formato YYYY-MM-DD.
 */
export function getTodayInArgentina(): string {
  const now = new Date();
  // Formatear usando Intl con zona horaria de Argentina
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Argentina/Buenos_Aires',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  // en-CA produce formato YYYY-MM-DD
  return formatter.format(now);
}

/**
 * Devuelve la fecha máxima (hoy + 60 días) en zona horaria Argentina
 * en formato YYYY-MM-DD.
 */
export function getMaxDateInArgentina(): string {
  const now = new Date();
  const max = new Date(now);
  max.setDate(max.getDate() + 60);

  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Argentina/Buenos_Aires',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  return formatter.format(max);
}

/**
 * Verifica si una fecha ISO (YYYY-MM-DD) corresponde a un domingo.
 * Usa UTC para consistencia con formatDateToSpanish.
 */
export function isDomingo(isoDate: string): boolean {
  const parts = isoDate.split('-');
  const yearStr = parts[0];
  const monthStr = parts[1];
  const dayStr = parts[2];

  if (!yearStr || !monthStr || !dayStr) {
    return false;
  }

  const year = Number.parseInt(yearStr, 10);
  const month = Number.parseInt(monthStr, 10);
  const day = Number.parseInt(dayStr, 10);

  if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)) {
    return false;
  }

  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCDay() === 0;
}