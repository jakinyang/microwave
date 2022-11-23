const db = require('../connection');

const getMenuItems = () => {
  return db.query(`
  SELECT *
  FROM menu_items;`)
    .then(data => {
      return data.rows;
    });
};

const alterMenuItemStock = function(data) {
  return db.query(`
  UPDATE menu_items
  SET stock = ${data.stock},
  WHERE menu_items.id = ${data.id};
  `)
  .then(res => {
    return res.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
}






module.exports = {
  getMenuItems,
  alterMenuItemStock,
}
