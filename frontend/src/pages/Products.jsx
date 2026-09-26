import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Loader from '../components/Loader';
import ProductCard from '../components/ProductCard';
import api from '../services/api';

const Products = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        setProducts(response.data.products || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl) {
      setCategory(categoryFromUrl);
    }
  }, [searchParams]);

  const categories = useMemo(
    () => ['All', ...new Set(products.map((product) => product.category))],
    [products]
  );

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'All' || product.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="section">
      <div className="container">
        <div className="section-heading section-heading-row">
          <div>
            <span className="eyebrow">Our collection</span>
            <h2>All products</h2>
          </div>
          <input
            type="search"
            className="search-input"
            placeholder="Search products"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="filter-bar" role="tablist" aria-label="Category filters">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={category === item ? 'filter-pill active' : 'filter-pill'}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="empty-state">No products match your search.</div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
