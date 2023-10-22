import React, { useState, useEffect } from 'react';
import axios from 'axios';

const createUser = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get('/apiu/users');
    setUsers(response.data);
  };

  const createUser = async () => {
    await axios.post('/apiu/users', { name, lastname, age });
    fetchUsers();
  };

  return (
    <div>
      <h1>Users</h1>
      <div>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
        <input value={lastname} onChange={e => setLastname(e.target.value)} placeholder="Lastname" />
        <input value={age} onChange={e => setAge(e.target.value)} placeholder="Age" />
        <button onClick={createUser}>Créer</button>
      </div>
      {users.map((user) => (
        <div key={user.id}>
          <p>{user.name}</p>
          <p>{user.lastname}</p>
          <p>{user.age}</p>
        </div>
      ))}
    </div>
  );
};

export default createUser;
