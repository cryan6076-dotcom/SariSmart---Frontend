import Product from '../models/product.js';

// Get all products from database
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ userId: req.user.id });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching products", error: error.message });
  }
};

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const { name, category, price, costPrice, stock, restockThreshold, image } = req.body;
    const newProduct = new Product({
      name,
      category,
      price,
      costPrice,
      stock,
      restockThreshold,
      image,
      userId: req.user.id
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
    const { stock, change, type } = req.body;
    const product = await Product.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { stock },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    // Record stock history if change is provided
    if (change !== undefined && type) {
      const StockHistory = (await import('../models/stockHistory.js')).default;
      await new StockHistory({
        userId: req.user.id,
        productId: id,
        change: change,
        type: type
      }).save();
    }
    
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error updating stock", error: error.message });
  }
};

// Get single product by id
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ _id: id, userId: req.user.id });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching product", error: error.message });
  }
};

// Update product details
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, price, costPrice, stock, restockThreshold, image } = req.body;
    const product = await Product.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      {
        name,
        category,
        price,
        costPrice,
        stock,
        restockThreshold,
        image,
      },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error updating product", error: error.message });
  }
};

// Get stock history for a product
export const getProductHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const StockHistory = (await import('../models/stockHistory.js')).default;
    const history = await StockHistory.find({ productId: id, userId: req.user.id }).sort({ date: -1 });
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching product history", error: error.message });
  }
};
