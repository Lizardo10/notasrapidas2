# ⚠️ Solución: PM2 en Estado "errored"

## 🔴 Problema

PM2 entra en estado "errored" después de varios reinicios. Esto significa que la aplicación está crasheando.

## ✅ Solución Paso a Paso

### 1. Ver los logs para identificar el error

```bash
# Ver los últimos logs
pm2 logs app-notas-pwa --lines 50

# O ver logs de error específicos
pm2 logs app-notas-pwa --err --lines 50
```

### 2. Detener el proceso actual

```bash
pm2 stop app-notas-pwa
pm2 delete app-notas-pwa
```

### 3. Verificar que el proyecto esté compilado

```bash
cd /var/www/notasrapidas2

# Verificar que existe .output
ls -la .output

# Si no existe, compilar
npm run build
```

### 4. Probar ejecutar manualmente primero

```bash
# Probar que funciona
cd /var/www/notasrapidas2
node_modules/.bin/nuxt start

# Si funciona, presiona Ctrl+C y continúa
# Si no funciona, verás el error
```

### 5. Configuración correcta de PM2

Usa esta configuración en `ecosystem.config.js`:

```javascript
export default {
  apps: [{
    name: 'app-notas-pwa',
    script: 'node_modules/.bin/nuxt',
    args: 'start',
    cwd: '/var/www/notasrapidas2',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      HOST: '0.0.0.0'
    },
    error_file: './logs/pm2-error.log',
    out_file: './logs/pm2-out.log',
    log_file: './logs/pm2-combined.log',
    time: true,
    autorestart: true,
    max_memory_restart: '500M',
    watch: false,
    min_uptime: '10s',
    max_restarts: 5
  }]
}
```

### 6. Iniciar de nuevo

```bash
pm2 start ecosystem.config.js
pm2 logs app-notas-pwa
```

## 🔍 Diagnóstico Rápido

**Ejecuta estos comandos y comparte la salida:**

```bash
# Verificar Node.js
node --version
npm --version

# Verificar que está compilado
cd /var/www/notasrapidas2
ls -la .output

# Ver logs de PM2
pm2 logs app-notas-pwa --lines 20 --nostream

# Verificar puerto
netstat -tuln | grep 3000
```

## 🎯 Soluciones Comunes

### Error: "Cannot find module"
```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install --omit=dev
npm run build
```

### Error: "Port 3000 already in use"
```bash
# Ver qué está usando el puerto
lsof -i :3000
# O
netstat -tuln | grep 3000

# Matar el proceso o cambiar el puerto en ecosystem.config.js
```

### Error: "Build not found"
```bash
# Compilar el proyecto
npm run build
```

---

**Lo más importante:** Comparte los logs con `pm2 logs app-notas-pwa --lines 50` para ver el error exacto.

