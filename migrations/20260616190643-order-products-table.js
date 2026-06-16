exports.up = function(db) {
  return db.runSql('CREATE TABLE order_products (id SERIAL PRIMARY KEY, quantity INTEGER, order_id INTEGER REFERENCES orders(id), product_id INTEGER REFERENCES products(id));');
};
exports.down = function(db) {
  return db.runSql('DROP TABLE order_products;');
};
