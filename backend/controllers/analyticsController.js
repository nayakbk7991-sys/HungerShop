const Order = require('../model/Order');
const User = require('../model/User');
const Product = require('../model/Product');  

const getAdminStarts = async (req, res) => {
  try {
    const totalUser = await User.countDocuments({role: 'user'});
    const totalOrders = await Order.countDocuments({});
    const totalProducts = await Product.countDocuments({});

    const orders = await Order.find({});

    const totalRevenueData = orders.reduce((acc, order) => acc + order.totalAmount,0);

    res.json({
      totalUsers,
      totalOrders,
      totalProducts,
      totalRevenue: totalRevenueData
    });
  }
  catch {
    res.status(500).json({ message: 'Error fetching starts', error});
  }
};

module.exports = { getAdminStarts };