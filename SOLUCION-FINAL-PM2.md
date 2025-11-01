# ✅ Solución Final: PM2 Error "Missing script: start"

## 🔴 Problema Identificado

El error es: **"Missing script: 'start'"** porque `package.json` no tenía el script `start`.

## ✅ Solución Aplicada

He agregado el script `start` a `package.json`. Ahora debes:

### 1. Detener el proceso actual

```bash
pm2 stop app-notas-pwa
pm2 delete app-notas-pwa
```

### 2. Actualizar package.json en el servidor

Asegúrate de que `package.json` en el servidor tenga el script `start`:

```bash
cd /var/www/notasrapidas2
cat package.json | grep -A 10 scripts
```

Debe mostrar:
```json
"scripts": {
  "build": "nuxt build",
  "dev": "nuxt dev",
  "start": "nuxt start",
  ...
}
```

### 3. Si no tiene el script, agrégalo

```bash
cd /var/www/notasrapidas2
nano package.json
```

Agrega `"start": "nuxt start",` en la sección scripts.

### 4. Compilar el proyecto (SI NO ESTÁ COMPILADO)

```bash
cd /var/www/notasrapidas2
npm run build
```

### 5. Iniciar con PM2 usando ecosystem.config.js

```bash
cd /var/www/notasrapidas2

# Opción 1: Usar ecosystem.config.js (RECOMENDADO)
pm2 start ecosystem.config.js

# Opción 2: Si ecosystem.config.js no funciona, usar directamente:
pm2 start npm --name "app-notas-pwa" -- start

# Ver logs
pm2 logs app-notas-pwa
```

### 6. Verificar que funciona

```bash
pm2 status
# Debe mostrar "online" (no "errored")

pm2 logs app-notas-pwa
# Debe mostrar que Nuxt está corriendo en el puerto 3000
```

## 📋 Comandos Completos (Copia y Pega)

```bash
cd /var/www/notasrapidas2

# 1. Detener proceso actual
pm2 stop app-notas-pwa
pm2 delete app-notas-pwa

# 2. Verificar/Agregar script start en package.json
# Edita package.json y agrega "start": "nuxt start" si no existe

# 3. Compilar (si no está compilado)
npm run build

# 4. Iniciar
pm2 start ecosystem.config.js

# 5. Ver logs
pm2 logs app-notas-pwa

# 6. Verificar estado
pm2 status
```

## ⚠️ Importante

El proyecto **DEBE estar compilado** antes de iniciar con PM2:

```bash
npm run build
# Esto crea el directorio .output con la aplicación compilada
```

Sin `.output`, la aplicación no puede iniciar en producción.

---

**Después de estos pasos, PM2 debería funcionar correctamente.**
