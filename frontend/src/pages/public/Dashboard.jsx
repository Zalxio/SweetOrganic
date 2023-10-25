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
import { Route, Routes, Link } from 'react-router-dom';
import { ProductList, UserList, OrderList } from '../public/index';
import './dashboard.css';

const Dashboard = () => {
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
        {/* <Route path="*" element={<Error />} */}
      </Routes>
    </div>
  );
}

export default Dashboard;


