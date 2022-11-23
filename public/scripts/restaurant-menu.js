//
// FUCNTIONS USED IN DOC READY
//

const deleteCurrentItem = (event) => {
  const menuItemId = $(event.target).parents('.container-row').find("#menu-itm-id").text();
  const data = {menuItemId: menuItemId};
  console.log(data);
  return $.ajax({
    method: 'POST',
    url: '/api/restaurants/menu/delete',
    data
  })
}

const submitNewItem = (data) => {
  return $.ajax({
    method: 'POST',
    url: '/api/restaurants/menu',
    data
  })
}

const itemCardCreator = (dbObject) => {
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
                  <button class="options-btn selected delete-btn">Delete</button>
                </div>
                <div class="container add-container">
                  <button class="options-btn selected edit-btn" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
                  aria-controls="offcanvasRight">Edit</button>
                </div>
              </div>
            </div>
          </div>`;
};

const editCurrentItem = (itemInfo) => {
  return `<form id="newItemForm">
  <div class="form-group" style="margin-bottom: 1rem;">
    <h4>Item Name</h4>
    <input name="newItemName" type="text" placeholder="${itemInfo.name}" class="form-control" placeholder="Enter Name">
  </div>
  <div class="form-group">
    <h4>Image URL<h4>
    <input name="newUrl" type="text" placeholder="${itemInfo.image_url}" class="form-control" placeholder="url">
  </div>

  <div class="form-group">
    <h4>Description</h4>
    <input name="newDescription" type="text" placeholder="${itemInfo.description}" class="form-control" placeholder="description">
  </div>
  <div class="form-group">
    <h4>Price: $</h4>
    <input name="newPrice" type="number" placeholder="${itemInfo.price}" class="form-control"  placeholder="price">
  </div>

  <div class="form-group">
    <h4>Stock Quantity</h4>
    <input name="newQuantity" type="number" placeholder="${itemInfo.stock}" class="form-control" placeholder="stock">
  </div>
  <button type="submit" class="btn btn-primary" id="newItem" style="margin-top: 2rem;">Submit</button>
</form>`
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

const listCurrentItems = () => {
  $.ajax({
    method: 'GET',
    url: 'api/restaurants/menu'
  })
  .done((response) => {
    const $menuList = $('.listings-grid');
    $menuList.empty();
    for (const item of response.menu_items) {
      $('.listings-grid').append(itemCardCreator(item));
    }
    console.log('listCurrentItems Success!');
  });
}

//
// DOCUMENT READY BELOW
//

$(() => {
  console.log('Document ready');
  listCurrentItems();

  $('#newItemForm').on('submit', function (event) {
    event.preventDefault();
    const data = $(this).serialize();
    submitNewItem(data)
    .then(res => {
      console.log('Response received from post router', res);
      $('.listings-grid').append(itemCardCreator(res[0]));

    })
    .catch(err => {
      console.log('Error', err);
    });
  })

  $('.listings-grid').on('click', '.delete-btn', function(event) {
    deleteCurrentItem(event)
    .then(res => {
      console.log(res);
      listCurrentItems();
    })
  });

  $('.listings-grid').on('click', '.edit-btn', function(event) {
    const item = itemInfoGrabber(event);
    $('.form-title').text('Edit')
    $('input[name=newItemName]').attr('placeholder', item.name);
    $('input[name=newUrl]').attr('placeholder', item.image_url);
    $('input[name=newDescription]').attr('placeholder', item.description);
    $('input[name=newPrice]').attr('placeholder', item.price);
    $('input[name=newQuantity]').attr('placeholder', item.stock);
  });
});
