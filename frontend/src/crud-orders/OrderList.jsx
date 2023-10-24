import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OrderList.css'; // Assurez-vous d'ajouter ce fichier CSS dans le même répertoire que votre composant

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({ idUser: 0, articles: '', articlesPrices: null, price: 0});
  const [editOrder, setEditOrder] = useState(null);
  const [editIdUser, setEditIdUser] = useState(0); // Nouvel état pour le champ de titre en mode édition
  const [editArticles, setEditArticles] = useState(''); // Nouvel état pour le champ d'image en mode édition
  const [editArticlesPrices, setEditArticlesPrices] = useState(null);
  const [editPrice, setEditPrice] = useState(0);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const response = await axios.get('/apio/orders');
    setOrders(response.data);
  };

  const createOrder = async () => {
    await axios.post('/apio/orders', newOrder);
    fetchOrders();
  };

  const updateOrder = async (id, updatedOrder) => {
    await axios.put(`/apio/orders/${id}`, updatedOrder);
    setEditOrder(null);
    fetchOrders();
  };

  const deleteOrder = async (id) => {
    await axios.delete(`/apio/orders/${id}`);
    fetchOrders();
  };

  const editOrderHandler = (order) => {
    setEditOrder(order);
    // Pré-remplissez les champs d'édition avec les données actuelles du produit
    setEditIdUser(order.idUser);
    setEditArticles(order.articles);
    setEditArticlesPrices(order.articlesPrices);
    setEditPrice(order.price);
  };

  return (
    <div className="order-list">
      <h1>Commandes</h1>
      <div className="order-form">
        <input
          value={newOrder.idUser}
          onChange={(e) => setNewOrder({ ...newOrder, idUser: e.target.value })}
          placeholder="Id User"
        />
        <input
          value={newOrder.articles}
          onChange={(e) => setNewOrder({ ...newOrder, articles: e.target.value })}
          placeholder="Articles"
        />
        <input
            value={newOrder.articlesPrices}
            onChange={(e) => setNewOrder({ ...newOrder, articlesPrices: e.target.value })}
            placeholder="Articles Prices"
        />
        <input
            value={newOrder.price}
            onChange={(e) => setNewOrder({ ...newOrder, price: e.target.value })}
            placeholder="Price"
        />
        <button onClick={createOrder}>Créer</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Id User</th>
            <th>Articles</th>
            <th>Articles Prices</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>
                {editOrder === order ? (
                  <input
                    value={editIdUser}
                    onChange={(e) => setEditIdUser(e.target.value)}
                  />
                ) : (
                  order.idUser
                )}
              </td>
              <td>
                {editOrder === order ? (
                  <input
                    value={editArticles}
                    onChange={(e) => setEditArticles(e.target.value)}
                  />
                ) : (
                  <img
                    src={order.articles}
                    alt={order.articles}
                    className="product-image"
                  />
                )}
              </td>
                <td>
                    {editOrder === order ? (
                    <input
                        value={editArticlesPrices}
                        onChange={(e) => setEditArticlesPrices(e.target.value)}
                    />
                    ) : (
                    order.articlesPrices
                    )}
                </td>
                <td>
                    {editOrder === order ? (
                    <input
                        value={editPrice}
                        onChange={(e) => setEditPrice(e.target.value)}
                    />
                    ) : (
                    order.price
                    )}
                </td>
              <td>
                {editOrder === order ? (
                  <button onClick={() => updateOrder(order.id, { idUser: editIdUser, articles: editArticles, articlesPrices: editArticlesPrices, price: editPrice })}>Enregistrer</button>
                ) : (
                  <>
                    <button onClick={() => editOrderHandler(order)}>Modifier</button>
                    <button onClick={() => deleteOrder(order.id)}>Supprimer</button>
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

export default OrderList;

