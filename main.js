//map initialization
var map = L.map('map').setView([43.316, 21.894501], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//common functions
function getLayer(layerName) {
    var wmsLayer = L.tileLayer.wms('http://localhost:8080/geoserver/nis/wms', {
    layers: layerName,
    format: 'image/png',
    transparent: true,
    version: '1.1.0'
    });
    return wmsLayer;
}

function addImageLayerToMap(layerName, map) {
    var wmsLayer = getLayer(layerName);
    wmsLayer.addTo(map);
    return wmsLayer;
}

function removeLayerFromMap(layer){
    layer.remove();
}

function onEachFeature(feature, layer) {
    if(feature.properties && feature.properties.leisure && feature.properties.name){
        layer.bindPopup('This is a ' + feature.properties.leisure + ' named ' + feature.properties.name);
    }
    else if(feature.properties && feature.properties.leisure) {
        layer.bindPopup('This is a ' + feature.properties.leisure);
    }
    else if(feature.properties && feature.properties.shop && feature.properties.name){
        layer.bindPopup('This is a ' + feature.properties.shop + ' location named ' + feature.properties.name);
    }
    else if(feature.properties && feature.properties.shop) {
        layer.bindPopup('This is a ' + feature.properties.shop);
    }
    else if(feature.properties && feature.properties.tourism && feature.properties.name){
        layer.bindPopup('This is a location of ' + feature.properties.tourism + ' named ' + feature.properties.name);
    }
    else if(feature.properties && feature.properties.tourism) {
        layer.bindPopup('This is a location of ' + feature.properties.tourism);
    }
}


//populating the map
var administrativeLayer =  addImageLayerToMap('nis_administrative_boundaries', map);
var buildingsLayer = addImageLayerToMap('nis_buildings', map);
var roadLayer = addImageLayerToMap('nis_road', map);
var educationLayer = addImageLayerToMap('nis_education', map);
var parksLayer;
var parksStyle = {
    "color": "#1a3f0a",
    "weight": 5,
    "opacity": 0.65
};
$.ajax({
    url: "http://localhost:8080/geoserver/nis/wfs",
    data: {
      service: "WFS",
      version: "1.0.0",
      request: "GetFeature",
      typeName: "nis:nis_parks",
      outputFormat: "application/json",
      srsName: "epsg:4326",
    },
    dataType: "json",
    success: function (response) {
      parksLayer = L.geoJSON(response, {style: parksStyle, onEachFeature: onEachFeature}).addTo(map);
    },
  });
var commercialLayer;
var commercialStyle = {
    "color": "#f7a342",
    "weight": 5,
    "opacity": 0.65
};
$.ajax({
    url: "http://localhost:8080/geoserver/nis/wfs",
    data: {
      service: "WFS",
      version: "1.0.0",
      request: "GetFeature",
      typeName: "nis:nis_commercial",
      outputFormat: "application/json",
      srsName: "epsg:4326",
    },
    dataType: "json",
    success: function (response) {
      commercialLayer = L.geoJSON(response, {onEachFeature: onEachFeature}).addTo(map);
    },
  });
var waterLayer = addImageLayerToMap('nis_water', map);

var btnAdministrative = document.getElementById("btn-administrative");
btnAdministrative.onclick = function(){
    if(btnAdministrative.innerHTML === 'Remove Layer'){
        removeLayerFromMap(administrativeLayer);
        btnAdministrative.innerHTML = "Show Layer";
    }
    else{
        administrativeLayer = addImageLayerToMap('nis_administrative_boundaries', map);
        btnAdministrative.innerHTML = 'Remove Layer';
    }
}

var btnBuildings = document.getElementById("btn-buildings");
btnBuildings.onclick = function(){
    if(btnBuildings.innerHTML === 'Remove Layer'){
        removeLayerFromMap(buildingsLayer);
        btnBuildings.innerHTML = "Show Layer";
    }
    else{
        buildingsLayer = addImageLayerToMap('nis_buildings', map);
        btnBuildings.innerHTML = 'Remove Layer';
    }
}

var btnRoad = document.getElementById("btn-road");
btnRoad.onclick = function(){
    if(btnRoad.innerHTML === 'Remove Layer'){
        removeLayerFromMap(roadLayer);
        btnRoad.innerHTML = "Show Layer";
    }
    else{
        roadLayer = addImageLayerToMap('nis_road', map);
        btnRoad.innerHTML = 'Remove Layer';
    }
}

var btnEducation = document.getElementById("btn-education");
btnEducation.onclick = function(){
    if(btnEducation.innerHTML === 'Remove Layer'){
        removeLayerFromMap(educationLayer);
        btnEducation.innerHTML = "Show Layer";
    }
    else{
        educationLayer = addImageLayerToMap('nis_education', map);
        btnEducation.innerHTML = 'Remove Layer';
    }
}

var btnParks = document.getElementById("btn-parks");
btnParks.onclick = function(){
    if(btnParks.innerHTML === 'Remove Layer'){
        removeLayerFromMap(parksLayer);
        btnParks.innerHTML = "Show Layer";
    }
    else{
        $.ajax({
            url: "http://localhost:8080/geoserver/nis/wfs",
            data: {
              service: "WFS",
              version: "1.0.0",
              request: "GetFeature",
              typeName: "nis:nis_parks",
              outputFormat: "application/json",
              srsName: "epsg:4326",
            },
            dataType: "json",
            success: function (response) {
              parksLayer = L.geoJSON(response, {style: parksStyle, onEachFeature: onEachFeature}).addTo(map);
            },
          });
        btnParks.innerHTML = 'Remove Layer';
    }
}

var btnCommercial = document.getElementById("btn-commercial");
btnCommercial.onclick = function(){
    if(btnCommercial.innerHTML === 'Remove Layer'){
        removeLayerFromMap(commercialLayer);
        btnCommercial.innerHTML = "Show Layer";
    }
    else{
        $.ajax({
    url: "http://localhost:8080/geoserver/nis/wfs",
    data: {
      service: "WFS",
      version: "1.0.0",
      request: "GetFeature",
      typeName: "nis:nis_commercial",
      outputFormat: "application/json",
      srsName: "epsg:4326",
    },
    dataType: "json",
    success: function (response) {
      commercialLayer = L.geoJSON(response, {onEachFeature: onEachFeature}).addTo(map);
    },
  });
        btnCommercial.innerHTML = 'Remove Layer';
    }
}

var btnWater = document.getElementById("btn-water");
btnWater.onclick = function(){
    if(btnWater.innerHTML === 'Remove Layer'){
        removeLayerFromMap(waterLayer);
        btnWater.innerHTML = "Show Layer";
    }
    else{
        waterLayer = addImageLayerToMap('nis_water', map);
        btnWater.innerHTML = 'Remove Layer';
    }
}

