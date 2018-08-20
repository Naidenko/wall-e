
var slider = document.querySelector('.example__range');
var rightCat = document.querySelector(".comparison-item__content--second");
var leftCat = document.querySelector(".comparison-item--first");
var rightCatImg = document.querySelector(".comparison-item__content--second img");
slider.addEventListener('input', function (e) {
    sliderChanged(e.target.value);
});

slider.addEventListener('change', function (e) {
    sliderChanged(e.target.value);
});
slider.addEventListener('mouseup', function (e) {
    sliderChanged(e.target.value);
});

function sliderChanged(value) {
    console.log(value);
    var width = window.innerWidth;
    var imgWidth = 280;

    if(width > 767) {
        imgWidth = 690;
    }
    if (width > 1279) {
        imgWidth = 610;
    }
    leftCat.style.width = (imgWidth * value / 100 ) + "px";
    rightCat.style.left = (imgWidth * value / 100 ) + "px";
    rightCatImg.style.transform = "translate("+(-imgWidth * value / 100 )+"px, 0)";
}
sliderChanged(50);