'use client';

/**
 * Isla cliente turno-form - CORE del producto.
 * Formulario completo de turno con validación Zod en cliente,
 * conexión a Server Action, estados loading/success/error,
 * y apertura de WhatsApp en nueva pestaña.
 */

import { useState, useTransition } from 'react';
import { Sun, Moon, MessageCircle, Loader2, AlertCircle } from 'lucide-react';
import { Input } from './input';
import { Select } from './select';
import { TurnoFormSuccess } from './turno-form-success';
import { TEXTOS, LISTA_ESPECIALIDADES, HORARIOS } from '@/lib/constants';
import type { FranjaHoraria } from '@/lib/constants';
import { getTodayInArgentina, getMaxDateInArgentina } from '@/lib/utils';
import { validateTurno, type TurnoErrors } from '@/lib/validations/turno.schema';
import { createWhatsappTurnoUrl } from '@/actions/turno.action';

/** Estado del formulario. */
type FormStatus = 'idle' | 'loading' | 'success' | 'error';

/** Valores del formulario. */
interface FormValues {
  nombre: string;
  apellido: string;
  especialidad: string;
  fecha: string;
  franjaHoraria: FranjaHoraria | '';
  website: string; // honeypot
}

/** Valores iniciales vacíos. */
const INITIAL_VALUES: FormValues = {
  nombre: '',
  apellido: '',
  especialidad: '',
  fecha: '',
  franjaHoraria: '',
  website: '',
};

/**
 * Formulario de turno con validación en tiempo real y envío a Server Action.
 * Al enviar exitosamente, abre WhatsApp en nueva pestaña con el mensaje armado.
 */
