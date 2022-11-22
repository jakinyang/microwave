/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const { getCustomers, getOwners } = require('../db/queries/loginQueries');

router.post('/owners', (req, res) => {
  getOwners()
    .then(owners => {
    })
    .catch(err => {
    });
});

router.post('/customers', (req, res) => {
  getCustomers()
    .then(customers => {
    })
    .catch(err => {
    });
});



module.exports = router;
/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
<<<<<<<< HEAD:routes/menu-api.js
const userQueries = require('../db/queries/menu_items');

router.get('/', (req, res) => {
  userQueries.getMenuItems()
    .then(menu_items => {
      res.json({ menu_items });
========
const { getCustomers, getOwners } = require('../db/queries/loginQueries');

router.post('/owners', (req, res) => {
  getOwners()
    .then(owners => {
>>>>>>>> russel/routes:routes/login-api.js
    })
    .catch(err => {
    });
});

router.post('/customers', (req, res) => {
  getCustomers()
    .then(customers => {
    })
    .catch(err => {
    });
});



module.exports = router;
