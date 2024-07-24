const chai = require('chai');
const sinon = require('sinon');
const saleController = require('../../../src/controllers/salesController');
const saleService = require('../../../src/services/saleService');

const { expect } = chai;
chai.use(require('sinon-chai'));

describe('Sale Controller', function () {
  describe('getAllSales', function () {
    it('Deve retorna todas as vendas', async function () {
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const stubValue = [
        { saleId: 1, date: '2021-09-09T04:54:29.000Z', productId: 1, quantity: 5 },
        { saleId: 1, date: '2021-09-09T04:54:54.000Z', productId: 2, quantity: 5 },
      ];

      sinon.stub(saleService, 'getSales').resolves(stubValue);

      await saleController.getAllSales(req, res);

      expect(res.status).to.be.calledWith(200);
      expect(res.json).to.be.calledWith(stubValue);

      saleService.getSales.restore();
    });
  });

  describe('getSaleById', function () {
    it('Deve retornar a venda por id', async function () {
      const req = { params: { id: 2 } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const stubValue = [
        { date: '2021-09-09T04:54:29.000Z', productId: 1, quantity: 5 },
        { date: '2021-09-09T04:54:54.000Z', productId: 2, quantity: 5 },
      ];

      sinon.stub(saleService, 'getSaleId').resolves(stubValue);

      await saleController.getSaleById(req, res);

      expect(res.status).to.be.calledWith(200);
      expect(res.json).to.be.calledWith(stubValue);

      saleService.getSaleId.restore();
    });

    it('deve retornar 404 se a venda não for encontrada', async function () {
      const req = { params: { id: 10 } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      sinon.stub(saleService, 'getSaleId').resolves({ error: 'Sale not found' });

      await saleController.getSaleById(req, res);

      expect(res.status).to.be.calledWith(404);
      expect(res.json).to.be.calledWith({ message: 'Sale not found' });

      saleService.getSaleId.restore();
    });
  });
});
