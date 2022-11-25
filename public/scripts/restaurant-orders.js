const restaurantOrderCreator = (orderCardObj) => {
   return `<div class="row mb-4 d-flex justify-content-between align-items-center">
            <div class="col-md-3 col-lg-3 col-xl-3">
              <h6 class="text-muted">${orderCardObj.category}</h6>
              <h6 class="text-black mb-0">${orderCardObj.name}</h6>
            </div>
            <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
            <div>${orderCardObj.quantity}</div>
            </div>
            <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
              <h6 class="mb-0">$${orderCardObj.price}</h6>
            </div>
            <div id="menu-itm-id" class="d-none">${orderCardObj.id}</div>
            <div id="menu-itm-owner-id" class="d-none">${orderCardObj.restaurant_owner_id}</div>
            <div id="menu-itm-description" class="d-none">${orderCardObj.description}</div>
            <div class="col-md-1 col-lg-1 col-xl-1 text-end">
              <a href="#!" class="text-muted"><i class="fas fa-times"></i></a>
            </div>
          </div>`
};

const listRestaurantOrders = function() {
  $.ajax({
    method: 'GET',
    url: 'api/restaurants/orders'
  })
    .done((response) => {
      const $restaurantOrderList = $('#restaurant-order-container');
      $restaurantOrderList.empty();
      for (const item of response.menu_items) {
        $('#restaurant-order-container').append(restaurantOrderCreator(item));
      }
      console.log('list Restaurant Orders Success!');
    });
};

const sendCancelText = () => {
  console.log('cancel func initiated');
  const basketId = 4;
  const data = { basketId };
  $.ajax({
    method: 'POST',
    url: '/api/restaurants/orders/twilio/cancel',
    data
  })
}

const sendReadyText = () => {
  console.log('ready func initiated');
  const basketId = 4;
  const data = { basketId };
  $.ajax({
    method: 'POST',
    url: '/api/restaurants/orders/twilio/ready',
    data
  })
}

const sendProcessingText = () => {
  const basketId = 4;
  const data = { basketId };
  console.log('processing func initiated');
  $.ajax({
    method: 'POST',
    url: '/api/restaurants/orders/twilio/processing',
    data
  })
}

//
// DOCUMENT READY
//
$(() => {
  // setInterval(listRestaurantOrders, 5000);

  $('#estimated-time-container').on('click', '#estimated-time', function() {
    console.log('event listener processing triggered');
    sendProcessingText()
  })

  $('#ready-button-container').on('click', '#order-ready', function() {
    console.log('event listener ready triggered');
    sendReadyText()
  })

  $('#cancel-order-container').on('click', '#cancel-order', function() {
    console.log('event listener cancel triggered');
    sendCancelText()
  })
})
// webscocket connections
