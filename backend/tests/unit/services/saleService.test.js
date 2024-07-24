const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;
const sinonChai = require('sinon-chai');
const saleService = require('../../../src/services/saleService');
const saleModel = require('../../../src/models/sale');

chai.use(sinonChai);

describe('saleService', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('getSales', function () {
    it('Deve retornar uma lista de vendas', async function () {
      const fakeSales = [
        { saleId: 1, date: '2024-07-23T00:00:00.000Z', productId: 1, quantity: 10 },
        { saleId: 1, date: '2024-07-23T00:00:00.000Z', productId: 2, quantity: 5 },
      ];
      sinon.stub(saleModel, 'findSales').resolves(fakeSales);

      const sales = await saleService.getSales();

      expect(sales).to.deep.equal(fakeSales);
    });
  });

  describe('getSaleId', function () {
    it('Deve retornar venda por id', async function () {
      const fakeSale = [
        { date: '2024-07-23T00:00:00.000Z', productId: 1, quantity: 10 },
        { date: '2024-07-23T00:00:00.000Z', productId: 2, quantity: 5 },
      ];
      sinon.stub(saleModel, 'findSaleById').resolves(fakeSale);

      const sale = await saleService.getSaleId(1);

      expect(sale).to.deep.equal(fakeSale);
      expect(saleModel.findSaleById).to.have.been.calledOnceWith(1);
    });

    it('Deve retornar um error caso venda não for encontrada', async function () {
      sinon.stub(saleModel, 'findSaleById').resolves(null);

      const sale = await saleService.getSaleId(999);

      expect(sale).to.deep.equal({ error: 'Sale not found' });
      expect(saleModel.findSaleById).to.have.been.calledOnceWith(999);
    });
  });
});