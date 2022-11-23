const express = require('express');
const db = require('../db/connection');
const router  = express.Router();
const { getMenuItems, alterMenuItemStock, addMenuItemBasket } = require('../db/queries/customerQueries');

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


// ADD
router.post('/menu/basket', (req, res) => {
  console.log('POST request receied to /menu/basket')
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


module.exports = router;
