import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './createUser.css';

const createUser = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  /*useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get('/apiu/users');
    setUsers(response.data);
  };*/

  const createUser = async () => {
    await axios.post('/apiu/users', { name, lastname, username, password});
    //fetchUsers();
  };

  return (
    <>
      <form onSubmit={createUser}>
        <label htmlFor="name">Nom </label>
        <input value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Huge" name="name" />
        <label htmlFor="last name">Prénom </label>
        <input value={lastname} onChange={e => setLastname(e.target.value)} type="text" placeholder="Lupont" name="lastname" />
        <label htmlFor="username">Pseudo</label>
        <input value={username} onChange={e => setUsername(e.target.value)} type="text" placeholder="Dupont" name="username" required />

        <label htmlFor="psw">Mot de passe</label>
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="********" name="password" required />
        <button >Créer</button>
      </form>
      {/*users.map((user) => (
      <div key={user.id}>
        <p>{user.name}</p>
        <p>{user.lastname}</p>
        <p>{user.age}</p>
      </div>
    ))*/}
    </>
  );
};

export default createUser;
