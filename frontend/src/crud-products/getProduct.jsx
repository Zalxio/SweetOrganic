import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import './getProduct.css'

function getProduct() {
  const [products, setProducts] = useState([]); // products is an array of objects

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('/apip/products/');
      setProducts(response.data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="App">
      <div className="products">
        {products.map((product) => (
          <Link to={`/products/${product.id}`} key={product.id}>
            <div className="product">
              <h3>{product.title}</h3>
              <img src={product.image} alt={product.title} />
              <h4>Prix {product.price} €</h4>
              <p>{product.description}</p>
              <p>❤️{product.likes}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default getProduct


