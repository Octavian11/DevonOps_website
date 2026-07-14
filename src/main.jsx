import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import App from './App.jsx';
import ComingSoonPage from './ComingSoonPage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<Navigate to="/pe" replace />} />
        <Route path="/pe/*" element={<App />} />
        <Route path="/msp" element={<ComingSoonPage />} />
        <Route path="/markets" element={<ComingSoonPage />} />
        <Route path="*" element={<Navigate to="/pe" replace />} />
      </Routes>
      <Analytics />
    </BrowserRouter>
  </StrictMode>
);
