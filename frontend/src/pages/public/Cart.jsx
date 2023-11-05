import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../utils/cartActions';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <div className="cart">
      <h2>Panier</h2>
      <ul>
        {cartItems.map((product) => (
          <li key={product.id}>
            {product.title} - {product.price} €
            <button onClick={() => handleRemoveFromCart(product.id)}>Retirer du panier</button>
            <button onClick={() => handleAddToCart(product)}>Ajouter au panier</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
