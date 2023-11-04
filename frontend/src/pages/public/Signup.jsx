import React from 'react';
import { default as NewUser } from '../../crud-users/createUser';
import './signup.css'

const Signup = () => {
  return (
    <main className='signup'>
      <h1>Inscrivez-vous pour mieux profiter !</h1>
      <NewUser/>
    </main>
  );
};

export default Signup;