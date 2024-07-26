const productModel = require('../models/product');

const validateProductId = (productId) => {
  if (productId === undefined) {
    return '"productId" is required';
  }
  return null;
};

const validateQuantity = (quantity) => {
  if (quantity === undefined) {
    return '"quantity" is required';
  }
  if (quantity <= 0) {
    return '"quantity" must be greater than or equal to 1';
  }
  return null;
};

const validateItem = (item) => {
  const productIdError = validateProductId(item.productId);
  if (productIdError) {
    return { status: 400, message: productIdError };
  }

  const quantityError = validateQuantity(item.quantity);
  if (quantityError) {
    return { 
      status: quantityError === '"quantity" must be greater than or equal to 1' 
        ? 422 : 400, 
      message: quantityError };
  }

  return null;
};

const validateSaleItems = (itemsSold) => {
  const errors = itemsSold.map(validateItem).filter((error) => error !== null);
  return errors.length > 0 ? errors[0] : null;
};

const validateProductExists = async (productId) => {
  const productExists = await productModel.getProductById(productId);
  if (!productExists) {
    return 'Product not found';
  }
  return null;
};

const validateSale = async (req, res, next) => {
  const itemsSold = req.body;

  if (!Array.isArray(itemsSold) || itemsSold.length === 0) {
    return res.status(400).json({ message: 'Invalid sale format' });
  }

  const validationError = validateSaleItems(itemsSold);
  if (validationError) {
    return res.status(validationError.status).json({ message: validationError.message });
  }

  const productValidationPromises = itemsSold.map((item) => validateProductExists(item.productId));
  const productValidationErrors = await Promise.all(productValidationPromises);

  const productErrorIndex = productValidationErrors.findIndex((error) => error !== null);
  if (productErrorIndex !== -1) {
    return res.status(404).json({ message: productValidationErrors[productErrorIndex] });
  }

  next();
};

module.exports = { validateSale }; 