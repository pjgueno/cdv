import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './../css/style.css';


import leafletSidebarV2 from 'leaflet-sidebar-v2';

//var leafletSidebarV2 = require("leaflet-sidebar-v2")

//var sidebar = require("leaflet-sidebar-v2");

var map;
var tiles;
var cooCenter = [49.2401572, 6.9969327];
var zoomLevel = 10;

var imageOverlays = L.layerGroup();
var cartes;

var opacity = 0.6;



window.onload=function(){

    map.setView(cooCenter, zoomLevel);
	map.on('moveend', function() {});
	map.on('move', function() {});
	map.on('click', function(e) {
		map.setView([e.latlng.lat, e.latlng.lng], map.getZoom());
	});

};

map = L.map('map',{ zoomControl:true,minZoom:1,doubleClickZoom:false});

tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
			attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
			maxZoom: 18}).addTo(map);

var sidebar = L.control.sidebar({
    autopan: false,       // whether to maintain the centered map point when opening the sidebar
    closeButton: true,    // whether t add a close button to the panes
    container: 'sidebar', // the DOM container or #ID of a predefined sidebar container that should be used
    position: 'left',     // left or right
}).addTo(map);




fetch("./../json/cartes.json")
.then(function(response) {
return response.json();
})
.then(function(data) {
cartes = data;
//console.log(cartes);
    
for (var i = 0; i < cartes.length; i++) {

var carte = "./../georef/" + cartes[i].id + ".png";
var bounds = cartes[i].bbox;
  L.imageOverlay(carte, bounds,{interactive:true}).addTo(imageOverlays);
}

imageOverlays.addTo(map);
    
    imageOverlays.eachLayer(function(layer) {
    console.log(layer);
    layer.on("mouseover",function(){layer.bringToFront()})
    layer.on("click",function(){
        if (layer.options.opacity == 0){layer.setOpacity(opacity)}else{layer.setOpacity(0)}
    })
    layer.setOpacity(opacity);
});
    
    
});


var slider = document.getElementById("opacity");

slider.oninput = function() {
   opacity = this.value / 100;
    
    imageOverlays.eachLayer(function(layer) {
    console.log(layer);
    layer.setOpacity(opacity);
})
};


//.setOpacity(0.6)

fetch("./../json/cartespostales.json")
.then(function(response) {
return response.json();
})
.then(function(data) {

    L.geoJSON(data,{
                      pointToLayer: function (feature, latlng) {
                       return L.circleMarker(latlng, {
                        radius:5,
                        fillColor: " #0000ff",
                        stroke:false,
                        fillOpacity: 1})
                      },
                      onEachFeature: function (feature, layer) {
                        var popupContent = "<img src='"+"./../images/"+layer.feature.properties.id +"'>";
                        layer.bindPopup(popupContent,{closeButton:true, maxWidth: "auto"});
                      }}).addTo(map);
});

fetch("./../json/cdv.json")
.then(function(response) {
return response.json();
})
.then(function(data) {

    L.geoJSON(data,{
                      pointToLayer: function (feature, latlng) {
                       return L.circleMarker(latlng, {
                        radius:5,
                        fillColor: " #00d329",
                        stroke:false,
                        fillOpacity: 1})
                      },
                      onEachFeature: function (feature, layer) {
                        var popupContent = "<img src='"+"./../images/"+layer.feature.properties.id +"'>";
                        layer.bindPopup(popupContent,{closeButton:true, maxWidth: "auto"});
                      }}).addTo(map);
});

fetch("./../json/flickr.json")
.then(function(response) {
return response.json();
})
.then(function(data) {

    L.geoJSON(data,{
                      pointToLayer: function (feature, latlng) {
                       return L.circleMarker(latlng, {
                        radius:5,
                        fillColor: "#ff0000",
                        stroke:false,
                        fillOpacity: 1})
                      },
                      onEachFeature: function (feature, layer) {
                        var popupContent = "<img src='"+layer.feature.properties.url +"'>";
                        layer.bindPopup(popupContent,{closeButton:true, maxWidth: "auto"});
                      }}).addTo(map);
});




//overlay = L.imageOverlay("./../img/sarreguemines.png", [[49.100851409, 7.023636700], [49.140853448, 7.098829853]],{opacity:0.8,zindex:10}).addTo(map);

//nord: 49.140853448
//ouest:7.023636700
//sud: 49.100851409
//est: 7.098829853