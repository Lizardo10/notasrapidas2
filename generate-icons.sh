#!/bin/bash

echo "============================================"
echo "Generador de Iconos Temporales para PWA"
echo "============================================"
echo ""
echo "Este script creará iconos temporales básicos."
echo "Para producción, usa herramientas profesionales."
echo ""

# Verificar si ImageMagick está instalado
if command -v magick &> /dev/null || command -v convert &> /dev/null; then
    echo "Generando icono 192x192..."
    magick -size 192x192 xc:#4A90E2 -pointsize 80 -fill white -gravity center -annotate +0+0 "N" public/icon-192x192.png 2>/dev/null || \
    convert -size 192x192 xc:#4A90E2 -pointsize 80 -fill white -gravity center -annotate +0+0 "N" public/icon-192x192.png
    
    echo "Generando icono 512x512..."
    magick -size 512x512 xc:#4A90E2 -pointsize 200 -fill white -gravity center -annotate +0+0 "N" public/icon-512x512.png 2>/dev/null || \
    convert -size 512x512 xc:#4A90E2 -pointsize 200 -fill white -gravity center -annotate +0+0 "N" public/icon-512x512.png
    
    echo "¡Iconos generados exitosamente!"
else
    echo "ImageMagick no está instalado."
    echo ""
    echo "Opciones:"
    echo "1. Instala ImageMagick: sudo apt install imagemagick (Ubuntu/Debian)"
    echo "2. O crea los iconos manualmente usando:"
    echo "   - https://favicon.io/"
    echo "   - https://realfavicongenerator.net/"
    echo "   - Cualquier editor de imágenes"
    echo ""
    echo "Los iconos deben ser:"
    echo "  - public/icon-192x192.png (192x192 píxeles)"
    echo "  - public/icon-512x512.png (512x512 píxeles)"
fi

echo ""
echo "Hecho!"
