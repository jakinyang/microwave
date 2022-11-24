/*
 * All routes for Widget Data are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /api/widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
const {
  addMenuItem,
  deleteMenuItem,
  editMenuItem,
  getAllItems
} = require('../db/queries/restuarantQueries');

router.get('/menu', (req, res) => {
  const restaurantOwnerId = 2;
  getAllItems(restaurantOwnerId)
    .then(data => {
      const menu_items = data;
      res.json({ menu_items });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


router.post('/menu', (req, res) => {
  const newMenuObject = req.body;
  addMenuItem(newMenuObject)
  .then(response => {
    console.log(response);
    res.send(response);

  })
  .catch(err => {
    console.log(err)
  });

})

router.post('/menu/delete', (req, res) => {
  console.log('POST to /menu/delete request body: ', req.body);
  console.log('POST to /menu/delete menuItemId: ', req.body.menuItemId);
  const deleteItemId = req.body.menuItemId;
  deleteMenuItem(deleteItemId)
  .then(response => {
    res.send(response);
  })
  .catch(err => {
    console.log(err);
  })
})

router.post('/menu/edit', (req, res) => {
  console.log('POST to /menu/edit request body: ', req.body);
  const data = req.body;
  editMenuItem(data)
  .then(response => {
    console.log(response);
    res.send(response);
  })
  .catch(err => {
    console.log(err)
  });
});
module.exports = router;
