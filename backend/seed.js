import mongoose from 'mongoose';
import Product from './models/product.js';
import { MONGO_URI } from './src/config.js';

const initialProducts = [
  {
    name: "Coke Mismo 120 ML",
    category: "Drinks",
    price: 25.0,
    stock: 24,
    restockThreshold: 5,
    image: "/assets/images/coke.png",
  },
  {
    name: "Tang Orange Powdered Juice",
    category: "Drinks",
    price: 20.0,
    stock: 18,
    restockThreshold: 5,
    image: "/assets/images/juice.png",
  },
  {
    name: "Pancit Canton",
    category: "Others",
    price: 10.0,
    stock: 30,
    restockThreshold: 5,
    image: "/assets/images/pancit.png",
  },
  {
    name: "Mega Sardines Spicy",
    category: "Canned",
    price: 35.0,
    stock: 12,
    restockThreshold: 5,
    image: "/assets/images/Sardines.png",
  },
  {
    name: "Eggs",
    category: "Others",
    price: 8.0,
    stock: 2,
    restockThreshold: 5,
    image: "/assets/images/eggs.png",
  },
  {
    name: "SkyFlakes",
    category: "Snacks",
    price: 7.0,
    stock: 4,
    restockThreshold: 5,
    image: "/assets/images/SkyFlakes.jpeg",
  }
];

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected for seeding...');
    await Product.deleteMany({});
    await Product.insertMany(initialProducts);
    console.log('Database seeded successfully!');
    process.exit();
  })
  .catch(err => {
    console.error('Error seeding database:', err);
    process.exit(1);
  });
