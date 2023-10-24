import React from 'react';
import GetProduct from '../../crud-products/getProduct';
import Header from '../../components/Header';
import { useNavigate } from "react-router-dom";

const Signin = () => {

  const navigate = useNavigate();

  function handleClick() {
    navigate("/createProduct");
  }

  return (
    <div>
      <h1>Connexion</h1>
      <GetProduct />
      <button type="button" onClick={handleClick}>
        Go create product
      </button>
    </div>
  );
};

export default Signin;