function detectIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
        // Edge (IE 12+) => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
}
if (detectIE()) {
    var root = document.getElementsByTagName( 'html' )[0];
    root.classList.add('isIE');
}

var generateBasketHtml = function (basket) {
    var sum = 0;
    var html = '<button class="modal-close close-basket" type="button">Закрыть</button>'
        + '<h2 class="modal-basket__title">Корзина</h2>'
        + '<table class="basket__table">';

    for (var i=0; i < basket.length; i++ ) {
        var item = basket[i];
        html += '<tr class="basket__item">';
        html += '<td class="modal__item-close" data-id="'+i+'"></td>';

        html += '<td class="basket__image-item">';
        html += '<img src="'+item.image+'">';
        html += '</td>';

        html += '<td class="basket__item-title">'+item.name+'</td>';

        html += '<td class="basket__item-quantity"><span class="quantity__minus" data-id="'+i+'">-</span>'+item.quantity+'<span class="quantity__plus" data-id="'+i+'">+</span></td>';

        html += '<td class="basket__item-price">'+(item.price*item.quantity)+'</td>';

        html += '</tr>';

        sum += item.price * item.quantity;
    }

    html += ''
        + '</table>'
        + ' <div class="basket__order">'
        + '<p class="basket__price">Итого: '+sum+'руб.</p>'
        + '<a class="button modal__button clear" href="#">Очистить корзину</a>'
        + '<a class="button modal__button order" href="#">Оформить заказ</a>'
        + '</div>';
    return html;
};
var redrawBasket = function(basket) {
    localStorage.setItem('basket', JSON.stringify(basket));
    document.querySelector('.modal-basket').innerHTML = generateBasketHtml(basket);
};


var basket = JSON.parse(localStorage.getItem('basket')) || [];
redrawBasket(basket);
var popupBasket = document.querySelector(".modal-basket");
var popupForm = document.querySelector(".modal-form");
var closeForm = document.querySelector(".close-form");
var orderForm = document.querySelector(".order__form");
var popupCheckout = document.querySelector(".modal-checkout");
var closeCheckout = document.querySelector(".close-checkout");
var pictureBasket = document.querySelector(".picture-basket");

if (basket.length > 0) {
    pictureBasket.classList.add("modal-show");
}

document.body.addEventListener("click", function(evt) {
    if (evt.target.classList.contains("pr__order")) {
        evt.preventDefault();
        var item = {
            image: evt.target.dataset.image,
            price: evt.target.dataset.price,
            name: evt.target.dataset.name,
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
        pictureBasket.classList.add("modal-show");
    }

    if (evt.target.classList.contains("add__button")) {
        evt.preventDefault();
        popupBasket.classList.remove("modal-show");
    }

    if (evt.target.classList.contains("clear")) {
        evt.preventDefault();
        basket = emptyBasket(basket);
    }

    if (evt.target.classList.contains("modal__item-close")) {
        evt.preventDefault();
        var itemId = evt.target.dataset.id;
        basket = deleteItem(basket,itemId);
        if (basket.length === 0) {
            basket = emptyBasket(basket);
        } else {
            redrawBasket(basket);
        }
        return basket;
    }

    if(evt.target.classList.contains("quantity__minus")) {
        evt.preventDefault();
        var itemId = evt.target.dataset.id;
        var quantity = basket[itemId].quantity;
        quantity --;
        basket[itemId].quantity = quantity;

        if (quantity === 0) {
            basket = deleteItem(basket,itemId);
        }
        if (basket.length === 0) {
            basket = emptyBasket(basket);
        } else {
            redrawBasket(basket);
        }
    }

    if(evt.target.classList.contains("quantity__plus")) {
        evt.preventDefault();
        var itemId = evt.target.dataset.id;
        var quantity = basket[itemId].quantity;
        quantity ++;
        basket[itemId].quantity = quantity;
        redrawBasket(basket);
    }

    if (evt.target.classList.contains("order")) {
        evt.preventDefault();
        popupBasket.classList.remove("modal-show");
        popupForm.classList.add("modal-show");
    }

    if (evt.target.classList.contains("close-basket")) {
        evt.preventDefault();
        popupBasket.classList.remove("modal-show");
        pictureBasket.classList.add("modal-show");
    }
});

closeForm.addEventListener("click",function(evt){
    evt.preventDefault();
    popupForm.classList.remove("modal-show");
    if (basket.length > 0) {
        pictureBasket.classList.add("modal-show");
    }
});

orderForm.addEventListener("submit",function(evt){
    evt.preventDefault();
    popupForm.classList.remove("modal-show");
    popupCheckout.classList.add("modal-show");
    basket = [];
    localStorage.setItem('basket', JSON.stringify(basket));
});

closeCheckout.addEventListener("click",function(evt){
    evt.preventDefault();
    popupCheckout.classList.remove("modal-show");
});

pictureBasket.addEventListener("click",function(evt) {
    pictureBasket.classList.remove("modal-show");
    popupBasket.classList.add("modal-show");
});


var emptyBasket = function(basket) {
    basket = [];
    localStorage.setItem('basket', JSON.stringify(basket));
    var html = '<p class="empty__text">К сожалению, ваша корзина пуста</p>'
        + '<img class="empty__img" src="img/grumpy.svg">'
        + '<a class="button modal__button add__button" href="#">Добавить товары</a>';
    document.querySelector('.modal-basket').innerHTML = html;
    return basket;
};


var deleteItem = function(basket, itemId) {
    basket.splice(itemId, 1);
    return basket;
};




