const db = require('../connection');

const getOrders = () => {
  return db.query(`
  SELECT *
  FROM menu_items;`)
    .then(data => {
      return data.rows;
    });
};

const deleteMenuItem = function(deleteId) {
  const queryParams = [deleteId];
  return db.query(
    `DELETE FROM menu_items WHERE id = $1 RETURNING *;`, queryParams
  )
  .then(res => {
    return res.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });

}

const editMenuItem = function(menuObj) {
  const queryParams = [
    2,
    menuObj.editItemName,
    menuObj.editUrl,
    menuObj.editDescription,
    menuObj.editPrice,
    menuObj.editQuantity,
    menuObj.editId
  ];
  return db.query(
    `UPDATE menu_items
    SET
      restaurant_owner_id = $1,
      name = $2,
      image_url = $3,
      description = $4,
      price = $5,
      stock = $6
    WHERE id = $7
    RETURNING *;`, queryParams
  )
  .then(res => {
    return res.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });

}

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
  getOrders,
  addMenuItem,
  deleteMenuItem,
  editMenuItem
}
