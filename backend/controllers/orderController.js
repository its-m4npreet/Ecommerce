const Order = require('../models/Order');

// Create a new order from trolley items
exports.createOrder = async (req, res) => {
  try {
    const { userId, products, total, status, orderDate } = req.body;
    
    console.log('Received order data:', JSON.stringify(req.body, null, 2));
    
    if (!userId || !products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: 'Invalid order data: missing userId or products' });
    }
    
    if (!total || total <= 0) {
      return res.status(400).json({ message: 'Invalid order data: total must be greater than 0' });
    }
    
    // Validate and clean product data
    const cleanedProducts = products.map(item => {
      if (!item.product) {
        throw new Error('Product data is missing');
      }
      
      // Handle category - it might be an object or a string
      let categoryName = '';
      if (item.product.category) {
        if (typeof item.product.category === 'object' && item.product.category.name) {
          categoryName = item.product.category.name;
        } else if (typeof item.product.category === 'string') {
          categoryName = item.product.category;
        }
      }
      
      return {
        product: {
          id: item.product.id,
          title: item.product.title || '',
          price: item.product.price,
          priceInINR: item.product.priceInINR || 0,
          image: item.product.image || '',
          category: categoryName,
          description: item.product.description || ''
        },
        quantity: item.quantity || 1,
        price: item.price || item.product.priceInINR || 0
      };
    });
    
    console.log('Cleaned products data:', JSON.stringify(cleanedProducts, null, 2));
    
    // Create order with complete product information
    const orderData = {
      userId,
      products: cleanedProducts,
      total,
      status: status || 'confirmed',
      orderDate: orderDate || new Date()
    };
    
    console.log('Creating order with data:', JSON.stringify(orderData, null, 2));
    
    const order = new Order(orderData);
    const savedOrder = await order.save();
    
    console.log('Order saved successfully:', savedOrder._id);
    
    res.status(201).json({ 
      message: 'Order placed successfully', 
      order: savedOrder 
    });
  } catch (err) {
    console.error('Error creating order:', err.message);
    console.error('Full error:', err);
    res.status(500).json({ 
      message: 'Failed to place order', 
      error: err.message 
    });
  }
};

// Get all orders for a user
exports.getOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log('Fetching orders for user:', userId);
    
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    console.log(`Found ${orders.length} orders for user ${userId}`);
    
    res.json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ 
      message: 'Failed to fetch orders', 
      error: err.message 
    });
  }
};

// Get all orders (admin function)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error('Error fetching all orders:', err);
    res.status(500).json({ 
      message: 'Failed to fetch orders', 
      error: err.message 
    });
  }
};

// Cancel an order
exports.cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    console.log('Attempting to cancel order:', orderId);
    
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    // Check if order can be cancelled
    if (!['confirmed', 'processing'].includes(order.status.toLowerCase())) {
      return res.status(400).json({ 
        error: 'Order cannot be cancelled. Current status: ' + order.status 
      });
    }
    
    // Update order status to cancelled
    order.status = 'cancelled';
    await order.save();
    
    console.log(`Order ${orderId} cancelled successfully`);
    res.json({ message: 'Order cancelled successfully', order });
  } catch (error) {
    console.error('Error cancelling order:', error);
    res.status(500).json({ error: 'Failed to cancel order' });
  }
};
