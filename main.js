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
    version: '1.1.0',
    });
    return wmsLayer;
}

function getFilterLayer(layerName, attribute, value) {
    var wmsLayer = L.tileLayer.wms('http://localhost:8080/geoserver/nis/wms', {
    layers: layerName,
    format: 'image/png',
    transparent: true,
    version: '1.1.0',
    CQL_FILTER: attribute + '=' + '\'' + value + '\''
    });
    return wmsLayer;
}

function addImageLayerToMap(layerName, map) {
    var wmsLayer = getLayer(layerName);
    wmsLayer.addTo(map);
    return wmsLayer;
}

function addFilterImageLayerToMap(layerName, map, attribute, value) {
    var wmsLayer = getFilterLayer(layerName, attribute, value);
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
    else if(feature.properties && feature.properties.amenity && feature.properties.name){
        layer.bindPopup('This is a location of ' + feature.properties.amenity + ' named ' + feature.properties.name);
    }
    else if(feature.properties && feature.properties.amenity) {
        layer.bindPopup('This is a location of ' + feature.properties.amenity);
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
      parksLayer = L.geoJSON(response, {style: parksStyle, onEachFeature: onEachFeature
    }).addTo(map);
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
        if(administrativeLayer !== null) removeLayerFromMap(administrativeLayer);
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
        removeLayerFromMap(parksLayer);
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

//filters
//wfs
var btnFilterParks = document.getElementById("btn-filter-parks");
btnFilterParks.onclick = function(){   
    removeLayerFromMap(parksLayer);
    const radioButtons = document.querySelectorAll('input[name="radio-parks"]');
    var propertyName;
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            propertyName = radioButton.value;
            break;
        }
    }
    var value = document.getElementById("input-park").value;
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
              parksLayer = L.geoJSON(response, {style: parksStyle, onEachFeature: onEachFeature, 
                filter:function(feature,layer){
                    if(propertyName==='name')
                        return feature.properties.name === value;
                }}).addTo(map);
            },
          });
}

var btnFilterCommercial = document.getElementById("btn-filter-commercial");
btnFilterCommercial.onclick = function(){   
    removeLayerFromMap(commercialLayer);
    const radioButtons = document.querySelectorAll('input[name="radio-commercial"]');
    var propertyName;
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            propertyName = radioButton.value;
            break;
        }
    }
    var value = document.getElementById("input-commercial").value;
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
              commercialLayer = L.geoJSON(response, {onEachFeature: onEachFeature, 
                filter:function(feature,layer){
                    if(propertyName==='name')
                        return feature.properties.name === value;
                    else if(propertyName==='type')
                        return feature.properties.amenity === value;
                }}).addTo(map);
            },
          });
}


//wms
var btnFilterAdministrative = document.getElementById("btn-filter-administrative");
btnFilterAdministrative.onclick = function(){
    removeLayerFromMap(administrativeLayer);
    const radioButtons = document.querySelectorAll('input[name="radio-administrative"]');
    var propertyName;
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            propertyName = radioButton.value;
            break;
        }
    }
    var value = document.getElementById("input-administrative").value;
    administrativeLayer = addFilterImageLayerToMap('nis_administrative_boundaries', map, propertyName, value);
}

var btnFilterBuildings = document.getElementById("btn-filter-buildings");
btnFilterBuildings.onclick = function(){
    removeLayerFromMap(buildingsLayer);
    const radioButtons = document.querySelectorAll('input[name="radio-buildings"]');
    var propertyName;
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            propertyName = radioButton.value;
            break;
        }
    }
    var value = document.getElementById("input-buildings").value;
    buildingsLayer = addFilterImageLayerToMap('nis_buildings', map, propertyName, value);
}

var btnFilterRoads = document.getElementById("btn-filter-roads");
btnFilterRoads.onclick = function(){
    removeLayerFromMap(roadLayer);
    const radioButtons = document.querySelectorAll('input[name="radio-roads"]');
    var propertyName;
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            propertyName = radioButton.value;
            break;
        }
    }
    var value = document.getElementById("input-roads").value;
    roadLayer = addFilterImageLayerToMap('nis_road', map, propertyName, value);
}

var btnFilterEducation = document.getElementById("btn-filter-education");
btnFilterEducation.onclick = function(){
    removeLayerFromMap(educationLayer);
    const radioButtons = document.querySelectorAll('input[name="radio-education"]');
    var propertyName;
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            propertyName = radioButton.value;
            break;
        }
    }
    var value = document.getElementById("input-education").value;
    educationLayer = addFilterImageLayerToMap('nis_education', map, propertyName, value);
}

var btnFilterWater = document.getElementById("btn-filter-water");
btnFilterWater.onclick = function(){
    removeLayerFromMap(waterLayer);
    const radioButtons = document.querySelectorAll('input[name="radio-water"]');
    var propertyName;
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            propertyName = radioButton.value;
            break;
        }
    }
    var value = document.getElementById("input-water").value;
    waterLayer = addFilterImageLayerToMap('nis_water', map, propertyName, value);
}