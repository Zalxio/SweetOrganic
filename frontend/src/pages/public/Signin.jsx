// import React, { useState } from 'react';
// import GetProduct from '../../crud-products/getProduct';
// import Header from '../../components/Header';
// import { useNavigate } from "react-router-dom";
// import axios from 'axios';

// const Signin = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [name, setName] = useState("");
//   const [password, setPassword] = useState("");

//   const navigate = useNavigate();

//   async function handleLogin() {
//     try {
//       const response = await axios.post('/apiu/users/authenticate', { name, password });
  
//       // Vérifiez si la requête a réussi
//       if (response.status === 200) {
//         setIsLoggedIn(true);
//       } else {
//         alert('Échec de la connexion');
//       }
//     } catch (error) {
//       // Affichez l'erreur dans la console pour le débogage
//       console.error(error);
//       alert('Échec de la connexion');
//     }
//   }   

//   function handleClick() {
//     navigate("/createProduct");
//   }

//   return (
//     <div>
//       <h1>Connexion</h1>
//       {isLoggedIn ? (
//         <>
//           <GetProduct />
//           <button type="button" onClick={handleClick}>
//             Go create product
//           </button>
//         </>
//       ) : (
//         <>
//           <main className='signup'>
//             <form>
//               <input
//                 type="text"
//                 placeholder="Name"
//                 value={name}
//                 onChange={e => setName(e.target.value)}
//               />
//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={e => setPassword(e.target.value)}
//               />
//               <button type="button" onClick={handleLogin}>
//                 Login
//               </button>
//             </form>
//           </main>
//         </>
//       )}
//     </div>
//   );
// };

// export default Signin;

import React, { useState } from 'react';
import GetProduct from '../../crud-products/getProduct';
import Header from '../../components/Header';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Dashboard from './Dashboard';

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
      } else {
        alert('Échec de la connexion');
      }
    } catch (error) {
      alert('Échec de la connexion');
    }
  }

  function handleClick() {
    if (role === 'admin') { // Si l'utilisateur est un administrateur
      navigate("/dashboard/*"); // Redirigez vers le tableau de bord d'administration
      // <Dashboard />
    } else {
      navigate("/");
    }
  }

  return (
    <div>
      <h1>Connexion</h1>
      {isLoggedIn ? (
        <>
          <GetProduct />
          <button type="button" onClick={handleClick}>
            Go to {role === 'admin' ? <Dashboard /> : ''}
          </button>
        </>
      ) : (
        <>
          <form>
            <main className='signup'>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button type="button" onClick={handleLogin}>
                Login
              </button>
            </main>
          </form>
        </>
      )}
    </div>
  );
};

export default Signin;

