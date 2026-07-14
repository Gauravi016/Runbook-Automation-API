@echo off

start "React Frontend" cmd /k "cd frontend && npm run dev"

cd backend
if not exist venv python -m venv venv
call venv\Scripts\activate.bat
pip install -q -r requirements.txt
start "Flask Backend" python run.py
timeout /t 3 /nobreak
start http://127.0.0.1:3000
pause



