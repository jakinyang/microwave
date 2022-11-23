

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
                    <button class="options-btn selected">Add</button>
                  </div>
                  <button type="button" class="btn btn-primary" data-container="body" data-toggle="popover" data-placement="bottom" data-content="Vivamus
                    sagittis lacus vel augue laoreet rutrum faucibus.">
                    Description
                  </button>
              </div>
            </div>
          </div>`
};

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

$(() => {
  listMenuItems();
})
