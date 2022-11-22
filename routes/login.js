/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

<<<<<<< HEAD
//Change to /login
router.get('/login/', (req, res) => {
  res.render('login');
=======
<<<<<<<< HEAD:routes/menu.js
router.get('/', (req, res) => {
  res.render('menu');
========
//Change to /login
router.get('/login/', (req, res) => {
  res.render('login');
>>>>>>>> russel/routes:routes/login.js
>>>>>>> 2c64293b680176d08d09e9c01e64823231c31344
});

module.exports = router;
