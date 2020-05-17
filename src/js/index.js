import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './../css/style.css';

var map;
var tiles;
var cooCenter = [49.2401572, 6.9969327];
var zoomLevel = 10;

var imageOverlays = L.layerGroup();
var cartes;



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

fetch("./../json/cartes.json")
.then(function(response) {
return response.json();
})
.then(function(data) {
cartes = data;
console.log(cartes);
    
for (var i = 0; i < cartes.length; i++) {

var carte = "./../georef/" + cartes[i].id + ".png";
var bounds = cartes[i].bbox;
  L.imageOverlay(carte, bounds).setOpacity(0.6).addTo(imageOverlays);
}

imageOverlays.addTo(map);
    
});

console.log(imageOverlays);

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