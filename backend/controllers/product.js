import Product from '../models/product.js';

// Get all products from database
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching products", error: error.message });
  }
};

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const { name, category, price, stock, restockThreshold, image } = req.body;
    const newProduct = new Product({
      name,
      category,
      price,
      stock,
      restockThreshold,
      image,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Server error creating product", error: error.message });
  }
};

// Update product stock count
export const updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;
    const product = await Product.findByIdAndUpdate(id, { stock }, { new: true });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error updating stock", error: error.message });
  }
};
