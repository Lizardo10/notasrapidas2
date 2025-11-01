@echo off
echo ============================================
echo Generador de Iconos Temporales para PWA
echo ============================================
echo.
echo Este script creara iconos temporales basicos.
echo Para produccion, usa herramientas profesionales.
echo.
pause

REM Crear icono 192x192 con ImageMagick (si esta instalado)
where magick >nul 2>nul
if %ERRORLEVEL% == 0 (
    echo Generando icono 192x192...
    magick -size 192x192 xc:#4A90E2 -pointsize 80 -fill white -gravity center -annotate +0+0 "N" public\icon-192x192.png
    echo Generando icono 512x512...
    magick -size 512x512 xc:#4A90E2 -pointsize 200 -fill white -gravity center -annotate +0+0 "N" public\icon-512x512.png
    echo Iconos generados exitosamente!
) else (
    echo ImageMagick no esta instalado.
    echo.
    echo Opciones:
    echo 1. Instala ImageMagick desde: https://imagemagick.org/script/download.php
    echo 2. O crea los iconos manualmente usando:
    echo    - https://favicon.io/
    echo    - https://realfavicongenerator.net/
    echo    - Cualquier editor de imagenes
    echo.
    echo Los iconos deben ser:
    echo - public\icon-192x192.png (192x192 pixeles)
    echo - public\icon-512x512.png (512x512 pixeles)
)

echo.
echo Presiona cualquier tecla para continuar...
pause >nul
