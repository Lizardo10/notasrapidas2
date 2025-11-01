# Generador de Iconos PWA - PowerShell
# Ejecuta este script con: .\generate-icons.ps1

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "Generador de Iconos Temporales para PWA" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Verificar si ImageMagick está instalado
$magickPath = Get-Command magick -ErrorAction SilentlyContinue

if ($magickPath) {
    Write-Host "✅ ImageMagick encontrado. Generando iconos..." -ForegroundColor Green
    Write-Host ""
    
    # Crear directorio public si no existe
    if (-not (Test-Path "public")) {
        New-Item -ItemType Directory -Path "public" | Out-Null
    }
    
    # Generar icono 192x192
    Write-Host "Generando icono 192x192..." -ForegroundColor Yellow
    magick -size 192x192 xc:"#4A90E2" -pointsize 80 -fill white -gravity center -annotate +0+0 "N" "public\icon-192x192.png"
    
    # Generar icono 512x512
    Write-Host "Generando icono 512x512..." -ForegroundColor Yellow
    magick -size 512x512 xc:"#4A90E2" -pointsize 200 -fill white -gravity center -annotate +0+0 "N" "public\icon-512x512.png"
    
    Write-Host ""
    Write-Host "✅ Iconos generados exitosamente!" -ForegroundColor Green
    Write-Host "   - public\icon-192x192.png" -ForegroundColor Green
    Write-Host "   - public\icon-512x512.png" -ForegroundColor Green
} else {
    Write-Host "❌ ImageMagick no está instalado." -ForegroundColor Red
    Write-Host ""
    Write-Host "Opciones:" -ForegroundColor Yellow
    Write-Host "1. Instalar ImageMagick:" -ForegroundColor White
    Write-Host "   - Descarga desde: https://imagemagick.org/script/download.php" -ForegroundColor Gray
    Write-Host "   - O usa Chocolatey: choco install imagemagick" -ForegroundColor Gray
    Write-Host ""
    Write-Host "2. Usar herramienta online (MÁS FÁCIL):" -ForegroundColor White
    Write-Host "   - Ve a: https://favicon.io/favicon-generator/" -ForegroundColor Cyan
    Write-Host "   - Texto: N" -ForegroundColor Gray
    Write-Host "   - Color fondo: #4A90E2" -ForegroundColor Gray
    Write-Host "   - Color texto: #FFFFFF" -ForegroundColor Gray
    Write-Host "   - Descarga y guarda en public/" -ForegroundColor Gray
    Write-Host ""
    Write-Host "3. Ejecutar script de Node.js:" -ForegroundColor White
    Write-Host "   node create-icons.js" -ForegroundColor Cyan
    Write-Host ""
}

Write-Host "Presiona cualquier tecla para continuar..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
