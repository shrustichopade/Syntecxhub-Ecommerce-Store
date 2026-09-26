import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, subtotal, shipping, total, updateQuantity, removeFromCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <section className="section">
        <div className="container empty-cart-wrap">
          <div className="empty-state">
            <h2>Your cart is empty</h2>
            <p>Add products to get started.</p>
            <Link to="/products" className="btn btn-primary">
              Continue shopping
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container cart-layout">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div className="cart-item" key={item._id}>
              <img src={item.image} alt={item.name} className="cart-item__image" />

              <div className="cart-item__details">
                <h3>{item.name}</h3>
                <p>${Number(item.price).toFixed(2)}</p>
                <div className="quantity-controls">
                  <button type="button" onClick={() => updateQuantity(item._id, -1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button type="button" onClick={() => updateQuantity(item._id, 1)}>
                    +
                  </button>
                </div>
              </div>

              <div className="cart-item__summary">
                <strong>${(Number(item.price) * item.quantity).toFixed(2)}</strong>
                <button type="button" className="text-button" onClick={() => removeFromCart(item._id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <aside className="summary-card">
          <h3>Order summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <div className="summary-row total-row">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <Link to="/checkout" className="btn btn-primary full-width">
            Proceed to checkout
          </Link>
        </aside>
      </div>
    </section>
  );
};

export default Cart;
