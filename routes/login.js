/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

<<<<<<< HEAD
<<<<<<< HEAD
//Change to /login
router.get('/login/', (req, res) => {
  res.render('login');
=======
<<<<<<<< HEAD:routes/menu.js
=======

>>>>>>> 9c96d36dd448c6590f01ffa96e9071bcabd2d7df
router.get('/', (req, res) => {
  res.render('login');
});

router.get('/login/', (req, res) => {
  res.render('login');
<<<<<<< HEAD
>>>>>>>> russel/routes:routes/login.js
>>>>>>> 2c64293b680176d08d09e9c01e64823231c31344
=======
>>>>>>> 9c96d36dd448c6590f01ffa96e9071bcabd2d7df
});

module.exports = router;
