# 📋 Guía de Despliegue en Digital Ocean

Esta es una guía completa paso a paso para desplegar tu PWA "Notas Rápidas" en Digital Ocean.

---

## 📝 Resumen Ejecutivo

**Configuración:**
- Dominio: **noty.live**
- Servidor: Digital Ocean Droplet (Ubuntu 22.04)
- Stack: Nuxt.js + PM2 + Nginx + SSL

---

## 🚀 PASO 1: Configurar el Servidor

### 1.1 Conectarse al Droplet

```bash
ssh root@TU_IP_DROPLET
```

### 1.2 Instalar Dependencias del Sistema

```bash
# Actualizar sistema
apt update && apt upgrade -y

# Instalar Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Instalar PM2
npm install -g pm2

# Instalar Nginx
apt install -y nginx
systemctl start nginx
systemctl enable nginx

# Instalar Certbot para SSL
apt install -y certbot python3-certbot-nginx

# Instalar Git
apt install -y git

# Verificar instalaciones
node --version
npm --version
pm2 --version
nginx -v
```

---

## 🗂️ PASO 2: Subir el Proyecto

### Opción A: Usando Git (Recomendado)

**1. En tu PC local:**

```bash
# Asegúrate de estar en el directorio del proyecto
cd AppNotas2

# Inicializar repositorio (si no existe)
git init

# Agregar archivos
git add .

# Crear commit inicial
git commit -m "Versión inicial de Notas Rápidas PWA"
```

**2. Subir a GitHub (o tu repositorio Git):**

- Crea un repositorio en GitHub
- Agrega el remoto y sube:

```bash
git remote add origin https://github.com/TU_USUARIO/app-notas-pwa.git
git branch -M main
git push -u origin main
```

**3. En el servidor:**

```bash
cd /var/www

# Clonar repositorio
git clone https://github.com/TU_USUARIO/app-notas-pwa.git app-notas
cd app-notas

# Instalar dependencias de producción
npm install --production=false

# IMPORTANTE: Crear iconos antes de compilar
# Sube manualmente los iconos o crea placeholders:
# - public/icon-192x192.png
# - public/icon-512x512.png

# Compilar la aplicación
npm run build
```

### Opción B: Usando SCP (Sin Git)

**1. En tu PC local:**

```bash
cd AppNotas2

# Compilar primero
npm run build

# Crear archivo tar con archivos necesarios
tar -czf deploy.tar.gz \
  .nuxt \
  .output \
  package.json \
  package-lock.json \
  nuxt.config.ts \
  tsconfig.json \
  ecosystem.config.js \
  public \
  app.vue

# Subir al servidor
scp deploy.tar.gz root@TU_IP_DROPLET:/var/www/
```

**2. En el servidor:**

```bash
cd /var/www
mkdir -p app-notas
cd app-notas

# Extraer archivos
tar -xzf ../deploy.tar.gz

# Instalar dependencias
npm install --production=false
```

---

## ⚙️ PASO 3: Configurar PM2

```bash
# Asegúrate de estar en el directorio del proyecto
cd /var/www/app-notas

# Crear directorio de logs
mkdir -p logs

# Iniciar aplicación con PM2
pm2 start ecosystem.config.js

# Verificar que está corriendo
pm2 status

# Ver logs en tiempo real
pm2 logs app-notas-pwa

# Configurar auto-inicio al reiniciar el servidor
pm2 startup
# Copia y ejecuta el comando que te muestra PM2

# Guardar configuración actual
pm2 save
```

---

## 🌐 PASO 4: Configurar Nginx

```bash
# Crear configuración de sitio
nano /etc/nginx/sites-available/noty.live
```

Pega esta configuración:

```nginx
server {
    listen 80;
    server_name noty.live www.noty.live;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Cache para assets estáticos
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        proxy_pass http://localhost:3000;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Guarda y cierra (Ctrl+O, Enter, Ctrl+X)

```bash
# Habilitar sitio
ln -s /etc/nginx/sites-available/noty.live /etc/nginx/sites-enabled/

