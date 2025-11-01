# 🌐 Guía de Configuración DNS

Esta guía te ayudará a configurar los registros DNS para tu dominio **noty.live** en diferentes proveedores.

---

## 📋 Información Requerida

Antes de comenzar, necesitas:
- La **IP de tu Droplet** de Digital Ocean
- Acceso a tu panel de control del proveedor de dominio

---

## 🔧 Configuración por Proveedor

### Namecheap

1. **Iniciar sesión** en tu cuenta de Namecheap
2. Ir a **Domain List** → Click en **Manage** junto a `noty.live`
3. Ir a la pestaña **Advanced DNS**
4. **Eliminar registros antiguos** (si existen) que apunten a otros servicios
5. **Agregar nuevos registros:**

   ```
   Tipo: A Record
   Host: @
   Value: TU_IP_DROPLET
   TTL: Automatic (o 300 para desarrollo)
   
   Tipo: A Record
   Host: www
   Value: TU_IP_DROPLET
   TTL: Automatic (o 300 para desarrollo)
   ```

6. Click en **Save All Changes** (el checkmark verde)
7. Esperar 1-30 minutos para que se propague

**Nota:** Namecheap no permite configuración de servidores DNS personalizados para algunos TLDs. Si necesitas usar Cloudflare, puedes transferir el dominio.

---

### Cloudflare

