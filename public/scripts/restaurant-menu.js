//
// FUCNTIONS USED IN DOC READY
//

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
                  <button class="options-btn selected">Delete</button>
                </div>
                <div class="container add-container">
                  <button class="options-btn selected">Edit</button>
                </div>
              </div>
            </div>
          </div>`;
};

const listCurrentItems = () => {
  $.ajax({
    method: 'GET',
    url: 'api/restaurants/menu'
  })
  .done((response) => {
    const $menuList = $('.listings-grid');
    $menuList.empty();
    console.log(response.menu_items);
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
  listCurrentItems();
  $('#newItemForm').on('submit', function (event) {
    event.preventDefault();
    const data = $(this).serialize();
    submitNewItem(data)
    .then(res => {
      console.log('Response received from post router', res);
      $('.listings-grid').append(itemCardCreator(res[0]));

    }
    )
    .catch(err => {
      console.log('Error', err);
    });
  })
});


