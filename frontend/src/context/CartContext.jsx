import { createContext, useContext, useMemo, useState, useEffect } from 'react';

const CartContext = createContext();

const getStoredCart = () => {
  try {
    if (typeof window === 'undefined') {
      return [];
    }

    return JSON.parse(localStorage.getItem('cartItems')) || [];
  } catch (error) {
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(getStoredCart);
  const [cartMessage, setCartMessage] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  useEffect(() => {
    if (!cartMessage) {
      return undefined;
    }

    const timer = setTimeout(() => setCartMessage(''), 1800);
    return () => clearTimeout(timer);
  }, [cartMessage]);

  const addToCart = (product) => {
    if (!product) return;

    setCartItems((currentItems) => {
      const productId = product._id;
      const existingItem = currentItems.find((item) => item._id === productId);

      if (existingItem) {
        const maxQuantity = Number(product.stock) || 99;
        const nextQuantity = Math.min(existingItem.quantity + 1, maxQuantity);

        if (nextQuantity === existingItem.quantity) {
          setCartMessage(`${product.name} is already at max stock.`);
          return currentItems;
        }

        setCartMessage(`${product.name} added to cart.`);
        return currentItems.map((item) =>
          item._id === productId ? { ...item, quantity: nextQuantity } : item
        );
      }

      setCartMessage(`${product.name} added to cart.`);
      return [...currentItems, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId, amount) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) => {
          if (item._id !== productId) return item;

          const nextQuantity = Math.max(1, item.quantity + amount);
          if (nextQuantity > (Number(item.stock) || 99)) {
            return item;
          }

          return { ...item, quantity: nextQuantity };
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item._id !== productId)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );
  const shipping = cartItems.length > 0 && subtotal > 0 ? 15 : 0;
  const total = subtotal + shipping;

  const value = useMemo(
    () => ({
      cartItems,
      cartCount,
      subtotal,
      shipping,
      total,
      cartMessage,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
    }),
    [cartItems, cartCount, subtotal, shipping, total, cartMessage]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
