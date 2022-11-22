// Client facing scripts here
const loginRestaurantOwner = () => {
  $.ajax({
    method: 'POST',
    url: '/api/login/owners'
  })
  .done((response) => {
    console.log('Post request completed to /owners');
  })
};

const loginCustomer = () => {
  $.ajax({
    method: 'POST',
    url: '/api/login/customers'
  })
  .done((response) => {
    console.log('Post request completed to /customers');
  })
};

$(() => {
  console.log("Document ready");
  $('#restaurant_login').on('click',loginRestaurantOwner)

  $('#customer_login').on('click', loginCustomer)

});




// /api/login/owners
// /api/login/customers
