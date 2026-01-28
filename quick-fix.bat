@echo off
echo =============================
echo SVG Marketplace - Quick Fix
echo =============================
echo.

REM Fix 1: Check Node version
echo Checking Node.js version...
node --version
echo.

REM Fix 2: Install dependencies
echo Installing dependencies...
call npm install
echo.

REM Fix 3: Check environment file
echo Checking environment configuration...
if exist .env.local (
    echo   [OK] .env.local exists
    findstr "your_supabase_url_here" .env.local >nul
    if %errorlevel% equ 0 (
        echo   [WARNING] Environment variables not configured!
        echo   Please edit .env.local with your Supabase and Cloudinary keys
    ) else (
        echo   [OK] Environment variables appear configured
    )
) else (
    echo   [WARNING] .env.local not found!
    echo   Copying from template...
    copy .env.local.example .env.local
    echo   Please edit .env.local with your keys
)
echo.

REM Fix 4: Type check
echo Running TypeScript check...
call npx tsc --noEmit
echo.

REM Fix 5: Build check
echo Testing production build...
call npm run build
echo.

echo =============================
echo [OK] Quick fix complete!
echo.
echo Next Steps:
echo 1. Configure .env.local if not done
echo 2. Run: npm run dev
echo 3. Open: http://localhost:3000
echo 4. Follow TESTING_GUIDE.md
echo.
pause
