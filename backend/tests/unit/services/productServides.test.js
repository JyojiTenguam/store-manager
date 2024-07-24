const { expect } = require('chai');
const sinon = require('sinon');
const productModel = require('../../../src/models/product');
const productService = require('../../../src/services/productService');

describe('Product Service', function () {
  describe('getAllProducts', function () {
    it('Deve retornar todos os produtos', async function () {
      const mockProducts = [
        { id: 1, name: 'Product 1' },
        { id: 2, name: 'Product 2' },
      ];

      sinon.stub(productModel, 'getAllProducts').resolves(mockProducts);

      const products = await productService.getAllProducts();

      expect(products).to.be.an('array');
      expect(products).to.have.length(2);
      expect(products).to.deep.equal(mockProducts);

      productModel.getAllProducts.restore();
    });
  });

  describe('getProductById', function () {
    it('Deve retornar produto por id', async function () {
      const mockProduct = { id: 1, name: 'Product 1' };

      sinon.stub(productModel, 'getProductById').resolves(mockProduct);

      const product = await productService.getProductById(1);

      expect(product).to.be.an('object');
      expect(product).to.deep.equal(mockProduct);

      productModel.getProductById.restore();
    });

    it('Deve retornar um erro caso produto não for encontrado', async function () {
      sinon.stub(productModel, 'getProductById').resolves(undefined);

      const product = await productService.getProductById(999);

      expect(product).to.be.an('object');
      expect(product).to.have.property('error');
      expect(product.error).to.equal('Product not found');

      productModel.getProductById.restore();
    });
  });

  describe('createProduct', function () {
    it('Deve criar um novo produto', async function () {
      const mockProduct = { name: 'New Product' };
      const mockCreatedProduct = { id: 1, name: 'New Product' };

      sinon.stub(productModel, 'create').resolves(mockCreatedProduct);

      const newProduct = await productService.createProduct(mockProduct);

      expect(newProduct).to.be.an('object');
      expect(newProduct).to.have.property('id');
      expect(newProduct.id).to.equal(1);
      expect(newProduct).to.have.property('name');
      expect(newProduct.name).to.equal(mockProduct.name);

      productModel.create.restore();
    });
  });
}); 