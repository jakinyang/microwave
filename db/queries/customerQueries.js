const db = require('../connection');

const getMenuItems = () => {
  return db.query(`
  SELECT *
  FROM menu_items;`)
    .then(data => {
      return data.rows;
    });
};

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

const alterMenuItemStock = function(data) {
  console.log('altermenuitems called');
  const queryParams = [
    2,
    data.id,
    data.stock
  ]
  return db.query(`
  UPDATE menu_items
  SET stock = $3,
  WHERE menu_items.id = $2;
  `, queryParams)
  .then(res => {
    console.log('res from cust.querys :', res);
    return res.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
}






module.exports = {
  getMenuItems,
  alterMenuItemStock,
  addMenuItemBasket
}
