const
  POINT_MAP_CENTER = [55.80533527,37.58241397],
  POINT_START = [55.80795122,37.58078698],
  POINT_END = [55.80387552,37.58332668],
  POINTS_WAY = [
    [55.80784246,37.58123030],
    [55.80584247,37.58250704],
    [55.80572162,37.58291129],
    [55.80524426,37.58274307],
    [55.80315953,37.58330316],
    [55.80299033,37.58381251]
  ];

var map, placemarkHtml = {
  metro: [
    '<div class="placemark --metro">',
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="13" viewBox="0 0 16 13">',
    '<path d="M8.002 4.854L4.352 0L-0.001 11.576L3.807 13.001L5.553 8.356L8.002 11.613L10.452 8.356L12.198 13.001L16.006 11.576L11.653 0L8.002 4.854z"/>',
    '</svg>',
    '</div>'
  ].join(''),
  mailfit: [
    '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="76" viewBox="0 0 48 76" class="placemark --mailfit">',
    '<path d="M24 0l24 10v28l-24 38l-24-38v-28z"/>',
    '<polygon points="16.4,11.1 0,5.3 0,29.4 3.3,30.6 3.3,10.5 16.4,15.1 29.6,10.5 29.6,30.6 32.8,29.4 32.8,5.3"/>',
    '<polygon points="26.7,27.4 16.4,30.9 6.4,27.4 6.4,31.5 16.4,35 26.7,31.4"/>',
    '<polygon style="opacity: 0.7" points="16.6,0 16.6,4 20.9,5.5 26.7,3.5 26.7,3.5"/>',
    '<polygon style="opacity: 0.4" points="16.6,0 6.4,3.5 6.4,3.5 12.2,5.5 16.6,4"/>',
    '</svg>'
  ].join('')
};

function initializeMap()
{
  map = new ymaps.Map('yandex-map',{center: POINT_MAP_CENTER, controls: [], zoom: 16},{autoFitToViewport: 'always'});
  map.behaviors.disable('scrollZoom');
  var placemarks = {
    metro: new ymaps.Placemark(
      POINT_START,
      {hintContent: 'м. Дмитровская', balloonContent: '692 м., 8 мин.'},
      {iconLayout: ymaps.templateLayoutFactory.createClass(placemarkHtml.metro)}
    ),
    mailfit: new ymaps.Placemark(
      POINT_END,
      {hintContent: 'Бутырская, 62'},
      {iconLayout: ymaps.templateLayoutFactory.createClass(placemarkHtml.mailfit)})
  };
  for (var placemark in placemarks) map.geoObjects.add(placemarks[placemark]);
  map.geoObjects.add(new ymaps.Polyline(POINTS_WAY,{},{strokeColor: '#2850f0', strokeWidth: 2, strokeStyle: '4 3'}));
}

ymaps.ready(initializeMap);