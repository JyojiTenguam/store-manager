const express = require('express');

const productController = require('./controllers/productsController');
const saleController = require('./controllers/salesController');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.get('/products', productController.getAllProducts);
app.get('/products/:id', productController.getProductById);

app.get('/sales', saleController.getAllSales);
app.get('/sales/:id', saleController.getSaleById);

module.exports = app;
