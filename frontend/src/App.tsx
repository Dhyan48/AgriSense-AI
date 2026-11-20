import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { AuthProvider, ProtectedRoute } from './contexts/AuthContext';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { HistoryPage } from './pages/HistoryPage';
import { CropPage } from './pages/CropPage';
import { YieldPage } from './pages/YieldPage';
import { FertilizerPage } from './pages/FertilizerPage';

export function App() {
  return (
    <ThemeContextProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/history"
              element={
                <ProtectedRoute>
                  <HistoryPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/predict/crop"
              element={
                <ProtectedRoute>
                  <CropPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/predict/yield"
              element={
                <ProtectedRoute>
                  <YieldPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/predict/fertilizer"
              element={
                <ProtectedRoute>
                  <FertilizerPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeContextProvider>
  );
}

export default App;