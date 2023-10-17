import React, { useState, useEffect } from 'react';
import axios from 'axios';

const createProduct = () => {
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [likes, setLikes] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await axios.get('/api/products');
    setProducts(response.data);
  };

  const createProduct = async () => {
    await axios.post('/api/products', { title, image });
    fetchProducts();
  };

  return (
    <div>
      <h1>Produits</h1>
      <div>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Titre" />
        <input value={image} onChange={e => setImage(e.target.value)} placeholder="Image URL" />
        <input value={likes} onChange={e => setLikes(e.target.value)} placeholder="Likes" />
        <button onClick={createProduct}>Créer</button>
      </div>
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.title}</h2>
          <img src={product.image} alt={product.title} />
          <p>{product.likes} likes</p>
        </div>
      ))}
    </div>
  );
};

export default createProduct;
