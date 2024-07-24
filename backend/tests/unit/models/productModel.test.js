const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const productModel = require('../../../src/models/product');

describe('Product Model', function () {
  describe('getAllProducts', function () {
    it('Deve retornar todos os produtos', async function () {
      const mockProducts = [
        { id: 1, name: 'Product 1' },
        { id: 2, name: 'Product 2' },
      ];

      sinon.stub(connection, 'execute').resolves([mockProducts]);

      const products = await productModel.getAllProducts();

      expect(products).to.be.an('array');
      expect(products).to.have.length(2);
      expect(products).to.deep.equal(mockProducts);

      connection.execute.restore();
    });
  });

  describe('getProductById', function () {
    it('Deve retornar produtos por id', async function () {
      const mockProduct = { id: 1, name: 'Product 1' };

      sinon.stub(connection, 'execute').resolves([[mockProduct]]);

      const product = await productModel.getProductById(1);

      expect(product).to.be.an('object');
      expect(product).to.deep.equal(mockProduct);

      connection.execute.restore();
    });
  });

  describe('create', function () {
    it('Deve criar um novo produto', async function () {
      const mockProduct = { name: 'New Product' };
      const mockResult = { insertId: 1 };

      sinon.stub(connection, 'execute').resolves([mockResult]);

      const newProduct = await productModel.create(mockProduct);

      expect(newProduct).to.be.an('object');
      expect(newProduct).to.have.property('id');
      expect(newProduct.id).to.equal(1);
      expect(newProduct).to.have.property('name');
      expect(newProduct.name).to.equal(mockProduct.name);

      connection.execute.restore();
    });
  });
}); 