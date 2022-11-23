
const itemCardCreator = (dbObject) => {
  return `<div class="listing-grid-element">
            <div class="image">
              <img
                src="${dbObject.image_url}"
                alt="Listing Pic">
            </div>
            <div class="container-row">
              <div class="text">
                <h3>${dbObject.name}</h3>
                <div class="info">
                  <div>
                    <h6><span class = "label label-default">Price</span> $${dbObject.price / 100}</h6>
                    <h6><span class = "label label-default">Stock</span> ${dbObject.stock}</h6>
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
          </div>`;
};

$(() => {
  $.ajax({
    method: 'GET',
    url: 'api/restaurants/menu'
  })
  .done((response) => {
    console.log('made it to line 8, restaurant-menu.js');
    const $menuList = $('.listings-grid');
    $menuList.empty();
    console.log(response.menu_items);
    for (const item of response.menu_items) {
      $('.listings-grid').append(itemCardCreator(item));
    }
  });

  $('#newItemForm').on('submit', function (event) {
    event.preventDefault();
    console.log('event, line 48', event);
    console.log($(this), 'walahoo');
    const data = $(this).serialize();
    console.log('data, line 50', data);
  });
});


