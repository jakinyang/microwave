const express = require('express');
const db = require('../db/connection');
const router  = express.Router();
const { getMenuItems } = require('../db/queries/customerQueries');

// Browse
router.get('/customers/menu', (req, res) => {
  getMenuItems()
    .then(menu_items => {
      res.json({ menu_items });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/customers/basket', (req, res) => {

  // When customer wants to bring up their current basket pre-checkout

});

router.post('/customers/basket/', (req, res) => {

  // do something

});

router.post('/customers/basket/edit', (req, res) => {

  // do something

});

router.post('/customers/basket/delete', (req, res) => {

  // do something

});



module.exports = router;