export function TurnoForm() {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<TurnoErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [whatsappUrl, setWhatsappUrl] = useState<string>('');
  const [serverMessage, setServerMessage] = useState<string>('');
  const [isPending, startTransition] = useTransition();

  /** Fecha mínima y máxima para el input date. */
  const minDate = getTodayInArgentina();
  const maxDate = getMaxDateInArgentina();

  /**
   * Valida un campo individual en tiempo real.
   */
  const validateField = (field: keyof FormValues, value: string): string | undefined => {
    const dataToValidate = { ...values, [field]: value };
    const fieldErrors = validateTurno(dataToValidate);
    if (fieldErrors) {
      const errorKey = field as keyof TurnoErrors;
      if (errorKey in fieldErrors) {
        return fieldErrors[errorKey];
      }
    }
    return undefined;
  };

  /**
   * Maneja cambios en inputs de texto y select.
   */
  const handleChange = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));

    // Validar en tiempo real solo si el campo ya fue tocado
    if (touched[field]) {
      const error = validateField(field, value);
      if (error !== undefined) {
        setErrors((prev) => ({ ...prev, [field as keyof TurnoErrors]: error }));
      } else {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[field as keyof TurnoErrors];
          return next;
        });
      }
    }
  };

  /**
   * Maneja el blur de un campo (marca como tocado y valida).
   */
  const handleBlur = (field: keyof FormValues) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, String(values[field] ?? ''));
    if (error !== undefined) {
      setErrors((prev) => ({ ...prev, [field as keyof TurnoErrors]: error }));
    } else {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field as keyof TurnoErrors];
        return next;
      });
    }
  };

  /**
   * Maneja el envío del formulario.
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validar todos los campos
    const allErrors = validateTurno(values);
    if (allErrors) {
      setErrors(allErrors);
      setTouched({
        nombre: true,
        apellido: true,
        especialidad: true,
        fecha: true,
        franjaHoraria: true,
      });
      return;
    }

    // Limpiar errores y empezar loading
    setErrors({});
    setStatus('loading');
    setServerMessage('');

    // Crear FormData para el Server Action
    const formData = new FormData();
    formData.append('nombre', values.nombre);
    formData.append('apellido', values.apellido);
    formData.append('especialidad', values.especialidad);
    formData.append('fecha', values.fecha);
    formData.append('franjaHoraria', values.franjaHoraria);
    formData.append('website', values.website);

    // Llamar al Server Action
    startTransition(async () => {
      try {
        const result = await createWhatsappTurnoUrl(formData);

        if (result.success) {
          // Abrir WhatsApp en nueva pestaña
          setWhatsappUrl(result.url);
          window.open(result.url, '_blank', 'noopener,noreferrer');
          setStatus('success');
        } else {
          setErrors(result.errors);
          setServerMessage(result.message ?? 'Hubo un error. Probá de nuevo.');
          setStatus('error');
        }
      } catch {
        setServerMessage('Hubo un error de conexión. Probá de nuevo.');
        setStatus('error');
      }
    });
  };

  /**
   * Resetea el formulario a su estado inicial.
   */
  const handleReset = () => {
    setValues(INITIAL_VALUES);
    setErrors({});
    setTouched({});
    setStatus('idle');
    setWhatsappUrl('');
    setServerMessage('');
  };

  // Mostrar estado de éxito
  if (status === 'success' && whatsappUrl) {
    return <TurnoFormSuccess url={whatsappUrl} onReset={handleReset} />;
  }

  const isLoading = status === 'loading' || isPending;

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-[560px] rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6 shadow-soft-lg md:p-8"
      noValidate
      aria-label="Formulario de solicitud de turno"
    >
      {/* Honeypot - oculto para humanos, visible para bots */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website">{TEXTOS.turno.form.honeypotLabel}</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => handleChange('website', e.target.value)}
        />
      </div>

      {/* Mensaje de error del servidor */}
      {status === 'error' && serverMessage && (
        <div
          className="mb-4 flex items-start gap-2 rounded-[var(--radius-md)] border border-red-300 bg-red-50 p-3"
          role="alert"
        >
          <AlertCircle
            className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500"
            aria-hidden="true"
          />
          <p className="text-sm text-red-700">{serverMessage}</p>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {/* Nombre */}
        <Input
          label={TEXTOS.turno.form.nombre}
          name="nombre"
          type="text"
          required
          minLength={2}
          maxLength={40}
          autoComplete="given-name"
          placeholder="Tu nombre"
          value={values.nombre}
          onChange={(e) => handleChange('nombre', e.target.value)}
          onBlur={() => handleBlur('nombre')}
          error={errors.nombre}
        />

        {/* Apellido */}
        <Input
          label={TEXTOS.turno.form.apellido}
          name="apellido"
          type="text"
          required
          minLength={2}
          maxLength={40}
          autoComplete="family-name"
          placeholder="Tu apellido"
          value={values.apellido}
          onChange={(e) => handleChange('apellido', e.target.value)}
          onBlur={() => handleBlur('apellido')}
          error={errors.apellido}
        />

        {/* Especialidad */}
        <Select
          label={TEXTOS.turno.form.especialidad}
          name="especialidad"
          required
          value={values.especialidad}
          onChange={(e) => handleChange('especialidad', e.target.value)}
          onBlur={() => handleBlur('especialidad')}
          error={errors.especialidad}
        >
          <option value="" disabled>
            {TEXTOS.turno.form.especialidadPlaceholder}
          </option>
          {LISTA_ESPECIALIDADES.map((esp) => (
            <option key={esp} value={esp}>
              {esp}
            </option>
          ))}
        </Select>

        {/* Fecha */}
        <Input
          label={TEXTOS.turno.form.fecha}
          name="fecha"
          type="date"
          required
          min={minDate}
          max={maxDate}
          value={values.fecha}
          onChange={(e) => handleChange('fecha', e.target.value)}
          onBlur={() => handleBlur('fecha')}
          error={errors.fecha}
          hint="Lunes a sábado. No atendemos domingos."
        />

        {/* Franja horaria - radio buttons grandes */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[var(--color-foreground)]">
            {TEXTOS.turno.form.horario}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Mañana */}
            <button
              type="button"
              onClick={() => {
                handleChange('franjaHoraria', 'MANANA');
                setTouched((prev) => ({ ...prev, franjaHoraria: true }));
              }}
              className={`flex flex-col items-center gap-2 rounded-[var(--radius-md)] border-2 p-4 transition-all ${
                values.franjaHoraria === 'MANANA'
                  ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5'
                  : 'border-[var(--color-border)] bg-white hover:border-[var(--color-primary)]/40'
              }`}
              aria-pressed={values.franjaHoraria === 'MANANA'}
              aria-label="Seleccionar horario de mañana de 9 a 13 hs"
            >
              <Sun
                className={`h-6 w-6 ${
                  values.franjaHoraria === 'MANANA'
                    ? 'text-[var(--color-primary)]'
                    : 'text-[var(--color-muted-foreground)]'
                }`}
                aria-hidden="true"
              />
              <span className="text-sm font-semibold text-[var(--color-foreground)]">
                {HORARIOS.MANANA.label}
              </span>
              <span className="text-xs text-[var(--color-muted-foreground)]">
                {HORARIOS.MANANA.rango}
              </span>
            </button>

            {/* Tarde */}
            <button
              type="button"
              onClick={() => {
                handleChange('franjaHoraria', 'TARDE');
                setTouched((prev) => ({ ...prev, franjaHoraria: true }));
              }}
              className={`flex flex-col items-center gap-2 rounded-[var(--radius-md)] border-2 p-4 transition-all ${
                values.franjaHoraria === 'TARDE'
                  ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5'
                  : 'border-[var(--color-border)] bg-white hover:border-[var(--color-primary)]/40'
              }`}
              aria-pressed={values.franjaHoraria === 'TARDE'}
              aria-label="Seleccionar horario de tarde de 14 a 18 hs"
            >
              <Moon
                className={`h-6 w-6 ${
                  values.franjaHoraria === 'TARDE'
                    ? 'text-[var(--color-primary)]'
                    : 'text-[var(--color-muted-foreground)]'
                }`}
                aria-hidden="true"
              />
              <span className="text-sm font-semibold text-[var(--color-foreground)]">
                {HORARIOS.TARDE.label}
              </span>
              <span className="text-xs text-[var(--color-muted-foreground)]">
                {HORARIOS.TARDE.rango}
              </span>
            </button>
          </div>
          {/* Input radio oculto para accesibilidad y FormData */}
          <input
            type="hidden"
            name="franjaHoraria"
            value={values.franjaHoraria}
          />
          {errors.franjaHoraria && (
            <p className="text-sm text-red-500" role="alert">
              {errors.franjaHoraria}
            </p>
          )}
        </div>

        {/* Botón submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-whatsapp)] px-6 text-base font-medium text-white hover:bg-[var(--color-whatsapp-hover)] shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-whatsapp)] focus-visible:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
              {TEXTOS.turno.form.loading}
            </>
          ) : (
            <>
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              {TEXTOS.turno.form.submit}
            </>
          )}
        </button>
      </div>
    </form>
  );
}