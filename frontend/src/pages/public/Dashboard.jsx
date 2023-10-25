import React from 'react'
import { Route, Routes } from "react-router-dom";
import {ProductList, UserList, OrderList} from '../public/index';

const Dashboard = () => {
  return (
    <Routes>
        <Route>
            <Route path='productslist' element={<ProductList />} />
            <Route path='userlist' element={<UserList />} />
            <Route path='orderlist' element={<OrderList />} />

            <Route path="*" element={<Error/>}/>
        </Route>
    </Routes>
  )
}

export default Dashboard
