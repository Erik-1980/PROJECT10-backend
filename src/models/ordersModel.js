const { Orders } = require('./db');

const createOrder = async (productId, userId, quantity) => {
  try {
    const order_status = 'Order is processed'
    const newOrder = await Orders.create({ order_status, productId, userId, quantity });
    return newOrder;
  } catch (error) {
    throw new Error(`Failed to create order: ${error.message}`);
  }
};

const getOrders = async (userId) => {
  try {
    const orders = await Orders.findAll({
      where: {
        userId: userId
      },
      raw: true
    });
    return orders;
  } catch (error) {
    throw new Error(`Failed to get all orders: ${error.message}`);
  }
};

const getOrdersById = async (id) => {
  try {
    const order = await Orders.findAll({
      where: {
        id: id
      },
      raw: true
    });
    return order;
  } catch (error) {
    throw new Error(`Failed to get order: ${error.message}`);
  }
};

const getAllOrders = async () => {
  try {
    const orders = await Orders.findAll({
      raw: true
    });
    return orders;
  } catch (error) {
    throw new Error(`Failed to get all products: ${error.message}`);
  }
};

const updateStatus = async (id, order_status) => {
  await Orders.update(
    { order_status },
    { where: { id } }
  );
};

module.exports = {
    createOrder,
    getOrders,
    getAllOrders,
    getOrdersById,
    updateStatus
}