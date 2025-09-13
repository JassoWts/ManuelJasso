# Portafolio - José Manuel Jasso

Stack: Vue 3 + Vite + TailwindCSS + Vue Router + Vitest.

## Scripts
- `npm run dev` desarrollo
- `npm run build` build producción
- `npm run preview` previsualizar build
- `npm test` correr tests

## Estructura
```
src/
  main.js
  main.css
  router.js
  App.vue
  components/
  sections/
  data/
```

## Tailwind
Configurado en `tailwind.config.js` y `postcss.config.cjs`. Estilos base en `src/main.css`.

## Docker
Build multi-stage (Node -> Nginx). Archivo `Dockerfile` y `docker-compose.yml`.

### Desarrollo con hot reload (sin npm local)
```bash
docker compose up portfolio-dev
```
Abrir: http://localhost:5173

### Producción (build + Nginx)
```bash
docker compose up --build -d portfolio-prod
```
Abrir: http://localhost:8080

### Ejecutar con Docker directo (alternativa)
```bash
docker build -t portfolio-jm .
docker run -p 8080:80 portfolio-jm
```

## Desarrollo
```bash
npm install
npm run dev
```

## Tests
```bash
npm test
```

## Próximos pasos
- Añadir contenido real del CV
- SEO (Open Graph, favicon, meta keywords)
- Pre-carga de fuentes
- Mejorar accesibilidad (aria labels, skip link)
- Dark mode persistente leyendo localStorage al iniciar
- Componente de línea de tiempo para experiencia
- Deploy (Vercel / Netlify / Render / Docker VPS)

## Animaciones (Gato & Sandía)

El portafolio incluye insignias animadas (gato y sandía) y un fondo con partículas sutiles.

### Control global (Auto / On / Off)
- Toggle en el header con 3 estados:
  - Auto (🌀): Respeta `prefers-reduced-motion` del sistema. Si el usuario prefiere menos movimiento, se desactivan.
  - On (▶️): Fuerza animaciones activas.
  - Off (⏸️): Desactiva animaciones (JS y CSS) y pone `html[data-animations="off"]`.
- Preferencia persistida en `localStorage` (`animationMode`). También se sincroniza entre pestañas (evento `storage`).

### Utilidades Tailwind personalizadas
Definidas en `tailwind.config.js`:
```
animation: {
  'float': 'float 5s ease-in-out infinite',
  'float-lg': 'floatLg 6s ease-in-out infinite',
  'badge-pop': 'pop 350ms ease',
  'seed-jiggle': 'seedJiggle 400ms ease'
}
```
Keyframes: `float`, `floatLg`, `pop`, `seedJiggle`.

### Desactivar animaciones vía atributo
`html[data-animations="off"]` remueve animaciones y transiciones relevantes (ver `main.css`).

### Componentes
- `AnimatedCat.vue`
- `AnimatedWatermelon.vue`

Props importantes:
| Prop | Descripción |
|------|-------------|
| `size` | Tamaño (`normal` | `small`) |
| `animationsEnabled` | Control externo (internamente derivado del modo global) |
| `blinkInterval` (gato) | Intervalo base para parpadeo |
| `hoverBlink` (gato) | Acelera parpadeo al hover |
| `audioOnClick` | Sonido opcional al hacer click |

### Ejemplo de uso
```vue
<AnimatedCat size="small" :animationsEnabled="true" :blinkInterval="4000" />
<AnimatedWatermelon size="small" :animationsEnabled="true" />
```

### Accesibilidad
- Botón de toggle con `aria-label` dinámico.
- Respeto a `prefers-reduced-motion` en modo Auto.

### Próximas mejoras sugeridas
- Añadir transición suave al cambiar estados (auto→off) con un fade.
- Añadir sonidos diferenciados y control de volumen usuario.
- Exponer un evento global `animation-mode-changed` para integraciones futuras.
