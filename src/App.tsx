import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Landing } from './pages/Landing';
import { Builder } from './pages/Builder';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/SilkWorkUI" element={<Landing />} />
          <Route path="/SilkWorkUI/builder" element={<Builder />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;