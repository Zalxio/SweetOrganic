import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Signin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // Ajoutez un état pour le rôle de l'utilisateur

  const navigate = useNavigate();

  /*async function handleLogin() {
    try {
      const response = await axios.post('/apiu/users/authenticate', { name, password });
  
      // Vérifiez si la requête a réussi
      if (response.status === 200) {
        setIsLoggedIn(true);
        setRole(response.data.role); // Mettez à jour le rôle avec la réponse de l'API
        if (response.data.role === 'admin') {
          // Stockez le rôle de l'utilisateur dans le stockage local ou une session
          localStorage.setItem('userRole', 'admin');
        } else if (response.data.role === 'user') {
          localStorage.setItem('userRole', 'user');
        }
      } else {
        alert('Échec de la connexion');
      }
    } catch (error) {
      alert('Échec de la connexion');
    }
  }*/

  async function handleLogin() {
    try {
        const response = await axios.post('/apiu/users/authenticate', { name, password });
        console.log('Rôle de l\'utilisateur:', response.data.role);
        
        if (response.status === 200) {
            setIsLoggedIn(true);
            setRole(response.data.role);
        }
    } catch (error) {
      // Gérez les erreurs d'authentification ici
      if (error.response && error.response.status === 401) {
        setError("Nom d'utilisateur ou mot de passe incorrect");
      } else {
        setError("Une erreur s'est produite lors de l'authentification");
      }
    }
  }

  function handleClick() {
    if (role === 'admin') {
        navigate("/dashboard/*"); // Redirigez vers le tableau de bord d'administration
    } else if (role === 'user') {
        navigate("/products");
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
    setRole(""); // Réinitialisez le rôle
    navigate("/signin"); // Redirigez vers la page de connexion
  };

  return (
    <div className="center-vertically">
      <h1>Connexion</h1>
      {isLoggedIn ? (
        <>
          {role === 'admin' ? (
            <>
              <button type="button" onClick={handleClick}>
                Aller au tableau de bord
              </button>
              <button type="button" onClick={handleLogout}>
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <button type="button" onClick={handleClick}>
                Aller vers les produits
              </button>
              <button type="button" onClick={handleLogout}>
                Déconnexion
              </button>
            </>
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
              Se connecter
            </button>
          </main>
        </form>
      )}
    </div>
  );  
};

export default Signin;