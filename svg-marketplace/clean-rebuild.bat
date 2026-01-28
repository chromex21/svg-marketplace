@echo off
echo =============================
echo Complete Clean Rebuild
echo =============================
echo.

echo Step 1: Stopping any running processes...
taskkill /F /IM node.exe 2>nul
timeout /t 2 >nul
echo.

echo Step 2: Deleting build artifacts...
if exist .next (
    rmdir /s /q .next
    echo   [OK] .next deleted
)
if exist node_modules\.cache (
    rmdir /s /q node_modules\.cache
    echo   [OK] Cache deleted
)
echo.

echo Step 3: Reinstalling dependencies...
call npm install
echo.

echo Step 4: Building fresh...
call npm run build
echo.

if %errorlevel% equ 0 (
    echo =============================
    echo [SUCCESS] Clean build complete!
    echo =============================
    echo.
    echo Ready to run: npm run dev
) else (
    echo =============================
    echo [FAILED] Build error
    echo =============================
)
echo.
pause
