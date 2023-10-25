import React from "react";
import { Route, Routes } from "react-router-dom";
import {Layout, Home, Products, Signin, Signup} from '../public/index';
import Error from "../Error";
import Dashboard from "./Dashboard";


const PublicRouter = () => {
    return (
        <Routes>
            <Route element={<Layout/>}>
                <Route index element={<Home />} />
                <Route path='/products' element={<Products />} />
                <Route path='/signin/*' element={<Signin />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/dashboard/*' element={<Dashboard />} />

                <Route path="*" element={<Error/>}/>
            </Route>
        </Routes>
    );
};

export default PublicRouter;