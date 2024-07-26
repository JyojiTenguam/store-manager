const productService = require('../services/productService');

const getAllProducts = async (req, res) => {
  const products = await productService.getAllProducts();
  return res.status(200).json(products);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await productService.getProductById(id);
  if (product.error) {
    return res.status(404).json({ message: product.error });
  }
  return res.status(200).json(product);
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  const newProduct = await productService.createProduct({ name });
  res.status(201).json(newProduct);
};

const updateProductById = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }

  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }

  const result = await productService.updateProduct(id, name);
  if (result.error) {
    return res.status(404).json({ message: result.error });
  }

  res.status(200).json({
    id: Number(result.id),
    name: result.name,
  });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await productService.deleteProduct(id);
    return res.status(204).send();
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProduct,
};