1. **Agregar el sitio** en Cloudflare:
   - Ve a [dash.cloudflare.com](https://dash.cloudflare.com)
   - Click en **Add a Site**
   - Ingresa `noty.live`
   - Selecciona el plan (Free es suficiente)

2. **Cambiar Name Servers** en tu registrador:
   - Cloudflare te dará 2 Name Servers (ejemplo: `lola.ns.cloudflare.com`)
   - Ve a tu registrador (Namecheap, GoDaddy, etc.)
   - Cambia los Name Servers por los de Cloudflare
   - Espera hasta 24 horas para que se propague

3. **Configurar registros DNS** en Cloudflare:
   - Ve a **DNS** → **Records**
   - Click en **Add record**
   
   **Registro 1:**
   ```
   Type: A
   Name: @
   IPv4 address: TU_IP_DROPLET
   Proxy: DNS only (nube gris - desactivado)
   TTL: Auto
   ```
   
   **Registro 2:**
   ```
   Type: A
   Name: www
   IPv4 address: TU_IP_DROPLET
   Proxy: DNS only (nube gris - desactivado)
   TTL: Auto
   ```

4. **Importante:** Para SSL con Let's Encrypt, asegúrate de que el Proxy esté **desactivado** (nube gris). Actívalo después de configurar SSL si deseas usar Cloudflare SSL.

---

### GoDaddy

1. **Iniciar sesión** en GoDaddy
2. Ve a **My Products** → **DNS** (junto a tu dominio)
3. Scroll hasta **Records**
4. **Agregar registros:**

   ```
   Tipo: A
   Nombre: @
   Valor: TU_IP_DROPLET
   TTL: 600 segundos
   
   Tipo: A
   Nombre: www
   Valor: TU_IP_DROPLET
   TTL: 600 segundos
   ```

5. Guardar cambios
6. Esperar propagación (puede tardar hasta 24 horas)

---

### Google Domains

1. Acceder a [domains.google.com](https://domains.google.com)
2. Click en tu dominio `noty.live`
3. Ir a **DNS** en el menú lateral
4. Scroll hasta **Custom resource records**
5. **Agregar registros:**

   ```
   Tipo: A
   Nombre: @
   Datos: TU_IP_DROPLET
   TTL: 3600
   
   Tipo: A
   Nombre: www
   Datos: TU_IP_DROPLET
   TTL: 3600
   ```

6. Guardar

---

### Registro.es / DonDominio (España)

1. Iniciar sesión en tu panel
2. Ir a **Gestión de Dominios** → `noty.live` → **Zona DNS**
3. **Agregar registros:**

   ```
   Tipo: A
   Host: @ (o dejar en blanco)
   Punto: TU_IP_DROPLET
   TTL: 3600
   
   Tipo: A
   Host: www
   Punto: TU_IP_DROPLET
   TTL: 3600
   ```

4. Guardar cambios

---

## ✅ Verificar Configuración DNS

### Desde tu PC (Windows):

```cmd
ping noty.live
```

Debería mostrar tu IP del Droplet.

### Desde tu PC (Mac/Linux):

```bash
ping noty.live
# O mejor:
dig noty.live +short
```

### Desde línea de comandos (cualquier OS):

```bash
# Ver detalles completos
nslookup noty.live

# Ver solo la IP
nslookup noty.live | grep -A 1 "Name:" | tail -1
```

### Herramientas online:

- [whatsmydns.net](https://www.whatsmydns.net/#A/noty.live) - Ver propagación global
- [dnschecker.org](https://dnschecker.org/#A/noty.live) - Verificar desde múltiples ubicaciones

---

## ⏱️ Tiempos de Propagación

- **Típico:** 1-4 horas
- **Máximo:** 24-48 horas
- **Cache local:** Puede tardar más si tu ISP tiene cache DNS

### Acelerar propagación:

1. **Cambiar DNS local** a Google (8.8.8.8, 8.8.4.4) o Cloudflare (1.1.1.1)
2. **Limpiar cache DNS:**
   - Windows: `ipconfig /flushdns`
   - Mac/Linux: `sudo dscacheutil -flushcache` o `sudo systemd-resolve --flush-caches`
3. **Usar DNS público** para verificar (no tu ISP)

---

## 🐛 Problemas Comunes

### Problema: DNS no se propaga después de 24 horas

**Soluciones:**
1. Verifica que la IP del Droplet sea correcta
2. Verifica que los registros estén guardados correctamente
3. Elimina y vuelve a crear los registros
4. Contacta al soporte de tu proveedor de dominio

### Problema: `ping noty.live` no muestra la IP correcta

**Soluciones:**
1. Limpia el cache DNS local
2. Espera más tiempo (hasta 48 horas)
3. Verifica en [whatsmydns.net](https://www.whatsmydns.net) para ver si se propaga globalmente
4. Verifica que los registros DNS estén correctos

### Problema: www.noty.live funciona pero noty.live no

**Solución:** Asegúrate de tener el registro A con Host `@` (o vacío) además del registro `www`.

### Problema: Error al configurar SSL (Certbot)

**Soluciones:**
1. Verifica que el DNS esté completamente propagado
2. Verifica que puedas acceder a `http://noty.live` (no https aún)
3. Asegúrate de que el puerto 80 esté abierto: `ufw allow 80`
4. Si usas Cloudflare, desactiva el Proxy (nube gris)

---

## 📝 Notas Importantes

1. **No configures SSL hasta que el DNS esté propagado**
2. **El registro `@` apunta el dominio raíz** (noty.live)
3. **El registro `www` apunta el subdominio www** (www.noty.live)
4. **Los cambios DNS pueden tardar hasta 48 horas** en propagarse completamente
5. **Si usas Cloudflare**, el Proxy debe estar desactivado para Let's Encrypt

---

## 🔄 Después de Configurar DNS

Una vez que el DNS esté propagado:

1. **Verifica que funciona:**
   ```bash
   ping noty.live
   curl -I http://noty.live
   ```

2. **Configura SSL:**
   ```bash
   certbot --nginx -d noty.live -d www.noty.live
   ```

3. **Verifica HTTPS:**
   ```
   https://noty.live
   ```

---

## 📚 Recursos Adicionales

- [Guía de Digital Ocean sobre DNS](https://www.digitalocean.com/docs/networking/dns/)
- [Documentación de Cloudflare DNS](https://developers.cloudflare.com/dns/)
- [Let's Encrypt DNS Challenges](https://letsencrypt.org/docs/challenge-types/)

---

¿Necesitas ayuda? Consulta:
- **DEPLOYMENT.md** - Guía completa de despliegue
- **README.md** - Documentación general del proyecto
