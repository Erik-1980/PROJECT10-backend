const { Carts } = require('./db');
const { Products } = require('./db');

const add = async (userId, productId) => { //+
  try {
    const newCart = await Carts.create({ userId, productId, quantity: 1 });
    return newCart;
  } catch (error) {
    throw new Error(`Failed to create cart: ${error.message}`);
  }
};

const getCartByUserId = async (userId) => {
  try {
    const cartProducts = await Carts.findAll({
      where: { userId },
      include: [Products]
    });
    return cartProducts;
  } catch (error) {
    throw new Error(`Failed to get cart products by user id: ${error.message}`);
  }
};


const getCartByUserIdAndProductId = async (userId, productId) => { //+
  try {
    const cart = await Carts.findOne({
      where: { userId, productId },
      // include: [Products]
    });
    return cart;
  } catch (error) {
    throw new Error(`Failed to get cart by user id and product id: ${error.message}`);
  }
};

const getCartById = async (id) => { //+
  try {
    const cart = await Carts.findOne({
      where: { id }
    });
    return cart;
  } catch (error) {
    throw new Error(`Failed to get cart by user id and product id: ${error.message}`);
  }
};
const deleteProductFromCart = async (id) => {
  try {
    const deletedCarts = await Carts.destroy({ where: { id } });
    return deletedCarts;
  } catch (error) {
    throw new Error(`Failed to delete all carts by user id: ${error.message}`);
  }
};

module.exports = {
  add,
  getCartByUserId,
  getCartByUserIdAndProductId,
  getCartById,
  deleteProductFromCart
};