# Eliminar sitio por defecto
rm -f /etc/nginx/sites-enabled/default

# Verificar configuración
nginx -t

# Si todo está bien, reiniciar Nginx
systemctl restart nginx
```

---

## 📡 PASO 5: Configurar DNS

### Configuración en Namecheap:

1. Inicia sesión en Namecheap
2. Ve a **Domain List** → Click en **Manage** (noty.live)
3. Ve a la pestaña **Advanced DNS**
4. Agrega estos registros:

```
Tipo: A Record
Host: @
Value: TU_IP_DROPLET
TTL: Automatic

Tipo: A Record
Host: www
Value: TU_IP_DROPLET
TTL: Automatic
```

### Configuración en Cloudflare:

1. Agrega tu dominio en Cloudflare
2. Cambia los Name Servers en tu registrador
3. En Cloudflare, ve a **DNS** → **Records**
4. Agrega los registros A:

```
Type: A
Name: @
Content: TU_IP_DROPLET
Proxy: DNS only (nube gris)

Type: A
Name: www
Content: TU_IP_DROPLET
Proxy: DNS only (nube gris)
```

### Verificar DNS:

```bash
# Desde tu PC o servidor
ping noty.live
# Debe mostrar TU_IP_DROPLET

# O usar dig
dig noty.live +short
```

**IMPORTANTE:** La propagación DNS puede tardar de 1 a 24 horas.

---

## 🔒 PASO 6: Configurar SSL con Let's Encrypt

Una vez que el DNS esté propagado y puedas acceder a `http://noty.live`:

```bash
# En el servidor
certbot --nginx -d noty.live -d www.noty.live
```

Sigue las instrucciones:
- **Email:** Ingresa tu email
- **Términos:** Presiona 'A' para aceptar
- **Newsletter:** 'N' para no suscribirse
- **Redirigir HTTP a HTTPS:** Selecciona la opción 2 (Redirigir)

### Verificar certificado:

```bash
certbot certificates
```

### Probar renovación automática:

```bash
certbot renew --dry-run
```

El certificado se renovará automáticamente cada 90 días.

---

## 🧪 PASO 7: Verificar que Funciona

### 1. Abrir en el navegador

Visita: **https://noty.live**

### 2. Verificar logs

```bash
pm2 logs app-notas-pwa
```

### 3. Verificar estado de servicios

```bash
pm2 status
systemctl status nginx
```

### 4. Probar funcionalidad PWA

- Crear una nota
- Editar una nota
- Eliminar una nota
- Abrir DevTools → Application → Service Workers (debe estar registrado)
- Intentar instalar la app (ícono de instalación en la barra de direcciones)

---

## 🔄 Actualizar la Aplicación

### Si usas Git:

```bash
# En tu PC local
npm run build
git add .
git commit -m "Actualización"
git push

# En el servidor
cd /var/www/app-notas
git pull
npm install --production=false
npm run build
pm2 restart app-notas-pwa
```

### Si usas SCP:

```bash
# En tu PC local
npm run build
scp -r .nuxt .output root@TU_IP_DROPLET:/var/www/app-notas/

# En el servidor
cd /var/www/app-notas
pm2 restart app-notas-pwa
```

---

## 🛡️ PASO 8: Configurar Seguridad

### Firewall (UFW):

```bash
# Instalar UFW
apt install -y ufw

# Permitir conexiones necesarias
ufw allow OpenSSH
ufw allow 'Nginx Full'

# Activar firewall
ufw enable

# Verificar estado
ufw status
```

### Actualizaciones automáticas:

```bash
# Instalar unattended-upgrades
apt install -y unattended-upgrades

# Configurar
dpkg-reconfigure -plow unattended-upgrades
```

---

## 📱 PASO 9: Instalar la PWA

### En Android:

1. Abre https://noty.live en Chrome
2. Menú (⋮) → **"Agregar a pantalla de inicio"**
3. Confirma la instalación

### En iOS:

