
$(() => {
  $.ajax({
    method: 'GET',
    url: 'api/restaurants/menu'
  })
  .done((response) => {
    console.log('made it to line 8, restaurant-menu.js');
    const $menuList = $('.listings-grid');
    $menuList.empty();
    for (const item of response.menu_items) {
      $('.listings-grid').append(`<div class="listing-grid-element">
          <div class="image">
            <img
              src="${item.image_url}"
              alt="Listing Pic">
          </div>
          <div class="container-row">
            <div class="text">
              <h3>${item.name}</h3>
              <div class="info">
                <div>
                  <h6><span class = "label label-default">Price</span> $${item.price / 100}</h6>
                  <h6><span class = "label label-default">Stock</span> ${item.stock}</h6>
                </div>
              </div>
            </div>
            <div class="options">
              <div class="container add-container">
                <button class="options-btn selected">Add</button>
              </div>
              <div class="container add-container">
                <button class="options-btn selected">Edit</button>
              </div>
            </div>
          </div>
        </div>`);
    }
  })
});


