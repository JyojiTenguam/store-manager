const productModel = require('../models/product');

const getAllProducts = async () => {
  const products = await productModel.getAllProducts();
  return products;
};

const getProductById = async (id) => {
  const product = await productModel.getProductById(id);
  if (!product) {
    return { error: 'Product not found' };
  }
  return product;
};

const createProduct = async (product) => {
  const newProduct = await productModel.create(product);
  return newProduct;
};

const updateProduct = async (id, name) => {
  const updated = await productModel.updateProductById(id, name);
  if (!updated) {
    return { error: 'Product not found' };
  }
  return { id, name };
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
};