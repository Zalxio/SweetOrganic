import React, { useState } from 'react';
import axios from 'axios';

const UpdateUser = () => {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [age, setAge] = useState('');
  const [id, setId] = useState('');

  const updateUser = async () => {
    await axios.put(`/apiu/users/${id}`, { name, lastname, age });
  };

  return (
    <div>
      <input value={id} onChange={e => setId(e.target.value)} placeholder="ID" />
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
      <input value={lastname} onChange={e => setLastname(e.target.value)} placeholder="Lastname" />
      <input value={age} onChange={e => setAge(e.target.value)} placeholder="Age" />
      <button onClick={updateUser}>Mettre à jour</button>
    </div>
  );
};

export default UpdateUser;
