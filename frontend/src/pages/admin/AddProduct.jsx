import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Electronics',
    image: '',
    stock: '',
    rating: '4.5',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await api.post('/products', formData);
      navigate('/admin/products');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to add product.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section admin-section">
      <div className="container small-container">
        <div className="section-heading">
          <span className="eyebrow">Inventory</span>
          <h2>Add product</h2>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="admin-form">
          <label>
            Product name
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </label>
          <label>
            Description
            <textarea name="description" value={formData.description} onChange={handleChange} required />
          </label>
          <div className="form-grid">
            <label>
              Price
              <input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} required />
            </label>
            <label>
              Stock
              <input type="number" name="stock" value={formData.stock} onChange={handleChange} required />
            </label>
            <label>
              Rating
              <input type="number" step="0.1" min="0" max="5" name="rating" value={formData.rating} onChange={handleChange} />
            </label>
          </div>
          <div className="form-grid">
            <label>
              Category
              <select name="category" value={formData.category} onChange={handleChange}>
                <option>Electronics</option>
                <option>Fashion</option>
                <option>Shoes</option>
                <option>Beauty</option>
                <option>Home</option>
                <option>Accessories</option>
              </select>
            </label>
            <label>
              Image URL
              <input type="url" name="image" value={formData.image} onChange={handleChange} required />
            </label>
          </div>

          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save product'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddProduct;
