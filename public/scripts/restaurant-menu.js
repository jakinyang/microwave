
$(() => {
  $.ajax({
    method: 'GET',
    url: 'api/restaurant/menu'
  })
  .done((response) => {
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
                <span>${item.price}</span><span>${item.stock}</span>
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


