const { log } = require('console');
const Product = require('../models/productsModel');
const fs = require('fs');


// Создание нового продукта
exports.createProducts = async (req, res, next) => {
  const { brand, name, model, price, quantity, discount, description, categoryId } = req.body;
  const image = req.file && req.file.path;
  try {
    const repeat_name = await Product.getProductByName(name);;
    if (repeat_name) {
      if (repeat_name.brand === brand && repeat_name.name === name && repeat_name.model === model && repeat_name.categoryId == categoryId) {
        fs.unlink(`./${image}`, (err) => {
          if (err) {
            console.error(err);
            res.status(500).send('Error deleting file');
          }
        });
        return res.status(409).json({ message_error: 'A similar product already exists!' });
      };
    };
    await Product.createProduct(brand, name, model, price, quantity, discount, image, description, categoryId);
    res.status(201).json({ message: 'Product created successfully!' });
  } catch (err) {
    fs.unlink(`./${image}`, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error deleting file');
      }
    });
    next(err);
  }
};

// Создание новоЙ категории
exports.createCategories = async (req, res, next) => { //+
  const { name, description } = req.body;
  try {
    const repeat_name = await Product.getCategory(name);
    if (repeat_name) {
      return res.status(409).json({ message_error: 'A category with this name already exists!' });
    }
    await Product.createCategory(name, description);
    res.status(201).json({ message: 'Category created successfully!' });
  } catch (err) {
    next(err);
  }
};

// Получение списка всех продуктов
exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.getAllProducts();
    res.status(200).json({ products });
  } catch (err) {
    next(err);
  }
};

// Получение списка категорий
exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Product.getAllCategories();
    res.status(200).json({ categories });
  } catch (err) {
    next(err);
  }
};

// Обновление продукта по id
exports.updateProducts = async (req, res, next) => {
  const { id, brand, name, model, price, quantity, discount, image, description, categoryId } = req.body;
  try {
    await Product.updateProduct(id, brand, name, model, price, quantity, discount, image, description, categoryId);
    res.status(200).json({ message: 'Product updated successfully' });
  } catch (err) {
    next(err);
  }
};
// Обновление категории по id
exports.updateCategories = async (req, res, next) => {
  const { id, name, description } = req.body;
  try {
    await Product.updateCategory(id, name, description);
    res.status(200).json({ message: 'Category updated successfully' });
  } catch (err) {
    next(err);
  }
};

// Удаление продукта по id
exports.deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.getProductById(id);
    if (!product) {
      return res.status(404).json({ message_error: 'Product not found' });
    };
    fs.unlink(`./${product.image}`, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error deleting file');
      }
    });
    await Product.deleteProductById(id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    next(err);
  }
};

// Удаление категории по id
exports.deleteCategory = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Product.deleteCategoryById(id);
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err) {
    next(err);
  }
};