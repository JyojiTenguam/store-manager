const saleModel = require('../models/sale');

const getSales = async () => {
  const sales = await saleModel.findSales();
  return sales;
};

const getSaleId = async (id) => {
  const sale = await saleModel.findSaleById(id);
  if (!sale || sale.length === 0) {
    return { error: 'Sale not found' };
  }
  return sale;
};

const createSale = async (itemsSold) => {
  if (!Array.isArray(itemsSold)) {
    throw new Error('itemsSold must be an array');
  }

  const saleId = await saleModel.createSale(itemsSold);

  return {
    id: saleId,
    itemsSold,
  };
};

module.exports = {
  getSales,
  getSaleId,
  createSale,
};