const express = require('express');
const db = require('../db/connection');
const router = express.Router();
const dotenv = require('dotenv')
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const sendTo = process.env.MY_PHONE_NUMBER;
const sendFrom = process.env.TWIL_PHONE_NUMBER;
const client = require('twilio')(accountSid, authToken);
const {
  addMenuItemBasket,
  basketItemDelete,
  runCategoryQuery,
  getBasketItemQuantity,
  getMenuItems,
  decrementBasketItemQuantity
 } = require('../db/queries/customerQueries');

// BROWSE
router.get('/menu', (req, res) => {
  const ownerId = 2;
  getMenuItems(ownerId)
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

//BROWSE (FILTERED)
// in production, not yet operable
router.get('/menu/categories', (req, res) => {

  runCategoryQuery()
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

// READ
router.get('/menu/basket', (req, res) => {
  console.log('GET request received for /menu/basket');
  const userId = 2; // With cookies this would be grabbed from cookies
  getBasketItemQuantity(userId)
  .then(menu_items => {
    console.log('Menu items from customer basket query', menu_items)
    res.json({ menu_items });
  })
  .catch(err => {
    res.status(500)
    .json({ error: err.message });
  })
})

// ADD - TWILIO MESSAGE
router.post('/orders/twilio', (req, res) => {
  console.log('Post request received at /order/twilio');
  client.messages
    .create({
      body: 'Gravy trains',
      from: sendFrom,
      to: sendTo
  })
  .then(message => console.log('response from twilio: ', message.sid))
  .then(response => {
    res.send(response);
  });
});


// ADD
router.post('/menu/basket', (req, res) => {
  console.log('POST request receied for /menu/basket')
  const menuItem = req.body;
  addMenuItemBasket(menuItem)
  .then(response => {
    console.log(response);
    res.send(response);
  })
  .catch(err => {
    console.log(err);
  });
})

// EDIT
// to be called and tested when checkout function is implemented
router.post('/menu/quantity/update', (req, res) => {
  const updateData = req.body;
  console.log('Post request received at /menu/quantity/update:', updateData);
  const oldQuantity = Number(updateData.quantity);
  console.log(oldQuantity);
  const newQuantity = Number(updateData.newQuantity);
  console.log(newQuantity);
  const quantityDifference = Math.abs(Number(updateData.quantityDifference));
  console.log(quantityDifference);
  if (oldQuantity > newQuantity) {
    console.log('Calling decrementBasketItemQuantity');
    decrementBasketItemQuantity(updateData)
      .then(response => {
        console.log('Response from decrement');
        res.send(response);
      })
      .catch(err => {
        console.log(err.message);
      });
  }
  if (oldQuantity < newQuantity) {
    console.log('Entering quantity add loop');
    for(let i = 0; i < quantityDifference; i++) {
      if (i === quantityDifference -1) {
        addMenuItemBasket(updateData)
        .then(response => {
          console.log('Response from increment');
          res.send(response);
        })
        .catch(err => {
          console.log(err.message);
        });
      } else {
        addMenuItemBasket(updateData)
        .catch(err => {
          console.log(err.message);
        })
      }

    }
  }
  /* alterMenuItemStock(newStockObject)
  .then(response => {
    console.log('result from cust.api stock func :', response);
    res.send(response);
  })
  .catch(err => {
    console.log(err)
  }); */
})

//DELETE
router.post('/menu/basket/delete', (req, res) => {
  console.log('cust.api req.body :', req.body);
  const deleteBasketItemId = req.body.basketItemId;
  basketItemDelete(deleteBasketItemId)
  .then(res => {
    console.log('Menu basket delete response: ', res);
  })
  .catch(err => {
    console.log(err)
  });
});

module.exports = router;
