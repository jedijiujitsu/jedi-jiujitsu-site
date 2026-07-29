# preview.ps1 — starts a local dev server on http://localhost:8000 serving src/
# Prevents the file:// cross-origin issue that stops external .js/.css from loading.
#
# Usage:  .\preview.ps1

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

$srcPath = Join-Path $PSScriptRoot "src"
if (-not (Test-Path $srcPath)) {
    throw "ERROR: src\ directory not found. Are you in the repo root?"
}

# Prefer Python if available, fall back to Node
$python = Get-Command python -ErrorAction SilentlyContinue
$node   = Get-Command npx    -ErrorAction SilentlyContinue

if ($python) {
    Write-Host "Starting Python HTTP server on http://localhost:5500" -ForegroundColor Cyan
    Write-Host "Preview URL:  http://localhost:5500/homepage.html" -ForegroundColor Yellow
    Write-Host "Press Ctrl+C to stop." -ForegroundColor Gray
    Write-Host ""
    Set-Location $srcPath
    python -m http.server 8000
}
elseif ($node) {
    Write-Host "Starting npx serve on http://localhost:3000" -ForegroundColor Cyan
    Write-Host "Preview URL:  http://localhost:3000/homepage.html" -ForegroundColor Yellow
    Write-Host "Press Ctrl+C to stop." -ForegroundColor Gray
    Write-Host ""
    Set-Location $srcPath
    npx serve -p 3000
}
else {
    Write-Host "ERROR: Neither python nor npx found on your system." -ForegroundColor Red
    Write-Host ""
    Write-Host "Install one of these:" -ForegroundColor Yellow
    Write-Host "  Python:  https://www.python.org/downloads/  (or Microsoft Store)"
    Write-Host "  Node.js: https://nodejs.org/"
    exit 1
}
