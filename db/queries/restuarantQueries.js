const db = require('../connection');

const getOrders = () => {
  return db.query(`
  SELECT *
  FROM menu_items;`)
    .then(data => {
      return data.rows;
    });
};

const getAllItems = function(ownerId) {
  const queryParams = [ownerId];
  return db.query(`
  SELECT *, cat.name
  FROM menu_items AS mi
  JOIN menu_items_categories AS mic
  ON mi.id = mic.menu_item_id
  JOIN categories AS cat
  ON cat.id = mic.categories_id
  WHERE restaurant_owner_id = $1;
  `, queryParams)
  .then(data => {
    return data.rows;
  })
  .catch(err => {
    console.log(err.message);
  })
}

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
    menuObj.editId,
    menuObj.editCategory
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
    RETURNING *;
    UPDATE menu_items_categories
    SET
    menu_item_id = $7,
    categories_id = $8
    WHERE id =
    `, queryParams
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
    2,
    menuObj.newItemName,
    menuObj.newUrl,
    menuObj.newDescription,
    menuObj.newPrice,
    menuObj.newQuantity,
    menuObj.newCategory
  ];
  return db.query(
    `INSERT INTO menu_items (
      restaurant_owner_id,
      name,
      image_url,
      description,
      price,
      stock)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
    INSERT INTO menu_items_categories (menu_item_id, categories_id)
    SELECT (SELECT MAX(id) FROM menu_items), $7;
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
  editMenuItem,
  getAllItems
}
