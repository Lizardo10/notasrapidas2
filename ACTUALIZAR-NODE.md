# 🔄 Actualizar Node.js en el Servidor

## ⚠️ Problema Detectado

Tu servidor tiene Node.js 18, pero Nuxt 3.20.0 requiere Node.js 20.19.0 o superior.

## ✅ Solución: Actualizar a Node.js 20

Ejecuta estos comandos **en tu servidor** (en el terminal SSH):

```bash
# 1. Actualizar Node.js a versión 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# 2. Verificar la versión
node --version
# Debe mostrar: v20.x.x o superior

npm --version

# 3. Eliminar node_modules y package-lock.json antiguos
cd /var/www/notasrapidas2
rm -rf node_modules package-lock.json

# 4. Reinstalar dependencias
npm install --omit=dev

# 5. Compilar el proyecto
npm run build
```

## 🔧 Si ya tienes Node.js 18 instalado

### Opción A: Actualizar directamente

```bash
# Eliminar Node.js 18
apt remove nodejs -y
apt autoremove -y

# Instalar Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Verificar
node --version
```

### Opción B: Usar NVM (recomendado para desarrollo)

```bash
# Instalar NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Recargar shell
source ~/.bashrc

# Instalar Node.js 20
nvm install 20
nvm use 20
nvm alias default 20

# Verificar
node --version
```

## 📋 Comandos Completos (Copia y Pega)

```bash
# En tu servidor (SSH)
cd /var/www/notasrapidas2

# Actualizar Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Verificar versión
node --version
npm --version

# Limpiar e instalar
rm -rf node_modules package-lock.json
npm install --omit=dev

# Compilar
npm run build

# Iniciar con PM2
pm2 restart app-notas-pwa
```

## ✅ Verificación

Después de actualizar, verifica:

```bash
node --version  # Debe ser v20.x.x o v22.x.x
npm --version
npm run build   # Debe compilar sin errores
```

## ⚠️ Nota

Si tienes otros proyectos en el servidor que requieren Node.js 18, considera:
- Usar NVM para gestionar múltiples versiones
- O crear un Droplet separado para este proyecto

---

**Después de actualizar Node.js, continúa con la instalación normal.**

