/*
 * All routes for Widget Data are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /api/widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const dotenv = require('dotenv')
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const sendTo = process.env.MY_PHONE_NUMBER;
const sendFrom = process.env.TWIL_PHONE_NUMBER;
const client = require('twilio')(accountSid, authToken);
const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
const {
  addMenuItem,
  deleteMenuItem,
  editMenuItem,
  getAllItems,
  addTimeProcessing,
  addTimeReady,
  cancelBasket,
  getReceivedOrders
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

router.get('/orders', (req, res) => {
  console.log('GET request received for /api/restaurants/orders!');
  getReceivedOrders()
  .then(data => {
    const menu_items = data;
    res.json({ menu_items });
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
})

//
//
// TWILIO   VVVVVVVVVV

router.post('/orders/twilio/ready', (req, res) => {
  console.log('Post request received at /order/twilio');
  const basketId = req.body.basketId;
  addTimeReady(basketId)
    .then(response => {
      res.send(response);
      console.log('Response from addTimeReady success: ', response);
    })
    .catch(err => {
      console.log('Error from addTimeReady', err.message);
    });
  client.messages
    .create({
      body: 'Your order is ready! please come by at your earliest convenience :)',
      from: sendFrom,
      to: sendTo
  })
  .then(message => console.log('response from twilio: ', message.sid))
  .then(console.log('text message send to customer'));

});

router.post('/orders/twilio/processing', (req, res) => {
  console.log('Post request received at /order/twilio');
  const basketId = req.body.basketId;
  addTimeProcessing(basketId)
    .then(response => {
      res.send(response);
      console.log('Response from addTimeProcessing success: ', response);
    })
    .catch(err => {
      console.log('Error from addTimeProcessing', err.message);
    });
  client.messages
    .create({
      body: 'Your order is confirmed, estimated ready time is x minutes from now!',
      from: sendFrom,
      to: sendTo
  })
  .then(message => console.log('response from twilio: ', message.sid))
  .then(console.log('text message send to customer'));

});

router.post('/orders/twilio/cancel', (req, res) => {
  console.log('Post request received at /order/twilio');
  const basketId = req.body.basketId;
  cancelBasket(basketId)
  .then(response => {
    res.send(response);
    console.log('Response from cancelBasket success: ', response);
  })
  .catch(err => {
    console.log('Error from cancelBasket', err.message);
  });
  client.messages
    .create({
      body: 'We have cancelled your order. Life sucks sometimes.',
      from: sendFrom,
      to: sendTo
  })
  .then(message => console.log('response from twilio: ', message.sid))
  .then(console.log('text message send to customer'));

});

// TWILIO   ^^^^^^^^^^^^^^^^^^^^^^^^^
//
//

router.post('/menu', (req, res) => {
  console.log('Post request to /api/restaurants/menu; Request body: ', req.body);
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
