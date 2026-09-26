import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import api from '../../services/api';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
    revenue: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [productsRes, ordersRes, usersRes] = await Promise.all([
          api.get('/products'),
          api.get('/orders'),
          api.get('/auth/users'),
        ]);

        const products = productsRes.data.products || [];
        const orders = ordersRes.data.orders || [];
        const users = usersRes.data.users || [];
        const revenue = orders.reduce((sum, order) => sum + Number(order.totalAmount || 0), 0);

        setStats({
          products: products.length,
          orders: orders.length,
          users: users.length,
          revenue,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="section admin-section">
      <div className="container">
        <div className="admin-header">
          <div>
            <span className="eyebrow">Overview</span>
            <h2>Admin dashboard</h2>
          </div>
          <Link to="/admin/products/add" className="btn btn-primary">
            Add product
          </Link>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <span>Total Products</span>
            <strong>{stats.products}</strong>
          </div>
          <div className="stat-card">
            <span>Total Orders</span>
            <strong>{stats.orders}</strong>
          </div>
          <div className="stat-card">
            <span>Total Users</span>
            <strong>{stats.users}</strong>
          </div>
          <div className="stat-card">
            <span>Total Revenue</span>
            <strong>${stats.revenue.toFixed(2)}</strong>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
