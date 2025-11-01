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
      HOST: '0.0.0.0',
      NITRO_PRESET: 'node-server'
    },
    error_file: './logs/pm2-error.log',
    out_file: './logs/pm2-out.log',
    log_file: './logs/pm2-combined.log',
    time: true,
    autorestart: true,
    max_memory_restart: '500M',
    watch: false,
    min_uptime: '10s',
    max_restarts: 5,
    listen_timeout: 10000,
    kill_timeout: 5000
  }]
}