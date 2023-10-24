// Home.jsx
import React from 'react';
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  function goToProducts() {
    navigate("/products");
  }

  function goToHome() {
    navigate("/");
  }

  return (
    <>
      <section className="mainError">
        <h1>Vous vous êtes perdu !</h1>
        <p>
          Il semblerait que le petit poucet ai oublié quelque bonbons. Rattrappez-le en pousuivant votre chemin plus loin :
        </p>
        <button type="button" onClick={goToProducts}>
          Découvrez nos produits
        </button>
        <button type="button" onClick={goToHome}>
          Sweet Organic
        </button>
      </section>
    </>
  );
};

export default Error;