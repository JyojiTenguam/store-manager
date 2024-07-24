const chai = require('chai');
const sinon = require('sinon');
const productController = require('../../../src/controllers/productsController');
const productService = require('../../../src/services/productService');

const { expect } = chai;
chai.use(require('sinon-chai'));

describe('Product Controller', function () {
  describe('getAllProducts', function () {
    it('Deve retornar todos os produtos', async function () {
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const stubValue = [
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
      ];

      sinon.stub(productService, 'getAllProducts').resolves(stubValue);

      await productController.getAllProducts(req, res);

      expect(res.status).to.be.calledWith(200);
      expect(res.json).to.be.calledWith(stubValue);

      productService.getAllProducts.restore();
    });
  });

  describe('getProductById', function () {
    it('Deve retornar produto por id', async function () {
      const req = { params: { id: 1 } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const stubValue = { id: 1, name: 'Martelo de Thor' };

      sinon.stub(productService, 'getProductById').resolves(stubValue);

      await productController.getProductById(req, res);

      expect(res.status).to.be.calledWith(200);
      expect(res.json).to.be.calledWith(stubValue);

      productService.getProductById.restore();
    });

    it('Deve retornar erro 404 se o produto não for encontrado', async function () {
      const req = { params: { id: 99 } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const stubValue = { error: 'Product not found' };
      sinon.stub(productService, 'getProductById').resolves(stubValue);

      await productController.getProductById(req, res);

      expect(res.status).to.be.calledWith(404);
      expect(res.json).to.be.calledWith({ message: 'Product not found' });

      productService.getProductById.restore();
    });
  });
});