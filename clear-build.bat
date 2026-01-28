@echo off
echo Clearing all build artifacts...

REM Kill any Node processes
taskkill /F /IM node.exe 2>nul

REM Wait a moment
timeout /t 2 >nul

REM Delete build folders
if exist .next rmdir /s /q .next
if exist node_modules\.cache rmdir /s /q node_modules\.cache

echo.
echo Build cleared. Now run:
echo npm run dev
echo.
pause
