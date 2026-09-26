import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <article className="product-card">
      <Link to={`/products/${product._id}`} className="product-card__image-wrap">
        <img src={product.image} alt={product.name} className="product-card__image" />
      </Link>

      <div className="product-card__body">
        <div className="product-card__meta">
          <span>{product.category}</span>
          <span>⭐ {product.rating || 4.5}</span>
        </div>

        <h3>{product.name}</h3>
        <p>{product.description}</p>

        <div className="product-card__footer">
          <span className="price">${Number(product.price).toFixed(2)}</span>
          <button type="button" className="btn btn-primary" onClick={() => addToCart(product)}>
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
