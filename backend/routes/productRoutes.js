const express = require('express');
const router = express.Router();
const Product = require('../api/product'); // Assuming you have a Product model

// Get all products
router.get('/', async (req, res) => {
  try {
    console.log(Product);
    const products = await Product;
    console.log(products);
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Get single product by ID
router.get('/:id', async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const products = await Product;
    const product = products.find(p => p.id === productId);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Add more product routes (create, update, delete) as needed

module.exports = router;
