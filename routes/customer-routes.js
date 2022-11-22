/*
Notes:
  id = user_id && user_id != owner_id

 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const { getMenuItems } = require('../db/queries/customerQueries');


router.get('/menus', (req, res) => {
  res.render('customer_menus');
})

router.get('/orders', (req, res) => {
  res.render('customer_orders');
})

<<<<<<< HEAD
  });

  router.post('/customers/basket/', (req, res) => {

  // do something

  });

  module.exports = router;
=======
module.exports = router;
>>>>>>> 2c64293b680176d08d09e9c01e64823231c31344
