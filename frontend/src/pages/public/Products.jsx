import React from 'react';
import GetProduct from '../../crud-products/getProduct';
import Header from '../../components/Header';
import { useNavigate } from "react-router-dom";

const Products = () => {

  const navigate = useNavigate();

  function handleClick() {
    navigate("/Products");
  }

  return (
    <div>
      <h1>Products</h1>
      <GetProduct />
      <button type="button" onClick={handleClick}>
        Go create product
      </button>
    </div>
  );
};

export default Products;