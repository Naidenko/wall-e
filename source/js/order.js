var basket = [];
document.body.addEventListener("click", function(evt) {
    if (event.target.classList.contains("production__order")) {
        var item = {
            image: event.target.dataset.image,
            price: event.target.dataset.price,
            name: event.target.dataset.name,
            quantity: 1
        };
        var isContains = false;
        for (var i = 0; i < basket.length; i++) {
            if (basket[i].name === item.name) {
                basket[i].quantity++;
                isContains = true;
            }
        }
        if (!isContains) {
            basket.push(item);
        }
        redrawBasket(basket);
    }
    if (event.target.classList.contains("clear")) {
        basket = [];
        redrawBasket(basket);
    }
});

var generateBasketHtml = function (basket) {
    var sum = 0;
    var html = '<button class="modal-close" type="button">Закрыть</button>'
        + '<h2 class="modal-basket__title">Корзина</h2>'
        + '<table class="basket__table">';

    for (var i=0; i < basket.length; i++ ) {
        var item = basket[i];
        html += '<tr class="basket__item">';

        html += '<td class="basket__image-item">';
        html += '<img src="'+item.image+'">';
        html += '</td>';

        html += '<td>'+item.name+'</td>';

        html += '<td>'+item.quantity+'</td>';

        html += '<td>'+item.price+'</td>';

        html += '</tr>';

        sum += item.price * item.quantity;
    }

    html += ''
    + '</table>'
    + ' <div class="basket__order">'
    + '<p class="basket__price">Итого: '+sum+'руб.</p>'
    + '<a class="button" href="#">Оформить заказ</a>'
    + '<a class="button clear" href="#">Очистить корзину</a>'
    + '</div>';
    return html;
};

var redrawBasket = function(basket) {
    document.querySelector('.modal-basket').innerHTML = generateBasketHtml(basket);
};



