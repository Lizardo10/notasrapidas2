# 📝 Notas Rápidas - PWA

Aplicación Web Progresiva (PWA) desarrollada con Vue.js y Nuxt.js para crear, editar y gestionar notas de forma rápida. Funciona completamente offline y puede instalarse en dispositivos móviles y desktop.

## ✨ Características

- ✅ Crear, editar y eliminar notas
- ✅ Almacenamiento local (localStorage) - funciona sin conexión
- ✅ Instalable como PWA en dispositivos móviles y desktop
- ✅ Funciona completamente offline
- ✅ Interfaz moderna y responsive
- ✅ Service Worker para cacheo automático
- ✅ Diseño adaptado para móviles y desktop

## 🚀 Instalación Local

### Requisitos

- Node.js 18 o superior
- npm o yarn

### Pasos

1. **Clonar o descargar el proyecto**

```bash
cd AppNotas2
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Crear iconos de la aplicación**

Necesitas crear dos iconos PNG:
- `public/icon-192x192.png` (192x192 píxeles)
- `public/icon-512x512.png` (512x512 píxeles)

Puedes usar cualquier herramienta de diseño o generador de iconos online.

4. **Ejecutar en modo desarrollo**

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

5. **Compilar para producción**

```bash
npm run build
```

6. **Previsualizar versión de producción**

```bash
npm run preview
```

## 📱 Instalación como PWA

### En móvil (Android/iOS):

1. Abre la aplicación en tu navegador
2. **Android**: Menú (⋮) → "Agregar a pantalla de inicio"
3. **iOS**: Botón Compartir (□↑) → "Agregar a pantalla de inicio"

### En Desktop (Chrome/Edge):

1. Abre la aplicación en tu navegador
2. Busca el ícono de instalación (⊕) en la barra de direcciones
3. Haz clic y confirma la instalación

## 🛠️ Tecnologías Utilizadas

- **Vue.js 3** - Framework JavaScript progresivo
- **Nuxt.js 3** - Framework de Vue.js para aplicaciones universales
- **@vite-pwa/nuxt** - Módulo PWA para Nuxt con Vite
- **Workbox** - Librería para Service Workers
- **localStorage** - Almacenamiento local del navegador

## 📂 Estructura del Proyecto

```
AppNotas2/
├── pages/
│   └── index.vue          # Página principal con funcionalidad de notas
├── public/
│   ├── icon-192x192.png  # Icono PWA 192x192
│   ├── icon-512x512.png  # Icono PWA 512x512
│   └── favicon.ico       # Favicon
├── app.vue               # Componente raíz
├── nuxt.config.ts        # Configuración de Nuxt y PWA
├── package.json          # Dependencias del proyecto
├── ecosystem.config.js   # Configuración PM2 para producción
└── README.md            # Este archivo
```

## 🔧 Configuración

### Personalizar colores

Edita `nuxt.config.ts` para cambiar los colores del tema:

```typescript
theme_color: '#4A90E2',  // Color del tema
background_color: '#ffffff',  // Color de fondo
```

### Personalizar nombre de la app

Edita el `manifest` en `nuxt.config.ts`:

```typescript
name: 'Notas Rápidas',
short_name: 'Notas',
```

## 📦 Despliegue

Ver `DEPLOYMENT.md` para instrucciones detalladas de despliegue en Digital Ocean.

### Resumen rápido:

1. Compilar proyecto: `npm run build`
2. Subir al servidor
3. Configurar PM2: `pm2 start ecosystem.config.js`
4. Configurar Nginx como proxy reverso
5. Configurar SSL con Certbot

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso personal y educativo.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Haz un fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 🐛 Problemas Conocidos

- Los iconos deben ser creados manualmente antes de compilar
- El Service Worker puede requerir recarga forzada (Ctrl+Shift+R) después de actualizaciones

## 📞 Soporte

Para problemas o preguntas, crea un issue en el repositorio.

---

Desarrollado con ❤️ usando Vue.js y Nuxt.js
