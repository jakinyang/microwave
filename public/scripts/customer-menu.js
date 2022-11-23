// needs edit to be cusotmer:
const menuCardCreator = (dbObject) => {
    return `<div class="listing-grid-element">
              <div class="image">
                <img
                  src="${dbObject.image_url}"
                  alt="Listing Pic">
              </div>
              <div class="container-row">
                <div class="text">
                  <h3 class="name">${dbObject.name}</h3>
                  <div class="info">
                    <div>
                      <h6><span class="label label-default">Price</span> <span class="price">$${dbObject.price / 100}</span></h6>
                      <h6><span class="label label-default ">Stock</span> <span class="stock">${dbObject.stock}</span></h6>
                      <div id="menu-itm-id" class="d-none">${dbObject.id}</div>
                      <div id="menu-itm-owner-id" class="d-none">${dbObject.restaurant_owner_id}</div>
                      <div id="menu-itm-description" class="d-none">${dbObject.description}</div>
                    </div>
                  </div>
                </div>
                <div class="options">
                <div class="container add-container" style="margin-right: 0.5rem;">
                      <button type="button" class="options-btn selected" data-container="body" data-toggle="popover" data-placement="bottom"
                        data-content="Check me out!"> Description
                      </button>
                    </div>
                    <div class="container add-container">
                      <button class="options-btn selected">Add</button>
                    </div>
                </div>
              </div>
            </div>`
  };

const itemInfoGrabber = function(event) {
  const id = $(event.target).parents('.container-row').find("#menu-itm-id").text();
  const restaurant_owner_id = $(event.target).parents('.container-row').find("#menu-itm-owner-id").text();
  const name = $(event.target).parents('.container-row').find("h3.name").text();
  const image_url = $(event.target).parents('.listing-grid-element').find("img").attr('src');
  const description = $(event.target).parents('.container-row').find("#menu-itm-description").text();
  const priceString = $(event.target).parents('.container-row').find(".price").text().substring(1);
  const price = Number(priceString) * 100;
  const stock = $(event.target).parents('.container-row').find(".stock").text();

  return {id, restaurant_owner_id, name, image_url, description, price, stock};
}

const basketInfoGrabber = function(event) {
  const id = $(event.target).parents()

  return {id, restaurant_owner_id, name, image_url, description, price, stock};
}

const listMenuItems = () => {
  $.ajax({
    method: 'GET',
    url: 'api/customers/menu'
  })
  .done((response) => {
    const $menuList = $('.listings-grid');
    $menuList.empty();
    for (const item of response.menu_items) {
      $('.listings-grid').append(menuCardCreator(item));
    }
    console.log('listCurrentItems Success!');
  });
}

const basketCardCreator = function() {
  return `<div class="row mb-4 d-flex justify-content-around align-items-center">
            <div class="col-md-2 col-lg-2 col-xl-2">
              <img
                src="${image}"
                class="img-fluid rounded-3" alt="Food Item">
            </div>
            <div class="col-md-3 col-lg-3 col-xl-3">
              <h6 class="text-muted">${catagory}</h6>
              <h6 class="text-black mb-0">${name}</h6>
              <div id="menu-itm-id" class="d-none">${dbObject.id}</div>
              <div id="menu-itm-owner-id" class="d-none">${dbObject.restaurant_owner_id}</div>
              <div id="menu-itm-description" class="d-none">${dbObject.description}</div>
            </div>
            <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
              <span>${stock}</span>
            </div>
            <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
              <h6 class="mb-0">$${price}</h6>
            </div>
          </div>
          <hr class="my-4">
          `
}


const listBasketItems = function() {
  /*
  On document.ready():
  Fire off ajax request to the back end to:
  1. retrieve all the menu_item_baskets rows for the hard coded basket_id
  2. retrieve all menu_item rows that are associated with that menu_item_baskets/basket_id
  3. render menu_item rows as basket item cards inside the basket
  */
  $.ajax({
    method: 'GET',
    url: 'api/customers/menu/basket'
  })
  .done((response) => {
    const $basketList = $('');
    $basketList.empty();
    for (const item of response.menu_items) {
      $('').append(basketCardCreator(item));
    }
    console.log('listBasketItems Success!');
  });
}

const addToBasket = function() {
/*
Front end script only
Grab item information - generate basket item card
Insert that card into the basket
If there is a sub-total information section:
this function should dynamically update that
*/
};

const updateMenuItemBasket = function(data) {
  /*
  Fire off ajax request to back end to:
  1. Insert row into table menu_item_baskets with
  the menu_item_id and the customers (hard coded basket_id)
  */
  return $.ajax({
    method: 'POST',
    url: '/api/customers/menu/basket',
    data
  })
};

const updateMenuItemStock = function(event, callback) {
  /* Fire off ajax request to back end to:
      1. Update the stock column value for the item inside of
      menu_items table
      2. Reload the item card with updated stock number
 */
      const stockItemId = callback(event).id;
      const data = {stockItemId: stockItemId};
      return $.ajax({
        method: 'POST',
        url: '/api/customers/menu/stock/update',
        data
      })
};

$(() => {
  listMenuItems();

  // Add Item Button Listener
  $('.listings-grid').on('click', '.add-btn', function(event) {
    console.log("Add button clicked!");
    const item = itemInfoGrabber(event);
    updateMenuItemBasket(item)
    .then(res => {
      console.log('Response received from customer-api router for POST to menu/basket', res);
      // listBasketItems();
    })

  })

  /* $('.edit-quantity-btn').on('submit'), function{

  } */
})
