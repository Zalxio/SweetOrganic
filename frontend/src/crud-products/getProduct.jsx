import { useState, useEffect } from 'react'
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
    <>
      <div className="App">
        {/* <h1>Products</h1> */}
        <div className="products">
          {products.map((product) => (
            <div className="product" key={product.id}>
              <h3>{product.title}</h3>
              <img src={product.image} alt={product.title} />
              <h4>Prix {product.price} €</h4>
              <p>{product.description}</p>
              <p>❤️{product.likes}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default getProduct
