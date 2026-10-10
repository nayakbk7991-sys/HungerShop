const Order = require('../model/Order');

const sendEmail = require('../utils/sendEmail');

// Create a new order
const createOrder = async (req, res) => {
    try {
          const { items, totalAmount, address, paymentId } = req.body;
if (!items || items.length === 0 || !totalAmount || !address ) {
  return res.status(400).json({ message: 'Invalid order data' });
}
       else{
        const order = new Order({
            user: req.user._id,
            items,
            totalAmount,
            address,
            paymentId,
        });
        await order.save();
        const message = `Dear ${req.user.name},\n\nThank you for your order! Your order has been successfully created with the following details:\n\nOrder ID: ${order._id}\nTotal Amount: ${totalAmount}\nShipping Address: ${address}\n\nWe will notify you once your order is shipped.\n\nBest regards,\nHungerShop Team`;

       sendEmail(req.user.email, 'Order Created', message).catch(error => {
    console.error("Order email failed:", error);
});
        res.status(201).json({ message: 'Order created successfully', order });
    }
    } catch (error) {
       console.error("Order creation error:", error);
res.status(500).json({ message: 'Error creating order', error: error.message });
    }
};

const getOrderById = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'id name');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error });
    }
}


const myOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.productId', 'name price');

    console.log(
      'Order history products:',
      JSON.stringify(
        orders.map(order => ({
          orderId: order._id,
          items: order.items.map(item => ({
            productId: item.productId,
            name: item.productId?.name,
            price: item.price,
            qty: item.qty
          }))
        })),
        null,
        2
      )
    );

    res.json(orders);
  } catch (error) {
    console.error('Error fetching my orders:', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
};
const updateOrdersStatus = async (req, res) => {
    try{
      const { status } = req.body;
      const order = await Order.findById(req.params.id);
      if (order) {
          order.status = status;
          await order.save();
          res.json({ message: 'Order status updated successfully', order });
      }
      else {
        res.status(404).json({ message: 'Order not found' });
      }
    } catch (error) {
        res.status(500).json({ message: 'Error updating order status', error });
    }
};
      

module.exports = {
    createOrder,
    myOrders,
    getOrderById,
    updateOrdersStatus,
};  