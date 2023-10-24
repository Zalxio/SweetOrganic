// Home.jsx
import React from 'react';
import { useNavigate } from "react-router-dom";
import './home.css';

const Home = () => {
  const navigate = useNavigate();

  function goToProducts() {
    navigate("/products");
  }

  function goToSignup() {
    navigate("/signup");
  }

  return (
    <>
      <section className="main">
        <h1>Faites-vous plaisir sans culpabiliser !</h1>
        <p>
          SweetOrganic vous offres une expérience inédite, incomtournable, et inoubliable. Vous pouvez enfin vous faire plaisir, à vous,
           mais aussi à votre corps, votre fammille, et votre environnement. Vegan, Bio, sans colorants, sans conservateur, ou sans arôme artificielle,
          trouvez le BON bonbons, au bon moments. 
        </p>
        <button type="button" onClick={goToProducts}>
          Découvrez nos produits
        </button>
        <button type="button" onClick={goToSignup}>
          Inscrivez-vous
        </button>
      </section>
    </>
  );
};

export default Home;
