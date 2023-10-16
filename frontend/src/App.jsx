import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GetProduct from './crud/getProduct';
import CreateProduct from './crud/createProduct';
import DeleteProduct from './crud/deleteProduct';
import UpdateProduct from './crud/updateProduct';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/getProduct" element={<GetProduct />} />
        <Route path="/createProduct" element={<CreateProduct />} />
        <Route path="/deleteProduct" element={<DeleteProduct />} />
        <Route path="/updateProduct" element={<UpdateProduct />} />
      </Routes>
    </Router>
  );
};

export default App;
