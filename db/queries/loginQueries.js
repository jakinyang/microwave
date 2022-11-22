const db = require('../connection');

const getCustomers = () => {
  return db.query(`SELECT * FROM customers`)
    .then(data => {
      return data.rows;
    });
};

const getOwners = () => {
  return db.query(`SELECT * FROM restaurant_owners`)
    .then(data => {
      return data.rows;
    });
};

module.exports = { getCustomers, getOwners };
