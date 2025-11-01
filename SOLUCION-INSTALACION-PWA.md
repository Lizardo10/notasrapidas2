# 🔧 Solución: PWA No Se Puede Instalar

## 🔴 Problemas Comunes y Soluciones

### ❌ Problema 1: HTTPS Requerido (CRÍTICO)

**Las PWAs REQUIEREN HTTPS en producción** (excepto localhost).

**Si accedes a `noty.live` sin HTTPS**, Chrome/Android **NO mostrará la opción de instalación**.

**✅ Solución:**
- Asegúrate de acceder por **`https://noty.live`** (no `http://noty.live`)
- Verifica que el certificado SSL esté configurado correctamente en tu servidor
- Si no tienes SSL, instálalo con Certbot (ver `DEPLOYMENT.md`)

### ❌ Problema 2: Service Worker No Registrado

**Verificar en DevTools:**
1. Abre DevTools (F12)
2. Ve a **Application → Service Workers**
3. **❌ Si no aparece nada:** El Service Worker no se está registrando

**✅ Solución:**
- Verifica que el proyecto esté compilado: `npm run build`
- En producción, asegúrate de que los archivos del Service Worker se estén sirviendo
- Recarga la página varias veces (puede tardar en registrarse)

### ❌ Problema 3: Manifest No Válido o No Accesible

**Verificar en DevTools:**
1. DevTools → **Application → Manifest**
2. **❌ Si muestra errores:** El manifest tiene problemas

**✅ Solución:**
- Verifica que los iconos existan en `/public/`
- Verifica que el manifest esté bien formado
- El archivo `site.webmanifest` en `public/` puede interferir, elimínalo

### ❌ Problema 4: La App No Ha Sido Visitada Suficientemente

**Chrome requiere que la app haya sido visitada varias veces antes de mostrar la opción de instalación.**

**✅ Solución:**
- Visita `https://noty.live` varias veces
- Espera unos minutos
- Limpia la caché del navegador y vuelve a visitar

### ❌ Problema 5: Archivo site.webmanifest Interfiere

El archivo `public/site.webmanifest` puede estar interfiriendo con el manifest generado por `@vite-pwa/nuxt`.

**✅ Solución:**
- Elimina `public/site.webmanifest`
- El manifest se genera automáticamente por `@vite-pwa/nuxt`

---

## 🔍 Diagnóstico Paso a Paso

### Paso 1: Verificar HTTPS

1. Abre `https://noty.live` en tu navegador
2. Verifica que el candado 🔒 aparezca en la barra de direcciones
3. Si no aparece, **necesitas configurar SSL primero**

### Paso 2: Verificar Service Worker

1. Abre DevTools (F12)
2. Ve a **Application → Service Workers**
3. **Debe mostrar:**
   ```
   Service Workers
   └── https://noty.live
       └── Estado: "activated and is running"
   ```

4. **Si NO aparece:**
   - El proyecto puede no estar compilado
   - Los archivos del Service Worker pueden no estar en el servidor
   - Verifica que `npm run build` se ejecutó correctamente

### Paso 3: Verificar Manifest

1. DevTools → **Application → Manifest**
2. **Debe mostrar:**
   - Name: "Notas Rápidas - Noty.live"
   - Icons: Deben aparecer sin errores
   - Start URL: "/"
   - Display: "standalone"

3. **Si hay errores:**
   - Verifica que los iconos existan: `/icon-192x192.png` y `/icon-512x512.png`
   - Elimina `public/site.webmanifest` si existe

### Paso 4: Verificar Criterios de Instalación

Chrome muestra el prompt de instalación cuando:
- ✅ HTTPS activo
- ✅ Service Worker registrado y activo
- ✅ Manifest válido y accesible
- ✅ Íconos válidos (192x192 y 512x512)
- ✅ La app ha sido visitada al menos una vez
- ✅ `start_url` está en el scope del Service Worker

### Paso 5: Forzar Verificación

Si todo lo anterior está bien pero aún no aparece:

