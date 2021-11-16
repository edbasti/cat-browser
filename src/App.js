import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import CatDetails from './components/CatDetails';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/cat/:id" element={<CatDetails/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
