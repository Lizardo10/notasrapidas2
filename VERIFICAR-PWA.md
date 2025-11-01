# ✅ Verificar que la PWA Funciona Correctamente

## 📖 Guía Rápida

Para una guía detallada paso a paso, consulta: **[PROBAR-PWA.md](./PROBAR-PWA.md)**

## 🔍 Resumen de Verificación

### 1. Funcionalidades Básicas

1. **Crear una nota:** Escribe título y descripción, haz clic en "Agregar Nota"
2. **Editar una nota:** Haz clic en "✏️ Editar", modifica y guarda
3. **Eliminar una nota:** Haz clic en "🗑️ Eliminar" y confirma

### 2. Abrir DevTools

- Presiona **F12** (o `Ctrl + Shift + I` / `Cmd + Option + I`)
- Ve a la pestaña **"Application"**

### 3. Verificar Service Worker

- En el menú izquierdo: **Application → Service Workers**
- **✅ Debe mostrar:** "activated and is running"

### 4. Verificar Manifest

- En el menú izquierdo: **Application → Manifest**
- **✅ Debe mostrar:** Nombre, descripción, iconos, etc.

### 5. Probar Instalación

**Chrome/Edge Desktop:**
- Busca icono **"⊕"** en la barra de direcciones
- O menú → "Instalar Notas Rápidas"

**Android:**
- Menú (⋮) → "Agregar a pantalla de inicio"

**iOS:**
- Compartir (□↑) → "Agregar a pantalla de inicio"

### 6. Probar Offline

1. DevTools → **Network** → Activa **"Offline"**
2. Recarga la página (F5)
3. **✅ Debe funcionar sin conexión**

## 📋 Checklist Final

- [ ] Puedo crear, editar y eliminar notas
- [ ] Las notas persisten al recargar
- [ ] Service Worker está activo
- [ ] Manifest muestra información correcta
- [ ] Funciona offline
- [ ] Se puede instalar (o aparece la opción)

## 🚀 Probar en Producción

Para verificar exactamente como funcionará en producción:

```bash
# Compilar
npm run build

# Ejecutar preview
npm run preview
```

Abre `http://localhost:4173` y repite las verificaciones.

---

**📖 Para instrucciones detalladas, ver:** [PROBAR-PWA.md](./PROBAR-PWA.md)
