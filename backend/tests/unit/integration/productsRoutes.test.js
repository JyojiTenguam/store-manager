const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const { expect } = chai;
const app = require('../../../src/app');
const { productModel } = require('../../../src/models');
const { productsFromDB } = require('../mocks/productMock');

chai.use(chaiHttp);

describe('Testes de Integração - Rota /products', function () {
  beforeEach(function () {
    sinon.stub(productModel, 'findAll').resolves(productsFromDB);
  });

  afterEach(function () {
    sinon.restore();
  });

  it('Deve retornar todos os produtos com sucesso', async function () {
    const res = await chai.request(app).get('/products');
    
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.deep.equal(productsFromDB);
  });

  it('Deve retornar erro 500 ao tentar buscar produtos', async function () {
    productModel.findAll.rejects(new Error('Database error'));

    const res = await chai.request(app).get('/products');
    
    expect(res).to.have.status(500);
    expect(res.body).to.have.property('message', 'Error fetching all products');
  });
});