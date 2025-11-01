# ⚠️ SOLUCIÓN: Actualizar Node.js a versión 20

## 🔴 Problema

Tu servidor tiene **Node.js 18**, pero Nuxt 3.20.0 requiere **Node.js 20.19.0** o superior.

## ✅ Solución Rápida

**Ejecuta estos comandos en tu servidor (SSH):**

```bash
# 1. Actualizar Node.js a versión 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# 2. Verificar que se actualizó
node --version
# Debe mostrar: v20.x.x (NO v18.x.x)

# 3. Limpiar instalación anterior
cd /var/www/notasrapidas2
rm -rf node_modules package-lock.json

# 4. Reinstalar dependencias
npm install --omit=dev

# 5. Compilar
npm run build
```

## 📋 Comandos Completos (Copia todo y ejecuta)

```bash
cd /var/www/notasrapidas2

# Actualizar Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Verificar
node --version
npm --version

# Limpiar
rm -rf node_modules package-lock.json

# Reinstalar
npm install --omit=dev

# Compilar
npm run build

# Si todo funciona, iniciar con PM2
pm2 start ecosystem.config.js
pm2 save
```

## ⚠️ Si Node.js 18 sigue apareciendo

```bash
# Eliminar completamente Node.js 18
apt remove nodejs npm -y
apt autoremove -y

# Instalar Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Verificar
which node
node --version
```

## ✅ Después de Actualizar

Una vez que tengas Node.js 20:

1. **Verifica:** `node --version` → debe ser v20.x.x
2. **Instala dependencias:** `npm install --omit=dev`
3. **Compila:** `npm run build`
4. **Inicia PM2:** `pm2 start ecosystem.config.js`

---

**IMPORTANTE:** El directorio en `ecosystem.config.js` ya está actualizado a `/var/www/notasrapidas2`

