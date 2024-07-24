const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productModel } = require('../../../src/models');
const {
  productsFromDB,
  productsFromModel,
} = require('../mocks/productMock');

describe('Realizando testes - PRODUCTS MODEL:', function () {
  it('Recuperando produtos com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([productsFromDB]);

    const products = await productModel.findAll();
    expect(products).to.be.an('array');
    expect(products).to.have.lengthOf(3);
    expect(products).to.be.deep.equal(productsFromModel);
  });

  it('Recuperando produto por ID com sucesso', async function () {
    const productId = 1;
    const productFromDB = productsFromDB.find((product) => product.id === productId);
    sinon.stub(connection, 'execute').resolves([[productFromDB]]);

    const product = await productModel.findById(productId);
    expect(product).to.be.an('object');
    expect(product).to.have.property('id', productId);
    expect(product).to.have.property('name', productFromDB.name);
  });

  // Teste para verificar se `findAll` lida corretamente com uma lista vazia de produtos
  it('Retornando uma lista vazia quando não há produtos', async function () {
    sinon.stub(connection, 'execute').resolves([[]]); // Simula uma resposta vazia do banco de dados

    const products = await productModel.findAll();
    expect(products).to.be.an('array');
    expect(products).to.have.lengthOf(0); // Espera que a lista de produtos esteja vazia
  });

  afterEach(function () {
    sinon.restore();
  });
});
