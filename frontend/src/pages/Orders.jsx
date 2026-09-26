import { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import api from '../services/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/orders/myorders');
        setOrders(response.data.orders || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (orders.length === 0) {
    return (
      <section className="section">
        <div className="container empty-state">
          <h2>No orders yet</h2>
          <p>Your order history will appear here once you place an order.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">Your account</span>
          <h2>Order history</h2>
        </div>

        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-card__header">
                <div>
                  <h3>Order #{order._id.slice(-6).toUpperCase()}</h3>
                  <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <span className="status-badge">{order.status}</span>
              </div>

              <div className="order-items">
                {order.items.map((item) => (
                  <div key={`${order._id}-${item.product}`} className="order-item-row">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="order-card__footer">
                <strong>Total: ${Number(order.totalAmount).toFixed(2)}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Orders;
