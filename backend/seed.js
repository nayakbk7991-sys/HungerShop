const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const User = require('./model/User');
const Product = require('./model/Product');

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/hungerShop'
)
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

const dummyUsers = [
  {
    name: 'Admin User',
    email: 'nayakbk7991@gmail.com',
    password: 'nayak@1234',
    role: 'admin',
    verified: true
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'User@123',
    role: 'user',
    verified: true
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'User@123',
    role: 'user',
    verified: true
  },
  {
    name: 'Mike Johnson',
    email: 'mike@example.com',
    password: 'User@123',
    role: 'user',
    verified: true
  }
];

const dummyProducts = [
  {
    name: 'Premium Wireless Headphones',
    description: 'High-quality noise-cancelling wireless headphones with 30-hour battery life',
    price: 199.99,
    category: 'Electronics',
    stock: 50,
   imageUrl: '/wireless-headphones.jpg',
    rating: 4.5,
    numReviews: 120
  },
  {
    name: 'Smartphone Case',
    description: 'Durable and stylish smartphone protective case made from premium materials',
    price: 24.99,
    category: 'Accessories',
    stock: 200,
    imageUrl: '/smartphone-case.jpg',
    rating: 4.3,
    numReviews: 85
  },
  {
    name: 'Bluetooth Speaker',
    description: 'Portable Bluetooth speaker with powerful sound and long battery life',
    price: 79.99,
    category: 'Electronics',
    stock: 75,
   imageUrl: '/bluetooth-speaker.jpg',
    rating: 4.6,
    numReviews: 95
  },
  {
    name: 'Running Shoes',
    description: 'Comfortable lightweight running shoes suitable for daily workouts',
    price: 89.99,
    category: 'Footwear',
    stock: 100,
    imageUrl: '/running-shoes.jpg',
    rating: 4.4,
    numReviews: 150
  },
  {
    name: 'Laptop Backpack',
    description: 'Water-resistant backpack with dedicated laptop and accessory compartments',
    price: 49.99,
    category: 'Accessories',
    stock: 60,
    imageUrl: '/laptop-backpack.jpg',
    rating: 4.7,
    numReviews: 72
  },
  {
    name: 'Smart Watch',
    description: 'Modern smartwatch with fitness tracking, notifications and heart-rate monitoring',
    price: 149.99,
    category: 'Electronics',
    stock: 40,
    imageUrl: '/smart-watch.jpg',
    rating: 4.2,
    numReviews: 110
  }
];

const seedDatabase = async () => {
  try {
    console.log('Clearing existing data...');

    await User.deleteMany({});
    await Product.deleteMany({});

    console.log('Existing data cleared');

    const hashedUsers = await Promise.all(
      dummyUsers.map(async user => {
        const hashedPassword = await bcrypt.hash(user.password, 10);

        return {
          ...user,
          password: hashedPassword
        };
      })
    );

    await User.insertMany(hashedUsers);
    console.log(`${hashedUsers.length} users inserted`);

    await Product.insertMany(dummyProducts);
    console.log(`${dummyProducts.length} products inserted`);

    console.log('Database seeding completed successfully');

    await mongoose.connection.close();
    console.log('MongoDB connection closed');

    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);

    await mongoose.connection.close();

    process.exit(1);
  }
};

seedDatabase();