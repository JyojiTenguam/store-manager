const connection = require('./connection');

const getAllProducts = async () => {
  const [products] = await connection.execute('SELECT * FROM products ORDER BY id ASC');
  return products;
};

const getProductById = async (id) => {
  const [product] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return product[0];
};

const create = async (product) => {
  const query = 'INSERT INTO products (name) VALUES (?)';
  const [result] = await connection.execute(query, [product.name]);
  return { id: result.insertId, ...product };
};

const updateProductById = async (id, name) => {
  const query = 'UPDATE products SET name = ? WHERE id = ?';
  const [result] = await connection.execute(query, [name, id]);
  return result.affectedRows > 0;
};

module.exports = {
  getAllProducts,
  getProductById,
  create,
  updateProductById,
}; 