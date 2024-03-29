// needs edit to be cusotmer:
const deleteBasketItem = (event) => {
  const basketItemId = $(event.target).parents('#top-of-basket-card').find("#menu-itm-id").text();
  const data = { basketItemId: basketItemId };
  console.log('delete basket id data: ', data);
  return $.ajax({
    method: 'POST',
    url: '/api/customers/menu/basket/delete',
    data
  })
};

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
                      <h6><span class="label label-default">Price</span> <span class="price">$${Number(dbObject.price / 100).toFixed(2)}</span></h6>
                      <h6><span class="label label-default ">Stock</span> <span class="stock">${dbObject.stock}</span></h6>
                      <div id="menu-itm-category" class="d-none">${dbObject.category}</div>
                      <div id="menu-itm-id" class="d-none">${dbObject.id}</div>
                      <div id="menu-itm-owner-id" class="d-none">${dbObject.restaurant_owner_id}</div>
                      <div id="menu-itm-description" class="d-none">${dbObject.description}</div>
                    </div>
                  </div>
                </div>
                <div class="options">
                <div class="container add-container" style="margin-right: 0.5rem;">
                <!--DESCRIPTION-->
                <button class="" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample${dbObject.id}" aria-expanded="false" aria-controls="collapseExample">
 Description  </button>

               <div class="collapse" id="collapseExample${dbObject.id}">
               <div class="card card-body">
                ${dbObject.description}
               </div>
               </div>
                    </div>
                    <div class="container add-container">
                      <button class="add-btn">Add</button>
                    </div>
                </div>
              </div>
            </div>`
};

const itemInfoGrabber = function (event) {
  const id = $(event.target).parents('.container-row').find("#menu-itm-id").text();
  const restaurant_owner_id = $(event.target).parents('.container-row').find("#menu-itm-owner-id").text();
  const name = $(event.target).parents('.container-row').find("h3.name").text();
  const image_url = $(event.target).parents('.listing-grid-element').find("img").attr('src');
  const description = $(event.target).parents('.container-row').find("#menu-itm-description").text();
  const priceString = $(event.target).parents('.container-row').find(".price").text().substring(1);
  const price = Number(priceString) * 100;
  const stockString = $(event.target).parents('.container-row').find(".stock").text();
  const stock = Number(stockString);

  return { id, restaurant_owner_id, name, image_url, description, price, stock };
}

const basketInfoGrabber = function (event) {
  const id = $(event.target).parents('#top-of-basket-card').find("#menu-itm-id").text();
  const restaurant_owner_id = $(event.target).parents('#top-of-basket-card').find("#menu-itm-owner-id").text();
  const name = $(event.target).parents('#top-of-basket-card').find("#basket-itm-name").text();
  const image_url = $(event.target).parents('#top-of-basket-card').find("img").attr('src');
  const description = $(event.target).parents('#top-of-basket-card').find("#menu-itm-description").text();
  const priceString = $(event.target).parents('#top-of-basket-card').find("#basket-itm-price").text();
  const price = Number(priceString) * 100;
  const quantityString = $(event.target).parents('#top-of-basket-card').find(".basket-quantity-id").text();
  const quantity = Number(quantityString);

  return { id, restaurant_owner_id, name, image_url, description, price, quantity };
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

// func in production - not yet operable
const listCategoricalItems = () => {
  $.ajax({
    method: 'GET',
    url: 'api/customers/menu/categories'
  })
    .done((response) => {
      const $menuList = $('.listings-grid');
      $menuList.empty();
      for (const item of response.menu_items) {
        $('.listings-grid').append(menuCardCreator(item));
      }
      console.log('list categorical Items Success :D');
    });
}

const basketCardCreator = function (itemObject) {
  const stock = itemObject.stock;
  const quantity = Number(itemObject.quantity);
  let optionsBlock = '';
  for (let i = 1; i <= stock; i++) {
    if (i === quantity) {
      optionsBlock += `<option selected>${i}</option>\n`
    } else {
      optionsBlock += `<option>${i}</option>\n`
    }
  }
  return `<div id="top-of-basket-card" class="row mb-4 d-flex justify-content-around align-items-center">
            <div class="col-md-2 col-lg-2 col-xl-2">
              <img
                src="${itemObject.image_url}"
                class="img-fluid rounded-3" alt="Food Item">
            </div>
            <div class="col-md-3 col-lg-3 col-xl-3">
              <h4 class="text-black mb-0" id="basket-itm-name" >${itemObject.name}</h4>
              <div id="menu-itm-id" class="menu-itm-id-${itemObject.id} d-none">${itemObject.id}</div>
              <div id="menu-itm-owner-id" class="d-none">${itemObject.restaurant_owner_id}</div>
              <div id="menu-itm-description" class="d-none">${itemObject.description}</div>
            </div>
            <div class="col-md-3 col-lg-3 col-xl-1 d-flex">
              <h4 class="basket-quantity-id">${itemObject.quantity}</h4>
            </div>
            <div class="col-md-3 col-lg-2 col-xl-1 d-flex">
              <h6 class="mb-0">$ <span id="basket-itm-price">${Number(itemObject.price / 100).toFixed(2)}</span></h6>
            </div>
            <div class="col-md-3 col-lg-2 col-xl-3 offset-lg-1">
            <form class="basket-edit-form">
              <div class="form-group">
                <label for="basket-quantity-edit">Edit Quantity</label>
                <select class="form-control" id="basket-quantity-edit" name="edit_quantity">
                  ${optionsBlock}
                </select>
              </div>
              <button type="submit" id="basket-edit" class="btn btn-primary">Edit</button>
            </form>
            <button type="button" id="basket-delete" class="btn btn-danger">Delete</button>
            </div>
          </div>
          <hr class="my-4">
          `
}

const listBasketItems = function () {
  /*
  On document.ready():
  Fire off ajax request to the back end to:
  1. retrieve all the menu_item_baskets rows for the hard coded basket_id
  2. retrieve all menu_item rows that are associated with that menu_item_baskets/basket_id
  3. render menu_item rows as basket item cards inside the basket
  */
  $.ajax({
    method: 'GET',
    url: '/api/customers/menu/basket'
  })
  .done((response) => {
    console.log('Response from GET /menu/basket', response);
    console.log('listbaskitems res.menuItems: ', response.menu_items);
    const $basketList = $('#basket-container');
    $basketList.empty();
    let subTotal = 0; // subtotal thing
    for (const item of response.menu_items) {
      item.quantity = Number(item.quantity);
      item.price = Number(item.price);
      item.stock = Number(item.stock);
      $('#basket-container').append(basketCardCreator(item));
      subTotal += item.quantity * item.price / 100 // subtotal thing
    }
    const totalInput = subTotal.toFixed(2);
    $('#subtotal-amount').text(totalInput);  // subtotal thing
    console.log('listBasketItems Success!');
  });
}

const filterMenuItems = function (categoryId) {
  /*
  Front end script only
  Grab item information - generate basket item card
  Insert that card into the basket
  If there is a sub-total information section:
  this function should dynamically update that
  */
 const data = { categoryId };
  return $.ajax({
    method: 'POST',
    url: '/api/customers/menu/categories',
    data
  })
};

const updateMenuItemBasket = function (data) {
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


// to be called and tested when checkout function is implemented
const updateBasketItemQuantity = function (event) {
  /* Fire off ajax request to back end to:
      1. Update the stock column value for the item inside of
      menu_items table
      2. Reload the item card with updated stock number
 */
  const basketItemInfo = basketInfoGrabber(event);
  $newQuanity = $(event.target).find('select').val();
  const data = basketItemInfo;
  data.basketId = 4;
  data.newQuantity = Number($newQuanity);
  data.quantityDifference = Number(data.quantity) - Number(data.newQuantity);
  console.log(data);
  return $.ajax({
    method: 'POST',
    url: '/api/customers/menu/quantity/update',
    data
  })
  .then(res => {
    console.log('updateBasketItemQuantity success!', res);
  })
  .catch(err => {
    console.log('Error from updateBasketItemQuantity', err.message);
  });
};

$(() => {
  listMenuItems();
  listBasketItems();
  // Add Item Button Listener
  $('.listings-grid').on('click', '.add-btn', function (event) {
    console.log("Add button clicked!");
    const item = itemInfoGrabber(event);
    console.log(item.id);
    const $basketItem = $(`.menu-itm-id-${item.id}`);
    console.log($basketItem.text());
    const $itemQuantity = $basketItem.parent('div').next('div').find('.basket-quantity-id').text();
    console.log("item quantity: ", $itemQuantity);
    console.log("item stock: ", item.stock);
    if (Number(item.stock) <= Number($itemQuantity)) {
      return console.log('Error: not enough stock baby!')
    } else {
      updateMenuItemBasket(item)
        .then(res => {
          console.log('Response received from customer-api router for POST to menu/basket', res);
          listBasketItems();
        })
    }

  })
  $('#basket-container').on('click', '#basket-delete', function (event) {
    deleteBasketItem(event);
    listBasketItems();
  })

  $('#basket-container').on('submit', '.basket-edit-form', function(event) {
    event.preventDefault();
    updateBasketItemQuantity(event)
      .then(res => {
        console.log('updateBasketItemQuantity success; reloading listBasketItems');
        listBasketItems();
      });
    })
  $('.category-filter').on('click', function(event) {
    const categoryId = $(event.target).data('category');
    console.log(categoryId);
    console.log(`Category button for ${$(event.target).data('category')} (${$(event.target).attr('id')}) fired!`)
    filterMenuItems(categoryId)
      .then(res => {
        console.log('response from filterMenuItems!', res);
        const $menuList = $('.listings-grid');
        $menuList.empty();
        for (const item of res.menu_items) {
          $('.listings-grid').append(menuCardCreator(item));
        }
        console.log('filterMenuItems Success!');
      })
      .catch(err => {
        console.log('Error from filterMenuItems!', err.message);
      })
  })
})
