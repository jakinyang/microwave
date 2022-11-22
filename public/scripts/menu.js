// Client facing scripts here
$(() => {
  $('#fetch-menu').on('click', () => {
    $.ajax({
      method: 'GET',
      url: '/api/menu'
    })
    .done((response) => {
      const $menuList = $('#menu');
      $menuList.empty();
      for(const item of response.menu_items) {
        $(`<li class="item">`).text(item.name).appendTo($menuList);
      }
    });
  });
});
