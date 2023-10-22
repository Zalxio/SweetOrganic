import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductList.css'; // Assurez-vous d'ajouter ce fichier CSS dans le même répertoire que votre composant

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ title: '', image: '', likes: 0 });
  const [editProduct, setEditProduct] = useState(null);
  const [editTitle, setEditTitle] = useState(''); // Nouvel état pour le champ de titre en mode édition
  const [editImage, setEditImage] = useState(''); // Nouvel état pour le champ d'image en mode édition

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await axios.get('/apip/products');
    setProducts(response.data);
  };

  const createProduct = async () => {
    await axios.post('/apip/products', newProduct);
    fetchProducts();
  };

  const updateProduct = async (id, updatedProduct) => {
    await axios.put(`/apip/products/${id}`, updatedProduct);
    setEditProduct(null);
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    await axios.delete(`/apip/products/${id}`);
    fetchProducts();
  };

  const editProductHandler = (product) => {
    setEditProduct(product);
    // Pré-remplissez les champs d'édition avec les données actuelles du produit
    setEditTitle(product.title);
    setEditImage(product.image);
  };

  return (
    <div className="product-list">
      <h1>Produits</h1>
      <div className="product-form">
        <input
          value={newProduct.title}
          onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
          placeholder="Titre"
        />
        <input
          value={newProduct.image}
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
          placeholder="Image URL"
        />
        <button onClick={createProduct}>Créer</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Titre</th>
            <th>Image</th>
            <th>Likes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                {editProduct === product ? (
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                ) : (
                  product.title
                )}
              </td>
              <td>
                {editProduct === product ? (
                  <input
                    value={editImage}
                    onChange={(e) => setEditImage(e.target.value)}
                  />
                ) : (
                  <img
                    src={product.image}
                    alt={product.title}
                    className="product-image"
                  />
                )}
              </td>
              <td>{product.likes} likes</td>
              <td>
                {editProduct === product ? (
                  <button onClick={() => updateProduct(product.id, { title: editTitle, image: editImage })}>Enregistrer</button>
                ) : (
                  <>
                    <button onClick={() => editProductHandler(product)}>Modifier</button>
                    <button onClick={() => deleteProduct(product.id)}>Supprimer</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
