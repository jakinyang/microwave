const express = require('express');
const db = require('../db/connection');
const router  = express.Router();
const { getMenuItems } = require('../db/queries/customerQueries');

// Browse
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


module.exports = router;
