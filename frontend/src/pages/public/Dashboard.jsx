import React, { useState, useEffect } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import { ProductList, UserList, OrderList } from '../public/index';
import axios from 'axios';
import './dashboard.css';

const Dashboard = () => {
  const [userRole, setUserRole] = useState(""); // État pour stocker le rôle de l'utilisateur
  const navigate = useNavigate();

  useEffect(() => {
    async function checkUserRole() {
      try {
        const response = await axios.get('/apiu/users/authenticate');
        if (response.status === 200) {
          setUserRole(response.data.role);
        } else {
          // Redirigez l'utilisateur vers la page de connexion en cas d'échec de l'authentification
          navigate("/signin");
        }
      } catch (error) {
        // En cas d'erreur d'authentification, redirigez l'utilisateur vers la page de connexion
        navigate("/signin");
      }
    }

    checkUserRole();
  }, []);

  const handleLogout = () => {
    // Effectuez une action de déconnexion ici si nécessaire
    // Ensuite, redirigez l'utilisateur vers la page de connexion
    navigate("/signin");
  };

  /*if (!userRole) {
    // L'utilisateur n'est pas encore authentifié, affichez un message d'attente
    return (
      <div className="center-horizontally dashboard">
        <p>En cours d'authentification...</p>
      </div>
    );
  }*/

  /*if (userRole !== 'admin') {
    // L'utilisateur n'est pas administrateur, redirigez-le vers une autre page ou affichez un message d'erreur
    return (
      <div className="center-horizontally dashboard">
        <p>Vous n'avez pas la permission d'accéder à cette page.</p>
        <button onClick={handleLogout}>Déconnexion</button>
      </div>
    );
  }*/

  return (
    <div className="center-horizontally dashboard">
      <button onClick={handleLogout}>Déconnexion</button>
      <nav>
        <table>
          <tbody>
            <tr>
              <td>
                <Link to="/dashboard/productslist">Products List</Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link to="/dashboard/userlist">User List</Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link to="/dashboard/orderlist">Order List</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </nav>
      <Routes>
        <Route path="productslist" element={<ProductList />} />
        <Route path="userlist" element={<UserList />} />
        <Route path="orderlist" element={<OrderList />} />
      </Routes>
    </div>
  );
}

export default Dashboard;



// import React from 'react'
// import { Route, Routes } from "react-router-dom";
// import {ProductList, UserList, OrderList} from '../public/index';

// const Dashboard = () => {
//   return (
//     <Routes>
//         <Route>
//             <Route path='productslist' element={<ProductList />} />
//             <Route path='userlist' element={<UserList />} />
//             <Route path='orderlist' element={<OrderList />} />

//             {/* <Route path="*" element={<Error/>}/> */}
//         </Route>
//     </Routes>
//   )
// }

// export default Dashboard

/*import React from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import { ProductList, UserList, OrderList } from '../public/index';
import './dashboard.css';

const Dashboard = () => {
  const userRole = localStorage.getItem('userRole'); // Récupérez le rôle de l'utilisateur depuis le stockage local

  const navigate = useNavigate();

  const handleLogout = () => {
    // Supprimez le rôle de l'utilisateur du stockage local
    localStorage.removeItem('userRole');
    // Redirigez l'utilisateur vers la page de connexion
    navigate("/signin");
  };

  if (userRole !== 'admin') {
    return (
      <div className="center-horizontally dashboard">
        <p>Vous n'avez pas la permission d'accéder à cette page.</p>
      </div>
    );
  }

  return (
    <div className="center-horizontally dashboard">
      <button onClick={handleLogout}>Déconnexion</button>
      <nav>
        <table>
          <tbody>
            <tr>
              <td>
                <Link to="/dashboard/productslist">Products List</Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link to="/dashboard/userlist">User List</Link>
              </td>
            </tr>
            <tr>
              <td>
                <Link to="/dashboard/orderlist">Order List</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </nav>
      <Routes>
        <Route path="productslist" element={<ProductList />} />
        <Route path="userlist" element={<UserList />} />
        <Route path="orderlist" element={<OrderList />} />
      </Routes>
    </div>
  );
}

export default Dashboard;*/


