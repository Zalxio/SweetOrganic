import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = ({ orderId }) => {
  const [cart, setCart] = useState([]);

  // Fonction pour mettre à jour la commande avec les produits du panier en utilisant l'API
  const updateOrderWithCart = () => {
    const updatedOrder = {
      articles: cart.map((product) => product.title),
      articlesPrices: cart.map((product) => product.price),
      price: cart.reduce((total, product) => total + product.price * product.quantity, 0),
    };

    // Effectuez un appel API pour mettre à jour la commande
    axios.put(`/apio/orders/${orderId}`, updatedOrder)
      .then((response) => {
        // La commande a été mise à jour avec succès
        console.log('Order updated:', response.data);
      })
      .catch((error) => {
        console.error('Error updating order:', error);
      });
  };

  useEffect(() => {
    updateOrderWithCart(); // Mettez à jour la commande lorsque le composant se monte
  }, [cart, orderId]);

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

  return (
    <div className="cart">
      <h2>Panier</h2>
      <ul>
        {cart.map((product) => (
          <li key={product.id}>
            {product.title} - {product.price} €
            <button onClick={() => removeFromCart(product)}>Retirer du panier</button>
            <button onClick={() => addToCart(product)}>Ajouter au panier</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
