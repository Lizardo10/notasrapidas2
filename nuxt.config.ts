export default defineNuxtConfig({
  compatibilityDate: '2024-01-01',
  devtools: { enabled: false },
  
  modules: [
    '@vite-pwa/nuxt'
  ],

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      id: '/',
      name: 'Notas Rápidas - Noty.live',
      short_name: 'Noty',
      description: 'Aplicación de notas rápida y personal. Crea, edita y gestiona tus notas de forma sencilla. Funciona completamente offline.',
      theme_color: '#4A90E2',
      background_color: '#667eea',
      display: 'standalone',
      orientation: 'portrait',
      scope: '/',
      start_url: '/',
      lang: 'es',
      dir: 'ltr',
      icons: [
        {
          src: '/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any'
        },
        {
          src: '/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'maskable'
        },
        {
          src: '/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any'
        },
        {
          src: '/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        }
      ],
      screenshots: [],
      categories: ['productivity', 'utilities'],
      iarc_rating_id: '',
      prefer_related_applications: false
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico,jpg,jpeg,woff,woff2}'],
      navigateFallback: '/index.html',
      navigateFallbackDenylist: [/^\/api\//, /^\/_/, /^\/admin\//],
      cleanupOutdatedCaches: true,
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        {
          urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'gstatic-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'images-cache',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 60 * 60 * 24 * 30
            }
          }
        },
        {
          urlPattern: ({ request }) => request.destination === 'document',
          handler: 'NetworkFirst',
          options: {
            cacheName: 'pages-cache',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 60 * 60 * 24
            }
          }
        }
      ]
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      type: 'module'
    },
    
    strategies: 'generateSW'
  },

  app: {
    head: {
      title: 'Notas Rápidas',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
        { name: 'description', content: 'Notas Rápidas - Aplicación web progresiva para gestionar tus notas. Crea, edita y organiza tus notas de forma sencilla. Funciona completamente offline en noty.live' },
        { name: 'keywords', content: 'notas, PWA, aplicación web, offline, noty.live, notas rápidas' },
        { name: 'author', content: 'Noty.live' },
        { name: 'theme-color', content: '#4A90E2' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
        { name: 'apple-mobile-web-app-title', content: 'Noty - Notas Rápidas' },
        { property: 'og:title', content: 'Notas Rápidas - Noty.live' },
        { property: 'og:description', content: 'Aplicación de notas rápida que funciona offline' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://noty.live' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: 'Notas Rápidas - Noty.live' },
        { name: 'twitter:description', content: 'Aplicación de notas rápida que funciona offline' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/icon-192x192.png' },
        { rel: 'manifest', href: '/manifest.webmanifest' }
      ]
    }
  },

  ssr: false
})
