const { Orders } = require('./db');
const { Products } = require('./db');

const createOrder = async (productId, userId, quantity) => {
  try {
    const order_status = 'Order is processed'
    const newOrder = await Orders.create({ order_status, productId, userId, quantity });
    return newOrder;
  } catch (error) {
    throw new Error(`Failed to create order: ${error.message}`);
  }
};

const getAllOrders = async (userId) => {
  try {
    const orders = await Orders.findAll({
      where: {
        userId: userId
      },
      raw: true
    });
    return orders;
  } catch (error) {
    throw new Error(`Failed to get all products: ${error.message}`);
  }
};


module.exports = {
    createOrder,
    getAllOrders
}