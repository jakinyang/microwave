
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
        subTotal += item.quantity * item.price / 100 // subtotal thing
      }
      const totalInput = subTotal.toFixed(2); // subtotal thing
      $('#order-grand-total').text(totalInput);  // subtotal thing
      console.log('listOrderItems Success!');
    });
}

// ajax req for cust.api to trigger sending text message
const sendTextMsg = () => {
  $.ajax({
    method: 'POST',
    url: '/api/customers/orders/twilio'
  })
}

const checkoutBtnPushed = function () {
  $.ajax({
    method: 'POST',
    url: '/api/customers/orders',
    data: { basketId: 4 }
  })
}

const retrieveOrderStatus = function () {
  console.log('Retrieve order status called!');
  $.ajax({
    method: 'GET',
    url: 'api/customers/status'
  })
    .done(response => {
      const basket = response.basket[0];
      if (basket.time_ready) {
        $('#progress-message-bar').text(`Order ready!`);
        $('.progress-bar').attr('style', 'width: 100%');
      }
      if (basket.time_processing) {
        $('#progress-message-bar').text(`Order processing...`);
        $('.progress-bar').attr('style', 'width: 50%');
      }
    })
    .catch(err => {
      console.log(err.message);
    })
}


const hidePartials = function() {const partialsHide = document.getElementById('checkout-partials-container');
const partialContainer = document.getElementById('processsing-partial-container');
    partialContainer.style.display = 'block';
    partialsHide.style.display = 'none';}

//
// DOCUMENT READY \\
//
$(() => {
  console.log('document.ready')
  listOrderCards();
  retrieveOrderStatus();

  $('#checkout-area-selector').on('click', '#checkout-button', function () {
   $('#processing-partial-container').attr('class', 'd-none');
    sendTextMsg();
    checkoutBtnPushed();
    // const partialsHide = document.getElementById('checkout-partials-container');
    // partialContainer.style.display = 'block';
    // partialsHide.style.display = 'none';
    hidePartials();
  })
  setInterval(retrieveOrderStatus(), 5000);
});
