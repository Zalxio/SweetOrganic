import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Signin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // Ajoutez un état pour le rôle de l'utilisateur

  const navigate = useNavigate();

  async function handleLogin() {
    try {
      const response = await axios.post('/apiu/users/authenticate', { name, password });
  
      // Vérifiez si la requête a réussi
      if (response.status === 200) {
        setIsLoggedIn(true);
        setRole(response.data.role); // Mettez à jour le rôle avec la réponse de l'API
        if (response.data.role === 'admin') {
          // Stockez le rôle de l'utilisateur dans le stockage local ou une session
          localStorage.setItem('userRole', 'admin');
        }
      } else {
        alert('Échec de la connexion');
      }
    } catch (error) {
      alert('Échec de la connexion');
    }
  }

  /*function handleClick() {
    if (role === 'admin') { // Si l'utilisateur est un administrateur
      navigate("/dashboard/*"); // Redirigez vers le tableau de bord d'administration
    } else {
      navigate("/products");
    }
  }*/

  function handleClick() {
    if (role === 'admin' || localStorage.getItem('userRole') === 'admin') {
      navigate("/dashboard"); // Redirigez vers le tableau de bord d'administration
    } else if (role === 'user') {
      navigate("/products");
    }
  }

  const handleLogout = () => {
    // Supprimez le rôle de l'utilisateur du stockage local
    localStorage.removeItem('userRole');
    // Redirigez l'utilisateur vers la page de connexion
    navigate("/signin");
  }

  return (
    <div className="center-vertically">
      <h1>Connexion</h1>
      {isLoggedIn ? (
        <>
          {role === 'admin' ? (
            <>
              <button type="button" onClick={handleClick}>
                Go to Dashboard
              </button>
              <button type="button" onClick={handleLogout}>
                Déconnexion
              </button>
            </>
          ) : (
            <button type="button" onClick={handleClick}>
              Go to Products
            </button>
          )}
        </>
      ) : (
        <form>
          <main className='signup'>
            <label htmlFor="name">Nom </label>
            <input
              type="text"
              placeholder="Nom"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <label htmlFor="psw">Mot de passe</label>
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button type="button" onClick={handleLogin}>
              Login
            </button>
          </main>
        </form>
      )}
    </div>
  );  
};

export default Signin;