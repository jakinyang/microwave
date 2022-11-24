
const orderCardCreator = (orderObj) => {
                return `<div class="row mb-4 d-flex justify-content-between align-items-center">
                          <div class="col-md-2 col-lg-2 col-xl-2">
                            <img
                              src="${orderObj.image_url}"
                              class="img-fluid rounded-3" alt="Food Item">
                          </div>
                          <div class="col-md-3 col-lg-3 col-xl-3">
                            <h6 class="text-muted">${orderObj.category}</h6>
                            <h6 class="text-black mb-0">${orderObj.name}</h6>
                          </div>
                          <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                           <div>${orderObj.quantity}</div>
                          </div>
                          <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                            <h6 class="mb-0">$${Number(orderObj.price / 100)}</h6>
                          </div>
                          <div id="menu-itm-id" class="d-none">${orderObj.id}</div>
                    <div id="menu-itm-owner-id" class="d-none">${orderObj.restaurant_owner_id}</div>
                    <div id="menu-itm-description" class="d-none">${orderObj.description}</div>
                          <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                            <a href="#!" class="text-muted"><i class="fas fa-times"></i></a>
                          </div>
                        </div>

                        <hr class="my-4"></hr>`
};

const listOrderCards = function () {
  $.ajax({
    method: 'GET',
    url: '/api/customers/menu/basket'
  })
  .done((response) => {
    console.log('response: ', response);
    console.log('listOrderCards res.menuItems: ', response.menu_items);
    const $orderList = $('#customer-order-container');
    $orderList.empty();
    let subTotal = 0; // subtotal thing
    for (const item of response.menu_items) {
      $('#customer-order-container').append(orderCardCreator(item));
      subTotal += Number(item.quantity * item.price / 100) // subtotal thing
    }
    const totalInput = '$' + subTotal.toString() // subtotal thing
    $('#order-grand-total').text(totalInput);  // subtotal thing
    console.log('listOrderItems Success!');
  });
}

const sendTextMsg = () => {
  console.log('sendTextMsg called!');
  $.ajax({
    method: 'POST',
    url: '/api/customers/orders/twilio'
  })
}

//
// DOCUMENT READY \\
//
$(() => {
  console.log('document.ready')
  listOrderCards();

  $('#checkout-area-selector').on('click', '#checkout-button', function() {
    sendTextMsg();
  })
});


/*
const dotenv = require('dotenv')
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const sendTo = process.env.MY_PHONE_NUMBER;
const sendFrom = process.env.TWIL_PHONE_NUMBER;
const client = require('twilio')(accountSid, authToken);

client.messages
    .create({
      body: msgObj.testMessage,
      from: '+13855037218',
      to: outBound
  })
  .then(message => console.log(message.sid));
  })
*/
