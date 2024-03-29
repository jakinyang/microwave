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
  console.log(data);
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
                    <h6><span class="label label-default">Price</span> <span class="price">$${(dbObject.price / 100).toFixed(2)}</span></h6>
                    <h6><span class="label label-default ">Stock</span> <span class="stock">${dbObject.stock}</span></h6>
                    <h6><span class="label label-default">Category</span> <span class="category" style="background: 0;">${dbObject.category}</span></h6>
                    <div id="menu-itm-id" class="d-none">${dbObject.id}</div>
                    <div id="menu-itm-owner-id" class="d-none">${dbObject.restaurant_owner_id}</div>
                    <div id="menu-itm-description" class="d-none">${dbObject.description}</div>
                  </div>
                </div>
              </div>
              <div class="options">
                <div class="container add-container">
                  <button class="delete-btn">Delete</button>
                </div>
                <div class="container add-container">
                  <button class="edit-btn" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRightEdit"
                  aria-controls="offcanvasRight">Edit</button>
                </div>
              </div>
            </div>
          </div>`;
};

const editCurrentItem = (itemInfo) => {
  return `<form id="newItemForm" class="overflow-auto">
  <div class="form-group" style="margin-bottom: 1rem;">
    <h4>Item Name</h4>
    <input name="editNewItemName" type="text" placeholder="${itemInfo.name}" class="form-control" placeholder="Enter Name">
  </div>
  <!--Food Type Form-->
  <div class="form-group" style="margin-bottom: 1rem;">
    <h4>Food Type</h4>
    <select class="form-control" id="exampleFormControlSelect1">
      <option>bakery</option>
      <option>beverage</option>
      <option>produce</option>
      <option>deli</option>
      <option>processed</option>
      <option>meat</option>
      <option>seafood</option>
      <option>dairy</option>
      <option>other</option>
    </select>
  </div>
  <!--Food Type Form End-->
  <div class="form-group">
    <h4>Image URL<h4>
    <input name="editNewUrl" type="text" placeholder="${itemInfo.image_url}" class="form-control" placeholder="url">
  </div>

  <div class="form-group">
    <h4>Description</h4>
    <input name="editNewDescription" type="text" placeholder="${itemInfo.description}" class="form-control" placeholder="description">
  </div>
  <div class="form-group">
    <h4>Price: $</h4>
    <input name="editNewPrice" type="number" placeholder="${(itemInfo.price)}" class="form-control"  placeholder="price">
  </div>

  <div class="form-group">
    <h4>Stock Quantity</h4>
    <input name="editNewQuantity" type="number" placeholder="${itemInfo.stock}" class="form-control" placeholder="stock">
  </div>
  <button type="submit" class="" id="newItem" style="margin-top: 2rem;">Submit</button>
</form>`
};

const editItem = (data) => {
  return $.ajax({
    method: 'POST',
    url: '/api/restaurants/menu/edit',
    data
  })
}

const itemInfoGrabber = function(event) {
  const id = $(event.target).parents('.container-row').find("#menu-itm-id").text();
  const restaurant_owner_id = $(event.target).parents('.container-row').find("#menu-itm-owner-id").text();
  const name = $(event.target).parents('.container-row').find("h3.name").text();
  const image_url = $(event.target).parents('.listing-grid-element').find("img").attr('src');
  const description = $(event.target).parents('.container-row').find("#menu-itm-description").text();
  const priceString = $(event.target).parents('.container-row').find(".price").text().substring(1);
  const price = Number(priceString) * 100;
  const stockString = $(event.target).parents('.container-row').find(".stock").text();
  const stock = Number(stockString);
  const category = $(event.target).parents('.container-row').find(".category").text();

  return {id, restaurant_owner_id, name, image_url, description, price, stock, category}
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
      listCurrentItems();
      this.reset();
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
    $('input[name=editItemName]').val(item.name);
    $('input[name=editUrl]').val(item.image_url);
    $('input[name=editDescription]').val(item.description);
    $('input[name=editPrice]').val(item.price);
    $('input[name=editQuantity]').val(item.stock);
    $('input[name=editId]').val(item.id);
    $('select[name=editCategory]').val(item.category);
  });

  $('#editItemForm').on('submit', function (event) {
    event.preventDefault();
    const data = $(this).serialize();
    editItem(data)
    .then(res => {
      console.log('Response received from post router', res);
      listCurrentItems();
      this.reset();
    })
    .catch(err => {
      console.log('Error', err);
    });
  })
});
