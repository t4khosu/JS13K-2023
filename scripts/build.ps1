if (Test-Path "dist")
{
    Remove-Item "dist" -Recurse -Force
}

New-Item -ItemType Directory -Path "dist"

Copy-Item "bundle/index.html" -Destination "dist/index.html"
google-closure-compiler --js bundle/main.js --js_output_file dist/main.js --language_in=ECMASCRIPT_2021 -O SIMPLE

. "./scripts/compress.ps1" -Source "dist" -Target "game"