exports.up = function(db) {
  return db.runSql('CREATE TABLE users (id SERIAL PRIMARY KEY, firstName VARCHAR(100), lastName VARCHAR(100), password_digest VARCHAR);');
};
exports.down = function(db) {
  return db.runSql('DROP TABLE users;');
};
