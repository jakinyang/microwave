const db = require('../connection');

const getOrders = () => {
  return db.query(`
  SELECT *
  FROM menu_items;`)
    .then(data => {
      return data.rows;
    });
};


const addMenuItem = function(menuObj) {
  const queryParams = [
    menuObj.newItemName,
    menuObj.newUrl,
    menuObj.newDescription,
    menuObj.newPrice,
    menuObj.newQuantity,
    2
  ];
  return db.query(
    `INSERT INTO menu_items (
      restaurant_owner_id,
      name,
      image_url,
      description,
      price,
      stock)
    VALUES ($6, $1, $2, $3, $4, $5)
    RETURNING *;
    `, queryParams
  )
  .then((result) => {
    return result.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
}


module.exports = {
  getOrders, addMenuItem
}
