@echo off
chcp 65001 >nul
title PicMaster - Local Server

echo.
echo  ============================================================
echo         PicMaster SEO ^& Ad Gallery  v2.0
echo         Website + API Server + Chrome Extension
echo  ============================================================
echo.

:: التحقق من وجود node_modules
if not exist "node_modules" (
    echo  [1/3] Installing dependencies...
    echo        This may take a few minutes on first run.
    echo.
    npm install --legacy-peer-deps
    if errorlevel 1 (
        echo.
        echo  [ERROR] npm install failed!
        echo  Make sure Node.js is installed: https://nodejs.org
        pause
        exit /b 1
    )
    echo.
    echo  [OK] Dependencies installed successfully!
    echo.
)

echo  [2/3] Starting API Server on port 3001...
start "PicMaster API Server" cmd /k "node server.js"

echo  Waiting for API server to start...
timeout /t 2 /nobreak >nul

echo  [3/3] Starting Website on port 3000...
echo.
echo  ============================================================
echo   Website URL   :  http://localhost:3000
echo   API Server    :  http://localhost:3001
echo   API Test      :  http://localhost:3001/api/picmaster.php?action=test
echo  ------------------------------------------------------------
echo   Extension Dir :  extension\
echo   Chrome        :  chrome://extensions  (Developer mode ON)
echo  ------------------------------------------------------------
echo   Admin Panel   :  Type passphrase in search bar
echo   Get API Key   :  Admin Panel -> tab "مفتاح API الإضافة"
echo  ============================================================
echo.
echo  Press Ctrl+C to stop the website server.
echo  Close the other window to stop the API server.
echo.

node node_modules\vite\bin\vite.js --port 3000 --host 0.0.0.0

pause
