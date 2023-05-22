const { Carts } = require('./db');

const createCart = async (userId, productId, quantity) => {
  try {
    const newCart = await Carts.create({ userId, productId, quantity });
    return newCart;
  } catch (error) {
    throw new Error(`Failed to create cart: ${error.message}`);
  }
};

const getAllCartsByUserId = async (userId) => {
  try {
    const carts = await Carts.findAll({ where: { userId } });
    return carts;
  } catch (error) {
    throw new Error(`Failed to get all carts by user id: ${error.message}`);
  }
};

const getCartByUserIdAndProductId = async (userId, productId) => {
  try {
    const cart = await Carts.findOne({ where: { userId, productId } });
    return cart;
  } catch (error) {
    throw new Error(`Failed to get cart by user id and product id: ${error.message}`);
  }
};

const updateQuantity = async (userId, productId, quantity) => {
  try {
    const updatedCart = await Carts.update({ quantity }, { where: { userId, productId } });
    return updatedCart;
  } catch (error) {
    throw new Error(`Failed to update cart quantity: ${error.message}`);
  }
};

const deleteCartByUserIdAndProductId = async (userId, productId) => {
  try {
    const deletedCart = await Carts.destroy({ where: { userId, productId } });
    return deletedCart;
  } catch (error) {
    throw new Error(`Failed to delete cart by user id and product id: ${error.message}`);
  }
};

const deleteAllCartsByUserId = async (userId) => {
  try {
    const deletedCarts = await Carts.destroy({ where: { userId } });
    return deletedCarts;
  } catch (error) {
    throw new Error(`Failed to delete all carts by user id: ${error.message}`);
  }
};

module.exports = {
  createCart,
  getAllCartsByUserId,
  getCartByUserIdAndProductId,
  updateQuantity,
  deleteCartByUserIdAndProductId,
  deleteAllCartsByUserId
};
