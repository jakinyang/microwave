/*
Notes: id = user_id = owner_id

 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
// const { somefunction } = require('../db/queries/restaurantQueries');

router.get('/menus', (req, res) => {
  res.render('restaurant_menus');
})

router.get('/orders', (req, res) => {
  res.render('restaurant_orders');
})

  module.exports = router;
