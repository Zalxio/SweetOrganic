import React from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css'
import PublicRouter from './pages/public/PublicRouter';
import { Provider } from 'react-redux';
import store from './utils/store';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/*' element={<PublicRouter/>}/>
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
