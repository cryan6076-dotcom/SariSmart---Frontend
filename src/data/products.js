// src/data/products.js
// Shared mock product data used across Home, Inventory, etc.

export const categories = ["All", "Snacks", "Drinks", "Canned", "Others"];

export const products = [
  {
    id: 1,
    name: "Coke Mismo 120 ML",
    category: "Drinks",
    price: 25.0,
    stock: 24,
    restockThreshold: 5,
    image: new URL("../assets/images/coke.png", import.meta.url).href,
  },
  {
    id: 2,
    name: "Powdered Juice",
    category: "Drinks",
    price: 20.0,
    stock: 18,
    restockThreshold: 5,
    image: new URL("../assets/images/juice.png", import.meta.url).href,
  },
  {
    id: 3,
    name: "Pancit Canton",
    category: "Others",
    price: 10.0,
    stock: 30,
    restockThreshold: 5,
    image: new URL("../assets/images/pancit.png", import.meta.url).href,
  },
  {
    id: 4,
    name: "Mega Sardines",
    category: "Canned",
    price: 35.0,
    stock: 12,
    restockThreshold: 5,
    image: new URL("../assets/images/Sardines.png", import.meta.url).href,
  },
  {
    id: 5,
    name: "Eggs",
    category: "Others",
    price: 8.0,
    stock: 2,
    restockThreshold: 5,
    image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=150&h=150&fit=crop&q=80",
  },
  {
    id: 6,
    name: "SkyFlakes",
    category: "Snacks",
    price: 7.0,
    stock: 4,
    restockThreshold: 5,
    // FIXED: Resolved dynamic local path telling Vite to bundle it
    image: new URL("../assets/images/SkyFlakes.jpeg", import.meta.url).href,
  }
];

export function getLowStockProducts() {
  return products.filter(product => product.stock <= product.restockThreshold);
}