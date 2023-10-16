import React from 'react';
import axios from 'axios';
import { useState } from 'react';

const DeleteProduct = () => {
  const [id, setId] = useState('');

  const deleteProduct = async () => {
    await axios.delete(`/api/products/${id}`);
  };

  return (
    <>
        <input value={id} onChange={e => setId(e.target.value)} placeholder="ID" />
        <button onClick={deleteProduct}>Supprimer</button>
    </>
  );
};

export default DeleteProduct;