1. Abre https://noty.live en Safari
2. Botón Compartir (□↑)
3. **"Agregar a pantalla de inicio"**
4. Personaliza el nombre y confirma

### En Desktop (Chrome/Edge):

1. Abre https://noty.live
2. Busca el ícono de instalación (⊕) en la barra de direcciones
3. Haz clic y confirma

---

## 🐛 Solución de Problemas

### Problema: No puedo conectarme por SSH
**Solución:** Verifica que la IP sea correcta y que el Droplet esté encendido.

### Problema: Error al instalar Node.js
```bash
# Ejecutar de nuevo el comando
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs
```

### Problema: PM2 no inicia la aplicación
```bash
# Ver logs detallados
pm2 logs app-notas-pwa --lines 100

# Verificar que el puerto 3000 esté disponible
netstat -tuln | grep 3000
```

### Problema: Error 502 Bad Gateway
```bash
# Verificar que PM2 esté corriendo
pm2 status

# Si no está corriendo, iniciar
pm2 start ecosystem.config.js

# Verificar Nginx
systemctl status nginx
```

### Problema: DNS no funciona
- Esperar más tiempo (hasta 24 horas)
- Verificar registros DNS con `dig noty.live`
- Verificar que los registros A apunten a la IP correcta

### Problema: Certbot falla
- Verificar que el DNS esté propagado
- Verificar que el puerto 80 esté abierto: `ufw allow 80`
- Verificar que Nginx esté corriendo

### Problema: SSL no funciona
```bash
# Verificar certificado
certbot certificates

# Renovar si es necesario
certbot renew

# Reiniciar Nginx
systemctl restart nginx
```

### Ver logs detallados:

```bash
# Logs de PM2
pm2 logs app-notas-pwa --lines 100

# Logs de Nginx (error)
tail -f /var/log/nginx/error.log

# Logs de Nginx (acceso)
tail -f /var/log/nginx/access.log

# Logs del sistema
journalctl -u nginx -f
```

---

## 📊 Monitoreo

### Comandos útiles:

```bash
# Ver recursos del sistema
htop

# Espacio en disco
df -h

# Memoria
free -h

# Procesos de Node
pm2 monit

# Estado de servicios
systemctl status nginx
pm2 status
pm2 list
```

---

## ✅ Checklist Final

- [ ] Servidor configurado con Node.js 18 y PM2
- [ ] Proyecto subido al servidor
- [ ] Dependencias instaladas (`npm install`)
- [ ] Proyecto compilado (`npm run build`)
- [ ] Iconos PWA creados (icon-192x192.png y icon-512x512.png)
- [ ] PM2 corriendo la aplicación
- [ ] Nginx configurado y corriendo
- [ ] DNS configurado y propagado
- [ ] SSL instalado y funcionando
- [ ] App accesible en https://noty.live
- [ ] PWA instalable
- [ ] Service Worker funcionando
- [ ] Funcionalidad offline probada
- [ ] Firewall configurado
- [ ] SSL renovando automáticamente

---

## 🎉 ¡Listo!

Tu PWA "Notas Rápidas" está funcionando en producción en **https://noty.live**

**Próximos pasos opcionales:**
- Configurar backups automáticos
- Agregar monitoring (Uptime Robot, Pingdom)
- Configurar Google Analytics
- Implementar CI/CD con GitHub Actions
- Agregar notificaciones push
- Configurar CDN para assets estáticos

---

## 📚 Recursos Adicionales

- [Documentación de Nuxt.js](https://nuxt.com/docs)
- [Documentación de PM2](https://pm2.keymetrics.io/docs/usage/quick-start/)
- [Documentación de Nginx](https://nginx.org/en/docs/)
- [Let's Encrypt Documentation](https://letsencrypt.org/docs/)
- [PWA Documentation](https://web.dev/progressive-web-apps/)

---

¿Necesitas ayuda? Consulta:
- **README.md** - Documentación general del proyecto
- **DNS-SETUP.md** - Guía detallada de configuración DNS
