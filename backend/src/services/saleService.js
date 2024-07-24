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

module.exports = {
  getSales,
  getSaleId,
};