1. **Limpia la caché del navegador:**
   - Chrome: Ctrl + Shift + Delete → Limpiar datos de navegación
   - O DevTools → Application → Clear storage → Clear site data

2. **Desregistra Service Workers antiguos:**
   - DevTools → Application → Service Workers
   - Si hay Service Workers antiguos, haz clic en "Unregister"

3. **Recarga la página varias veces**

4. **Espera unos minutos** (Chrome puede tardar)

---

## ✅ Verificación Final en Chrome DevTools

### Verificar Criterios de Instalabilidad

1. Abre DevTools (F12)
2. Ve a **Application → Manifest**
3. En la parte superior, busca el mensaje sobre instalabilidad
4. Chrome mostrará si hay problemas

**Si dice "No issues detected":**
- La app cumple los criterios
- La opción de instalación debería aparecer pronto

**Si muestra errores:**
- Corrige los errores que aparecen

---

## 📱 Instalación Manual en Android

Si la opción automática no aparece, puedes forzar la instalación:

1. Abre Chrome en Android
2. Ve a `https://noty.live`
3. Menú (⋮) → **"Agregar a pantalla de inicio"**
4. Confirma

**Si esta opción tampoco aparece:**
- Verifica HTTPS
- Verifica Service Worker
- Verifica que no estés en modo incógnito

---

## 🚀 Pasos de Solución Rápida

### 1. En tu Servidor (Digital Ocean)

```bash
# 1. Asegúrate de que el proyecto está compilado
cd /var/www/notasrapidas2
npm run build

# 2. Verifica que Nginx esté sirviendo correctamente
sudo nginx -t

# 3. Reinicia Nginx
sudo systemctl restart nginx
```

### 2. Verificar SSL/Certificado

```bash
# Verificar que Certbot está configurado
sudo certbot certificates

# Si no hay certificado, crear uno
sudo certbot --nginx -d noty.live
```

### 3. Verificar Archivos en Servidor

```bash
# Los iconos deben estar en public/
ls -la /var/www/notasrapidas2/public/icon-*.png

# Debe mostrar:
# icon-192x192.png
# icon-512x512.png
```

### 4. Eliminar site.webmanifest (si existe)

```bash
# Si existe este archivo, elimínalo (interfiere)
rm /var/www/notasrapidas2/public/site.webmanifest
```

### 5. Reiniciar la Aplicación

```bash
cd /var/www/notasrapidas2
pm2 restart app-notas-pwa
pm2 logs app-notas-pwa
```

---

## 📋 Checklist de Verificación

Marca cada paso:

- [ ] Accedo por **HTTPS** (`https://noty.live`)
- [ ] El candado 🔒 aparece en la barra de direcciones
- [ ] Service Worker está registrado (DevTools → Application → Service Workers)
- [ ] Manifest muestra información correcta sin errores
- [ ] Los iconos existen y son accesibles (192x192 y 512x512)
- [ ] No existe `public/site.webmanifest` (o está eliminado)
- [ ] El proyecto está compilado (`npm run build`)
- [ ] Nginx está sirviendo los archivos correctamente
- [ ] He visitado la app varias veces
- [ ] He limpiado la caché del navegador

---

## 🎯 Solución Más Probable

Basado en tu caso, el problema **más probable** es uno de estos:

1. **No estás accediendo por HTTPS** → Cambia a `https://noty.live`
2. **El Service Worker no está registrado** → Compila el proyecto y verifica
3. **El archivo `site.webmanifest` está interfiriendo** → Elimínalo

---

## 💡 Consejo Final

**Para probar localmente antes de desplegar:**

```bash
# Compilar
npm run build

# Ejecutar preview
npm run preview
```

Abre `http://localhost:4173` y verifica que la instalación funcione allí. Si funciona en localhost, el problema es de configuración en el servidor (HTTPS, Service Worker, etc.).

---

**Si después de estos pasos aún no funciona, comparte:**
- Captura de pantalla de DevTools → Application → Manifest (qué errores muestra)
- Captura de pantalla de DevTools → Application → Service Workers (si aparece o no)
- Si accedes por HTTPS o HTTP
