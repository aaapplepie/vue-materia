import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import WaterDashboard from './pages/WaterDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/water" replace />} />
        <Route path="/water" element={<WaterDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
