const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;
const sinonChai = require('sinon-chai');
const connection = require('../../../src/models/connection');
const saleModel = require('../../../src/models/sale');

chai.use(sinonChai);

const normalizeString = function (str) {
  return str.replace(/\s+/g, ' ').trim();
};

describe('saleModel', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('findSales', function () {
    it('should return a list of sales', async function () {
      const fakeSales = [
        { saleId: 1, date: '2024-07-23T00:00:00.000Z', productId: 1, quantity: 10 },
        { saleId: 1, date: '2024-07-23T00:00:00.000Z', productId: 2, quantity: 5 },
      ];
      sinon.stub(connection, 'execute').resolves([fakeSales]);

      const sales = await saleModel.findSales();

      expect(sales).to.deep.equal(fakeSales);
      expect(normalizeString(connection.execute.firstCall.args[0])).to.equal(
        normalizeString(`
          SELECT s.id AS saleId, s.date, sp.product_id AS productId, sp.quantity
          FROM sales AS s
          INNER JOIN sales_products AS sp ON s.id = sp.sale_id
          ORDER BY saleId ASC, productId ASC
        `),
      );
    });
  });

  describe('findSaleById', function () {
    it('should return sale by id', async function () {
      const fakeSale = [
        { date: '2024-07-23T00:00:00.000Z', productId: 1, quantity: 10 },
        { date: '2024-07-23T00:00:00.000Z', productId: 2, quantity: 5 },
      ];
      sinon.stub(connection, 'execute').resolves([fakeSale]);

      const sale = await saleModel.findSaleById(1);

      expect(sale).to.deep.equal(fakeSale);
      expect(normalizeString(connection.execute.firstCall.args[0])).to.equal(
        normalizeString(`
          SELECT s.date, sp.product_id AS productId, sp.quantity
          FROM sales AS s
          INNER JOIN sales_products AS sp ON s.id = sp.sale_id
          WHERE s.id = ?
          ORDER BY sp.product_id ASC
        `),
      );
    });
  });

  describe('createSale', function () {
    it('should create a sale and return the sale id', async function () {
      const itemsSold = [
        { productId: 1, quantity: 10 },
        { productId: 2, quantity: 5 },
      ];
      const fakeSaleId = 1;
      sinon.stub(connection, 'execute')
        .onFirstCall().resolves([{ insertId: fakeSaleId }])
        .onSecondCall()
        .resolves([])
        .onThirdCall()
        .resolves([]);

      const saleId = await saleModel.createSale(itemsSold);

      expect(saleId).to.equal(fakeSaleId);
      expect(normalizeString(connection.execute.firstCall.args[0])).to.equal(
        normalizeString('INSERT INTO sales (date) VALUES (NOW())'),
      );
      itemsSold.forEach(function ({ productId, quantity }, index) {
        expect(normalizeString(connection.execute.getCall(index + 1).args[0])).to.equal(
          normalizeString('INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)'),
        );
        expect(connection.execute.getCall(index + 1).args[1]).to.deep.equal([
          fakeSaleId, productId, quantity,
        ]);
      });
    });
  });
});