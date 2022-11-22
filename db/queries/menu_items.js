const db = require('../connection');

const getMenuItems = () => {
  return db.query(`
  SELECT name
  FROM menu_items;`)
    .then(data => {
      return data.rows;
    });
};

module.exports = { getMenuItems };
