const saleService = require('../services/saleService');

const getAllSales = async (req, res) => {
  const sales = await saleService.getSales();
  res.status(200).json(sales);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const sale = await saleService.getSaleId(id);
  if (sale.error) {
    res.status(404).json({ message: sale.error });
  } else {
    res.status(200).json(sale);
  }
};

const createSale = async (req, res) => {
  const { body } = req;
  try {
    const sale = await saleService.createSale(body);
    res.status(201).json(sale);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { 
  getAllSales, 
  getSaleById,
  createSale,
};