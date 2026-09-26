const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const User = require('./models/User');
const Product = require('./models/Product');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

const seedData = async () => {
  try {
    const adminExists = await User.findOne({ email: 'admin@syntecxhub.com' });
    if (!adminExists) {
      await User.create({
        name: 'Admin User',
        email: 'admin@syntecxhub.com',
        password: 'admin123',
        role: 'admin',
      });
      console.log('Default admin account created: admin@syntecxhub.com / admin123');
    }

    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      const sampleProducts = [
        { name: 'Wireless Headphones', description: 'Premium wireless audio with noise cancellation.', price: 129.99, category: 'Electronics', image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80', stock: 25, rating: 4.8 },
        { name: 'Classic Denim Jacket', description: 'A timeless outerwear staple for everyday wear.', price: 89.99, category: 'Fashion', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80', stock: 18, rating: 4.6 },
        { name: 'Running Shoes', description: 'Lightweight runners designed for daily comfort and speed.', price: 110, category: 'Shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80', stock: 22, rating: 4.7 },
        { name: 'Hydrating Serum', description: 'A skincare essential for soft, refreshed skin.', price: 39.5, category: 'Beauty', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80', stock: 30, rating: 4.9 },
        { name: 'Minimal Desk Lamp', description: 'Modern lighting with a warm ambient glow.', price: 54.99, category: 'Home', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80', stock: 17, rating: 4.5 },
        { name: 'Leather Backpack', description: 'Spacious design with premium finish for daily travel.', price: 95, category: 'Accessories', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80', stock: 20, rating: 4.4 },
        { name: 'Smartwatch Pro', description: 'Track health, workouts, and notifications in style.', price: 199.99, category: 'Electronics', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80', stock: 14, rating: 4.8 },
        { name: 'Cotton Casual Shirt', description: 'Breathable fabric perfect for smart casual looks.', price: 45, category: 'Fashion', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80', stock: 26, rating: 4.3 },
        { name: 'Trail Running Sneakers', description: 'All-terrain grip and cushioning for outdoor movement.', price: 125.5, category: 'Shoes', image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=900&q=80', stock: 19, rating: 4.7 },
        { name: 'Aroma Diffuser', description: 'Create a calming atmosphere with gentle scent diffusion.', price: 59.99, category: 'Home', image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80', stock: 21, rating: 4.6 },
      ];

      await Product.insertMany(sampleProducts);
      console.log('Sample products created.');
    }
  } catch (error) {
    console.error('Seeding error:', error.message);
  }
};

setTimeout(() => {
  seedData();
}, 1000);

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
