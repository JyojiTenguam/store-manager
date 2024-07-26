const express = require('express');

const productController = require('./controllers/productsController');
const saleController = require('./controllers/salesController');
const { validateProduct } = require('./middlewares/productValidation');
const { validateSale } = require('./middlewares/saleValidation');

const app = express();

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.get('/products', productController.getAllProducts);
app.get('/products/:id', productController.getProductById);

app.get('/sales', saleController.getAllSales);
app.get('/sales/:id', saleController.getSaleById);

app.post('/products', validateProduct, productController.createProduct);

app.post('/sales', validateSale, saleController.createSale);

app.put('/products/:id', validateProduct, productController.updateProductById);

app.delete('/products/:id', productController.deleteProduct);

module.exports = app;
