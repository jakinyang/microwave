const express = require('express');
const db = require('../db/connection');
const router = express.Router();
const {
  alterMenuItemStock,
  addMenuItemBasket,
  getMenuItemBasket,
  basketItemDelete,
  getBasketyItemQuantity
 } = require('../db/queries/customerQueries');

// BROWSE
router.get('/menu', (req, res) => {
  const query = `SELECT * FROM menu_items WHERE restaurant_owner_id = 2;`;
  db.query(query)
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
  getBasketyItemQuantity(userId)
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
router.post('/menu/stock/update', (req, res) => {
  const newStockObject = req.body;
  console.log('cust.api newStockObj :', newStockObject);
  alterMenuItemStock(newStockObject)
  .then(response => {
    console.log('result from cust.api stock func :', response);
    res.send(response);
  })
  .catch(err => {
    console.log(err)
  });
})

router.post('/menu/basket/update', (req, res) => {

})

//DELETE
router.post('/menu/basket/delete', (req, res) => {
  console.log('DELETE was hit at customer-api');
  console.log('cust.api req.body :', req.body);
  const deleteBasketItemId = req.body;
  basketItemDelete(deleteBasketItemId)
})

module.exports = router;
