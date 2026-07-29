# DentFlow

Landing page para clínica dental con sistema de reserva de turnos vía WhatsApp.

## 🦷 Características

- **Landing page responsive** con secciones de marketing
- **Formulario de turnos** con selección de especialidad, fecha y horario
- **Integración con WhatsApp** para confirmación de citas
- **Animaciones suaves** con Framer Motion
- **SEO optimizado** con sitemap y robots.txt
- **Diseño moderno** con Tailwind CSS v4

## 🛠️ Tech Stack

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** (animaciones)
- **Lucide Icons**

## 🚀 Comenzar

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build de producción
npm run build

# Iniciar servidor de producción
npm start
```

## 📁 Estructura

```
src/
├── app/              # App Router (páginas, layout, globals)
├── components/
│   ├── marketing/    # Componentes de la landing page
│   ├── motion/       # Componentes de animación
│   └── ui/           # Componentes de UI (turno-form, etc.)
├── lib/              # Utilidades, constantes, helpers
└── actions/          # Server Actions
```

## 📝 Licencia

MIT