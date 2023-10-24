import React from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css'
import PublicRouter from './pages/public/PublicRouter';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/*' element={<PublicRouter/>}/>
      </Routes>
    </Router>
  );
};

export default App;
