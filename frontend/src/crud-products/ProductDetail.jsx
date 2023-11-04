import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const [cart, setCart] = useState([]);

  // Fonction pour ajouter un produit au panier
  const addToCart = (product) => {
    const updatedCart = [...cart];
    const existingProduct = updatedCart.find((item) => item.id === product.id);

    if (existingProduct) {
      // Si le produit existe déjà dans le panier, augmentez sa quantité
      existingProduct.quantity += 1;
    } else {
      // Sinon, ajoutez le produit au panier avec une quantité de 1
      product.quantity = 1;
      updatedCart.push(product);
    }

    setCart(updatedCart);
  };

  // Fonction pour supprimer un produit du panier
  const removeFromCart = (product) => {
    const updatedCart = [...cart];
    const existingProduct = updatedCart.find((item) => item.id === product.id);

    if (existingProduct) {
      if (existingProduct.quantity > 1) {
        // Si la quantité est supérieure à 1, diminuez la quantité
        existingProduct.quantity -= 1;
      } else {
        // Si la quantité est égale à 1, retirez le produit du panier
        updatedCart.splice(updatedCart.indexOf(existingProduct), 1);
      }
    }

    setCart(updatedCart);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/apip/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-details">
      <div className="product-details-left">
        <h3>{product.title}</h3>
        <img src={product.image} alt={product.title} />
      </div>
      <div className="product-details-right">
        <h4>Prix {product.price} €</h4>
        <p>{product.description}</p>
        <p>❤️{product.likes}</p>
        <button onClick={() => addToCart(product)}>Ajouter au panier</button>
        <button onClick={() => removeFromCart(product)}>Retirer du panier</button>
        <Link to="/cart">Voir le panier</Link>
      </div>
    </div>
  );
}

export default ProductDetail;
