import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import BreweryDetail from './components/BreweryDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <h1>🍺 Brewery Explorer</h1>
          <p>Discover breweries across the United States</p>
        </header>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/brewery/:id" element={<BreweryDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;