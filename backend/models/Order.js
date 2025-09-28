const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  products: [{
    product: {
      id: { type: Number, required: true },
      title: { type: String, required: true },
      price: { type: mongoose.Schema.Types.Mixed },
      priceInINR: { type: Number, required: true },
      image: { type: String },
      category: { type: String },
      description: { type: String }
    },
    quantity: {
      type: Number,
      default: 1,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  }],
  total: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: 'confirmed',
    enum: ['confirmed', 'processing', 'shipped', 'delivered', 'cancelled']
  },
  orderDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
