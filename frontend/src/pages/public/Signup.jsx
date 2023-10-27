import React from 'react';
import { useNavigate } from "react-router-dom";
import {default as NewUser} from '../../crud-users/createUser';
import './signup.css'

const Signup = () => {

  const navigate = useNavigate();

  function handleClick() {
    navigate("/createProduct");
  }

  return (
    <main className='signup'>
      <h1>Inscrivez-vous pour mieux profiter !</h1>
      <NewUser/>
    </main>
  );
};

export default Signup;