ymaps.ready(init);

function init(){
    var myMap;
    var myPlacemark;

    var mql = window.matchMedia('all and (min-width: 768px)');
    if (mql.matches) {
        myMap = new ymaps.Map("map", {
            center: [59.939406, 30.310116],
            zoom: 15,
            controls: ["zoomControl"]
        });

        myMap.behaviors.disable('scrollZoom');

        myPlacemark = new ymaps.Placemark([59.938631, 30.323055], {
        }, {
            iconLayout: 'default#image',
            iconImageHref: ("../img/map-pin.png"),
            iconImageSize: [113, 103],
            iconImageOffset: [-56, -106]
        });
    } else {
        myMap = new ymaps.Map("map", {
            center: [59.938631, 30.323055],
            zoom: 15,
            controls: ["zoomControl"]
        });

        myMap.behaviors.disable('scrollZoom');

        myPlacemark = new ymaps.Placemark([59.938631, 30.323055], {
        }, {
            iconLayout: 'default#image',
            iconImageHref: ("../img/map-pin.png"),
            iconImageSize: [55, 53],
            iconImageOffset: [-27, -53]
        });
    }

    myMap.geoObjects.add(myPlacemark);
}