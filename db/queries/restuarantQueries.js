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
  SELECT mi.*, cat.name AS category
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
  const queryParams1 = [
    2,
    menuObj.editItemName,
    menuObj.editUrl,
    menuObj.editDescription,
    menuObj.editPrice,
    menuObj.editQuantity,
    menuObj.editId,
  ];
  const queryParams2 = [menuObj.editCategory, menuObj.editId];
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
    RETURNING *;`, queryParams1)
  .then(res => {
    return db.query(`UPDATE menu_items_categories
    SET
      categories_id = (SELECT id FROM categories WHERE name = $1)
    WHERE menu_item_id = $2
    RETURNING *;`, queryParams2);
  })
  .then(res => {
    return res.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });

}

const addMenuItem = function(menuObj) {
  console.log('addMenuItem called by restaurant api')
  const queryParams1 = [
    2,
    menuObj.newItemName,
    menuObj.newUrl,
    menuObj.newDescription,
    menuObj.newPrice,
    menuObj.newQuantity,
  ];
  const queryParams2 = [menuObj.newCategory]
  return db.query(
    `INSERT INTO menu_items (
      restaurant_owner_id,
      name,
      image_url,
      description,
      price,
      stock)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;`, queryParams1)
  .then(() => {
    return db.query(`INSERT INTO menu_items_categories (menu_item_id, categories_id)
    SELECT (SELECT MAX(id) FROM menu_items), (SELECT id FROM categories WHERE name = $1) RETURNING *;`, queryParams2)
  })
  .then(res => {
    return res.rows;
  })
  .catch((err) => {
    console.log('Error from addMenuItem: ', err.message);
  });
}

const addTimeProcessing = function(basketId) {
  const queryParams = [basketId];
  const query = `UPDATE baskets SET time_processing = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *;`
  return db.query(query, queryParams)
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      console.log(err.message);
    });
  };

const addTimeReady = function(basketId) {
  console.log('addTimeReady called!');
  const queryParams = [basketId];
  const query = `UPDATE baskets SET time_ready = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *;`
  return db.query(query, queryParams)
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      console.log(err.message);
    });
  };

  const cancelBasket = function(basketId) {
    const queryParams = [basketId];
    const query = `UPDATE baskets
    SET time_received = NULL,
    time_processing = NULL,
    time_ready = NULL
    WHERE id = $1 RETURNING *;`
    return db.query(query, queryParams)
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      console.log(err.message);
    });
  }

  const getReceivedOrders = function() {
    return db.query(` SELECT bask.id AS basket_id, mi.*, COUNT(mi.id) AS quantity
    FROM menu_item_baskets AS mib
    JOIN menu_items AS mi
    ON mi.id = mib.menu_item_id
    JOIN baskets AS bask
    ON bask.id = mib.basket_id
    WHERE bask.time_received IS NOT NULL
    GROUP BY bask.id, mi.id
    ORDER BY bask.time_received;
    `)
  }

module.exports = {
  getOrders,
  addMenuItem,
  deleteMenuItem,
  editMenuItem,
  getAllItems,
  addTimeProcessing,
  addTimeReady,
  cancelBasket,
  getReceivedOrders
}
