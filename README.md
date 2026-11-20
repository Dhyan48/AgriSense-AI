# AgriSense AI — Intelligent Agricultural Prediction & Decision Support System

Full-stack agricultural decision-support web application built with **React + TypeScript + Tailwind CSS**, **Python FastAPI**, **Scikit-learn**, and **PostgreSQL (SQLAlchemy)**[cite: 1, 2].

## Local Setup Instructions

### 1. Backend (FastAPI)
```bash
cd backend
python -m venv venv
# Windows PowerShell: .\venv\Scripts\Activate.ps1
pip install -r requirements.txt
# Copy ../.env.example to backend/.env and set DATABASE_URL and JWT_SECRET_KEY
uvicorn app.main:app --reload