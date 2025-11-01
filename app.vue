<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup>
useHead({
  title: 'Notas Rápidas - Noty.live | Gestiona tus notas de forma sencilla',
  meta: [
    { name: 'description', content: 'Notas Rápidas es una aplicación web progresiva (PWA) para gestionar tus notas. Crea, edita y organiza tus notas de forma sencilla. Funciona completamente offline en noty.live' },
    { name: 'keywords', content: 'notas, PWA, aplicación web, offline, noty.live, notas rápidas, app de notas' }
  ]
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  margin: 0;
  padding: 0;
}

body {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding: 20px;
}
</style>