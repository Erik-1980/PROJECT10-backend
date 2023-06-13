const { Products } = require('./db');
const { Categories } = require('./db');

const createProduct = async (best, name, model, price, quantity, discount, image, description, categoryId, proporties) => { //+
  try {
    if (discount === "null" || discount === "undefined") {
      discount = 0
    };
    if (description === "undefined") {
      description = null
    };
    if (proporties === "undefined") {
      proporties = null
    };
    const newProduct = await Products.create({ best, name, model, price, quantity, discount, image, description, categoryId, proporties });
    return newProduct;
  } catch (error) {
    throw new Error(`Failed to create product: ${error.message}`);
  }
};

const createCategory = async (name, description) => { //+
  try {
    const newProduct = await Categories.create({ name, description });
    return newProduct;
  } catch (error) {
    throw new Error(`Failed to create category: ${error.message}`);
  }
};


const getAllProducts = async () => {
  try {
    const products = await Products.findAll({
      include: [
        {
          model: Categories,
          attributes: ['name']
        }
      ],
      raw: true
    });
    return products;
  } catch (error) {
    throw new Error(`Failed to get all products: ${error.message}`);
  }
};

const getAllCategories = async () => {
  try {
    const categories = await Categories.findAll();
    return categories;
  } catch (error) {
    throw new Error(`Failed to get all categories: ${error.message}`);
  }
};

const getProductByName = async (name, model, category) => {
  try {
    const product = await Products.findOne({
      where: {
        name: name,
        model: model,
        categoryId: category
      },
      raw: true
    });
    return product;
  } catch (error) {
    throw new Error(`Failed to get product: ${error.message}`);
  }
};

const getProductById = async (id) => {
  try {
    const product = await Products.findOne({
      include: [
        {
          model: Categories,
          attributes: ['id'],
        }
      ],
      where: {
        id: id
      },
      raw: true
    });
    return product;
  } catch (error) {
    throw new Error(`Failed to get product: ${error.message}`);
  }
};

const getCategory = async (value) => {
  try {
    const category = await Categories.findOne({
      attributes: ['name'],
      where: {
        name: value
      }
    });
    return category;
  } catch (error) {
    throw new Error(`Failed to get category: ${error.message}`);
  }
};

const updateProduct = async (id, best, name, model, price, quantity, discount, image, description, categoryId, proporties) => {
  const product = await Products.findOne({
    include: [
      {
        model: Categories,
        attributes: ['id'],
      }
    ],
    where: {
      id: id
    },
    raw: true
  });
  let old_price = product.old_price;
  product.price !== price ? old_price = product.price : old_price
  try {
    const updatedProduct = await Products.update(
      { best, name, model, price, old_price, quantity, discount, image, description, categoryId, proporties },
      { where: { id } }
    );
    return updatedProduct;
  } catch (error) {
    throw new Error(`Failed to update product: ${error.message}`);
  }
};

const updateCategory = async (id, name, description) => {
  try {
    const updatedCategory = await Categories.update(
      { name, description},
      { where: { id } }
    );
    return updatedCategory;
  } catch (error) {
    throw new Error(`Failed to update category: ${error.message}`);
  }
};

const deleteProductById = async (id) => {
  try {
    const deletedProduct = await Products.destroy({ where: { id } });
    return deletedProduct;
  } catch (error) {
    throw new Error(`Failed to delete product by id: ${error.message}`);
  }
};

const deleteCategoryById = async (id) => {
  try {
    const deletedCategory = await Categories.destroy({ where: { id } });
    return deletedCategory;
  } catch (error) {
    throw new Error(`Failed to delete category by id: ${error.message}`);
  }
};

module.exports = {
  createProduct,
  createCategory,
  getAllProducts,
  getProductByName,
  getProductById,
  getCategory,
  getAllCategories,
  updateProduct,
  deleteProductById,
  deleteCategoryById,
  updateCategory
};
