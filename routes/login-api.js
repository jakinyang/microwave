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

