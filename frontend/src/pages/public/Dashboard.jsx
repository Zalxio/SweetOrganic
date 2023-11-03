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

import React from 'react';
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
        {/* <Route path="*" element={<Error />} */}
      </Routes>
    </div>
  );
}

export default Dashboard;


