/*
Notes: id = user_id = owner_id

 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');


router.get('/restaurants/order/:id', (req, res) => {

  // do something
  
  });
  
    
router.post('/restaurant/order/:id', (req, res) => {
  
  // do something
  
  });
  

router.get('/restaurant/menu/:id', (req, res) => {

  // do something
  
  });
  
    
router.post('/restaurant/menu/:id', (req, res) => {
  
  // do something
  
  });
    
  
  module.exports = router;