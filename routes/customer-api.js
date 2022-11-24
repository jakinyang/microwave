const express = require('express');
const db = require('../db/connection');
const router = express.Router();
const {
  addMenuItemBasket,
  basketItemDelete,
  runCategoryQuery,
  getBasketItemQuantity,
  getMenuItems,
  decrementBasketItemQuantity
 } = require('../db/queries/customerQueries');

// BROWSE
router.get('/menu', (req, res) => {
  const ownerId = 2;
  getMenuItems(ownerId)
    .then(data => {
      const menu_items = data;
      res.json({ menu_items });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

//BROWSE (FILTERED)
// in production, not yet operable
router.get('/menu/categories', (req, res) => {

  runCategoryQuery()
    .then(data => {
      const menu_items = data.rows;
      res.json({ menu_items });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// READ
router.get('/menu/basket', (req, res) => {
  console.log('GET request received for /menu/basket');
  const userId = 2; // With cookies this would be grabbed from cookies
  getBasketItemQuantity(userId)
  .then(menu_items => {
    console.log('Menu items from customer basket query', menu_items)
    res.json({ menu_items });
  })
  .catch(err => {
    res.status(500)
    .json({ error: err.message });
  })
})

// ADD
router.post('/menu/basket', (req, res) => {
  console.log('POST request receied for /menu/basket')
  const menuItem = req.body;
  addMenuItemBasket(menuItem)
  .then(response => {
    console.log(response);
    res.send(response);
  })
  .catch(err => {
    console.log(err);
  });
})

// EDIT
// to be called and tested when checkout function is implemented
router.post('/menu/quantity/update', (req, res) => {
  const updateData = req.body;
  console.log('Post request received at /menu/quantity/update:', updateData);
  const oldQuantity = updateData.quantity;
  const newQuantity = updateData.newQuantity;
  const quantityDifference = updateData.quantityDifference;
  if (oldQuantity > newQuantity) {
    decrementBasketItemQuantity(updateData)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err.message);
      });
  }
  if (oldQuantity < newQuantity) {
    console.log('I guess we have to add rows?')
  }
  /* alterMenuItemStock(newStockObject)
  .then(response => {
    console.log('result from cust.api stock func :', response);
    res.send(response);
  })
  .catch(err => {
    console.log(err)
  }); */
})

//DELETE
router.post('/menu/basket/delete', (req, res) => {
  console.log('cust.api req.body :', req.body);
  const deleteBasketItemId = req.body.basketItemId;
  basketItemDelete(deleteBasketItemId)
  .then(res => {
    console.log('delete from cust.api res: ', res);
  })
  .catch(err => {
    console.log(err)
  });
});

module.exports = router;
