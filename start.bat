@echo off
echo ==========================================
echo Starting SamadhanSetu Civic-Tech Platform
echo ==========================================
echo.
echo 1. Installing dependencies...
call npm install
echo.
echo 2. Launching local development server...
echo Open in browser: http://localhost:5173
echo.
call npm run dev
pause

