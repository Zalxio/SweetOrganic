import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ProductList, UserList, OrderList } from '../public/index';
import { useNavigate, Link, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import './dashboard.css';

const Dashboard = () => {
  const { userRole } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    async function checkUserRole() {
      try {
        const response = await axios.get('/apiu/users/authenticate');
        if (response.status === 200) {
          // L'état de connexion est déjà géré avec Redux

          // Ajoutez une vérification du rôle de l'utilisateur ici
          if (userRole === 'admin') {
            // L'utilisateur a accès au tableau de bord
          } else {
            // L'utilisateur n'a pas le rôle approprié, redirigez-le
            navigate('/signin');
          }
        } else {
          navigate('/signin');
        }
      } catch (error) {
        navigate('/signin');
      }
    }

    checkUserRole();
  }, [navigate, userRole]);

  return (
    <div className="center-horizontally dashboard">
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
};

export default Dashboard;