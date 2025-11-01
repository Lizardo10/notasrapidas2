import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Función para crear un PNG básico usando datos base64
// Estos son iconos simples de color sólido con la letra "N"

// Icono 192x192 (versión simplificada - será un placeholder hasta que uses una herramienta)
const createSimpleIcon = (size, filename) => {
  // Crear un SVG simple que luego se puede convertir
  const svg = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#4A90E2"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${size * 0.4}" 
        font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">N</text>
</svg>`;

  const publicDir = path.join(__dirname, 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Guardar como SVG temporal (los navegadores modernos aceptan SVG en algunos casos)
  // Pero para PWA necesitamos PNG real, así que crearemos un mensaje
  const message = `# Icono ${filename}\n\nEste archivo es un placeholder.\n\nPara crear el icono real:\n1. Ve a https://favicon.io/favicon-generator/\n2. Crea un icono con texto "N" o "Notas"\n3. Descarga y reemplaza este archivo\n\nO usa cualquier editor de imágenes para crear:\n- ${filename} de ${size}x${size} píxeles\n- Fondo: #4A90E2\n- Texto: "N" en blanco`;
  
  console.log(`⚠️  No se puede crear PNG automáticamente sin librerías adicionales.`);
  console.log(`📝 Creando archivo de instrucciones...`);
  
  // En su lugar, crearemos un archivo HTML que el usuario puede abrir en el navegador para descargar
  const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <title>Generar Icono ${size}x${size}</title>
</head>
<body>
  <h1>Generar Icono ${filename}</h1>
  <canvas id="canvas" width="${size}" height="${size}"></canvas>
  <br><br>
  <button onclick="downloadIcon()">Descargar Icono</button>
  <script>
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    // Fondo azul
    ctx.fillStyle = '#4A90E2';
    ctx.fillRect(0, 0, ${size}, ${size});
    
    // Texto "N" en blanco
    ctx.fillStyle = 'white';
    ctx.font = 'bold ${size * 0.4}px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('N', ${size / 2}, ${size / 2});
    
    function downloadIcon() {
      canvas.toBlob(function(blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = '${filename}';
        a.click();
        URL.revokeObjectURL(url);
      }, 'image/png');
    }
  </script>
</body>
</html>`;

  const htmlPath = path.join(publicDir, `generate-${filename.replace('.png', '.html')}`);
  fs.writeFileSync(htmlPath, htmlContent);
  console.log(`✅ Creado: ${htmlPath}`);
  console.log(`   Abre este archivo en tu navegador para descargar el icono.`);
};

async function main() {
  console.log('🎨 Generador de Iconos PWA');
  console.log('==========================\n');

  // Intentar usar sharp si está disponible (más profesional)
  let sharp;
  try {
    const sharpModule = await import('sharp');
    sharp = sharpModule.default;
    
    console.log('✅ Usando Sharp para generar iconos...\n');
    
    const publicDir = path.join(__dirname, 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Crear icono 192x192
    await sharp({
      create: {
        width: 192,
        height: 192,
        channels: 4,
        background: { r: 74, g: 144, b: 226, alpha: 1 }
      }
    })
    .composite([{
      input: Buffer.from(`
        <svg width="192" height="192" xmlns="http://www.w3.org/2000/svg">
          <text x="96" y="96" font-family="Arial" font-size="80" font-weight="bold" 
                fill="white" text-anchor="middle" dominant-baseline="middle">N</text>
        </svg>
      `),
      top: 0,
      left: 0
    }])
    .png()
    .toFile(path.join(publicDir, 'icon-192x192.png'));
    
    console.log('✅ Creado: public/icon-192x192.png');
    
    // Crear icono 512x512
    await sharp({
      create: {
        width: 512,
        height: 512,
        channels: 4,
        background: { r: 74, g: 144, b: 226, alpha: 1 }
      }
    })
    .composite([{
      input: Buffer.from(`
        <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
          <text x="256" y="256" font-family="Arial" font-size="200" font-weight="bold" 
                fill="white" text-anchor="middle" dominant-baseline="middle">N</text>
        </svg>
      `),
      top: 0,
      left: 0
    }])
    .png()
    .toFile(path.join(publicDir, 'icon-512x512.png'));
    
    console.log('✅ Creado: public/icon-512x512.png');
    console.log('\n🎉 ¡Iconos generados exitosamente!');
    
  } catch (e) {
  // Si sharp no está instalado, crear los HTML generators
  console.log('ℹ️  Sharp no está instalado.');
  console.log('📝 Creando generadores HTML...\n');
  
  createSimpleIcon(192, 'icon-192x192.png');
  createSimpleIcon(512, 'icon-512x512.png');
  
    console.log('\n💡 Alternativa más fácil:');
    console.log('   1. Ve a https://favicon.io/favicon-generator/');
    console.log('   2. Texto: "N"');
    console.log('   3. Color de fondo: #4A90E2');
    console.log('   4. Color de texto: #FFFFFF');
    console.log('   5. Descarga y guarda como:');
    console.log('      - public/icon-192x192.png');
    console.log('      - public/icon-512x512.png');
  }
}

main().catch(console.error);
