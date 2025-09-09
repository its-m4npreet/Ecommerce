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

// Add more product routes (create, update, delete) as needed

module.exports = router;
