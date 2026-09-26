import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import { useCart } from '../context/CartContext';
import api from '../services/api';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data.product);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!product) {
    return <div className="empty-state">Product not found.</div>;
  }

  return (
    <section className="section">
      <div className="container product-detail-layout">
        <div className="product-detail-image-wrap">
          <img src={product.image} alt={product.name} className="product-detail-image" />
        </div>

        <div className="product-detail-copy">
          <span className="eyebrow">{product.category}</span>
          <h1>{product.name}</h1>
          <div className="rating-row">
            <span>⭐ {product.rating || 4.5}</span>
            <span>{product.stock} in stock</span>
          </div>
          <p className="product-price">${Number(product.price).toFixed(2)}</p>
          <p>{product.description}</p>

          <div className="detail-actions">
            <button type="button" className="btn btn-primary" onClick={() => addToCart(product)}>
              Add to cart
            </button>
            <Link to="/products" className="btn btn-secondary">
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
