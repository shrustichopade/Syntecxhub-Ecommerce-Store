import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount, clearCart, cartMessage } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    clearCart();
    navigate('/');
  };

  return (
    <header className="site-header">
      {cartMessage && (
        <div className="cart-toast" aria-live="polite">
          {cartMessage}
        </div>
      )}

      <div className="container nav-wrap">
        <Link to="/" className="brand">
          <span>Syntecx</span>hub
        </Link>

        <nav className="main-nav" aria-label="Main navigation">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/orders">Orders</NavLink>
        </nav>

        <div className="nav-actions">
          <Link to="/cart" className="cart-button" aria-label="Shopping cart">
            <span>Cart</span>
            <span className="cart-badge">{cartCount}</span>
          </Link>

          {user ? (
            <div className="profile-menu">
              <Link to="/profile" className="nav-link">
                {user.name}
              </Link>
              {user.role === 'admin' && (
                <Link to="/admin" className="nav-link">
                  Admin
                </Link>
              )}
              <button type="button" className="text-button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-secondary">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
