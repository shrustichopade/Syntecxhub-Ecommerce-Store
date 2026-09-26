import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import ProductCard from '../components/ProductCard';
import api from '../services/api';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        setProducts(response.data.products || []);
      } catch (error) {
        setError('Unable to load products right now.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const featuredProducts = products.slice(0, 4);
  const categories = ['Electronics', 'Fashion', 'Shoes', 'Beauty', 'Home', 'Accessories'];

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">New arrivals</span>
            <h1>Smart shopping for everyday living.</h1>
            <p>
              Discover premium products curated for work, style, comfort, and home life.
            </p>
            <div className="hero-actions">
              <Link to="/products" className="btn btn-primary">
                Shop Now
              </Link>
              <Link to="/products" className="btn btn-secondary">
                Explore Deals
              </Link>
            </div>
            <div className="hero-stats">
              <div>
                <strong>20k+</strong>
                <span>Happy shoppers</span>
              </div>
              <div>
                <strong>4.9/5</strong>
                <span>Average rating</span>
              </div>
              <div>
                <strong>48h</strong>
                <span>Fast delivery</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <img
              src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80"
              alt="Lifestyle shopping"
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Featured categories</span>
            <h2>Shop by category</h2>
          </div>

          <div className="category-grid">
            {categories.map((category) => (
              <Link to={`/products?category=${encodeURIComponent(category)}`} key={category} className="category-card">
                <span>{category}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Featured products</span>
            <h2>Best sellers</h2>
          </div>

          {error ? (
            <div className="empty-state">{error}</div>
          ) : (
            <div className="product-grid">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Fresh picks</span>
            <h2>Latest arrivals</h2>
          </div>

          <div className="product-grid">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="section reasons-section">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Why choose us</span>
            <h2>Built for secure, joyful shopping</h2>
          </div>

          <div className="feature-grid">
            <div className="feature-card">
              <h3>Fast shipping</h3>
              <p>Quick dispatch and reliable delivery from warehouse to doorstep.</p>
            </div>
            <div className="feature-card">
              <h3>Secure checkout</h3>
              <p>Protected transactions and trusted order handling for every purchase.</p>
            </div>
            <div className="feature-card">
              <h3>Quality assured</h3>
              <p>Only curated, high-quality essentials chosen for real everyday use.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-strip">
        <div className="container cta-inner">
          <div>
            <span className="eyebrow">Ready to shop?</span>
            <h2>Upgrade your lifestyle with smarter essentials.</h2>
          </div>
          <Link to="/products" className="btn btn-primary">
            Browse collection
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
