var popup = document.querySelector(".modal-feedback");
var close = document.querySelector(".modal-close");
var form = document.querySelector(".filters__form");

form.addEventListener("submit",function(evt){
    evt.preventDefault();
    popup.classList.add("modal-show");
    login.focus();
});

close.addEventListener("click",function(evt){
    evt.preventDefault();
    popup.classList.remove("modal-show");
    location.href="/";
});
