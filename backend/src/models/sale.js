const connection = require('./connection');

const findSales = async () => {
  const query = `
    SELECT s.id AS saleId, s.date, sp.product_id AS productId, sp.quantity
    FROM sales AS s
    INNER JOIN sales_products AS sp ON s.id = sp.sale_id
    ORDER BY saleId ASC, productId ASC
  `;
  const [sales] = await connection.execute(query);
  return sales;
};

const findSaleById = async (id) => {
  const query = `
    SELECT s.date, sp.product_id AS productId, sp.quantity
    FROM sales AS s
    INNER JOIN sales_products AS sp ON s.id = sp.sale_id
    WHERE s.id = ?
    ORDER BY sp.product_id ASC
  `;
  const [rows] = await connection.execute(query, [id]);
  if (rows.length === 0) return null;
  return rows;
};

const createSale = async (itemsSold) => {
  if (!Array.isArray(itemsSold)) {
    throw new Error('itemsSold must be an array');
  }
  const saleQuery = 'INSERT INTO sales (date) VALUES (NOW())';
  const [saleResult] = await connection.execute(saleQuery);
  const saleId = saleResult.insertId;

  const saleProductQueries = itemsSold.map(({ productId, quantity }) =>
    connection.execute(
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [saleId, productId, quantity],
    ));

  await Promise.all(saleProductQueries);
  return saleId;
};

module.exports = { 
  findSaleById, 
  findSales, 
  createSale,
};