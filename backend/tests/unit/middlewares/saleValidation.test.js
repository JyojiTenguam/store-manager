const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;
const { validateSale } = require('../../../src/middlewares/saleValidation');
const saleModel = require('../../../src/models/sale');

describe('Middleware validateSales', function () {
  let req;
  let res;
  let next;

  beforeEach(function () {
    req = {
      body: [],
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    };
    next = sinon.stub();
  });

  it('should return 400 if the body is not an array', async function () {
    req.body = {};
    await validateSale(req, res, next);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: 'Invalid sale format' });
  });

  it('should return 400 if an item does not have productId', async function () {
    req.body = [{ quantity: 10 }];
    await validateSale(req, res, next);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
  });

  it('should return 400 if an item does not have quantity', async function () {
    req.body = [{ productId: 1 }];
    await validateSale(req, res, next);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
  });

  it('should return 422 if quantity is less than 1', async function () {
    req.body = [{ productId: 1, quantity: 0 }];
    await validateSale(req, res, next);
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });
  });

  it('should return 404 if productId does not exist', async function () {
    sinon.stub(saleModel, 'findSaleById').resolves(null);
    req.body = [{ productId: 999, quantity: 10 }];
    await validateSale(req, res, next);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    saleModel.findSaleById.restore();
  });

  it('should call next if all validations pass', async function () {
    sinon.stub(saleModel, 'findSaleById').resolves(true);
    req.body = [{ productId: 1, quantity: 10 }];
    await validateSale(req, res, next);
    saleModel.findSaleById.restore();
  });
});