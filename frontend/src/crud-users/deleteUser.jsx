import React from 'react';
import axios from 'axios';
import { useState } from 'react';

const DeleteUser = () => {
  const [id, setId] = useState('');

  const deleteUser = async () => {
    await axios.delete(`/apiu/users/${id}`);
  };

  return (
    <>
        <input value={id} onChange={e => setId(e.target.value)} placeholder="ID" />
        <button onClick={deleteUser}>Supprimer</button>
    </>
  );
};

export default DeleteUser;
