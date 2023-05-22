const Product = require('../models/ProductsModel');
const fs = require('fs');


// Создание нового продукта
exports.createProducts =  async (req, res, next) => {
  const { brand, name, model, price, quantity, discount, description, categoryId } = req.body;
  const image = req.file && req.file.path;
  console.log(req.body);
  try {
    const repeat_name = await Product.getProduct(name);
    if(repeat_name){
      if(repeat_name.brand===brand && repeat_name.name===name && repeat_name.model===model && repeat_name.categoryId==categoryId){
        return res.status(409).json({ message_error: 'A similar product already exists!'});
      };
    };
    await Product.createProduct(brand, name, model, price, quantity, discount, image, description, categoryId);
    res.status(201).json({ message: 'Product created successfully!'});
  } catch (err) {
    next(err);
  }
};

// Создание новоЙ категории
exports.createCategories = async (req, res, next) => { //+
  const { name, description } = req.body;
  try {
    const repeat_name = await Product.getCategory(name);
    console.log(repeat_name)
    if(repeat_name){
      return res.status(409).json({ message_error: 'A category with this name already exists!'});
    }
    await Product.createCategory(name, description);
    res.status(201).json({ message: 'Category created successfully!'});
  } catch (err) {
    next(err);
  }
};

// Получение информации о продукте
exports.getOneProduct = async (req, res, next) => {
  const { value } = req.body;
  try {
    const product = await Product.getProduct(value);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ product });
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
exports.updateProduct = async (req, res, next) => {
  const { id, brand, name, model, price, quantity, image, description, categoryId } = req.body;
  try {
    await Product.updateProduct(id, brand, name, model, price, quantity, image, description, categoryId);
    res.status(200).json({ message: 'Product updated successfully'});
  } catch (err) {
    next(err);
  }
};

// Удаление продукта по id
exports.deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.getProduct(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
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