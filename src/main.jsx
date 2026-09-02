import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PhotographyGallery from './pages/PhotographyGallery.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/gallery" element={<PhotographyGallery />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
