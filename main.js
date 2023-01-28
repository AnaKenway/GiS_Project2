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

function addLayerToMap(layerName, map) {
    var wmsLayer = getLayer(layerName);
    wmsLayer.addTo(map);
    return wmsLayer;
}

function removeLayerFromMap(layer){
    layer.remove();
}

//populating the map
var administrativeLayer =  addLayerToMap('nis_administrative_boundaries', map);
var buildingsLayer = addLayerToMap('nis_buildings', map);
var roadLayer = addLayerToMap('nis_road', map);
var educationLayer = addLayerToMap('nis_education', map);
var parksLayer = addLayerToMap('nis_parks', map);
var commercialLayer = addLayerToMap('nis_commercial', map);
var waterLayer = addLayerToMap('nis_water', map);

var btnAdministrative = document.getElementById("btn-administrative");
btnAdministrative.onclick = function(){
    if(btnAdministrative.innerHTML === 'Remove Layer'){
        removeLayerFromMap(administrativeLayer, map);
        btnAdministrative.innerHTML = "Show Layer";
    }
    else{
        administrativeLayer = addLayerToMap('nis_administrative_boundaries', map);
        btnAdministrative.innerHTML = 'Remove Layer';
    }
}

var btnBuildings = document.getElementById("btn-buildings");
btnBuildings.onclick = function(){
    if(btnBuildings.innerHTML === 'Remove Layer'){
        removeLayerFromMap(buildingsLayer, map);
        btnBuildings.innerHTML = "Show Layer";
    }
    else{
        buildingsLayer = addLayerToMap('nis_buildings', map);
        btnBuildings.innerHTML = 'Remove Layer';
    }
}

var btnRoad = document.getElementById("btn-road");
btnRoad.onclick = function(){
    if(btnRoad.innerHTML === 'Remove Layer'){
        removeLayerFromMap(roadLayer, map);
        btnRoad.innerHTML = "Show Layer";
    }
    else{
        roadLayer = addLayerToMap('nis_road', map);
        btnRoad.innerHTML = 'Remove Layer';
    }
}

var btnEducation = document.getElementById("btn-education");
btnEducation.onclick = function(){
    if(btnEducation.innerHTML === 'Remove Layer'){
        removeLayerFromMap(educationLayer, map);
        btnEducation.innerHTML = "Show Layer";
    }
    else{
        educationLayer = addLayerToMap('nis_education', map);
        btnEducation.innerHTML = 'Remove Layer';
    }
}

var btnParks = document.getElementById("btn-parks");
btnParks.onclick = function(){
    if(btnParks.innerHTML === 'Remove Layer'){
        removeLayerFromMap(parksLayer, map);
        btnParks.innerHTML = "Show Layer";
    }
    else{
        parksLayer = addLayerToMap('nis_parks', map);
        btnParks.innerHTML = 'Remove Layer';
    }
}

var btnCommercial = document.getElementById("btn-commercial");
btnCommercial.onclick = function(){
    if(btnCommercial.innerHTML === 'Remove Layer'){
        removeLayerFromMap(commercialLayer, map);
        btnCommercial.innerHTML = "Show Layer";
    }
    else{
        commercialLayer = addLayerToMap('nis_commercial', map);
        btnCommercial.innerHTML = 'Remove Layer';
    }
}

var btnWater = document.getElementById("btn-water");
btnWater.onclick = function(){
    if(btnWater.innerHTML === 'Remove Layer'){
        removeLayerFromMap(waterLayer, map);
        btnWater.innerHTML = "Show Layer";
    }
    else{
        waterLayer = addLayerToMap('nis_water', map);
        btnWater.innerHTML = 'Remove Layer';
    }
}