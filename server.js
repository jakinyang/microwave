// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own

const loginApiRoutes = require('./routes/login-api');
const loginRoutes = require('./routes/login');

const customerRoutes = require('./routes/customer-routes');
const customerApiRoutes = require('./routes/customer-api');

const restaurantRoutes = require('./routes/restaurant-routes');
const restaurantApiRoutes = require('./routes/restaurant-api');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`

// Routes for login and login API
app.use('/login', loginRoutes);
app.use('/api/login', loginApiRoutes);

// Routes for customers and customer Api
app.use('/customers', customerRoutes);
app.use('/api/customers', customerApiRoutes);

// Routes for restaurants and restaurant Api
app.use('/restaurants', restaurantRoutes);
app.use('/api/restaurants', restaurantApiRoutes);

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).


// this would be home screen: login as restaurant/customer
app.get('/', (req, res) => {
  res.render('login');
});

app.get('/customer_menus', (req, res) => {
  res.render('customer_menus');
})

app.get('/customer_orders', (req, res) => {
  res.render('customer_orders')
})
app.get('/restaurant_menus', (req, res) => {
  res.render('restaurant_menus');
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
