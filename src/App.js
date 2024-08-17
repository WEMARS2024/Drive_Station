import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import CameraPage from './pages/Cameras.js';
import Sensors from './pages/Sensors.js';
import CanData from './pages/CanInfo.js';


function App() {


  return(
    <div className="App">
      <Routes>
        <Route index element={<CameraPage />} />
        <Route path="/cameras" element={<CameraPage />} />
        <Route path="/sensors" element={<Sensors />} />
        <Route path="/canInfo" element={<CanData />} />
      </Routes>
    </div>
  )
}

export default App;