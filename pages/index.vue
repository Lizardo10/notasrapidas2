<template>
  <div class="notes-container">
    <h1>📝 Notas Rápidas</h1>
    <p class="subtitle">Tu aplicación de notas personal - Funciona offline</p>
    
    <div class="form-section">
      <input
        v-model="titulo"
        type="text"
        placeholder="Título de la nota..."
        class="title-input"
        maxlength="100"
      />
      <textarea 
        v-model="descripcion" 
        placeholder="Descripción de la nota..." 
        class="note-input"
        rows="4"
      ></textarea>
      <button 
        @click="agregar" 
        :disabled="!titulo.trim() || !descripcion.trim()"
        class="add-button"
      >
        ➕ Agregar Nota
      </button>
    </div>

    <div v-if="notas.length === 0" class="empty-state">
      <p>No hay notas aún. ¡Crea tu primera nota!</p>
    </div>

    <div v-else class="notes-list">
      <div 
        v-for="(nota, index) in notas" 
        :key="nota.id"
        class="note-card"
      >
        <div class="note-title">{{ nota.titulo }}</div>
        <div class="note-content">{{ nota.descripcion }}</div>
        <div class="note-actions">
          <button @click="editar(index)" class="btn-edit">✏️ Editar</button>
          <button @click="eliminar(index)" class="btn-delete">🗑️ Eliminar</button>
        </div>
        <div class="note-date">{{ formatDate(nota.fecha) }}</div>
      </div>
    </div>

    <div v-if="notas.length > 0" class="stats">
      Total: {{ notas.length }} nota{{ notas.length !== 1 ? 's' : '' }}
    </div>

    <!-- Diálogo de edición -->
    <div v-if="editando !== null" class="edit-dialog-overlay" @click="cancelarEdicion">
      <div class="edit-dialog" @click.stop>
        <h2>Editar Nota</h2>
        <input
          v-model="editTitulo"
          type="text"
          placeholder="Título..."
          class="title-input"
          maxlength="100"
        />
        <textarea 
          v-model="editDescripcion" 
          placeholder="Descripción..." 
          class="note-input"
          rows="4"
        ></textarea>
        <div class="edit-actions">
          <button @click="guardarEdicion" class="btn-save">💾 Guardar</button>
          <button @click="cancelarEdicion" class="btn-cancel">❌ Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const titulo = ref('')
const descripcion = ref('')
const notas = ref([])
const editando = ref(null)
const editTitulo = ref('')
const editDescripcion = ref('')

const cargar = () => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const guardado = localStorage.getItem('notas-rapidas')
      if (guardado) {
        notas.value = JSON.parse(guardado)
      }
    }
  } catch (error) {
    console.error('Error cargando notas:', error)
    notas.value = []
  }
}

const guardar = () => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('notas-rapidas', JSON.stringify(notas.value))
    }
  } catch (error) {
    console.error('Error guardando notas:', error)
  }
}

const agregar = () => {
  if (!titulo.value.trim() || !descripcion.value.trim()) return
  
  const nota = {
    id: Date.now().toString(),
    titulo: titulo.value.trim(),
    descripcion: descripcion.value.trim(),
    fecha: new Date().toISOString()
  }
  
  notas.value.unshift(nota)
  guardar()
  titulo.value = ''
  descripcion.value = ''
}

const editar = (index) => {
  const nota = notas.value[index]
  editando.value = index
  editTitulo.value = nota.titulo
  editDescripcion.value = nota.descripcion
}

const guardarEdicion = () => {
  if (editando.value !== null && editTitulo.value.trim() && editDescripcion.value.trim()) {
    const nota = notas.value[editando.value]
    nota.titulo = editTitulo.value.trim()
    nota.descripcion = editDescripcion.value.trim()
    nota.fecha = new Date().toISOString()
    guardar()
    cancelarEdicion()
  }
}

const cancelarEdicion = () => {
  editando.value = null
  editTitulo.value = ''
  editDescripcion.value = ''
}

const eliminar = (index) => {
  if (confirm('¿Estás seguro de eliminar esta nota?')) {
    notas.value.splice(index, 1)
    guardar()
    if (editando.value === index) {
      cancelarEdicion()
    }
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Hace un momento'
  if (diffMins < 60) return `Hace ${diffMins} minuto${diffMins > 1 ? 's' : ''}`
  if (diffHours < 24) return `Hace ${diffHours} hora${diffHours > 1 ? 's' : ''}`
  if (diffDays < 7) return `Hace ${diffDays} día${diffDays > 1 ? 's' : ''}`
  
  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short'
  })
}

