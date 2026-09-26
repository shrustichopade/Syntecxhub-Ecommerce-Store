import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import api from '../services/api';

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems, subtotal, shipping, total, clearCart } = useCart();
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
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
      await api.post('/orders', {
        items: cartItems.map((item) => ({
          product: item._id,
          quantity: item.quantity,
        })),
        shippingAddress: formData,
      });

      clearCart();
      navigate('/orders');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <section className="section">
        <div className="container empty-state">
          <h2>Your cart is empty</h2>
          <Link to="/products" className="btn btn-primary">
            Shop now
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container checkout-layout">
        <div className="checkout-form-wrap">
          <h2>Checkout</h2>
          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="checkout-form">
            <label>
              Full name
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
            </label>
            <label>
              Email
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </label>
            <label>
              Phone
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
            </label>
            <label>
              Address
              <input type="text" name="address" value={formData.address} onChange={handleChange} required />
            </label>
            <div className="form-grid">
              <label>
                City
                <input type="text" name="city" value={formData.city} onChange={handleChange} required />
              </label>
              <label>
                State
                <input type="text" name="state" value={formData.state} onChange={handleChange} required />
              </label>
              <label>
                ZIP code
                <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} required />
              </label>
            </div>

            <button type="submit" className="btn btn-primary full-width" disabled={isSubmitting}>
              {isSubmitting ? 'Placing order...' : 'Place Order'}
            </button>
          </form>
        </div>

        <aside className="summary-card">
          <h3>Order summary</h3>
          {cartItems.map((item) => (
            <div key={item._id} className="summary-item">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>${(Number(item.price) * item.quantity).toFixed(2)}</span>
            </div>
          ))}

          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <div className="summary-row total-row">
            <span>Grand total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Checkout;
