import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/Loader';
import api from '../../services/api';

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Electronics',
    image: '',
    stock: '',
    rating: '4.5',
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setFormData({
          name: response.data.product.name,
          description: response.data.product.description,
          price: response.data.product.price,
          category: response.data.product.category,
          image: response.data.product.image,
          stock: response.data.product.stock,
          rating: response.data.product.rating,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await api.put(`/products/${id}`, formData);
      navigate('/admin/products');
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="section admin-section">
      <div className="container small-container">
        <div className="section-heading">
          <span className="eyebrow">Inventory</span>
          <h2>Edit product</h2>
        </div>

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

          <button type="submit" className="btn btn-primary">
            Update product
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditProduct;
