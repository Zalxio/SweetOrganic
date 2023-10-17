// Home.jsx
import React from 'react';
import GetProduct from '../crud-products/getProduct';

const Home = () => {
  return (
    <div>
      <h1>Accueil</h1>
      <GetProduct />
    </div>
  );
};

export default Home;
