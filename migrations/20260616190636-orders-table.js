exports.up = function(db) {
  return db.runSql("CREATE TABLE orders (id SERIAL PRIMARY KEY, user_id INTEGER REFERENCES users(id), status VARCHAR(20) DEFAULT 'active');");
};
exports.down = function(db) {
  return db.runSql('DROP TABLE orders;');
};
