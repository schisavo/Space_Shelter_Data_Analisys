@echo off

echo ============================================
echo   SPACE SHELTER DATA ANALISYS SETUP
echo ============================================

echo.
echo [1/5] Entrando al backend...
cd backend

echo.
echo [2/5] Creando entorno virtual...
python -m venv .venv

echo.
echo [3/5] Activando entorno virtual...
call .venv\Scripts\activate

echo.
echo [4/5] Instalando dependencias Python...
pip install -r requirements.txt

echo.
echo Backend configurado correctamente.
echo.

cd ..

echo.
echo [5/5] Instalando dependencias Frontend...
cd frontend

call npm install

echo.
echo ============================================
echo   INSTALACION COMPLETADA
echo ============================================

echo.
echo BACKEND:
echo cd backend
echo .venv\Scripts\activate
echo uvicorn main:app --reload

echo.
echo FRONTEND:
echo cd frontend
echo npm run dev

pause