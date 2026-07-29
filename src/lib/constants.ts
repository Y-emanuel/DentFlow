/**
 * Constantes centrales de DentFlow.
 * Número de WhatsApp, especialidades, horarios y textos de secciones.
 */

/** Número de WhatsApp público (con prefijo país, sin + ni espacios). */
export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '5491134567890';

/** URL pública del sitio (sin slash final). */
export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? 'https://dentflow.com.ar';

/** Especialidades disponibles para el formulario de turno. */
export const LISTA_ESPECIALIDADES: readonly string[] = [
  'Odontología General',
  'Ortodoncia',
  'Implantología',
  'Estética Dental',
  'Endodoncia',
  'Limpieza y Blanqueamiento',
  'Prótesis',
  'Odontopediatría',
  'Urgencias',
] as const;

/** Franjas horarias disponibles. */
export const HORARIOS = {
  MANANA: {
    value: 'MANANA',
    label: 'Mañana',
    rango: '9 a 13 hs',
  },
  TARDE: {
    value: 'TARDE',
    label: 'Tarde',
    rango: '14 a 18 hs',
  },
} as const;

/** Tipo derivado de los valores de franja horaria. */
export type FranjaHoraria =
  (typeof HORARIOS)[keyof typeof HORARIOS]['value'];

/** Textos de cada sección de la landing. */
export const TEXTOS = {
  nav: {
    logo: 'DentFlow',
    links: [
      { label: 'Especialidades', href: '#especialidades' },
      { label: 'Cómo funciona', href: '#como-funciona' },
      { label: 'Opiniones', href: '#opiniones' },
      { label: 'Preguntas', href: '#preguntas' },
    ],
    cta: 'Agendar por WhatsApp',
  },
  hero: {
    badge: '120+ pacientes al mes confían en DentFlow',
    title: 'Tu sonrisa, nuestro flujo. Agenda llena sin perder tiempo.',
    subtitle:
      'Sacá tu turno en 30 segundos. Elegí especialidad, fecha y horario, y te llevamos directo a WhatsApp con todo listo para confirmar.',
    ctaPrimary: 'Sacar Turno Ahora',
    ctaSecondary: 'Hablar por WhatsApp',
  },
  socialProof: {
    title: 'La clínica que tus vecinos recomiendan',
    stats: [
      { value: '120+', label: 'Pacientes por mes' },
      { value: '4.9★', label: 'Promedio de reseñas' },
      { value: '8', label: 'Especialidades' },
      { value: '30s', label: 'Para sacar un turno' },
    ],
  },
  features: {
    title: 'Todo pensado para el paciente',
    subtitle:
      'Gestión de turnos moderna, sin llamados en espera ni agendas confusas.',
    items: [
      {
        title: 'Turnos online 24/7',
        description:
          'Reservá cuando quieras, incluso de madrugada. La agenda no duerme.',
      },
      {
        title: 'Recordatorios automáticos',
        description:
          'Te avisamos por WhatsApp antes de tu cita para que no se te pase.',
      },
      {
        title: 'Confirmación en 1 click',
        description:
          'Respondé un mensaje y tu turno queda confirmado. Sin formularios eternos.',
      },
      {
        title: 'Múltiples especialidades',
        description:
          'Odontología general, ortodoncia, implantes, estética y más, en un solo lugar.',
      },
      {
        title: 'Atención sin esperas',
        description:
          'Horarios respetados. Llegás a tu hora, entrás a tu hora.',
      },
      {
        title: 'Presupuesto claro',
        description:
          'Te contamos costos y opciones antes de empezar, sin sorpresas.',
      },
    ],
  },
  howItWorks: {
    title: 'Sacar turno nunca fue tan simple',
    subtitle: 'Tres pasos y estás agendado.',
    steps: [
      {
        number: '1',
        title: 'Elegí especialidad',
        description:
          'Decinos qué necesitás: limpieza, ortodoncia, urgencia o control general.',
      },
      {
        number: '2',
        title: 'Elegí fecha y horario',
        description:
          'Marcá el día que te viene bien y si preferís mañana o tarde.',
      },
      {
        number: '3',
        title: 'Confirmá por WhatsApp',
        description:
          'Te armamos el mensaje con todos tus datos. Lo abrís y lo envías en un toque.',
      },
    ],
  },
  turno: {
    title: 'Sacá tu turno en 30 segundos',
    subtitle:
      'Elegí especialidad, fecha y franja, te llevamos directo a WhatsApp con todo listo.',
    form: {
      nombre: 'Nombre',
      apellido: 'Apellido',
      especialidad: 'Especialidad',
      especialidadPlaceholder: 'Seleccioná una especialidad',
      fecha: 'Fecha preferida',
      horario: 'Horario disponible',
      submit: 'Solicitar Turno por WhatsApp',
      loading: 'Armando tu mensaje...',
      honeypotLabel: 'No llenar este campo',
    },
  },
  testimonials: {
    title: 'Lo que dicen nuestros pacientes',
    subtitle: 'Reseñas reales de quienes ya confiaron en DentFlow.',
  },
  faq: {
    title: 'Preguntas frecuentes',
    subtitle: 'Todo lo que necesitás saber antes de tu primera visita.',
  },
  footer: {
    tagline: 'Turnos dentales por WhatsApp en 30 segundos.',
    rights: 'Todos los derechos reservados.',
    cta: 'Agendar por WhatsApp',
  },
} as const;

