import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GetProduct from './crud-products/getProduct';
import CreateProduct from './crud-products/createProduct';
import DeleteProduct from './crud-products/deleteProduct';
import UpdateProduct from './crud-products/updateProduct';
import ProductList from './crud-products/ProductList';
import Home from './pages/Home';
import GetUser from './crud-users/getUser';
import CreateUser from './crud-users/createUser';
import DeleteUser from './crud-users/deleteUser';
import UpdateUser from './crud-users/updateUser';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/getProduct" element={<GetProduct />} />
        <Route path="/createProduct" element={<CreateProduct />} />
        <Route path="/deleteProduct" element={<DeleteProduct />} />
        <Route path="/updateProduct" element={<UpdateProduct />} />
        <Route path="/ProductList" element={<ProductList />} />
        <Route path="/getUser" element={<GetUser />} />
        <Route path="/createUser" element={<CreateUser />} />
        <Route path="/deleteUser" element={<DeleteUser />} />
        <Route path="/updateUser" element={<UpdateUser />} />
      </Routes>
    </Router>
  );
};

export default App;
