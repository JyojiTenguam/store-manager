const express = require('express');
const { productsControllers } = require('../controllers');

const router = express.Router();

// Endpoint para obter todos os produtos
router.get('/', productsControllers.getAllProducts);

// Endpoint para obter um produto por ID
router.get('/:id', productsControllers.getProductById);

module.exports = router;