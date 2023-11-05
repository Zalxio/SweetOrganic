import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../utils/userActions'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signin = () => {
  const { isLoggedIn, userRole } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('/apiu/users/authenticate', { name, password });

      if (response.status === 200) {
        dispatch(login(response.data.name, response.data.role)); 
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('name', response.data.name);
        localStorage.setItem('userRole', response.data.role);

        if (response.data.role === 'admin') {
          navigate('/dashboard/*');
        } else if (response.data.role === 'user') {
          navigate('/products');
        }
      } else {
        setError('Échec de la connexion');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Nom d'utilisateur ou mot de passe incorrect");
      } else {
        setError("Une erreur s'est produite lors de l'authentification");
      }
    }
  };

  return (
    <div className="center-vertically">
      <h1>Connexion</h1>
      {isLoggedIn ? (
        <>
          <div>
            {userRole === 'admin' ? (
              <button type="button" onClick={() => navigate('/dashboard/*')}>
                Aller au tableau de bord
              </button>
            ) : (
              <button type="button" onClick={() => navigate('/products')}>
                Aller vers les produits
              </button>
            )}
          </div>
          <div>
            <button type="button" onClick={() => navigate('/signin')}>
              Déconnexion
            </button>
          </div>
        </>
      ) : (
        <form>
          <main className="signup">
            <label htmlFor="name">Nom </label>
            <input
              type="text"
              placeholder="Nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="psw">Mot de passe</label>
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" onClick={handleLogin}>
              Se connecter
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </main>
        </form>
      )}
    </div>
  );
};

export default Signin;