const productModel = require('../models/productModel');

const getAllProducts = async (_req, res) => {
  try {
    const products = await productModel.findAll();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching all products' });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const productExists = await productModel.exists(id);
    if (!productExists) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const product = await productModel.findById(id);
    
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching product' });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
};