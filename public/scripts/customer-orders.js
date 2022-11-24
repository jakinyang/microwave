
const orderCardCreator = () => {

                return `<div class="row mb-4 d-flex justify-content-between align-items-center">
                          <div class="col-md-2 col-lg-2 col-xl-2">
                            <img
                              src="https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=722&q=80"
                              class="img-fluid rounded-3" alt="Food Item">
                          </div>
                          <div class="col-md-3 col-lg-3 col-xl-3">
                            <h6 class="text-muted">Food Type</h6>
                            <h6 class="text-black mb-0">Food Item</h6>
                          </div>
                          <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                           <div>1</div>
                          </div>
                          <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                            <h6 class="mb-0">$30.00</h6>
                          </div>
                          <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                            <a href="#!" class="text-muted"><i class="fas fa-times"></i></a>
                          </div>
                        </div>

                        <hr class="my-4"></hr>`
}

const listOrderCards = function () {
  $.ajax({
    method: 'GET',
    url: '/api/customers/menu/basket'
  })
  .done((response) => {
    console.log('listordercards res.menuItems: ', response.menu_items);
    const $orderList = $('#basket-container');
    $orderList.empty();
    let subTotal = 0; // subtotal thing
    for (const item of response.menu_items) {
      $('#basket-container').append(basketCardCreator(item));
      subTotal += Number(item.quantity * item.price / 100) // subtotal thing
    }
    const totalInput = subTotal.toString()
    $('#subtotal-amount').text(totalInput);  // subtotal thing
    console.log('listBasketItems Success!');
  });
}

//
// DOCUMENT READY \\
//
$(() = > {

});



module.exports = {

};
