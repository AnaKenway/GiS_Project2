var map = L.map('map').setView([43.316, 21.894501], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// var wmsAdministrativeLayer = L.tileLayer.wms('http://localhost:8080/geoserver/nis/wms', {
//     layers: 'nis_administrative_boundaries',
//     format: 'image/png',
//     transparent: true,
//     version: '1.1.0'
// });
// wmsAdministrativeLayer.addTo(map);

var wmsBuildingsLayer = L.tileLayer.wms('http://localhost:8080/geoserver/nis/wms', {
    layers: 'nis_buildings',
    format: 'image/png',
    transparent: true,
    version: '1.1.0'
});
wmsBuildingsLayer.addTo(map);

var wmsCommercialLayer = L.tileLayer.wms('http://localhost:8080/geoserver/nis/wms', {
    layers: 'nis_commercial',
    format: 'image/png',
    transparent: true,
    version: '1.1.0'
});
wmsCommercialLayer.addTo(map);

var wmsEducationLayer = L.tileLayer.wms('http://localhost:8080/geoserver/nis/wms', {
    layers: 'nis_education',
    format: 'image/png',
    transparent: true,
    version: '1.1.0'
});
wmsEducationLayer.addTo(map);

var wmsParksLayer = L.tileLayer.wms('http://localhost:8080/geoserver/nis/wms', {
    layers: 'nis_parks',
    format: 'image/png',
    transparent: true,
    version: '1.1.0'
});
wmsParksLayer.addTo(map);

var wmsRoadLayer = L.tileLayer.wms('http://localhost:8080/geoserver/nis/wms', {
    layers: 'nis_road',
    format: 'image/png',
    transparent: true,
    version: '1.1.0'
});
wmsRoadLayer.addTo(map);

var wmsWaterLayer = L.tileLayer.wms('http://localhost:8080/geoserver/nis/wms', {
    layers: 'nis_water',
    format: 'image/png',
    transparent: true,
    version: '1.1.0'
});
wmsWaterLayer.addTo(map);