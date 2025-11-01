# 🧪 Guía Completa: Probar la PWA "Notas Rápidas"

Esta guía te muestra paso a paso cómo verificar que tu PWA funciona correctamente antes de desplegarla.

---

## 🎯 Paso 1: Iniciar la Aplicación en Modo Desarrollo

Primero, asegúrate de que la aplicación esté corriendo:

```bash
npm run dev
```

Deberías ver algo como:
```
➜ Local:    http://localhost:3001/
```

**Abre tu navegador y ve a:** `http://localhost:3001`

---

## ✅ Paso 2: Probar Funcionalidades Básicas

### 2.1 Crear una Nota

1. En la aplicación, verás un campo **"Título de la nota..."** y un área de texto **"Descripción de la nota aquí..."**
2. Escribe un título, por ejemplo: `"Mi primera nota"`
3. Escribe una descripción, por ejemplo: `"Esta es una nota de prueba para verificar que funciona"`
4. Haz clic en el botón **"➕ Agregar Nota"**
5. **Verifica:** La nota debería aparecer en la lista debajo del formulario

### 2.2 Editar una Nota

1. En la lista de notas, busca la nota que acabas de crear
2. Haz clic en el botón **"✏️ Editar"**
3. **Se abrirá un modal** con los campos de título y descripción
4. Modifica el título o la descripción
5. Haz clic en **"💾 Guardar"**
6. **Verifica:** La nota debería actualizarse con los nuevos datos

### 2.3 Eliminar una Nota

1. En la lista de notas, busca la nota que quieres eliminar
2. Haz clic en el botón **"🗑️ Eliminar"**
3. **Aparecerá un mensaje de confirmación:** "¿Estás seguro de eliminar esta nota?"
4. Haz clic en **"Aceptar"** (o "OK")
5. **Verifica:** La nota debería desaparecer de la lista

### 2.4 Probar Persistencia (localStorage)

1. Crea varias notas
2. **Cierra la pestaña del navegador completamente**
3. **Vuelve a abrir** `http://localhost:3001`
4. **Verifica:** Todas las notas que creaste deberían seguir ahí ✅

---

## 🔧 Paso 3: Abrir DevTools (Herramientas de Desarrollador)

### 3.1 Abrir DevTools

**Métodos:**
- Presiona **`F12`** en tu teclado
- O haz clic derecho en la página → **"Inspeccionar"** (o "Inspect")
- O en Chrome/Edge: **`Ctrl + Shift + I`** (Windows/Linux) / **`Cmd + Option + I`** (Mac)

### 3.2 Ir a la Pestaña "Application"

En DevTools, verás varias pestañas en la parte superior:
- Elements
- Console
- Sources
- Network
- **Application** ← Haz clic aquí
- etc.

---

## 🔍 Paso 4: Verificar Service Worker

### 4.1 Navegar a Service Workers

En la pestaña **Application**, en el menú izquierdo:
1. Expande **"Service Workers"**
2. Haz clic en **"Service Workers"**

### 4.2 Verificar Estado

Deberías ver algo como:

```
Service Workers
├── http://localhost:3001
    └── Estado: "activated and is running"
    └── Source: @vite-pwa/nuxt
```

**✅ Si ves "activated and is running":** ¡Perfecto! El Service Worker está funcionando.

**❌ Si no ves nada o dice "No service workers":**
- Puede ser que el Service Worker no se haya registrado aún
- **Solución:** En modo desarrollo, el Service Worker puede tardar unos segundos en registrarse
- Recarga la página (F5) y vuelve a verificar

---

## 📱 Paso 5: Verificar Manifest

### 5.1 Ir a Manifest

En el menú izquierdo de **Application**, busca:
- **"Manifest"** (está en la misma lista que Service Workers)

### 5.2 Verificar Información

Haz clic en **"Manifest"** y deberías ver:

**✅ Debe mostrar:**
- **Name:** "Notas Rápidas - Noty.live"
- **Short name:** "Noty"
- **Description:** "Aplicación de notas rápida y personal..."
- **Start URL:** "/"
- **Display:** "standalone"
- **Icons:** Deberían aparecer las imágenes (icon-192x192.png, icon-512x512.png)

**⚠️ Nota:** En modo desarrollo, puede que algunos detalles del manifest no se muestren completamente. Esto es normal. El manifest completo se genera cuando compilas para producción (`npm run build`).

---

## 📦 Paso 6: Intentar Instalar la App

### 6.1 En Chrome/Edge (Desktop)

**Método 1: Icono en la Barra de Direcciones**
1. Busca un icono **"⊕"** (más) o **"Instalar"** en la barra de direcciones (a la derecha de la URL)
2. Haz clic en él
3. Debería aparecer un popup: **"Instalar Notas Rápidas"**
4. Haz clic en **"Instalar"**

**Método 2: Menú del Navegador**
1. Haz clic en el icono de **menú** (⋮) en la esquina superior derecha
2. Busca la opción **"Instalar Notas Rápidas"** o **"Instalar aplicación"**
3. Haz clic en ella

