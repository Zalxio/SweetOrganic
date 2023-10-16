import React, { useState } from 'react';
import axios from 'axios';

const UpdateProduct = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [likes, setLikes] = useState('');
  const [id, setId] = useState('');

  const updateProduct = async () => {
    await axios.put(`/api/products/${id}`, { title, image });
  };

  return (
    <div>
      <input value={id} onChange={e => setId(e.target.value)} placeholder="ID" />
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Titre" />
      <input value={image} onChange={e => setImage(e.target.value)} placeholder="Image URL" />
      <input value={likes} onChange={e => setLikes(e.target.value)} placeholder="Likes" />
      <button onClick={updateProduct}>Mettre à jour</button>
    </div>
  );
};

export default UpdateProduct;
