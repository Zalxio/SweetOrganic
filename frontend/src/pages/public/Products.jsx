import React from 'react';
import GetProduct from '../../crud-products/getProduct';
// import Header from '../../components/Header';
import { useNavigate } from "react-router-dom";

const Products = () => {

  const navigate = useNavigate();

  // function handleClick() {
  //   navigate("/Products");
  // }

  return (
    <div className="center-vertically">
      <h1>Produits</h1>
      <GetProduct />
      {/* <button type="button" onClick={handleClick}>
        Go create product
      </button> */}
    </div>
  );
};

export default Products;