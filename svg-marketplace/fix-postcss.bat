@echo off
echo =============================
echo PostCSS Error Fix
echo =============================
echo.

echo Step 1: Clearing build cache...
if exist .next (
    rmdir /s /q .next
    echo   [OK] .next cache cleared
) else (
    echo   [OK] No cache to clear
)
echo.

echo Step 2: Reinstalling dependencies...
call npm install
echo.

echo Step 3: Testing build...
call npm run build
echo.

if %errorlevel% equ 0 (
    echo =============================
    echo [SUCCESS] Build completed!
    echo =============================
    echo.
    echo Next: Run 'npm run dev'
) else (
    echo =============================
    echo [FAILED] Build still failing
    echo =============================
    echo.
    echo Try these steps manually:
    echo 1. Delete node_modules folder
    echo 2. Run: npm install
    echo 3. Run: npm run build
)
echo.
pause
