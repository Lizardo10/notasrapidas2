# 🚀 Inicio Rápido - Notas Rápidas PWA

Guía rápida para poner en marcha tu aplicación PWA.

## ⚡ Pasos Iniciales (5 minutos)

### 1. Instalar Dependencias

```bash
npm install
```

### 2. Crear Iconos PWA

**IMPORTANTE:** Debes crear los iconos antes de compilar.

**Opción A - Herramienta Online (Más Fácil - RECOMENDADA):**
1. Ve a [https://favicon.io/favicon-generator/](https://favicon.io/favicon-generator/)
2. Configura:
   - Texto: `N` o `Notas`
   - Fondo: `#4A90E2` (azul)
   - Texto: `#FFFFFF` (blanco)
3. Descarga el paquete
4. Copia `android-chrome-192x192.png` → `public/icon-192x192.png`
5. Copia `android-chrome-512x512.png` → `public/icon-512x512.png`

👉 **Ver `CREAR-ICONOS.md` para guía detallada**

**Opción B - Script de Node.js (Recomendado):**
```bash
npm run create-icons
```

**Opción C - Script PowerShell (Windows):**
```powershell
.\generate-icons.ps1
```

**Opción D - Script Batch (CMD):**
```cmd
.\generate-icons-temp.bat
```

**Opción C - Manual:**
Crea dos imágenes PNG en cualquier editor:
- `public/icon-192x192.png` (192x192 píxeles)
- `public/icon-512x512.png` (512x512 píxeles)

👉 Ver `INSTALL-ICONS.md` para más detalles.

### 3. Ejecutar en Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### 4. Compilar para Producción

```bash
npm run build
npm run preview
```

## 📦 Desplegar en Digital Ocean

### Resumen de Pasos:

1. **En el servidor:** Instalar dependencias (Node.js, PM2, Nginx, Certbot)
2. **Subir proyecto:** Usar Git o SCP
3. **Configurar PM2:** `pm2 start ecosystem.config.js`
4. **Configurar Nginx:** Proxy a puerto 3000
5. **Configurar DNS:** Apuntar noty.live a tu IP
6. **Configurar SSL:** `certbot --nginx -d noty.live -d www.noty.live`

👉 Ver `DEPLOYMENT.md` para la guía completa paso a paso.

## ✅ Checklist Antes de Desplegar

- [ ] Iconos creados (`icon-192x192.png` y `icon-512x512.png`)
- [ ] Proyecto compila sin errores (`npm run build`)
- [ ] Funciona en local (`npm run dev`)
- [ ] Servidor configurado (Node.js, PM2, Nginx)
- [ ] DNS configurado (noty.live → IP del servidor)
- [ ] SSL configurado (certbot)

## 🐛 Problemas Comunes

### Error: "Cannot find module '@vite-pwa/nuxt'"
```bash
npm install
```

### Error: Iconos no encontrados
Crea los iconos siguiendo `INSTALL-ICONS.md`

### Error al compilar
```bash
rm -rf .nuxt .output node_modules
npm install
npm run build
```

### La PWA no se instala
- Verifica que los iconos existan
- Accede desde HTTPS (requerido para PWA)
- Verifica en DevTools → Application → Manifest

## 📚 Documentación Completa

- **README.md** - Documentación general
- **DEPLOYMENT.md** - Guía completa de despliegue
- **DNS-SETUP.md** - Configuración DNS detallada
- **INSTALL-ICONS.md** - Guía para crear iconos

## 🎉 ¡Listo!

Una vez completados estos pasos, tendrás tu PWA funcionando en **https://noty.live**

---

**¿Necesitas ayuda?** Revisa la documentación en los archivos `.md` del proyecto.
