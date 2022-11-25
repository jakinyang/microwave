const db = require('../connection');

const getMenuItems = (ownerId) => {
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
    });
};

const getBasketItemQuantity = (userId) => {
  console.log('getBasketItemQuantity called!');
  const queryParams = [userId];
  return db.query(
    `SELECT mi.*, COUNT(mi.id) AS quantity
    FROM menu_item_baskets AS mib
    JOIN menu_items AS mi
    ON mi.id = mib.menu_item_id
    JOIN baskets AS b
    ON b.id = mib.basket_id
    JOIN customers AS c
    ON c.id = b.customer_id
    WHERE c.id = $1
    GROUP BY mi.id;
    `, queryParams)
  .then(res => {
    return res.rows;
  })
  .catch(err => {
    console.log(err.message);
  })
}

const getMenuItemBasket = (userId) => {
  console.log('getMenuItemBasket called!');
  const queryParams = [userId];
  return db.query(
    `
    SELECT mi.*
    FROM menu_items AS mi
    JOIN menu_item_baskets AS mib
    ON mi.id = mib.menu_item_id
    JOIN baskets AS b
    ON b.id = mib.basket_id
    JOIN customers AS c
    ON c.id = b.customer_id
    WHERE b.customer_id = $1
    ;
    `, queryParams)
    .then(res => {
      return res.rows;
    })
    .catch(err => {
      console.log(err.message);
    })

}

const addMenuItemBasket = (menuItemObj) => {
  console.log('addMenuItemsBaskets called');
  const menuItemId = menuItemObj.id;
  const basketId = 4;
  const queryParams = [
    menuItemId,
    basketId
  ]
  return db.query(`
  INSERT INTO menu_item_baskets (menu_item_id, basket_id)
  VALUES ($1, $2)
  RETURNING *;`, queryParams)
  .then(res => {
    return res.rows;
  })
  .catch(err => {
    console.log(err.message);
  });
};

// to be called and tested when checkout function is implemented
const decrementBasketItemQuantity = function(data) {
  console.log('alterMenuItemStock called; Data received: ', data);
  const queryParams = [
    data.id,
    data.basketId,
    data.quantityDifference
  ]
  return db.query(`
  DELETE FROM menu_item_baskets
  WHERE basket_id = $2 AND id IN (SELECT id FROM menu_item_baskets WHERE menu_item_id = $1 AND basket_id = $2 LIMIT $3);
  `, queryParams)
  .then(res => {
    console.log('res from cust.querys :', res);
    return res.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
}

const basketItemDelete = function(itemId) {
  const basketId = 4;
  const queryParams = [itemId, basketId]
  return db.query(`
  DELETE FROM menu_item_baskets
  USING menu_items, baskets
  WHERE menu_item_baskets.basket_id = $2
  AND menu_item_baskets.menu_item_id = $1;
  `, queryParams)
  .then(res => {
    console.log('basket item delete success! res: ', res);
  })
  .catch((err) => {
    console.log(err.message);
  });
}


// func in production - not yet operable
const runCategoryQuery = (catId) => {
  const queryParams = [2, catId]
    const query = `
    SELECT mi.*, cat.name AS category
      FROM menu_items AS mi
      JOIN menu_items_categories AS mic
      ON mi.id = mic.menu_item_id
      JOIN categories AS cat
      ON cat.id = mic.categories_id
      WHERE restaurant_owner_id = $1
      AND cat.id = $2;`
   return db.query(query, queryParams)
      .then(data => {
        return data.rows;
      })
      .catch(err => {
        console.log(err.message);
      });
};

const addTimeReceived = function (basketId) {
  const queryParams = [basketId];
  const query = `UPDATE baskets SET time_received = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *;`
  return db.query(query, queryParams)
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      console.log(err.message);
    });
}

module.exports = {
  addMenuItemBasket,
  getMenuItemBasket,
  basketItemDelete,
  getBasketItemQuantity,
  runCategoryQuery,
  getMenuItems,
  decrementBasketItemQuantity,
  addTimeReceived
}
