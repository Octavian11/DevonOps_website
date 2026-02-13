import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import UnauthorizedPage from './UnauthorizedPage.jsx';
import ComingSoonPage from './ComingSoonPage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UnauthorizedPage />} />
        <Route path="/pe/*" element={<App />} />
        <Route path="/msp" element={<ComingSoonPage />} />
        <Route path="/markets" element={<ComingSoonPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