/** Datos de testimonios. */
export const TESTIMONIOS: readonly {
  nombre: string;
  texto: string;
  rating: number;
  tratamiento: string;
}[] = [
  {
    nombre: 'María González',
    texto:
      'Sacar el turno fue rapidísimo. Respondí por WhatsApp y me confirmaron al toque. Llegué y no esperé nada.',
    rating: 5,
    tratamiento: 'Limpieza y Blanqueamiento',
  },
  {
    nombre: 'Carlos Pérez',
    texto:
      'Tenía una urgencia un sábado y pude coordinar todo desde el celular. Profesionales y muy amables.',
    rating: 5,
    tratamiento: 'Urgencias',
  },
  {
    nombre: 'Lucía Fernández',
    texto:
      'Me están haciendo ortodoncia y el seguimiento es excelente. Los recordatorios por WhatsApp son geniales.',
    rating: 5,
    tratamiento: 'Ortodoncia',
  },
  {
    nombre: 'Diego Martínez',
    texto:
      'El presupuesto fue claro desde el principio. Sin sorpresas. Muy recomendable para implantes.',
    rating: 5,
    tratamiento: 'Implantología',
  },
  {
    nombre: 'Sofía Romero',
    texto:
      'Llevo a mi hija acá y la atienden bárbaro. Súper pacientes con los chicos. Odontopediatría de primera.',
    rating: 5,
    tratamiento: 'Odontopediatría',
  },
] as const;

/** Datos de FAQ. */
export const FAQS: readonly { pregunta: string; respuesta: string }[] = [
  {
    pregunta: '¿Cómo saco un turno?',
    respuesta:
      'Completá el formulario de turno con tu nombre, especialidad, fecha y franja horaria. Al enviar, se abre WhatsApp con un mensaje ya armado para que lo confirmes en segundos.',
  },
  {
    pregunta: '¿Atienden urgencias?',
    respuesta:
      'Sí. Seleccioná la especialidad "Urgencias" en el formulario y coordinamos la atención lo antes posible por WhatsApp.',
  },
  {
    pregunta: '¿Qué horarios tienen?',
    respuesta:
      'Atendemos de lunes a sábado. Franja mañana de 9 a 13 hs y franja tarde de 14 a 18 hs. No abrimos domingos.',
  },
  {
    pregunta: '¿Necesito obra social?',
    respuesta:
      'No es obligatorio. Trabajamos con obras sociales principales y también ofrecemos planes de pago. Consultá por WhatsApp y te informamos.',
  },
  {
    pregunta: '¿Me mandan recordatorio?',
    respuesta:
      'Sí, te enviamos un recordatorio por WhatsApp antes de tu cita para que no se te pase.',
  },
  {
    pregunta: '¿Puedo cancelar o reprogramar?',
    respuesta:
      'Claro. Escribinos por WhatsApp con tu nombre y la fecha del turno, y lo reprogramamos sin costo.',
  },
] as const;