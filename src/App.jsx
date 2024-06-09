import React, { useState, useEffect } from 'react';
import HomeComponent from './components/homeComponent';
import ContactosComponent from './components/contactosComponent';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path='/contactos/:id' element={<ContactosComponent />} />
      </Routes>
    </Router>
  )
}

export default App;
