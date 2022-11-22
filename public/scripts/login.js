// Client facing scripts here
$(() => {
  $('#restaurant_login').on('click', loginRestaurantOwner)
  $('#customer_login').on('click', loginCustomer)
});

const loginRestaurantOwner = () => {
  return $.ajax({
    method: 'POST',
    url: '/api/login/owners'
  })
};

const loginCustomer = () => {
  return $.ajax({
    method: 'POST',
    url: '/api/login/customers'
  })
};



// /api/login/owners
// /api/login/customers
