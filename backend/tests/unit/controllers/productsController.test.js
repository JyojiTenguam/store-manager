const { assert } = require('chai');
const sinon = require('sinon');
const { getAllProducts, getProductById } = require('../../../src/controllers/productsController');
const productModel = require('../../../src/models/productModel');
const { productsFromDB } = require('../mocks/productMock');

describe('Testes - PRODUCT CONTROLLER:', function () {
  let res = {};
  let req = {};

  beforeEach(function () {
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    };
    req = {};
  });

  describe('getAllProducts', function () {
    it('Deve retornar todos os produtos com sucesso', async function () {
      sinon.stub(productModel, 'findAll').resolves(productsFromDB);

      await getAllProducts(req, res);

      assert.isTrue(productModel.findAll.calledOnce, 'findAll deve ser chamado uma vez');
      assert.isTrue(res.status.calledWith(200), 'status deve ser chamado com 200');
      assert.isTrue(res.json.calledWith(productsFromDB), 'json deve ser chamado com os produtos');
    });

    it('Deve retornar erro ao tentar buscar produtos', async function () {
      sinon.stub(productModel, 'findAll').throws(new Error('Database error'));

      await getAllProducts(req, res);

      assert.isTrue(productModel.findAll.calledOnce, 'findAll deve ser chamado uma vez');
      assert.isTrue(res.status.calledWith(500), 'status deve ser chamado com 500');
      assert.isTrue(res.json.calledWith({ message: 'Error fetching all products' }), 'json deve ser chamado com a mensagem de erro');
    });
  });

  describe('getProductById', function () {
    it('Deve retornar um produto específico com sucesso', async function () {
      const productId = 1;
      const productFromDB = { id: productId, name: 'Martelo de Thor' };
      req.params = { id: productId };
      sinon.stub(productModel, 'exists').resolves(true);
      sinon.stub(productModel, 'findById').resolves(productFromDB);

      await getProductById(req, res);

      assert.isTrue(productModel.exists.calledOnceWith(productId), 'exists deve ser chamado com o id do produto');
      assert.isTrue(productModel.findById.calledOnceWith(productId), 'findById deve ser chamado com o id do produto');
      assert.isTrue(res.status.calledWith(200), 'status deve ser chamado com 200');
      assert.isTrue(res.json.calledWith(productFromDB), 'json deve ser chamado com o produto');
    });

    it('Deve retornar erro 404 se o produto não for encontrado', async function () {
      const productId = 1;
      req.params = { id: productId };
      sinon.stub(productModel, 'exists').resolves(false);

      await getProductById(req, res);

      assert.isTrue(productModel.exists.calledOnceWith(productId), 'exists deve ser chamado com o id do produto');
      assert.isTrue(res.status.calledWith(404), 'status deve ser chamado com 404');
      assert.isTrue(res.json.calledWith({ message: 'Product not found' }), 'json deve ser chamado com a mensagem de erro 404');
    });

    it('Deve retornar erro ao tentar buscar produto', async function () {
      const productId = 1;
      req.params = { id: productId };
      sinon.stub(productModel, 'exists').throws(new Error('Database error'));

      await getProductById(req, res);

      assert.isTrue(productModel.exists.calledOnceWith(productId), 'exists deve ser chamado com o id do produto');
      assert.isTrue(res.status.calledWith(500), 'status deve ser chamado com 500');
      assert.isTrue(res.json.calledWith({ message: 'Error fetching product' }), 'json deve ser chamado com a mensagem de erro');
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});