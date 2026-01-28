@echo off
echo.
echo SVG Marketplace - Image Upload Setup
echo ========================================
echo.

REM Check if .env.local exists
if exist .env.local (
    echo [OK] .env.local found
) else (
    echo [!] .env.local not found
    echo Creating .env.local from example...
    
    if exist .env.local.example (
        copy .env.local.example .env.local >nul
        echo [OK] Created .env.local
        echo.
        echo IMPORTANT: Edit .env.local and add your Cloudinary credentials:
        echo    - NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
        echo    - NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
        echo.
    ) else (
        echo [ERROR] .env.local.example not found!
        pause
        exit /b 1
    )
)

REM Check if node_modules exists
if exist node_modules (
    echo [OK] Dependencies installed
) else (
    echo Installing dependencies...
    call npm install
    echo [OK] Dependencies installed
)

echo.
echo Setup Checklist:
echo.
echo 1. Cloudinary Account
echo    - Create at https://cloudinary.com (free)
echo.
echo 2. Upload Preset
echo    - Settings -^> Upload -^> Add upload preset
echo    - Name: svg-marketplace
echo    - Mode: Unsigned
echo.
echo 3. Environment Variables
echo    - Edit .env.local with your credentials
echo.
echo 4. Test Upload
echo    - npm run dev
echo    - Visit http://localhost:3000/test-upload
echo.
echo Full guide: IMAGE_UPLOAD_GUIDE.md
echo.
echo Ready to start? Run: npm run dev
echo.
pause
