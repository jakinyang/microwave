
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