onMounted(() => {
  console.log('✅ Notas Rápidas - PWA Cargada')
  cargar()
  console.log(`📝 Notas cargadas: ${notas.value.length}`)
})
</script>

<style scoped>
.notes-container {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  animation: fadeInUp 0.5s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 10px;
  font-size: 2.5rem;
  animation: slideInDown 0.6s ease-out;
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.subtitle {
  text-align: center;
  color: #666;
  margin-bottom: 30px;
  font-size: 0.95rem;
  animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.form-section {
  margin-bottom: 30px;
}

.title-input {
  width: 100%;
  padding: 15px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 600;
  font-family: inherit;
  margin-bottom: 10px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: #fff;
}

.title-input:focus {
  outline: none;
  border-color: #4A90E2;
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
  transform: translateY(-1px);
}

.note-input {
  width: 100%;
  padding: 15px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 16px;
  font-family: inherit;
  resize: vertical;
  margin-bottom: 10px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: #fff;
}

.note-input:focus {
  outline: none;
  border-color: #4A90E2;
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
  transform: translateY(-1px);
}

.add-button {
  width: 100%;
  padding: 15px;
  background: linear-gradient(135deg, #4A90E2 0%, #357ABD 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.add-button::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.add-button:active::before {
  width: 300px;
  height: 300px;
}

.add-button:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(74, 144, 226, 0.5);
}

.add-button:active:not(:disabled) {
  transform: translateY(-1px);
}

.add-button:disabled {
  background: #ccc;
  cursor: not-allowed;
  transform: none;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #999;
  font-size: 18px;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

.notes-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.note-card {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #e0e0e0;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease;
  animation: slideInRight 0.4s ease-out;
  animation-fill-mode: both;
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.note-card:nth-child(1) { animation-delay: 0.1s; }
.note-card:nth-child(2) { animation-delay: 0.2s; }
.note-card:nth-child(3) { animation-delay: 0.3s; }
.note-card:nth-child(4) { animation-delay: 0.4s; }
.note-card:nth-child(n+5) { animation-delay: 0.5s; }

.note-card:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.note-card:active {
  transform: translateY(-1px) scale(1.01);
}

.note-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 2px solid #e0e0e0;
  word-wrap: break-word;
}

.note-content {
  margin-bottom: 15px;
  white-space: pre-wrap;
  word-wrap: break-word;
  color: #555;
  font-size: 16px;
  line-height: 1.6;
}

.note-actions {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.btn-edit,
.btn-delete {
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.btn-edit::after,
.btn-delete::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  transform: translate(-50%, -50%);
  transition: width 0.4s, height 0.4s;
}

.btn-edit:active::after,
.btn-delete:active::after {
  width: 200px;
  height: 200px;
}

.btn-edit:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.4);
}

.btn-delete:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 4px 12px rgba(244, 67, 54, 0.4);
}

.btn-edit:active {
  transform: translateY(0) scale(1);
}

.btn-delete:active {
  transform: translateY(0) scale(1);
}

.btn-edit {
  background: #4CAF50;
  color: white;
}

.btn-edit:hover {
  background: #45a049;
}

.btn-delete {
  background: #f44336;
  color: white;
}

.btn-delete:hover {
  background: #da190b;
}

.note-date {
  font-size: 0.85rem;
  color: #999;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #e0e0e0;
}

.stats {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 2px solid #e0e0e0;
  text-align: center;
  color: #666;
  font-size: 0.9rem;
}

/* Diálogo de edición */
.edit-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-out;
  padding: 20px;
}

.edit-dialog {
  background: white;
  border-radius: 15px;
  padding: 30px;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideInUp 0.3s ease-out;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.edit-dialog h2 {
  margin-bottom: 20px;
  color: #333;
  font-size: 1.5rem;
}

.edit-dialog .title-input,
.edit-dialog .note-input {
  margin-bottom: 15px;
}

.edit-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.btn-save,
.btn-cancel {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-save {
  background: #4CAF50;
  color: white;
}

.btn-save:hover {
  background: #45a049;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.4);
}

.btn-cancel {
  background: #f44336;
  color: white;
}

.btn-cancel:hover {
  background: #da190b;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(244, 67, 54, 0.4);
}

@media (max-width: 600px) {
  .notes-container {
    padding: 20px;
  }
  
  h1 {
    font-size: 2rem;
  }

  .edit-dialog {
    padding: 20px;
  }
}
</style>