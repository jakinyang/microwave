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
                  <div class="container add-container">
                    <button class="options-btn selected add-btn">Add</button>
                  </div>
                  <button type="button" class="btn btn-primary" data-container="body" data-toggle="popover" data-placement="bottom" data-content="Vivamus
                    sagittis lacus vel augue laoreet rutrum faucibus.">
                    Description
                  </button>
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

  return {id, restaurant_owner_id, name, image_url, description, price, stock}
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

const listBasketItems = function() {
  /*
  On document.ready():
  Fire off ajax request to the back end to:
  1. retrieve all the menu_item_baskets rows for the hard coded basket_id
  2. retrieve all menu_item rows that are associated with that menu_item_baskets/basket_id
  3. render menu_item rows as basket item cards inside the basket
  */
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
    url: '/api/restaurants/menu',
    data
  })
};

const updateMenuItemStock = function() {
  /* Fire off ajax request to back end to:
      1. Update the stock column value for the item inside of
      menu_items table
      2. Reload the item card with updated stock number
 */
};

$(() => {
  listMenuItems();

  // Add Item Button Listener
  $('.listings-grid').on('click', '.add-btn', function(event) {
    console.log("Add button clicked!");
    console.log(itemInfoGrabber(event));

  })
})