**✅ Si funciona:** Se instalará como una aplicación de escritorio y podrás abrirla como una app independiente.

### 6.2 En Android (Chrome)

1. Abre Chrome en tu teléfono
2. Ve a `http://TU_IP:3001` (tu IP local, no localhost)
3. Toca el menú (⋮) en Chrome
4. Selecciona **"Agregar a pantalla de inicio"** o **"Install app"**
5. Confirma la instalación

### 6.3 En iOS (Safari)

1. Abre Safari en tu iPhone/iPad
2. Ve a `http://TU_IP:3001`
3. Toca el botón de **compartir** (□↑)
4. Desplázate y toca **"Agregar a pantalla de inicio"**
5. Confirma

**⚠️ Nota Importante:** En modo desarrollo (`npm run dev`), la opción de instalación puede no aparecer inmediatamente. Esto es normal. La instalación funciona mejor cuando la app está compilada para producción (`npm run build` + `npm run preview`).

---

## 🌐 Paso 7: Probar Modo Offline

### 7.1 Activar Modo Offline en DevTools

1. En DevTools, ve a la pestaña **"Network"** (Red)
2. En la parte superior, busca un checkbox o dropdown que diga **"Offline"**
3. **Márcalo** (activa el modo offline)

### 7.2 Probar la Aplicación Offline

1. Con el modo offline activado, **recarga la página** (F5)
2. **✅ Si funciona:** La aplicación debería cargar normalmente, mostrando tus notas
3. Intenta **crear una nueva nota** estando offline
4. Intenta **editar una nota** estando offline
5. Intenta **eliminar una nota** estando offline

**✅ Si todo funciona offline:** ¡Tu PWA está funcionando correctamente!

### 7.3 Desactivar Modo Offline

1. Ve a DevTools → **Network**
2. **Desmarca** el checkbox "Offline"
3. Recarga la página

---

## 📋 Checklist Completo

Marca cada paso cuando lo completes:

- [ ] ✅ La aplicación carga correctamente en el navegador
- [ ] ✅ Puedo crear una nota
- [ ] ✅ Puedo editar una nota
- [ ] ✅ Puedo eliminar una nota
- [ ] ✅ Las notas se guardan y persisten al recargar la página
- [ ] ✅ DevTools está abierto (F12)
- [ ] ✅ Service Worker está registrado y activo
- [ ] ✅ Manifest muestra la información correcta
- [ ] ✅ La aplicación funciona en modo offline
- [ ] ✅ Puedo instalar la aplicación (o al menos aparece la opción)

---

## 🚀 Probar en Modo Producción (Opcional pero Recomendado)

Para verificar que todo funciona exactamente como en producción:

### 1. Compilar para Producción

```bash
# Detén el servidor dev (Ctrl+C si está corriendo)
npm run build
```

Esto creará los archivos optimizados en `.output/`

### 2. Ejecutar en Modo Preview

```bash
npm run preview
```

Abre `http://localhost:4173` (o el puerto que indique)

### 3. Repetir Todas las Pruebas

Repite los pasos 2-7 anteriores pero en `http://localhost:4173`

**✅ En modo producción:**
- El manifest debería estar completo
- La instalación debería funcionar mejor
- El Service Worker debería estar más optimizado

---

## 🐛 Solución de Problemas

### ❌ Service Worker no aparece

**Solución:**
- Asegúrate de que `@vite-pwa/nuxt` está instalado: `npm install`
- Recarga la página varias veces (a veces tarda en registrarse)
- En desarrollo, el Service Worker puede tardar unos segundos

### ❌ No puedo instalar la app

**Solución:**
- En desarrollo, la instalación puede no estar disponible
- Compila para producción: `npm run build` → `npm run preview`
- Asegúrate de acceder por HTTPS (en producción) o localhost (en desarrollo)
- Algunos navegadores requieren que la app haya sido visitada varias veces antes de mostrar la opción de instalación

### ❌ No funciona offline

**Solución:**
- Verifica que el Service Worker esté registrado
- Recarga la página después de activar offline
- Limpia la caché y vuelve a intentar

### ❌ Las notas desaparecen

**Solución:**
- Verifica en DevTools → Application → Local Storage
- Debe haber una clave `notas-rapidas`
- Si no está, puede que localStorage no esté funcionando
- Asegúrate de no estar en modo incógnito

---

## ✅ Cuando Todo Esté Listo

Una vez que hayas verificado que:
- ✅ Las funcionalidades básicas funcionan
- ✅ El Service Worker está activo
- ✅ Funciona offline
- ✅ El manifest está correcto

**¡Tu PWA está lista para desplegar!** 🎉

Sigue las instrucciones en `DEPLOYMENT.md` para subirla a Digital Ocean.

---

**💡 Consejo:** Prueba la aplicación en diferentes navegadores (Chrome, Edge, Firefox) y en dispositivos móviles antes de desplegar.
